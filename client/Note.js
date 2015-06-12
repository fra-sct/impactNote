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
    var title = $("input[name=title]").val();
    var text = $("textarea[name=text]").val();
    var isPublic = $("input[name=public]").prop("checked");
    Meteor.call('updateNote', this._id,
      title, text, isPublic, function (error, result) {
      if (error) {
        console.log(error.reason);
      } else {
        if (result) {
          template.editing.set(false);
        } else {
          // TODO: return better feedback to the user
          console.log("Couldn't update the note.");
        }
      }
    });
  }
});

Template.Note.helpers({
  "editing": function () {
    return Template.instance().editing.get();
  },
  "can_edit": function () {
    var currentUserId = Meteor.userId();
    return currentUserId && currentUserId == this.user;
  }
})

Template.note_edit.helpers({
  "is_public": function () {
    return this.public ? "checked" : "";
  }
})
