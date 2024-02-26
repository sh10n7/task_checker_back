# nodeの軽量版を使用
FROM node:lts-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# Prisma CLIを導入
RUN npm install -g prisma

EXPOSE 3000

# 起動コマンドを設定
# CMD ["node", "index.js"]

# データベースが起動するまで待機し、マイグレーションを実行し、サーバーを起動
# ["sh", "-c", "your-command-here"]の記述は、sh（シェル）を使って指定されたコマンドライン(your-command-here)を実行することを意味する。
# -cオプションは、シェルに次に続く文字列をコマンドとして実行するよう指示する記述。
# この形式を使用する主な目的は、一連のコマンドを1つのCMD命令内で連結して実行する必要がある場合に便利
CMD ["sh", "-c", "npx prisma migrate deploy && prisma db seed && node index.js"]