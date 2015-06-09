Template.note_show.events({
  "click .delete": function () {
    // TODO: ask for confirmation on note removal
    Notes.remove(this._id);
    Router.go("/");
  }
});
