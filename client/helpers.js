Handlebars.registerHelper('fromNow', function (date) {
    return moment(date).fromNow();
});
