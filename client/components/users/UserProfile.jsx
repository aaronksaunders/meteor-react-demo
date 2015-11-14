UserProfile = React.createClass({
    mixins: [ReactMeteorData],
    PropTypes: {},
    getInitialState() {
        return {
            errors: {}
        }
    },
    getMeteorData() {
        return {
            currentUser: Meteor.user()
        };
    },
    onSubmit(event) {
        event.preventDefault();

        var email = $(event.target).find("[name=email]").val();
        var password = $(event.target).find("[name=password]").val();
        var firstName = $(event.target).find("[name=firstname]").val();
        var lastName = $(event.target).find("[name=lastname]").val();
        var userType = $(event.target).find("[name=usertype]").val();

        var errors = {};

        if (!email) {
            errors.email = "Email required"
        }

        if (!password) {
            errors.password = "Password required"
        }

        if (!firstName) {
            errors.fname = "First Name Required"
        }

        if (!lastName) {
            errors.lname = "Last Name Required"
        }

        this.setState({
            errors: errors
        });

        if (!_.isEmpty(errors)) {
            return;
        }

        var profile = {
            firstName: firstName,
            lastName: lastName,
            userType: userType,
            created: new Date()
        };

        Accounts.createUser({
            username: email,
            email: email,
            password: password,
            profile: profile
        }, (_error) => {
            if (_error) {
                this.setState({
                    errors: {'none': _error.reason}
                });

                return;
            } else {
                FlowRouter.go('UserProfile');
            }
        });
    },
    render() {

        let userTypesArray = [{
            name: "Student",
            value: "STUDENT"
        }, {
            name: "Tutor",
            value: "TUTOR"
        }, {
            name: "Administrator",
            value: "ADMIN"
        }];


        if (!this.data.currentUser) {
            return (<div/>)
        } else {
            let user =   this.data.currentUser;
            return (
                <div className="container">
                    <div className="row">
                        <div className="col-sm-6 col-sm-offset-3">
                            <h1>Update Account Information</h1>

                            <form onSubmit={this.onSubmit}>
                                <AuthErrors errors={this.state.errors}/>
                                <FormInput hasError={!!this.state.errors.fname} name="FirstName" type="text"
                                           label="First Name" value={user.profile.firstName}/>
                                <FormInput hasError={!!this.state.errors.lname} name="LastName" type="text"
                                           label="Last Name"  value={user.profile.lastName}/>
                                <FormInput hasError={!!this.state.errors.email} name="Email" type="text" label="Email"
                                           disabled="true"  value={user.emails[0].address}/>
                                <FormInput name="UserType" type="select" label="User Type" data={userTypesArray}/>

                                <input type="submit" className="btn btn-default"/>
                            </form>
                        </div>
                    </div>
                </div>
            )
        }
    }
});