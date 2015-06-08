// NoteApp.js
Notes = new Mongo.Collection("notes");

if (Meteor.isClient) {
  Template.body.helpers({
    notes: function () {
      // right now, I return every single note in the db,
      // without any filtering whatsoever
      // TODO: when adding users, filter to show only own
      //  notes, or public notes
      return Notes.find({});
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
