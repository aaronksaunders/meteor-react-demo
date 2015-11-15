Home = React.createClass({
    // This mixin makes the getMeteorData method work
    mixins: [ReactMeteorData],

    getInitialState() {
        return {}
    },

    getMeteorData() {

        return {
            sessions: Sessions.find({}, {sort: {createdAt: -1}}).fetch(),
            currentUser: Meteor.user()
        };
    },

    renderSessions() {
        // Get tasks from this.data.tasks
        return this.data.sessions.map((_session) => {
            const currentUserId = this.data.currentUser && this.data.currentUser._id;

            return <Session
                key={_session._id}
                session={_session}/>;
        });
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
                <div className="container">
                    <table className="table">
                        <tbody>
                        { Meteor.userId && this.renderSessions() }
                        </tbody>
                    </table>
                </div>
            </div>

        )
    }
});