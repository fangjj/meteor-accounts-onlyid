Package.describe({
  summary: 'Login service for OnlyID.net accounts',
  version: '1.0.0'
});

Package.onUse(function (api) {
  api.use(['ecmascript', 'underscore', 'random']);
  api.use('accounts-base', ['client', 'server']);
  // Export Accounts (etc) to packages using this one.
  api.imply('accounts-base', ['client', 'server']);

  api.use('accounts-oauth', ['client', 'server']);
  api.use('laosb:onlyid-oauth');
  api.imply('laosb:onlyid-oauth');

  api.addFiles('onlyid.js');
});
