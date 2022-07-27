---
marp: true
theme: uncovert
_class: invert
---

# MSW

---

## FE のモックサーバーについて

- Rails とかつかってみたりとか
- Express で頑張ったりとか
- json-server
- json-graphql-server(GraphQl)
- ...

---

## msw について

- リクエストをサービスワーカーを使ってインターセプトするモックライブラリ
- フロントエンドのコードのみでモックサーバーを構築できる
- ネイティブで Typscript サポート

---

## 用途について

- 開発
  - フロントエンドのみで部分的にモックすることが可能
- デバッグ
  - ブラウザの developer tool でも確認できる
- テスト
  - 同じモックデータを流用または、一部を改変することもできる

---

## setup

セットアップについて説明

- init
  - worker ファイルを格納するためのディレクトリの設定
  ```
  npx msw init <ドキュメントルート>
  ```
  mockServiceWorker.js が配置される
  - public ディレクトリ

---

## ブラウザ

- setupWorker
  - ブラウザ上で動作させるためのセットアップ関数
  - worker インスタンスを返す
  - worker.start()でモック開始
  - start/stop
  - use 既存の worker への対してハンドラの追加
  - resetHandlers/restoreHandlers

---

## サーバー(NodeJS)

- setupServer
  - NodeJS で動作させるためのセットアップ関数
  - server インスタンスを返す
  - server.listen()でモック開始
  - listen/close
  - resetHandlers/restoreHandlers
  - localStorage などブラウザのみで動作する API に関してはモックできないので適切な polyfill を導入する必要がある

---

## モックについて

- Request hander
  - get/post/put/delete...
- Response resolver

```
rest.get("/api/users/:id", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ id: 1, hoge: "hoge", }))
})
```

---

##

- Response transformer

```
rest.get("/api/users/:id", (req, res, ctx) => {
  return res((res) => {
      res.status(200)
      res.json({ id: 1, hoge: "hoge", })
      return res;
  })
})
```

---

##

- matching
  - rest
    - "https://example.com/api/hogehoge"
    - "/users/\*"
    - "/users/:id"
    - /\/usrs\//

---

## Rest

Rest API のためのモックアップ

### メソッド

- get/post/put/patch/delete/options
- all
  指定エンドポイントへのリクエストをメソッドに関わらずモックできる

---

## GraphQL

GraphQL のためのモックアップ

- query
- mutation
- operation
- link

---

## Request

- ...
- passthrough

## Response

- ...
- once
  - 一度きりのモック
- networkError
  - ネットワークエラーとしてレスポンスを返すことができる

---

## Context

```
rest.get("/api/users/:id", (req, res, ctx) => {
    return res(
        ctx.status(200),
        ctx.json({ id: 1, hoge: "hoge", }),
        ctx.set({
          "Content-Type":"text/json",
        })
    )
})
```

---

- status = ステータスコード
- set = ヘッダ
- xml / json
- body = raw body
- text = text
- data/extensions/error = graphql 用のレスポンス
- delay = レスポンスの遅延／ms で指定できる／指定しなければランダムで遅延する
- fetch = オリジナルの API に投げて受け取ったデータにパッチを当てて返すなど

---

## 開発環境で使う

- 例（nextjs）
- ブラウザの developer tool からもモックを呼び出せる

## テストで使う

- 例(jest)

## storybook で使う

- 例(storybook)

---

## まとめ

- フロントエンドのみでモックできるため開発環境だけでなく UT / storybook / E2E 等に流用しやすい
- 型定義をプロダクトコードのレスポンスの型と共有できる
- 部分的にモックしたいときとかよさそうに思った(JSP とかで一部 React になっているものとか)

<!-- ## まとめ

- フロントエンドのみでモックできるため開発環境だけでなく UT/storybook 等に流用しやすい
- 型定義をプロダクトコードのレスポンスの型と
- 最後に各商材で使っているモックサーバーを聞いてみる
  - 導入しようとしたけどしなかった理由とか
  - 使っている感想とか -->
