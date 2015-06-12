Template.Note.created = function () {
  this.editing = new ReactiveVar(false);
}

Template.Note.events({
  "click .delete": function (event, template) {
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
  "click .edit": function (event, template) {
    template.editing.set(true);
  },
  "click .cancel": function (event, template) {
    template.editing.set(false);
  },
  "click .save": function (event, template) {
    console.log("Trying to save")
  }
});

Template.Note.helpers({
  "editing": function () {
    return Template.instance().editing.get();
  }
})

Template.note_edit.helpers({
  "is_public": function () {
    return this.public ? "checked" : "";
  }
})
