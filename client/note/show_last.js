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
        // title may be absent... no, title should not be
        // absent, it's just me who keeps on using an old
        // scheme where title was not present
        // TODO: meteor reset and remove
        //     'title' in item
        var date = moment(item.creationDate).fromNow();
        var title =
          'title' in item && item.title.length > 0
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
