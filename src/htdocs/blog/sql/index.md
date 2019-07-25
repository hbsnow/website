---
title: SQL 文逆引き
tags: mysql, postgresql
description: SQL 文逆引き一覧。
datePublished: 2019-06-01
---

## DB の作成

```sql
CREATE DATABASE db_name;
```

## DB の削除

```sql
DROP DATABASE db_name;
```

## テーブルの作成

```sql
CREATE TABLE table_name
(
  id         integer      not null,
  name       varchar(255) not null,
  created_at date,
  primary key (id)
);
```

## テーブルの削除

```sql
DROP TABLE table_name;
```

## テーブルのリネーム

```sql
/* MySQL */
RENAME TABLE before_table_name TO after_table_name;

/* PostgreSQL */
ALTER TABLE before_table_name RENAME after_table_name;
```

## カラムの追加

```sql
ALTER TABLE table_name ADD column slug varchar(255) not null;
```

## カラムの削除

```sql
ALTER TABLE table_name DROP column slug;
```

## トランザクション

```sql
/* MySQL */
BEGIN;
-- ここに処理
COMMIT;

/* PostgreSQL */
BEGIN TRANSACTION;
-- ここに処理
COMMIT;
```

## 重複の除外

```sql
SELECT DISTINCT category FROM table_name;
```

## レコードのカウント

```sql
-- 重複とNULLの除外
SELECT count(DISTINCT category) FROM table_name;
```
