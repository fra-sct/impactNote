Template.body.helpers({
  notes: function () {
    // right now, I return every single note in the db,
    // without any filtering whatsoever
    // TODO: when adding users, filter to show only own
    //  notes, or public notes
    return Notes.find({});
  }
});

Template.note_create.events({
  "submit .new-note": function (event) {
    var title = event.target.title.value;
    var text = event.target.text.value;
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

Template.note.events({
  "click .delete": function () {
    // TODO: ask for confirmation on note removal
    Notes.remove(this._id);
  }
});
