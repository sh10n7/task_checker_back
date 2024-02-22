# task_checker_back
 
## 概要
タスクの進捗管理アプリ([task_checker_test](https://github.com/sh10n7/task_checker_test))のサーバーリポジトリです。

## Project setup
### ①postgreSQLをダウンロード
postgresql@14の導入を実施(既にpostgrelSQLの導入済みの場合は、ステップ②へ）

### ②データベースの作成
ターミナルでpostgresqlに接続し、ロール/データベース作成を行う。
```
// デフォルトロール(postgres)でpostgresqlに入る
% psql postgres

// ロールの作成
# CREATE ROLE ロール名 WITH LOGIN PASSWORD 'パスワード';

// 先ほど作成したロールが表示されるか確認。
# \du;

// 作成したロールにデータベース作成の権限を付与
# ALTER USER ロール名 CREATEDB;

// データベースの作成
# CREATE　DATABASE データベース名 WITH LOGIN OWNER 'パスワード';
```

### ③.envファイルを作成し、以下の記述を追記
```
DATABASE_URL="postgresql://作成用意したロール名:ロールのパスワード@localhost:5432/データベース名"
```

### ④データベース作成・マイグレーションの実施
```
npx prisma migrate reset
```

### ⑤アプリの起動
```
% node index.js
```
