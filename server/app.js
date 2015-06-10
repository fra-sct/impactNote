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
    Notes.insert({
      title: title,
      text: text,
      createdAt: moment(),
      owner: [currentUserId],
      public: isPublic
    });
  },
  'deleteNote': function (id) {
    //insert code here
  }
});

Meteor.startup(function () {
  // code to run on server at startup
});
