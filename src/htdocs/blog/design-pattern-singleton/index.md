---
title: デザインパターンの学習メモ「Singleton パターン」
tags: Design pattern
description: GoFのデザインパターンのうちの一つである「Singleton パターン」についての学習メモ。
datePublished: 2019-05-04
---

GoF のデザインパターンのうちの一つ、Singleton パターンについて PHP のサンプルコードを交えて学習していきます。

Singleton パターンは、[Wikipedia では以下のように解説](https://ja.wikipedia.org/wiki/Singleton_パターン)されています。

> Singleton パターンとは、そのクラスのインスタンスが 1 つしか生成されないことを保証するデザインパターンのことである。

これに加えてグローバルなアクセスポイントを提供するといった説明もされることが多いこのパターンはわかりやすく、便利なので覚えると何でもかんでもパターンに当てはめてしまいがちで、[Design Patterns 15 Years Later: An Interview with Erich Gamma, Richard Helm, and Ralph Johnson](http://www.informit.com/articles/article.aspx?p=1404056) のインタビューで、Erich Gamma はこのパターンについて以下のようなコメントを残しています。

> When discussing which patterns to drop, we found that we still love them all. (Not really—I'm in favor of dropping Singleton. Its use is almost always a design smell.)

またこのパターンはインスタンスの生成を管理してしまっていることで単一責任の原則、場合によってはリスコフの置換原則にも違反するため、このパターンを使用するのはよく考えてからにするべきだと思います。

## Singleton パターンの例

```php
<?php
class Singleton
{
    private static $instance = null;

    final private function __construct()
    {
    }

    public static function getInstance()
    {
        if (is_null(self::$instance)) {
            self::$instance = new static();
        }

        return self::$instance;
    }

    final function __clone()
    {
        throw new \Exception('シングルトンなので clone はできません。');
    }
}
```

PHP の場合にはあるリクエスト内でインスタンスが 1 つしか生成されないことを保証するものになるので、厳密に Singleton パターンと言えるのかどうかはわかりませんが、このような感じになるかと思います。

PHPUnit では以下の方法で他のテストの影響をうけることなくテストすることができるようです。

- [PHPUnit テストケースで書き換えた値を復帰する - Shin x blog](http://www.1x1.jp/blog/2012/02/phpunit_backup_and_restore_values.html)

またこの例をマルチスレッドの言語でそのままのアルゴリズムで利用すると問題が起こるので注意が必要になります。解決策としては Double-Checked Locking パターンがありますが、ここでは名前の紹介のみにとどめておきます。

## シングルトンについて

- [シングルトンの賢い使用法](https://www.ibm.com/developerworks/jp/webservices/library/co-single.html)
- [シングルトンパターンの誘惑に負けない | プログラマが知るべき97のこと](https://xn--97-273ae6a4irb6e2hsoiozc2g4b8082p.com/%E3%82%A8%E3%83%83%E3%82%BB%E3%82%A4/%E3%82%B7%E3%83%B3%E3%82%B0%E3%83%AB%E3%83%88%E3%83%B3%E3%83%91%E3%82%BF%E3%83%BC%E3%83%B3%E3%81%AE%E8%AA%98%E6%83%91%E3%81%AB%E8%B2%A0%E3%81%91%E3%81%AA%E3%81%84/)
