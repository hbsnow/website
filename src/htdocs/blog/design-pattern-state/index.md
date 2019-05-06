---
title: デザインパターンの学習メモ「State パターン」
tags: Design pattern
description: GoFのデザインパターンのうちの一つである「State パターン」についての学習メモ。
datePublished: 2019-05-05
---

GoF のデザインパターンのうちの一つ、State パターンについて PHP のサンプルコードを交えて学習していきます。

State パターンは、[Wikipedia では以下のように解説](https://ja.wikipedia.org/wiki/State_パターン)されています。

> このパターンはオブジェクトの状態（state）を表現するために用いられる。ランタイムでそのタイプを部分的に変化させるオブジェクトを扱うクリーンな手段となる。

この説明ではなにもわからないので、サンプルコードを用いながら考えていきます。

## State パターンを使用しない例

アクションRPGにおけるキャラクターの状態変化をサンプルとして用います。

```php
<?php
declare(strict_types=1);

class Hero
{
    const WAIT = 0;
    const WALK = 1;
    const FIGHT = 2;

    public $state = self::WAIT;

    public function wait(): string
    {
        switch ($this->state) {
            case self::WAIT:
                return '休憩';
            case self::WALK:
                $this->state = self::WAIT;
                return '待機';
            case self::FIGHT:
                $this->state = self::WAIT;
                return '待機';
        }
    }

    public function walk(): string
    {
        switch ($this->state) {
            case self::WAIT:
                $this->state = self::WALK;
                return '歩く';
            case self::WALK:
                return '走る';
            case self::FIGHT:
                $this->state = self::WALK;
                return '逃げる';
        }
    }

    public function fight(): string
    {
        switch ($this->state) {
            case self::WAIT:
                $this->state = self::FIGHT;
                return '攻撃';
            case self::WALK:
                $this->state = self::FIGHT;
                return '攻撃';
            case self::FIGHT:
                return '連撃';
        }
    }
}

$hero = new Hero();
echo <<< EOT
{$hero->walk()}
{$hero->walk()}
{$hero->wait()}
{$hero->fight()}
{$hero->fight()}
{$hero->walk()}
{$hero->wait()}
{$hero->wait()}
EOT;
```

仕様変更で Hero に防御の行動が追加されたらどうなるかを考えると、このコードは開放/閉鎖原則に違反していることがわかります。

## State パターンを使用する例

```php
<?php
declare(strict_types=1);

interface StateInterface
{
    public function wait(): string;
    public function walk(): string;
    public function fight(): string;
}

class Hero
{
    public $waitState;
    public $walkState;
    public $fightState;

    public $state;

    public function __construct()
    {
        $this->waitState = new WaitState($this);
        $this->walkState = new WalkState($this);
        $this->fightState = new FightState($this);

        $this->state = $this->waitState;
    }

    public function wait(): string
    {
        return $this->state->wait();
    }

    public function walk(): string
    {
        return $this->state->walk();
    }

    public function fight(): string
    {
        return $this->state->fight();
    }
}

class WaitState implements StateInterface
{
    public $hero;

    public function __construct(Hero $hero)
    {
        $this->hero = $hero;
    }

    public function wait(): string
    {
        return '休憩';
    }

    public function walk(): string
    {
        $this->hero->state = $this->hero->walkState;
        return '歩く';
    }

    public function fight(): string
    {
        $this->hero->state = $this->hero->fightState;
        return '攻撃';
    }
}

class WalkState implements StateInterface
{
    private $hero;

    public function __construct(Hero $hero)
    {
        $this->hero = $hero;
    }

    public function wait(): string
    {
        $this->hero->state = $this->hero->waitState;
        return '待機';
    }

    public function walk(): string
    {
        return '走る';
    }

    public function fight(): string
    {
        $this->hero->state = $this->hero->fightState;
        return '攻撃';
    }
}

class FightState implements StateInterface
{
    private $hero;

    public function __construct(Hero $hero)
    {
        $this->hero = $hero;
    }

    public function wait(): string
    {
        $this->hero->state = $this->hero->waitState;
        return '待機';
    }

    public function walk(): string
    {
        $this->hero->state = $this->hero->walkState;
        return '逃げる';
    }

    public function fight(): string
    {
        return '連撃';
    }
}

$hero = new Hero();

echo <<< EOT
{$hero->walk()}
{$hero->walk()}
{$hero->wait()}
{$hero->fight()}
{$hero->fight()}
{$hero->walk()}
{$hero->wait()}
{$hero->wait()}
EOT;
```

State パターンを使用すると開放/閉鎖原則に違反のないコードになっていることがわかります。
