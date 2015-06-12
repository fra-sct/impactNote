Meteor.publish('notesList', function () {
  var currentUserId = this.userId;
  // An user (logged-in or not) can see only their own notes (anon if not
  // logged in) or any public notes.
  // This means that the public property is meaningles in anon notes.
  return Notes.find({
    $or: [
      { "public": true },
      { "user": { $in: [null, currentUserId] } }
    ]
  });
});

Meteor.methods({
  'createNote': function (title, text, isPublic) {
    var currentUserId = Meteor.userId();
    // I'm generating the note id by myself to be able of returning
    // it to the caller for redirection
    var noteId = new Mongo.Collection.ObjectID()._str;
    var now = moment().format();
    Notes.insert({
      _id: noteId,
      title: title,
      text: text,
      createdAt: now,
      modifiedAt: now,
      user: currentUserId,
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
    var result = Notes.remove({
      _id: id,
      user: { $in: [currentUserId] }
    });
    // result holds a WriteResult, of which nRemoved is a field
    return result;
  },
  'updateNote': function (id, title, text) {
    var currentUserId = Meteor.userId();
    var now = moment().format();
    // an anonymous user cannot edit anything
    if (!currentUserId){
      console.log("Anon attemped an edit - should be impossible");
      return false;
    }
    // updates the note
    var result = Notes.update({
      _id: id,
      user: { $in: [currentUserId] }
    }, {
      $set : {
        title: title,
        text: text,
        modifiedAt: now
      }
    });
    // as per deleteNote method, but with nModified
    return result;
  },
});

Meteor.startup(function () {
  // code to run on server at startup
});
