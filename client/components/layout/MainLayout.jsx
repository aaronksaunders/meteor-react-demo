MainFooter = React.createClass({
    render() {
        return (
            <div className="footer container">
                <div className="footer-content">

                </div>
                <div className="footer-footer">

                </div>
            </div>
        )
    }
});

MainHeader = React.createClass({
    mixins: [ReactMeteorData],
    getMeteorData() {
        return {
            currentUser: Meteor.user()
        }
    },
    handleLogout() {
        Meteor.logout();

        FlowRouter.go("/");
    },
    render() {
        let loginButton;
        let { currentUser } = this.data;

        if (currentUser) {
            loginButton = (
                <li><a href="#" onClick={this.handleLogout}>Logout</a></li>
            )
        } else {
            loginButton = (
                <li><a href="/login">Login</a></li>
            )
        }

        return (
            <nav className="navbar navbar-default">
                <div className="container">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse"
                                data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <a className="navbar-brand" href="#">React Meteor</a>
                    </div>

                    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                        <ul className="nav navbar-nav navbar-right">
                            <li><a href="/">Home</a></li>
                            <li><a href="/session">Session</a></li>
                            <li><a href="/assessments">Assessments</a></li>
                            <li><a href="/profile">Profile</a></li>
                            {loginButton}
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
});

MainLayout = React.createClass({
    render() {
        return (
            <div>
                {this.props.header}

                {this.props.content}

                {this.props.footer}
            </div>
        )
    }
});