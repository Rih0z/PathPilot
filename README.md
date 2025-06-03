# PathPilot

🚀 **AI-powered career navigation platform** - 就活を成功に導くAIパイロット

## 🌟 Overview

PathPilotは、ユーザーの就職活動を包括的にサポートするAIプラットフォームです。希望体験（"もしかしたら内定をもらえるかも"）を提供することを核心価値とし、パーソナライズされたプロンプト生成、成功パターンマッチング、進捗管理を通じて就活成功を支援します。

## 🏗️ Tech Stack

- **Runtime**: Cloudflare Workers
- **Framework**: Hono.js
- **Language**: TypeScript
- **Authentication**: JWT (jose)
- **Storage**: Cloudflare KV
- **Testing**: Vitest
- **Deployment**: Wrangler CLI

## 🚀 Deployment

### Production URL
```
https://pathpilot.workers.dev
```

### Staging URL
```
https://pathpilot-staging.workers.dev
```

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/pathpilot.git
cd pathpilot

# Install dependencies
npm install

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
# Start development server
npm run dev

# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Type check
npm run type-check

# Lint
npm run lint

# Build
npm run build
```

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage report
npm run test:coverage
```

## 📝 API Documentation

### Authentication Endpoints

```bash
POST /api/auth/register - User registration
POST /api/auth/login    - User login
POST /api/auth/refresh  - Refresh JWT token
GET  /api/auth/me       - Get current user
```

### Core Endpoints

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

## 🔒 Security

- JWT-based authentication
- Password hashing with bcrypt
- Environment variable management
- Rate limiting on API endpoints
- Input validation with Zod

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
