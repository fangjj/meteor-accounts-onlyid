OAuth.registerService("onlyid", 2, null, function (query) {
  var response = getTokens(query);
  var accessToken = response.accessToken;
  var identity = getIdentity(accessToken);

  var serviceData = {
    accessToken: OAuth.sealSecret(accessToken),
    expiresAt: (+new Date) + (1000 * response.expiresIn)
  };

  _.extend(serviceData, identity);

  // only set the token in serviceData if it's there. this ensures
  // that we don't lose old ones (since we only get this on the first
  // log in attempt)
  if (response.refreshToken)
    serviceData.refreshToken = OAuth.sealSecret(response.refreshToken);

  return {
    serviceData: serviceData,
    options: {profile: {name: 'Mobile User ' + serviceData.mobile.slice(-4)}}
    // Mobile is something private.
  };
});

// returns an object containing:
// - accessToken
// - expiresIn: lifetime of token in seconds
// - refreshToken, if this is the first authorization request and we got a
//   refresh token from the server
var getTokens = function (query) {
  var config = ServiceConfiguration.configurations.findOne({
    service: 'onlyid'
  });
  if (!config)
    throw new ServiceConfiguration.ConfigError();

  var response;
  try {
    response = HTTP.post(
      OnlyID._server + "/token", {
        params: {
          grant_type: "authorization_code",
          code: query.code,
          client_id: config.clientId,
          client_secret: OAuth.openSecret(config.secret),
          redirect_uri: OAuth._redirectUri('onlyid', config)
        }
      }
    );
  } catch (err) {
    throw _.extend(
      new Error(
        "Failed to complete OAuth handshake with OnlyID.net accounts. "
          + err.message
      ),
      {response: err.response}
    );
  }

  if (! response.data || response.data.error) {
    // if the http response was a json object with an error attribute
    throw new Error(
      "Failed to complete OAuth handshake with OnlyID.net accounts. " +
        (response.data ? response.data.error :
         "No response data")
    );
  } else {
    return {
      accessToken: response.data.access_token,
      refreshToken: response.data.refresh_token,
      expiresIn: response.data.expires_in
    };
  }
};

var getIdentity = function (accessToken) {
  try {
    return HTTP.get(OnlyID._server + "/user?access_token=" + accessToken).data;
  } catch (err) {
    throw _.extend(
      new Error("Failed to fetch identity from OnlyID.net accounts. " +
                err.message),
      {response: err.response}
    );
  }
};

OnlyID.retrieveCredential = function (credentialToken,
                                                       credentialSecret) {
  return OAuth.retrieveCredential(credentialToken, credentialSecret);
};
