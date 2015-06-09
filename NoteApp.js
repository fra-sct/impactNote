// NoteApp.js
Notes = new Mongo.Collection("notes");

// Routes '/' to the Home/create note page
Router.route('/', function () {
  this.render('Home');
});

// Routes '/notes' to the show all notes page
Router.route('/notes', function () {
  this.render('note_show_all');
});
