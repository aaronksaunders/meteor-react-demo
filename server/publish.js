
// Only publish sessions that are public or belong to the current user
Meteor.publish("sessions", function () {
    return Sessions.find({owner: this.userId});
});

// Only publish All tutors
Meteor.publish("tutors", function () {
    return Tutors.find();
});