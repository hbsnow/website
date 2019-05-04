---
title: デザインパターンの学習メモ「Strategy パターン」
tags: Design pattern
description: GoFのデザインパターンのうちの一つである「Strategy パターン」についての学習メモ。
datePublished: 2018-09-27
dateModified: 2019-05-04
---

GoF のデザインパターンのうちの一つ、Strategy パターンについて PHP のサンプルコードを交えて学習していきます。

Strategy パターンは、[Wikipedia では以下のように解説](https://ja.wikipedia.org/wiki/Strategy_%E3%83%91%E3%82%BF%E3%83%BC%E3%83%B3)されています。

> Strategy パターンは、コンピュータープログラミングの領域において、アルゴリズムを実行時に選択することができるデザインパターンである。

この一文ではわかりにくいのですが、Strategy パターンの目的についての解説は比較的わかりやすいかもしれません。

> Strategy パターンは、アプリケーションで使用されるアルゴリズムを動的に切り替える必要がある際に有用である。Strategy パターンはアルゴリズムのセットを定義する方法を提供し、これらを交換可能にすることを目的としている。Strategy パターンにより、アルゴリズムを使用者から独立したまま様々に変化させることができるようになる。

実際に Strategy パターンがどういうものなのかを、サンプルコードを用いながら考えていきます。

## Strategy パターンを使用しない例

ゲームの敵をサンプルとして用います。

```php
<?php
declare(strict_types=1);

interface Walkable
{
    public function walk(): string;
}

interface Flyable
{
    public function fly(): string;
}

class Monster
{
}

class Slime extends Monster implements Walkable
{
    public function walk(): string
    {
        return 'ゆっくり歩く';
    }
}

class Goblin extends Monster implements Walkable
{
    public function walk(): string
    {
        return '歩く';
    }
}

class Dragon extends Monster implements Walkable, Flyable
{
    public function walk(): string
    {
        return '歩く';
    }

    public function fly(): string
    {
        return '飛ぶ';
    }
}

$Slime = new Slime();
$Goblin = new Goblin();
$Dragon = new Dragon();

echo <<< EOT
Slime
{$Slime->walk()}

Goblin
{$Goblin->walk()}

Dragon
{$Dragon->walk()}
{$Dragon->fly()}
EOT;
```

Monser という具象クラスがあって、それぞれのモンスター

- Slime (ゆっくり歩ける)
- Goblin (歩ける)
- Dragon (歩ける・飛べる)

は Monser クラスを継承しています。モンスターの行動「歩く」と「飛ぶ」についてはインターフェースを作成してそれぞれの継承先のクラスに実装しました。

問題はインターフェースが実装をもたないことから、Goblin と Dragon の「歩く」という同じコードの再利用ができていないために保守性が損なわれています。

## Strategy パターンを使用する例

```php
<?php
declare(strict_types=1);

interface WalkInterface
{
    public function walk();
}

class NormalWalk implements WalkInterface
{
    public function walk()
    {
        return "歩く";
    }
}

class SlowWalk implements WalkInterface
{
    public function walk()
    {
        return "ゆっくり歩く";
    }
}

interface FlyInterface
{
    public function fly();
}

class NormalFly implements FlyInterface
{
    public function fly()
    {
        return "飛ぶ";
    }
}

class NoFly implements FlyInterface
{
    public function fly()
    {
        // 飛べないので何もしない
    }
}

class Monster
{
    private $walkBehavior;
    private $flyBehavior;

    public function __construct(
        WalkInterface $walkBehavior,
        FlyInterface $flyBehavior
    ) {
        $this->walkBehavior = $walkBehavior;
        $this->flyBehavior = $flyBehavior;
    }

    public function walk()
    {
        return $this->walkBehavior->walk();
    }

    public function fly()
    {
        return $this->flyBehavior->fly();
    }
}

class Goblin extends Monster
{
}

class Slime extends Monster
{
}

class Dragon extends Monster
{
}

$normalWalk = new NormalWalk();
$slowWalk = new SlowWalk();
$normalFly = new NormalFly();
$noFly = new NoFly();

$Goblin = new Goblin($normalWalk, $noFly);
$Slime = new Slime($slowWalk, $noFly);
$Dragon = new Dragon($normalWalk, $normalFly);

echo <<< EOT
Slime
{$Slime->walk()}

Goblin
{$Goblin->walk()}

Dragon
{$Dragon->walk()}
{$Dragon->fly()}
EOT;
```

上記のサンプルでは「歩く」と「飛ぶ」の 2 つの振る舞いに対してプログラミングしています。そのため例えばドラゴンをゆっくり歩かせたくなった場合、 `new Dragon($normalWalk, $normalFly)` とインスタンスの生成部分にある `$normalWalk` を `$slowWalk` と交換することにより変更が可能です。

## 開放/閉鎖原則

このパターンについては Open-Closed Principle (開放/閉鎖原則) を知っているとより理解しやすいかもしれません。開放/閉鎖原則は理解しにくいのですが、下記の動画がとてもわかりやすいのでおすすめです。

- [「SOLID の原則ってどんなふうに使うの？オープン・クローズドの原則編 拡大版」　 後藤英宣](https://www.youtube.com/watch?v=cUV1nXPfjFY)
