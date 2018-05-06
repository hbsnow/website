---
title: semantic-release による npm publish と ChangeLog の自動化
tags: postcss, sass
description: semantic-releaseでnpm publishとChangeLogの生成を自動化する。
datePublished: 2017-09-03
dateModifer:  2018-05-05
---

npm にパッケージの公開、あるいはその更新をするとき、`npm publish` 日常的に使用することがないので、手順であったり、そもそも手順どころか `npm publish` すること自体忘れるということがあります。ここではこの自動化に [semantic-release](https://www.npmjs.com/package/semantic-release) を使った方法を紹介します。単にリリースする以外にも ChangeLog の出力だったり Tag をつけてくれたりといったことも自動化してくれます。

## 環境設定

```bash
npm install -g semantic-release-cli
semantic-release-cli setup
```

設定は [semantic-release-cli](https://www.npmjs.com/package/semantic-release-cli) によって、インタラクティブに作成することができます。環境の設定以外にも、すでに package.json のあるプロジェクトに必要な `script` の記述の追加や、.travis.yml の生成しもてくれます。

## 使い方

バージョンを自動であげるには、コミットログの形式が [AngularJS Commit Message Conventions](https://docs.google.com/document/d/1QrDFcIiPjSLDn3EL15IJygNPiHORgU1_OOAqWjiDU5Y/edit#heading=h.4e0o8t4fffjf) であり、デフォルトの設定では以下の `<Type>` である必要あります。

| Type | Release type     |
| ---- | ---------------- |
| fix  | Patch Release    |
| feat | Feature Release  |
| perf | Breaking Release |
