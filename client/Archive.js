Template.Archive.helpers({
  notes: function () {
    return Notes.find({}, {
        sort: {createdAt: -1},
      });
  }
});

Template.note_show_compact.events({
  "click .delete": function () {
    // TODO: ask for confirmation on note removal
    Notes.remove(this._id);
  }
});
