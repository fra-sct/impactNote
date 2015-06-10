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
      createdAt: Date(),
      owner: [currentUserId],
      public: isPublic
    });
  },
});

Meteor.startup(function () {
  // code to run on server at startup
});
