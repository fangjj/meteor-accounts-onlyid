OnlyID = {};

OnlyID._server = "https://oauth.onlyid.net";

// Options are:
//  - onlyIDServer: defaults to "https://oauth.onlyid.net"
OnlyID._config = function (options) {
  if (options.onlyIDServer) {
    OnlyID._server = options.onlyIDServer;
  }
};
