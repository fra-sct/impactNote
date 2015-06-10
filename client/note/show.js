Template.note_show.events({
  "click .delete": function () {
    // TODO: ask for confirmation on note removal
    Meteor.call('deleteNote', this._id);
    Router.go("/");
  }
});
