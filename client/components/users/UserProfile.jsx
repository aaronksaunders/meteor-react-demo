UserProfile = React.createClass({
    mixins: [ReactMeteorData],
    PropTypes: {},
    getInitialState() {
        return {
            errors: {},
            avatarData: null
        }
    },
    getMeteorData() {
        return {
            currentUser: Meteor.user()
        };
    },

    logoutUser() {
        Meteor.logoutUser();
        FlowRouter.go("Home");
    },

    onAvatarBtnClick(event) {
        event.preventDefault();
        $(document).find("[name=avatarFile]").click();
    },

    onAvatarFileChange(event) {
        var that = this;

        event.preventDefault();
        var fileData = $(document).find("[name=avatarFile]");
        if (fileData && fileData[0].files[0]) {
            console.log(fileData[0].files[0]);
            var file = fileData[0].files[0];

            var reader = new FileReader();

            reader.onload = function (_event) {
                console.log("File Read: ", _event.target.result);

                that.setState({
                    avatarData: _event.target.result
                });

            };
            reader.onerror = function (_event) {
                console.log("On File Read Error: ", _event);
            };
            reader.readAsDataURL(file);
        }
    },

    onSubmit(event) {
        event.preventDefault();

        var email = $(event.target).find("[name=email]").val();
        var firstName = $(event.target).find("[name=firstname]").val();
        var lastName = $(event.target).find("[name=lastname]").val();
        var userType = $(event.target).find("[name=usertype]").val();

        var errors = {};

        if (!email) {
            errors.email = "Email required"
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
            avatar: this.state.avatarData
        };

        Meteor.call("updateUser", {
            username: email,
            email: email,
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
            let user = this.data.currentUser;
            this.state.avatarData = this.data.currentUser.profile.avatar;

            // img btn text
            let imageTxt = (this.state.avatarData ? "Update Image" : "Add Image");

            return (
                <div className="container">
                    <div className="row">
                        <div className="col-sm-8 col-sm-offset-2">
                            <h1>Update Account Information</h1>

                            <form onSubmit={this.onSubmit}>
                                <AuthErrors errors={this.state.errors}/>
                                <div className="col-mid-9">
                                    <img id="avatarImg" src={this.state.avatarData} width="150"
                                         className="img-responsive img-rounded center-block" alt=""/>
                                </div>
                                <FormInput hasError={!!this.state.errors.avatar} name="avatar" type="avatar"
                                           value={user.profile.avatar}
                                           onClick={this.onAvatarBtnClick}
                                           onChange={this.onAvatarFileChange}
                                           label={imageTxt}/>
                                <FormInput hasError={!!this.state.errors.fname} name="FirstName" type="text"
                                           label="First Name" value={user.profile.firstName}/>
                                <FormInput hasError={!!this.state.errors.lname} name="LastName" type="text"
                                           label="Last Name" value={user.profile.lastName}/>
                                <FormInput hasError={!!this.state.errors.email} name="Email" type="text" label="Email"
                                           disabled="true" value={user.emails[0].address}/>
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