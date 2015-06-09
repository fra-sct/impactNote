Template.note_show_compact.events({
  "click .delete": function () {
    // TODO: ask for confirmation on note removal
    Notes.remove(this._id);
  }
});
