// NoteApp.js
Notes = new Mongo.Collection("notes");

// Routing follows
// Routes '/' to the Home/create note page
Router.route('/', function () {
  this.render('Home');
});

// An archive of the last public notes
Router.route('/archive', function () {
  this.render('Archive');
});

// View one note
Router.route('/note/:_id', function () {
  var note = Notes.findOne({
    _id: this.params._id
  });
  if(!note)
    this.render('error_404');
  else
    this.render('note_show', { data: note });
});
