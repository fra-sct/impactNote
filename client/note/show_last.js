Template.note_show_last.helpers({
  notes: function () {
    // right now, I return every single note in the db,
    // without any filtering whatsoever
    // TODO: when adding users, filter to show only own
    //  notes, or public notes
    return Notes.find({
      }, {
        sort: {creationDate: -1},
        limit: 10,
      }).map( function (item) {
        var title =
          'title' in item && item.title.length > 0
          ? item.title
          : item.text.slice(0, 50);
        return { 'title': title };
      });
  }
});
