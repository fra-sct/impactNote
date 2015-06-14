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
    this.render('Note', { data: note });
  }
}, {
  name: 'note.show'
});

// View user
Router.route('/user/:_id', function () {
  this.layout("Layout");
  var user = Meteor.users.findOne({
    _id: this.params._id
  });
  if (!user) {
    this.render('error_404');
  } else {
    var user_notes = Notes.find({
      user: this.params._id
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
