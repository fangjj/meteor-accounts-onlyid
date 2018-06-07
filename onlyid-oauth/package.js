Package.describe({
  summary: 'OnlyID.net OAuth flow',
  version: '1.0.0'
});

Package.onUse(function (api) {
  api.use('oauth2', ['client', 'server']);
  api.use('oauth', ['client', 'server']);
  api.use('http', ['server']);
  api.use(['underscore', 'service-configuration'], ['client', 'server']);
  api.use('random', 'client');

  api.addFiles('onlyid_common.js');
  api.addFiles('onlyid_server.js', 'server');
  api.addFiles('onlyid_client.js', 'client');

  api.export('OnlyID');
});
