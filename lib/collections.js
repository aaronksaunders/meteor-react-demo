// Define a collection to hold our tasks
Sessions = new Mongo.Collection("sessions", {
    transform: function (doc) {
        doc.usersObj = Meteor.users.findOne({
            _id: doc.student_id
        });
        return doc;
    }
});
Tutors = new Mongo.Collection("tutors");
