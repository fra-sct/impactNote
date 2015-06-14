Accounts.ui.config({
  requestPermissions: {},
  extraSignupFields: [{
    fieldName: 'nickname',
    fieldLabel: 'Nickname',
    inputType: 'text',
    visible: true,
    validate: function(value, errorFunction) {
      if (!value) {
        errorFunction("Please write a nickname.");
        return false;
      } else {
        return true;
      }
    }
    }
  ]
});
