Template.Note.events({
  "click .delete": function () {
    // TODO: ask for confirmation on note removal
    Meteor.call('deleteNote', this._id, function (error, result) {
      if (error) {
        console.log(error.reason);
      } else {
        if (result)
          Router.go('home');
      }
    });
  },
  "click .edit": function () {
    // TODO: code goes here
    console.log("Button edit pressed")
  }
});