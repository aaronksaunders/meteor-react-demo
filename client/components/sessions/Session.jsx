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

    togglePrivate() {
        //  Meteor.call("setPrivate", this.props.session._id, ! this.props.session.private);
    },

    render() {
        // Give tasks a different className when they are checked off,
        // so that we can style them nicely in CSS
        // Add "checked" and/or "private" to the className when needed
        // const sessionClassName = (this.props.session.checked ? "checked" : "") + " " +
        //     (this.props.session.private ? "private" : "");
        const sessionClassName = "";

        return (
            <li className={sessionClassName}>
                <button className="delete" onClick={this.deleteThisTask}>
                    &times;
                </button>

                <input
                    type="checkbox"
                    readOnly={true}
                    checked={this.props.session.checked}
                    onClick={this.toggleChecked}
                />

                <span className="text">
                    <strong>{this.props.session.name}</strong>: {this.props.session.description}
                </span>
            </li>
        );
    }
});
