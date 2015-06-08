if (Meteor.isClient) {
  Template.body.helpers({
    notes: [
      { text: "Note 1" },
      { text: "Note 2" },
      { text: "Note 3" }
    ]
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
