# prismit-site

Prismit(屋号)の公式サイト(静的HTML/CSS/JS、GitHub Pagesでホスティング)。

## ローカルプレビュー

ビルド不要です。`index.html` をブラウザで直接開くか、簡易サーバーで確認できます。

```
python -m http.server 8000
```

その後 `http://localhost:8000` にアクセスしてください。

## 公開手順（GitHub Pages）

1. `main` ブランチに変更をpushする
2. GitHubリポジトリの **Settings > Pages** を開く
3. **Source** を `Deploy from a branch` にし、Branch を `main` / `/(root)` に設定して保存
4. 数分後、`https://prismit2022.github.io/prismit-site/` で公開される

## ページ構成

- `index.html` — トップページ(ヒーロー+各ページの要約とリンク)
- `about.html` — Prismitについて
- `services.html` — 事業内容
- `news.html` — お知らせ
- `contact.html` — お問い合わせフォーム

各ページで共通のヘッダー・フッターはファイルごとに直接記述しています(ビルド不要のためテンプレート機能はありません)。現在表示中のページのナビゲーション項目には `class="is-active"` を付けており、これが選択中メニューの色分け表示になっています。ページを追加・変更する際は、対応するナビゲーション項目の `is-active` を付け替えてください。

## 写真について

`index.html` と `about.html` の写真は [Unsplash](https://unsplash.com) のフリー素材(IT・開発をイメージしたコード画面の写真)です(実際の御社の写真ではありません)。本物の写真に差し替える場合は、画像ファイルを `images/` フォルダなどに置き、該当する `<img src="...">` と `alt` テキストを差し替えてください。

## 編集箇所

- 屋号・キャッチコピー・Prismitについて・事業内容・お知らせ・お問い合わせフォームの各テキストはすべてダミー内容です。実際の内容に差し替えてください。
- `#contact` のフォーム `action` は Formspree(無料プラン)のエンドポイントに設定済みです。送信されたお問い合わせは、Formspreeに登録したメールアドレスに通知されます。フォームIDを変更したい場合は [formspree.io](https://formspree.io) のダッシュボードで確認してください。
- `css/style.css` — 配色は `:root` 内の変数(`--color-primary` など)を変更すると全体に反映されます。
