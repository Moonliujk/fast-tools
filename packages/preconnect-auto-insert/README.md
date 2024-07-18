# @fast-tools/preconnect-auto-insert

---

![version icon](https://img.shields.io/badge/version-v1.0.3-brightgreen) ![webpack plugin](https://img.shields.io/badge/webpack_5_plugin-8A2BE2)

A very tiny webpack plugin which can insert preconnect & dns-prefetch link tags automatically into your html head tag, improving your website first screen loading speed. If you want to know more about how it works, [see this page](https://web.dev/articles/preconnect-and-dns-prefetch)

See [website](https://github.com/Moonliujk/fast-tools) for more information or the [issues](https://github.com/Moonliujk/fast-tools/issues) associated with this package.

## Install

---

Using npm:

```
npm install --save-dev @fast-tools/preconnect-auto-insert
```

or using yarn:

```
yarn add --dev @fast-tools/preconnect-auto-insert
```

## Basic Usage

---

Include the following in your webpack config:

```js
const { PreconnectTools } = require('@fast-tool/preconnect-auto-insert');

module.exports = {
  plugins: [
    /*
    Basically, it doesn't need an optional hash param, because the plugin will analysis all domains that will be used in the first screen and insert the link tags at the head tag to ensure it can work.
    But if you want, you can add domain (as a string or a domain array) that you want insert or ignore.
    */
    new PreconnectTools({
      customDomains: '', // some domains you want to add
      ignoreDomains: '' // some domains you want to ignore
    })
  ]
};
```

## Options

---

You can pass a hash of configuration options to `preconnect-auto-insert`.
Allowed values are as follows:

| name          | type               | default | description                     |
| ------------- | ------------------ | ------- | ------------------------------- |
| customDomains | string \| string[] | ''      | domains that you want to add    |
| ignoreDomains | string \| string[] | ''      | domains that you want to ignore |
