Template.note_show_all.helpers({
  notes: function () {
    // right now, I return every single note in the db,
    // without any filtering whatsoever
    // TODO: when adding users, filter to show only own
    //  notes, or public notes
    return Notes.find({
        public: true
      }, {
        sort: {creationDate: -1},
      });
  }
});
