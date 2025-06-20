# PathPilot

🚀 **AI-powered career navigation platform** - 就活を成功に導くAIパイロット

## 🌟 Overview

PathPilotは、ユーザーの就職活動を包括的にサポートするAIプラットフォームです。希望体験（"もしかしたら内定をもらえるかも"）を提供することを核心価値とし、パーソナライズされたプロンプト生成、成功パターンマッチング、データ分析、進捗管理を通じて就活成功を支援します。

## ✨ Key Features

- **AI-Driven Hope Experience**: 希望体験の生成とビジュアライゼーション
- **Success Pattern Matching**: 成功事例のパターンマッチングとロードマップ生成
- **Data Import System**: 就活データの一括インポートと分析
- **Modern UI/UX Design**: 2024-2025トレンドを採用した最先端のデザインシステム
- **Real-time Analytics**: リアルタイムの活動分析とインサイト

## 🏗️ Tech Stack

### Frontend
- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Icons**: React Icons (Lucide React)
- **Deployment**: Cloudflare Pages

### Backend
- **Runtime**: Cloudflare Workers
- **Framework**: Hono.js
- **Language**: TypeScript
- **Storage**: Cloudflare KV
- **Database**: Supabase (PostgreSQL) - Planned

### Testing
- **Unit Tests**: Vitest
- **E2E Tests**: Playwright

## 🚀 Production URLs

### Frontend (Stable)
```
https://pathpilot-frontend.pages.dev
```

### Backend API (Stable)
```
https://pathpilot.riho-dare.workers.dev
```

### Status
✅ **DEPLOYED & OPERATIONAL**

Access the application:
- Frontend: https://pathpilot-frontend.pages.dev

Test the API:
```bash
curl https://pathpilot.riho-dare.workers.dev/
```

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/pathpilot.git
cd pathpilot

# Install dependencies
npm install

# Frontend setup
cd frontend
npm install
cd ..

# Set up environment variables
cp .env.example .env
# Edit .env with your configuration
```

## 🔧 Configuration

1. **Cloudflare KV Namespaces**
   ```bash
   # Create KV namespaces
   wrangler kv:namespace create USER_CONTEXTS
   wrangler kv:namespace create PROMPT_TEMPLATES
   wrangler kv:namespace create USAGE_ANALYTICS
   ```

2. **Environment Variables**
   - `JWT_SECRET`: Your JWT secret key
   - `ENVIRONMENT`: development | production
   - `MONETIZATION_PHASE`: 1 | 2 | 3
   - `DEBUG_MODE`: true | false

3. **Update wrangler.toml**
   - Replace KV namespace IDs with your actual IDs
   - Configure your Cloudflare account ID

## 🛠️ Development

```bash
# Start backend development server
npm run dev

# Start frontend development server
cd frontend
npm run dev

# Run backend tests
npm test

# Run frontend tests
cd frontend
npm test

# Run E2E tests
cd frontend
npm run test:e2e

# Type check
npm run type-check

# Build for production
npm run build
```

## 🧪 Testing

```bash
# Backend unit tests
npm test
npm run test:watch
npm run test:coverage

# Frontend unit tests
cd frontend
npm test

# E2E tests (development)
cd frontend
npm run test:e2e

# E2E tests (production)
cd frontend
npm run test:e2e:production
```

## 📝 API Documentation

### Public API Endpoints (No Authentication Required)

```bash
# Demo & Information
GET  /api/public/demo/info              - Get demo information
GET  /api/public/demo/stats             - Get platform statistics

# Hope Experience
POST /api/public/demo/hope-experience   - Generate hope experience
Body: {
  "context": {
    "targetCompanies": ["Company A", "Company B"],
    "targetRoles": ["Frontend Engineer"],
    "strengths": ["React", "TypeScript"],
    "experiences": ["Internship at Tech Company"]
  }
}

# Success Patterns
GET  /api/public/demo/success-patterns  - Get success pattern examples

# Prompt Generation
POST /api/public/demo/prompt           - Generate personalized prompt
Body: {
  "context": {
    "situation": "面接準備",
    "details": "技術面接の準備をしています"
  }
}
```

### Data Analysis Endpoints

```bash
# Screenshot Analysis
POST /api/analyze/screenshot    - Analyze screenshot data
Body: { "image": "base64_encoded_image" }

# Resume Analysis
POST /api/analyze/resume       - Analyze resume content
Body: { "content": "resume_text" }

# Job Match Analysis
POST /api/analyze/job-match    - Analyze job compatibility
Body: {
  "jobDescription": "...",
  "userProfile": { ... }
}
```

### Core Features (Planned for Authenticated Users)

```bash
# Success Pattern Engine
GET  /api/success-patterns/similar     - Find similar success stories
POST /api/success-patterns/probability - Calculate success probability
POST /api/success-patterns/roadmap     - Generate success roadmap

# Prompt Orchestration
POST /api/prompts/generate    - Generate personalized prompt
POST /api/prompts/analyze     - Analyze user context
POST /api/prompts/feedback    - Record prompt feedback

# Hope Generation
POST /api/hope/experience     - Generate hope experience
POST /api/hope/visualization  - Create visualization path
POST /api/hope/momentum       - Generate momentum actions
```

## 🎨 UI/UX Design System

PathPilotは2024-2025年の最新UIトレンドを採用:

- **Glassmorphism**: 透明感のあるモダンなUI
- **Dark Mode First**: ダークモードを基本とした目に優しいデザイン
- **Bold Typography**: 大胆で読みやすいタイポグラフィ
- **Micro-interactions**: 細やかなインタラクション
- **AI-Driven Personalization**: AIによるパーソナライズ体験
- **3D Design Elements**: 立体的なデザイン要素
- **Neobrutalism**: 大胆で印象的なビジュアル

## 🔒 Security

- JWT-based authentication (planned)
- Environment variable management
- Rate limiting on API endpoints
- Input validation with Zod
- CORS configuration for production

## 📄 License

MIT License - see LICENSE file for details

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 👥 Team

- Product Owner: @yourusername
- Tech Lead: @yourusername
- Developers: @yourusername

## 📞 Support

For support, email support@pathpilot.app or join our Slack channel.