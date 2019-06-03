---
title: SQL 文逆引き
tags: mysql, postgresql
description: SQL 文逆引き一覧。
datePublished: 2019-06-01
---

## DB の作成

```sql
create database DB_NAME;
```

## DB の削除

```sql
drop database DB_NAME;
```

## テーブルの作成

```sql
create table TABLE_NAME
(
  id         integer      not null,
  name       varchar(255) not null,
  created_at date         ,
  primary key (id)
);
```

## テーブルの削除

```sql
drop table
```

## テーブルのリネーム

```sql
/* MySQL */
rename table BEFORE_TABLE_NAME to AFTER_TABLE_NAME;

/* PostgreSQL */
alter table BEFORE_TABLE_NAME rename AFTER_TABLE_NAME;
```

## カラムの追加

```sql
alter table TABLE_NAME add column slug varchar(255) not null;
```

## カラムの削除

```sql
alter table TABLE_NAME drop column slug;
```

## トランザクション

```sql
/* MySQL */
start transaction;
-- ここに処理
commit;

/* PostgreSQL */
begin transaction;
-- ここに処理
commit;
```

## 重複の除外

```sql
select distinct category from TABLE_NAME;
```

## レコードのカウント

```sql
-- 重複とNULLの除外
select count(distinct category) from TABLE_NAME;
```
