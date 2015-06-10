Meteor.publish('notesList', function () {
  var currentUserId = this.userId;
  return Notes.find({
    $or: [
      { "public": true },
      { "owner": { $in: [null, currentUserId] } }
    ]
  });
});

Meteor.methods({
  'createNote': function (title, text, isPublic) {
    var currentUserId = Meteor.userId();
    var noteId = new Mongo.Collection.ObjectID()._str;
    Notes.insert({
      _id: noteId,
      title: title,
      text: text,
      createdAt: moment(),
      owner: [currentUserId],
      public: isPublic
    });
    return noteId;
  },
  'deleteNote': function (id) {
    var currentUserId = Meteor.userId();
    // an anonymous (not logged-in) user can only create notes
    if (!currentUserId)
      return false;
    // delete the note - but only if the current user is an owner
    Notes.remove({
      _id: id,
      owner: { $in: [currentUserId] }
    });
    return true;
  }
});

Meteor.startup(function () {
  // code to run on server at startup
});
