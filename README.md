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

## 編集箇所

- `index.html` — 会社名・キャッチコピー・会社概要・事業内容・お知らせ・お問い合わせフォームの各テキストはすべてダミー内容です。実際の内容に差し替えてください。
- `#contact` のフォーム `action` は Formspree のプレースホルダーです。[formspree.io](https://formspree.io) で無料アカウントを作成し、発行されたフォームIDに差し替えてください（GitHub Pagesは静的サイトのため、フォーム送信の受け皿として外部の無料サービスが必要です）。
- `css/style.css` — 配色は `:root` 内の変数（`--color-primary` など）を変更すると全体に反映されます。
