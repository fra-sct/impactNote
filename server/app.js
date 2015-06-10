Meteor.publish('notesList', function () {
  var currentUserId = this.userId;
  // An user (logged-in or not) can see only their own notes (anon if not
  // logged in) or any public notes.
  // This means that the public property is meaningles in anon notes.
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
    // I'm generating the note id by myself to be able of returning
    // it to the caller for redirection
    var noteId = new Mongo.Collection.ObjectID()._str;
    Notes.insert({
      _id: noteId,
      title: title,
      text: text,
      createdAt: moment(),
      modifiedAt: moment(),
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
  },
  'updateNote': function (id, title, text) {
    var currentUserId = Meteor.userId();
    // insert code here
  },
});

Meteor.startup(function () {
  // code to run on server at startup
});
