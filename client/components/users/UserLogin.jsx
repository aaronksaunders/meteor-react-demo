AuthErrors = React.createClass({
    propTypes: {
        errors: React.PropTypes.object
    },
    render() {
        if (this.props.errors) {
            return (
                <ul className="list-group">
                    {
                        _.values(this.props.errors).map((errorMessage) => {
                            return <li key={errorMessage}
                                       className="list-group-item alert alert-danger">{errorMessage}</li>;
                            })
                        }
                </ul>
            )
        }
    }
});


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
                    <div className="col-sm-6 col-sm-offset-3">
                        <h1>Login</h1>

                        <form onSubmit={this.onSubmit}>
                            <AuthErrors errors={this.state.errors}/>
                            <FormInput hasError={!!this.state.errors.email} name="Email" type="text" label="Email"/>
                            <FormInput hasError={!!this.state.errors.password} name="Password" type="password"
                                       label="Password"/>
                            <div class="col-md-6 text-right">
                                <input type="submit" className="btn btn-default"/>
                                <a className="btn btn-default" style={{margin:5}} href="/create-account">Create Account</a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
});