Template.note_create.events({
  "submit .new-note": function (event) {
    var title = event.target.title.value;
    var text = event.target.text.value;
    // note creation/insertion in the db
    Notes.insert({
      title: title,
      text: text,
      creationDate: Date()
    });
    // clear the form
    event.target.title.value = "";
    event.target.text.value = "";
    // to avoid default submitting
    return false;
  }
});
