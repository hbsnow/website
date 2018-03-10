---
title: AMP で必要となる JSON-LD による構造化データ
tags: amp
description: JSON-LD による構造化データの記述方法についての解説。
---

Google では構造化データを [JSON-LD で記述することを推奨](https://developers.google.com/search/docs/guides/intro-structured-data#structured-data-format)しています。

そのため、ここでは AMP で必要になる JSON-LD による構造化データの記述方法についての簡単な説明をしていきます。

## JSON-LD

JSON-LD は、Linked Data を JSON で記述するための軽量シンタックスです。

### keywords

JSON-LD にはいくつかの keyword がありますが、ここで紹介しているのは AMP で必要になる keyword のみに限定しています。その他の keyword については[最新の JSON-LD の仕様書](https://json-ld.org/spec/latest/json-ld/#syntax-tokens-and-keywords) で確認してください。

#### `@context`

`@context` は JSON-LD 全体で使用される、省略名を定義するために使用します。例えば、下記の JSON-LD

```json
{
   "http://schema.org/name": "hbsnow",
}
```

これは次のように記述することができます。

```json
{
  "@context": {
    "name": "http://schema.org/name"
  },
  "name": "hbsnow"
}
```

ここでの `name` は term と呼ばれ、このように識別子を短い記法で表現することができるようになります。

また、次のように記述することもできます。

```json
{
  "@context": {
    "schema": "http://schema.org"
  },
  "schema:name": "hbsnow"
}
```

この例のように単純なものであれば、さらに簡略化して書くこともできます。

```json
{
  "@context": "http://schema.org",
  "name": "hbsnow"
}
```

#### `@id`

IRI や blank node identifier (`_:` ではじまる文字列) を用いて一意に識別するために使用します。

先ほどの例では hbsnow という人物が複数いた場合、それがどの hbsnow なのかがわかりません。

```json
{
  "@context": {
    "name": "http://schema.org/name"
  },
  "@id": "https://hbsnow.github.io",
  "name": "hbsnow"
}
```

この例ではサイトの URL を追加することで、人物を一意に特定しています。

#### `@type` 

node あるいは typed value の型を指定するときに使用します。

node 型は人物や場所、イベント、Webページなどの記述されているものの型を指定し、typed value 型は整数、浮動小数点数、または日付など、特定の値のデータ型を指定します。

hbsnow は私の名前ですから、次のように記述することになります。

```json
{
  "@context": {
    "name": "http://schema.org/name"
  },
  "@id": "https://example.com/hbsnow",
  "@type": "http://schema.org/Person",
  "name": "hbsnow"
}
```

## バリデーション

[Google 構造化テストツール](https://search.google.com/structured-data/testing-tool) では実際にサイトで利用するときにエラーがないかの確認をすることができます。

実際に AMP で JSON-LD を使用する場合には、いくつかの記述が必須となる項目があり、それらは公式の [Google Search のドキュメント](https://developers.google.com/search/docs/guides/)で確認することができます。

## AMP で使用する場合のサンプル

### ブログ記事

```json
{
  "@context": "http://schema.org",
  "@type": "http://schema.org/BlogPosting",
  "mainEntityOfPage": {
    "@type":"WebPage",
    "@id":"https://example.com/blog/"
  },
  "headline": "サンプル",
  "image": [
    "https://example.com/blog/example/assets/image@1x1.png",
    "https://example.com/blog/example/assets/image@4x3.png",
    "https://example.com/blog/example/assets/image@16x9.png"
  ],
  "publisher": {
     "@type": "Organization",
     "name": "My Sample Website",
     "logo": {
      "@type": "ImageObject",
      "url": "https://example.com/assets/logo.png",
      "height": 60,
      "width": 600
    }
  },
  "datePublished": "2017-11-12",
  "dateModified": "2017-11-21",
  "author": "hbsnow",
  "description": "サンプルページです。"
  }
}
```

`image` にはガイドラインが設けられていて、幅が `696px` 以上の `.jpg, .gif, .png` いずれかの画像である必要があります。最良の結果を得るには `width * height` の結果が `300000` 以下となる、縦横比 `16:9, 4:3, 1:1` の複数の高解像度画像を複数用意する必要があります。

`publisher` は `Organization` しか指定できません。よって個人ブログのような場合には `name` にサイト名、`logo` にはバナーなどを入れるしかありません。`logo` のサイズには[ガイドラインが設けられて](https://developers.google.com/search/docs/data-types/articles#logo-guidelines)いて、`600 * 60px` 以下の `.jpg, .gif, .png` いずれかの画像で、背景が白、あるいは明るい色である必要があります。また、ここに指定される画像はワードマークやロゴであって、アイコンではないことに注意が必要です。

`mainEntityOfPage, dateModified, description` は `recommended` であり必須ではありません。
