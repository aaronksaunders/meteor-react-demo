/**
 *
 */
SessionList = React.createClass({
    propTypes: {
        user: React.PropTypes.object,
    },

    mixins: [ReactMeteorData],

    getInitialState() {
        return {
            user : this.props.user
        }
    },

    getMeteorData() {

        return {
            sessions: Sessions.find({}, {sort: {createdAt: -1}}).fetch(),
        };
    },

    componentWillReceiveProps: function(nextProps) {
        this.setState({
            user: nextProps.user
        });
    },

    componentDidMount() {
        console.log("mounted");
    },
    renderSessions() {
        // Get tasks from this.data.tasks
        return this.data.sessions.map((_session) => {
            const currentUserId = this.props.user && this.props.user._id;

            return <Session
                key={_session._id}
                session={_session}/>;
        });
    },


    render() {
        return (
            <div className="container">
                <table className="table">
                    <tbody>
                    { this.props.user && this.renderSessions() }
                    </tbody>
                </table>
            </div>
        )
    }
});