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

//
// METHODS TO WORK WITH THE SERVER OBJECTS
//
Meteor.methods({
    /**
     *
     * @param _userData
     * @returns {*|any}
     */
    updateUser : function(_userData) {
        return Meteor.users.update({_id: this.userId}, {
            $set: _userData
        });
    }
});