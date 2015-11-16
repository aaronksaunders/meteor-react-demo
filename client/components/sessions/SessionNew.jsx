SessionNew = React.createClass({
    mixins: [ReactMeteorData],
    PropTypes: {},

    /**
     *
     * @returns {{errors: {}}}
     */
    getInitialState() {
        return {
            errors: {}
        }
    },

    /**
     *
     */
    componentDidMount() {
    },

    /**
     * get the data from meteor that is needed for this
     * page to render
     *
     * @returns {{students: any, tutors: any}}
     */
    getMeteorData() {
        return {
            students: Meteor.users.find({"profile.userType": "STUDENT"}).fetch(),
            tutors: Meteor.users.find({"profile.userType": "TUTOR"}).fetch()
        }
    },

    /**
     * called to save the object to the Session Collection
     * @param event
     */
    onSubmit(event) {
        event.preventDefault();

        var student = $(event.target).find("[name=student]").val();
        var sessionTitle = $(event.target).find("[name=session_title]").val();
        var sessionDescription = $(event.target).find("[name=session_desc]").val();
        var sessionDate = $(event.target).find("[name=session_date]").val();

        var errors = {};


        !sessionTitle && (errors.session_title = "Title required");

        !sessionDescription && (errors.session_desc = "Description required");

        !sessionDate && (errors.session_date = "Missing Date");

        this.setState({
            errors: errors
        });

        if (!_.isEmpty(errors)) {
            return;
        }

        Sessions.insert({
            owner : Meteor.userId(),
            student_id : student,
            title : sessionTitle,
            description :sessionDescription,
            scheduled_date : new Date(sessionDate),
            created_at : new Date()
        })

    },

    /**
     * converts the user collection into something that can be displayed in UI
     * @param _users
     */
    convertToSelectArray(_users) {
        var _array = [];
        _.forEach(_users, function (_s) {
            _array.push({name: _s.profile.firstName + " " + _s.profile.lastName, value: _s._id});
        });
        return _array;
    },

    /**
     * called when the date field is updated in the form
     * @param _event
     */
    updateDate(_event) {
        console.log(_event);
    },

    render() {

        let studentsArray = this.convertToSelectArray(this.data.students);
        let tutorsArray = this.convertToSelectArray(this.data.tutors);

        //ReactDOM.findDOMNode(this.refs.datetimepicker).datepicker();

        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-8 col-sm-offset-2">
                        <h1>Create New Session</h1>

                        <form onSubmit={this.onSubmit} ref="inputForm">
                            <AuthErrors errors={this.state.errors}/>

                            <FormInput hasError={!!this.state.errors.student} name="student"
                                       type="select" label="Student Name" data={studentsArray}/>


                            <FormInput hasError={!!this.state.errors.session_title} name="session_title" type="text"
                                       label="Session Title"/>

                            <FormInput hasError={!!this.state.errors.session_desc} name="session_desc" type="textarea"
                                       label="Session Description"/>


                            <FormInput hasError={!!this.state.errors.session_date} name="session_date"  ref="session_date" type="datepicker"
                                       onChange={this.updateDate}
                                       label="Session Date"/>

                            <div class="col-md-6 text-right">
                                <button type="submit" className="btn btn-default">Create New Session</button>
                                <a className="btn btn-default" style={{margin:5}} href="/">Cancel</a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
});