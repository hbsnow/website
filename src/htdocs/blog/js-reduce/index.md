---
title: reduce の使いどころ
tags: JavaScript
description: JavaScript の reduce の使いどころ。
datePublished: 2019-07-22
---

JavaScript の `reduce` は便利だけれども、普段使いで別言語をやっていたりすると少し使いどころがわかりにくいらしい。

[MDN にわかりやすいサンプル](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce)もあるんだけど、自分の整理もかねてこのブログでもまとめておくことにします。

## 配列の合計を計算する

とてもよくある例としてありがちなのが合計値の計算。

```js
;[3, 7, 1, 2].reduce((accumulator, currentValue) => accumulator + currentValue) // => 13
```

ただこういった単純な一次配列をただ合計することもできるし、

```js
const cart = [
  { itemId: 1, quantity: 3 },
  { itemId: 2, quantity: 2 },
  { itemId: 3, quantity: 1 },
]

const totalAmount = cart.reduce((accumulator, item) => {
  return accumulator + item.quantity
}, 0)

console.log(totalAmount) // => 6
```

このようなオブジェクトの総数を数えることもできる。

## 集計する

合計でつかうというよりも、こっちの用途で使うことが多くて、`group by` のような集計を取りたいときに便利。

```js
const items = [
  { amount: 500, taxRate: 8 },
  { amount: 1000, taxRate: 8 },
  { amount: 1200, taxRate: 10 },
  { amount: 0, taxRate: 0 },
]
```

こんな配列から `taxRate` ごとに集計をとりたくなったときには、以下のように `reduce` を使うとうまく記述できる。

```js
const groupByTaxRate = (items) => {
  const taxes = items.reduce((accumulator, item) => {
    const key = item.taxRate
    accumulator[key] = !accumulator[key]
      ? item.amount
      : accumulator[key] + item.amount

    return accumulator
  }, {})

  return Object.keys(taxes).map((taxKey) => ({
    taxRate: parseInt(taxKey),
    amount: taxes[taxKey],
  }))
}
```

`groupByTaxRate(items)` の出力結果は以下の通り。

```js
[
  { taxRate: 0, amount: 0 },
  { taxRate: 8, amount: 1500 },
  { taxRate: 10, amount: 1200 },
]
```
 