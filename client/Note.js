Template.Note.created = function () {
  this.editing = new ReactiveVar(false);
  this.raw = new ReactiveVar(false);
}

Template.Note.events({
  "click .delete": function (event, template) {
    // TODO: ask for confirmation on note removal
    Meteor.call('deleteNote', this.note._id, function (error, result) {
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
  "click .show-raw": function (event, template) {
    template.raw.set(true);
  },
  "click .hide-raw": function (event, template) {
    template.raw.set(false);
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
    Meteor.call('updateNote', this.note._id,
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
  "raw": function () {
    return Template.instance().raw.get();
  },
  "can_edit": function () {
    var currentUserId = Meteor.userId();
    return currentUserId && currentUserId == this.note.user;
  }
})

Template.note_edit.helpers({
  "is_public": function () {
    return this.public ? "checked" : "";
  }
})

Template.comment_new.events({
  "submit .new-comment": function (event) {
    var text = event.target.text.value;
    var id = this.note._id;
    Meteor.call('createComment', id, text, function (error, result) {
      if (error) {
        console.log(error.reason);
      } else {
        // do nothing
      }
    });
    event.target.text.value = "";
    return false;
  }
})
