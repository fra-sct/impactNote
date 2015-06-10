Template.note_show.events({
  "click .delete": function () {
    // TODO: ask for confirmation on note removal
    Meteor.call('deleteNote', this._id, function (error, result) {
      if (!error) {
        console.log(error.reason);
      } else {
        if (result)
          Router.go('home');
      }
    });
  }
});
