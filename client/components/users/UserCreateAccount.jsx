UserCreateAccount = React.createClass({
    mixins: [],
    PropTypes: {},
    getInitialState() {
        return {
            errors: {},
            avatarData: null
        }
    },
    getMeteorData() {
        return {}
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
            created: new Date(),
            avatar: this.state.avatarData
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
                FlowRouter.go('Home');
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

        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-6 col-sm-offset-3">
                        <h1>Create Account</h1>

                        <form onSubmit={this.onSubmit}>
                            <AuthErrors errors={this.state.errors}/>
                            <div className="col-mid-9">
                                <img id="avatarImg" src={this.state.avatarData} width="150"
                                     className="img-responsive img-rounded center-block" alt=""/>
                            </div>

                            <FormInput hasError={!!this.state.errors.avatar} name="avatar" type="avatar"
                                       onClick={this.onAvatarBtnClick}
                                       onChange={this.onAvatarFileChange}
                                       label="Add Profile Image"/>
                            <FormInput hasError={!!this.state.errors.fname} name="FirstName" type="text"
                                       label="First Name"/>
                            <FormInput hasError={!!this.state.errors.lname} name="LastName" type="text"
                                       label="Last Name"/>
                            <FormInput hasError={!!this.state.errors.email} name="Email" type="text" label="Email"/>
                            <FormInput name="UserType" type="select" label="User Type" data={userTypesArray}/>
                            <FormInput hasError={!!this.state.errors.password} name="Password" type="password"
                                       label="Password"/>
                            <input type="submit" className="btn btn-default"/>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
});