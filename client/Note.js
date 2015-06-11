Template.Note.events({
  "click .delete": function () {
    // TODO: ask for confirmation on note removal
    Meteor.call('deleteNote', this._id, function (error, result) {
      if (error) {
        console.log(error.reason);
      } else {
        if (result) {
          Router.go('home');
        } else {
          // TODO: return better feedback to the user
          console.log("Couldn't delete the note.");
        }
      }
    });
  },
  "click .edit": function () {
    Session.set("editing", this._id);
    console.log("Button edit pressed xoxo");
  }
});

Template.Note.helpers({
  "editing": function () {
    return Session.get("editing") == this._id;
  }
})

Template.note_edit.helpers({
  "is_public": function () {
    return this.public ? "checked" : "";
  }
})
