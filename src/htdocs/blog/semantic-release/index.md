---
title: semantic-release による npm publish と ChangeLog 出力の自動化
tags: npm
description: semantic-release で npm publish と ChangeLog の生成を自動化する。
datePublished: 2017-09-03
dateModified: 2018-06-25
---

npm にパッケージの公開、あるいはその更新をするとき、その手順であったり、そもそも手順どころか `npm publish` すること自体忘れるということがあります。ここではこの自動化に [semantic-release](https://www.npmjs.com/package/semantic-release) を使った方法を紹介します。

## 環境設定

```bash
npm install -g semantic-release-cli
semantic-release-cli setup
```

設定は [semantic-release-cli](https://www.npmjs.com/package/semantic-release-cli) によって、対話的に作成することができます。環境の設定以外にも、すでに package.json のあるプロジェクトに必要な `script` の記述の追加や、.travis.yml の生成しもてくれます。

また、単にリリースする以外にも ChangeLog の出力や Tag をつけてくれたりといったことも自動化してくれます。

## 使い方

バージョンを自動であげるには、コミットログの形式が [AngularJS Commit Message Conventions](https://github.com/angular/angular.js/blob/master/DEVELOPERS.md#type) であり、デフォルトの設定では以下の `<Type>` である必要があります。

| Type | Release type     |
| ---- | ---------------- |
| fix  | Patch Release    |
| feat | Feature Release  |
| perf | Breaking Release |

## Scoped Packages

公開するパッケージが [Scoped Packages](https://docs.npmjs.com/getting-started/scoped-packages) である場合、`access` が `public` である必要があるため、package.json に以下を追加してください。

```package.json
{
  ...
  "publishConfig": {
    "access": "public"
  }
}
```
