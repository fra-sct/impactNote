// NoteApp.js
Notes = new Mongo.Collection("notes");

// Routing follows
// Routes '/' to the Home/create note page
Router.route('/', function () {
  this.layout("Layout");
  this.render('Home');
}, {
  name: 'home'
});

// An archive of the last public notes
Router.route('/archive', function () {
  this.layout("Layout");
  this.render('Archive');
}, {
  name: 'note.show_archive'
});

// View one note
Router.route('/note/:_id', function () {
  this.layout("Layout");
  var note = Notes.findOne({
    _id: this.params._id
  });
  if(!note) {
    this.render('error_404');
  } else {
    var comments = note.comments.sort(function (a, b) {
      return moment(a.createdAt) < moment(b.createdAt);
    });
    if (note.user) {
      var user = Meteor.users.findOne({
        _id: note.user
      }).profile;
    } else {
      var user = null;
    }
    // TODO: just pass note: note, and render it in
    // Note.html with a {{#with note}}
    this.render('Note', {
      data: {
        note: note,
        user: user,
        comments: comments
        }
      });
  }
}, {
  name: 'note.show'
});

// View user
Router.route('/user/:nick', function () {
  this.layout("Layout");
  var user = Meteor.users.findOne({
    'profile.nickname': this.params.nick
  });
  if (!user) {
    this.render('error_404');
  } else {
    var user_notes = Notes.find({
      user: user._id
    });
    this.render('User', {
      data: {
        profile: user.profile,
        notes: user_notes
        }
    });
  }
}, {
  name: 'user.show'
});
