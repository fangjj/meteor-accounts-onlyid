// Request OnlyID.net account credentials for the user
// @param credentialRequestCompleteCallback {Function} Callback function to call on
//   completion. Takes one argument, credentialToken on success, or Error on
//   error.
var requestCredential = function (options, credentialRequestCompleteCallback) {
  // support a callback without options
  if (! credentialRequestCompleteCallback && typeof options === "function") {
    credentialRequestCompleteCallback = options;
    options = null;
  }

  var config = ServiceConfiguration.configurations.findOne({
    service: 'onlyid'
  });
  if (!config) {
    credentialRequestCompleteCallback &&
      credentialRequestCompleteCallback(new ServiceConfiguration.ConfigError());
    return;
  }

  var credentialToken = Random.secret();

  var loginStyle = OAuth._loginStyle('onlyid', config, options);

  var loginUrl =
        OnlyID._server +
        "/authorize?" +
        "state=" + OAuth._stateParam(loginStyle, credentialToken, options && options.redirectUrl) +
        "&response_type=code&" +
        "client_id=" + config.clientId;

  loginUrl += "&redirect_uri=" + OAuth._redirectUri('onlyid', config);

  OAuth.launchLogin({
    loginService: "onlyid",
    loginStyle: loginStyle,
    loginUrl: loginUrl,
    credentialRequestCompleteCallback: credentialRequestCompleteCallback,
    credentialToken: credentialToken,
    popupOptions: {width: 470, height: 490}
  });
};

OnlyID.requestCredential = requestCredential;
