// Task component - represents a single todo item
Session = React.createClass({
    propTypes: {
        session: React.PropTypes.object.isRequired,
    },

    toggleChecked() {
        // Set the checked property to the opposite of its current value
        // Meteor.call("setChecked", this.props.session._id, ! this.props.session.checked);
    },

    deleteThisTask() {
        //  Meteor.call("removeTask", this.props.session._id);
    },

    commentOnThisTask() {
        //  Meteor.call("setPrivate", this.props.session._id, ! this.props.session.private);
    },

    render() {
        // Give tasks a different className when they are checked off,
        // so that we can style them nicely in CSS
        // Add "checked" and/or "private" to the className when needed
        // const sessionClassName = (this.props.session.checked ? "checked" : "") + " " +
        //     (this.props.session.private ? "private" : "");
        const sessionClassName = "";

        let verticalAlignStyle = {"verticalAlign": "middle",'float': 'none'};
        let displayName = this.props.session.usersObj.profile.firstName + " " + this.props.session.usersObj.profile.lastName
        return (

            <tr>
                <td>
                    <div className="btn-group">
                        <button className="btn btn-default btn-lg"
                                onClick={this.deleteThisTask}>
                            <i className="fa fa-trash-o fa-lg"></i>
                        </button>
                        <button className="btn btn-default btn-lg"
                                onClick={this.commentOnThisTask}>
                            <i className="fa fa-pencil-square-o fa-lg"></i>
                        </button>
                    </div>
                </td>
                <td style={verticalAlignStyle}>
                    { displayName }
                </td>
                <td style={verticalAlignStyle}>
                    {this.props.session.title}
                </td>
                <td style={verticalAlignStyle}>
                    {this.props.session.description}
                </td>
            </tr >
        );
    }
});
