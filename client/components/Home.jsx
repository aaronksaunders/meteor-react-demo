Home = React.createClass({
    // This mixin makes the getMeteorData method work
    mixins: [ReactMeteorData],

    getInitialState() {
        return {
            loggedIn : false
        }
    },

    getMeteorData() {
        return {
            currentUser : Meteor.user()
        }
    },

    componentDidMount() {
        console.log("mounted");
    },

    renderList () {
            return ( <SessionList user={this.data.currentUser}  ref={'sessionList'}/> );
    },

    render() {

        return (
            <div>
                <div className="jumbotron">
                    <div className="container">
                        <h1 className="text-center">This is the Home Component</h1>
                        <p className="text-center">The fun starts here</p>
                    </div>
                </div>

                { this.renderList() }

                <div className="container">
                    <a className="btn btn-default btn-lg pull-right" href="/create-session">Add New Session</a>
                </div>
            </div>
        )
    }
});