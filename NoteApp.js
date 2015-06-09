// NoteApp.js
Notes = new Mongo.Collection("notes");

// Routes '/' to the Home/create note page
Router.route('/', function () {
  this.render('Home');
});

// All the notes in one page
Router.route('/notes', function () {
  this.render('note_show_all');
});

// Routes '/note/:id' to the show_note page
//TODO: return a 404 error if cannot find the note
Router.route('/note/:_id', function () {
  var note = Notes.findOne({
    _id: this.params._id
  });
  if(!note)
    this.render('error_404');
  else
    this.render('note_show', { data: note });
});
