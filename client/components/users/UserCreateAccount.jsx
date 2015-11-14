UserCreateAccount = React.createClass({
    mixins: [],
    PropTypes: {},
    getInitialState() {
        return {
            errors: {}
        }
    },
    getMeteorData() {
        return {}
    },
    onSubmit(event) {
        event.preventDefault();

        var email = $(event.target).find("[name=email]").val();
        var password = $(event.target).find("[name=password]").val();
        var firstName = $(event.target).find("[name=firstname]").val();
        var lastName = $(event.target).find("[name=lastname]").val();

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
                FlowRouter.go('Home');
            }
        });
    },
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-6 col-sm-offset-3">
                        <h1>Create Account</h1>

                        <form onSubmit={this.onSubmit}>
                            <AuthErrors errors={this.state.errors}/>
                            <FormInput hasError={!!this.state.errors.fname} name="FirstName" type="text"
                                       label="First Name"/>
                            <FormInput hasError={!!this.state.errors.lname} name="LastName" type="text"
                                       label="Last Name"/>
                            <FormInput hasError={!!this.state.errors.email} name="Email" type="text" label="Email"/>
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