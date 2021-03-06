Template.note_create.events({
  "submit .new-note": function (event) {
    var title = event.target.title.value;
    var text = event.target.text.value;
    var isPublic = event.target.public.checked;
    // note creation/insertion in the db
    Meteor.call('createNote', title, text, isPublic, function (error, result) {
      if (error) {
        console.log(error.reason);
      } else {
        // if there are no errors, then redirect to the note
        Router.go('note.show', { _id: result });
      }
    });
    // clear the form
    event.target.title.value = "";
    event.target.text.value = "";
    event.target.public.value = true;
    // to avoid default submitting
    return false;
  }
});

Template.note_show_last.helpers({
  notes: function () {
    return Notes.find({}, {
        sort: {createdAt: -1},
        limit: 10,
      }).map( function (item) {
        var date = moment(item.createdAt).fromNow();
        // I show either the title (if present) or the first
        // few characters of the text of the note.
        var title = item.title.length > 0
          ? item.title
          : item.text.slice(0, 50);
        return {
          '_id': item._id,
          'title': title,
          'date': date
          };
      });
  }
});
