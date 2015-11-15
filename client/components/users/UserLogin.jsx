UserLogin = React.createClass({
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

        var errors = {};

        if (!email) {
            errors.email = "Email required"
        }

        if (!password) {
            errors.password = "Password required"
        }

        this.setState({
            errors: errors
        });

        if (!_.isEmpty(errors)) {
            return;
        }

        Meteor.loginWithPassword(email, password, (err) => {
            if (err) {
                this.setState({
                    errors: {'none': err.reason}
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
                    <div className="col-sm-8 col-sm-offset-2">
                        <h1>Login</h1>

                        <form onSubmit={this.onSubmit}>
                            <AuthErrors errors={this.state.errors}/>
                            <FormInput hasError={!!this.state.errors.email} name="Email" type="text" label="Email"/>
                            <FormInput hasError={!!this.state.errors.password} name="Password" type="password"
                                       label="Password"/>
                            <div class="col-md-6 text-right">
                                <button type="submit" className="btn btn-default">Login</button>
                                <a className="btn btn-default" style={{margin:5}} href="/create-account">Create
                                    Account</a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
});