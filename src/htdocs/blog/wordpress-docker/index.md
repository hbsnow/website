---
title: Docker による Wordpress のローカル開発環境構築
tags: wordpress, docker
description: Docker で Wordpress のローカル開発環境を構築する。
datePublished: 2018-05-11
---

ここには Docker のインストールなどのごく初歩的な解説はありません。また、Wordpress の環境構築には Docker の他に [VCCW](https://github.com/vccw-team/vccw) という Vagrant を使用する Starter もよく知られているようだが、私自身は使用したことがないので、これらツールの比較についてはこのページで言及しない。

## とりあえず動かす

[Quick Start](https://docs.docker.com/compose/wordpress/) を参考に、起動するまで手順を進めます。日本語の翻訳もありますが、内容がかなり古いこともあるので英語版を推奨。

`docker-compose.yml` をコピーし、`docker-compose up -d` を入力するだけ。`docker-compose help up` でわかるが、`-d` で detached mode、バックグラウンドで実行している。

終了したい場合には、`docker-compose down` で終了。データベースを削除したい場合には `docker-compose down --volumes` とオプションをつける。

## ファイルの永続化

とりあえず動作させて、コードの開発だけを行うのであれば上記の `docker-compose.yml` でさほど困ることはないが、起動のたびに `wp-content` 内のデータが消えるのは開発環境として好ましいくないことも多い。

[volumes](https://docs.docker.com/compose/compose-file/#volumes) の項目を参考に、ホストとコンテナをマッピングする。

```docker.yml
volumes:
  - ./wp-content:/var/www/html/wp-content
```

上記の例では、`wp-content` ディレクトリをマッピングしている。

## WP-CLI

公式の指示通りにコマンドを入力。container 名は `docker ps` で取得できるので、適宜置き換えること。

```bash
docker run -it --rm \
    --volumes-from some-wordpress \
    --network container:some-wordpress \
    wordpress:cli user list
```

上記コマンドでインストール時に設定したユーザが表示されれば成功。

## phpMyAdmin

Wordpress と関係はなく必要性もあまり感じないのだが、なぜか一定数の需要があったりするので設定をメモしておく。基本的には不要。

```docker.yml
phpmyadmin:
  image: phpmyadmin/phpmyadmin
  restart: always
  ports:
    - 8080:80
  environment:
    PMA_HOST: db
    PMA_USER: wordpress
    PMA_PASSWORD: wordpress
```
