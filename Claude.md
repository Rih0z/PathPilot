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
- **React Frontend**: https://3c74469e.pathpilot-frontend.pages.dev
- **旧React Frontend**: https://ef2dc79a.pathpilot-frontend.pages.dev
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

## 🚀 新機能: データインポート

**完全実装完了！**

### 📱 データインポート機能
- **AIプロンプト生成**: Gemini/Claude/ChatGPT用の包括的データ収集プロンプト
- **段階的情報収集**: 基本情報→経験→課題→追加資料まで体系的収集
- **JSON構造化**: 標準化されたデータ形式での出力
- **スクリーンショット対応**: 求人サイト、応募状況等の画像解析対応

### 📊 ユーザーダッシュボード
- **包括的ステータス**: 活動状況、マッチング度、AI分析結果
- **視覚的レポート**: グラフ、チャート、プログレスバーによる現状可視化
- **推奨アクション**: AI分析に基づく次のステップ提案
- **リアルタイム更新**: データ変更時の即座反映

### 🔄 統合されたワークフロー
- **シームレス連携**: ランディング→アプリ→インポート→ダッシュボード
- **状態管理**: ローカルストレージによるデータ永続化
- **ナビゲーション**: ユーザーデータ有無に応じた適応的メニュー
- **コンテキスト保持**: 全画面でユーザー状況を把握

### 🎯 ユーザー体験
1. **従来のデモ機能**: 即座にPathPilotの基本機能を体験
2. **詳細分析**: AIツールでスクリーンショット等と共に現状を詳細分析
3. **個人化ダッシュボード**: 完全カスタマイズされた就活支援環境
4. **継続的改善**: データ更新による最新状況の反映

Don't hold back. give it your all！
新しいReactアプリケーションは完全にemoji-freeで、プロフェッショナルなアイコンライブラリを使用した現代的なデザインになっています。全機能が正常に動作し、既存のAPIと完全に統合されています。

**データインポート機能により、PathPilotは単なるAIプロンプト提供ツールから、ユーザーの就活状況を完全に把握・管理する包括的なAI就活支援プラットフォームに進化しました！**