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
Meteor.publish('allUsersData', function () {
  return Meteor.users.find({}, {
    fields: { 'profile': 1 }
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
      public: isPublic,
      comments: []
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
  'updateNote': function (id, title, text, isPublic) {
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
        public: isPublic,
        modifiedAt: now
      }
    });
    // as per deleteNote method, but with nModified
    return result;
  },
  'createComment': function (noteId, text) {
    var currentUserId = Meteor.userId();
    var now = moment().format();
    var commentId = new Mongo.Collection.ObjectID()._str;
    var nickname = Meteor.users.findOne({ _id: currentUserId }).profile.nickname;
    // TODO: can anons comment? I think this code will not work in that case.
    var comment = {
      _id: commentId,
      text: text,
      createdAt: now,
      modifiedAt: now,
      user: currentUserId,
      nickname: nickname
    };
    // console.log("createComment", noteId);
    var result = Notes.update({
      _id: noteId,
    }, {
      $push: { comments: comment }
    });
    return result;
  },
  'updateComment': function (noteId, commentId, text) {
    var currentUserId = Meteor.userId();
    var now = moment().format();
    var result = Notes.update({
      _id: noteId,
      "comments._id": noteId,
      "comments.user": currentUserId
    }, {
      $set: {
        "comments.$.text": text,
        "comments.$.modifiedAt": now
      }
    });
    return result;
  }
});

Meteor.startup(function () {
  // code to run on server at startup
});
