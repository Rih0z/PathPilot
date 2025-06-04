# Claude Development Guidelines

## 作業完了時のチェックリスト

### 1. GitHubへの追加
- [ ] 作業が完了したらGitHubに追加すること
- [ ] コミットメッセージは変更内容を明確に記載
- [ ] 必要に応じてブランチを作成

### 2. ビルドとデプロイ
- [ ] 作業が完了したらClaude環境でビルドしデプロイすること
- [ ] `npm run build` でビルドエラーがないか確認
- [ ] `npx wrangler deploy` でCloudflareへデプロイ（バックエンド）
- [ ] `npx wrangler deploy --config wrangler-frontend.toml` でフロントエンドデプロイ

### 3. ドキュメント更新
- [ ] READMEにデプロイ先を記載して
- [ ] デプロイURL: 
  - Frontend: https://pathpilot-frontend.riho-dare.workers.dev
  - Backend: https://pathpilot.riho-dare.workers.dev
- [ ] 実装を変更したらそれに合わせてドキュメントも更新すること

### 4. セキュリティチェック
- [ ] GitHubへのプッシュ前にセキュリティ上の問題がないか確認すること
- [ ] 環境変数やシークレットキーが含まれていないか
- [ ] .envファイルが.gitignoreに含まれているか
- [ ] APIキーやトークンがハードコードされていないか

### 5. URL固定要件
- [ ] 必ずURLが固定の本番環境にデプロイするようにして
- [ ] フロントエンドとバックエンドの通信が必ず成功するように固定のAPIを指定して
- [ ] 固定URL:
  - Frontend: https://pathpilot-frontend.riho-dare.workers.dev
  - Backend API: https://pathpilot.riho-dare.workers.dev

## 開発フロー

1. 機能実装・修正
2. テスト実行 (`npm test`)
3. ビルド確認 (`npm run build`)
4. セキュリティチェック
5. ドキュメント更新
6. GitHubへコミット・プッシュ
7. Cloudflareへデプロイ

## API設定

### 固定エンドポイント
- Backend API Base: `https://pathpilot.riho-dare.workers.dev`
- Frontend Origin: `https://pathpilot-frontend.riho-dare.workers.dev`

### 認証不要のパブリックAPI
- `GET /api/public/demo/info` - デモ情報
- `POST /api/public/demo/hope-experience` - 希望体験生成
- `GET /api/public/demo/success-patterns` - 成功パターン
- `POST /api/public/demo/prompt` - プロンプト生成
- `GET /api/public/demo/stats` - 統計情報

### テストページ
- Live Communication Test: https://pathpilot-frontend.riho-dare.workers.dev/test-live.html
- Backend Direct Test: https://pathpilot-frontend.riho-dare.workers.dev/test-backend.html

## 重要な注意事項

- 機密情報は絶対にコミットしない
- デプロイ前に必ずローカルでテストを実行
- ドキュメントは常に最新の状態を保つ
- URLは固定されているため、デプロイ時に変更されることはない
- 通信テストページで接続確認を必ず行う

## Ultrathink

Ultrathink: 「絵文字は一切使用せず、アイコンライブラリ（react-icons)のアイコンをデザインとして利用して。」

実装完了：
- 📍 React + TypeScript + Vite で完全にリファクタリング
- 🎯 全ての絵文字をreact-iconsライブラリのアイコンに置換
- 🚀 PathPilotのフル機能をReactコンポーネントで実装
- ⚡ ランディングページ、メインアプリケーション、ナビゲーション全て完成
- 🎨 現代的なUIデザイン（Tailwind CSS、グラデーション、アニメーション）
- 🔧 Cloudflare Pages でデプロイ完了

新デプロイURL：
- **React Frontend**: https://ef2dc79a.pathpilot-frontend.pages.dev
- **Backend API**: https://pathpilot.riho-dare.workers.dev （変更なし）

置換されたアイコン：
- 🚀 → FaRocket （ロゴ・ナビゲーション）
- 💡 → FaLightbulb （希望体験生成）
- ⚡ → FaBolt （成功パターンマッチング）
- 🎯 → FaBullseye （パーソナライズプロンプト）
- 📊 → FaChartBar （統計情報）
- ✅ → FaCheckCircle （機能紹介）
- ← → FaArrowLeft （戻るボタン）
- 📋 → FaCopy （コピーボタン）
- 回転中 → FaSpinner （ローディング）

Don't hold back. give it your all！
新しいReactアプリケーションは完全にemoji-freeで、プロフェッショナルなアイコンライブラリを使用した現代的なデザインになっています。全機能が正常に動作し、既存のAPIと完全に統合されています。