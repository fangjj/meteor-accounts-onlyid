Accounts.oauth.registerService("onlyid");

if (Meteor.isClient) {
  const loginWithOnlyID = function (options, callback) {
    // support a callback without options
    if (! callback && typeof options === "function") {
      callback = options;
      options = null;
    }

    var credentialRequestCompleteCallback =
          Accounts.oauth.credentialRequestCompleteHandler(callback);
    OnlyID.requestCredential(options, credentialRequestCompleteCallback);
  };
  Accounts.registerClientLoginFunction('onlyid', loginWithOnlyID);
  Meteor.loginWithOnlyID = function () {
    return Accounts.applyLoginFunction('onlyid', arguments);
  };
} else {
  Accounts.addAutopublishFields({
    // publish all fields including access token, which can legitimately be used
    // from the client (if transmitted over ssl or on localhost).
    forLoggedInUser: ['services.onlyid']
  });
}
