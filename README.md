# meteor-accounts-onlyid
OAuth accounts package for OnlyID.net.

## Usage

Install `service-configuration` first. Then add the code below:

```js
ServiceConfiguration.configurations.upsert(
  { service: 'onlyid' },
  { $set: {
    clientId: process.env.ONLYID_CLIENTID,
    secret: process.env.ONLYID_SECRET,
    loginStyle: 'popup' // Must specify.
  } }
)
```

Make sure you specify `ONLYID_CLIENTID` and `ONLYID_CLIENTID` when you run your app.

You'll also need to configure redirect URI on OnlyID.net management console. Set it to `https://my-app.com/_oauth/onlyid`.

> ProTip: If you didn't specify `loginStyle`, Meteor will add `?close` to the end of the redirect URI. OnlyID.net doesn't correctly compare URIs with question marks in it, so it will fail.

Thanks OnlyID.net for providing [¡Hola!](https://ihola.one) with free phone-based authorization service.

## License

MIT.
