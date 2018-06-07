Package.describe({
  name: 'laosb:accounts-onlyid',
  summary: 'Login service for OnlyID.net accounts',
  version: '1.0.1'
});

Package.onUse(function (api) {
  api.versionsFrom('METEOR@0.9.0');
  api.use(['ecmascript@0.11.0', 'underscore', 'random']);
  api.use('accounts-base', ['client', 'server']);
  // Export Accounts (etc) to packages using this one.
  api.imply('accounts-base', ['client', 'server']);

  api.use('accounts-oauth', ['client', 'server']);
  api.use('laosb:onlyid-oauth@1.0.0');
  api.imply('laosb:onlyid-oauth');

  api.addFiles('onlyid.js');
});
