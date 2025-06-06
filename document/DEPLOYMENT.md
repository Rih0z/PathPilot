# PathPilot Deployment Guide

## Prerequisites

1. **Cloudflare Account**
   - Sign up at [https://cloudflare.com](https://cloudflare.com)
   - Get your Account ID from the dashboard

2. **Wrangler CLI**
   ```bash
   npm install -g wrangler
   ```

3. **Authenticate with Cloudflare**
   ```bash
   wrangler login
   ```

## Setup Steps

### 1. Create KV Namespaces

```bash
# Create KV namespaces
wrangler kv:namespace create USER_CONTEXTS
wrangler kv:namespace create PROMPT_TEMPLATES
wrangler kv:namespace create USAGE_ANALYTICS

# For staging/preview environments
wrangler kv:namespace create USER_CONTEXTS --preview
wrangler kv:namespace create PROMPT_TEMPLATES --preview
wrangler kv:namespace create USAGE_ANALYTICS --preview
```

### 2. Update wrangler.toml

Replace the placeholder KV IDs in `wrangler.toml` with the actual IDs from the above commands:

```toml
[[kv_namespaces]]
binding = "USER_CONTEXTS"
id = "YOUR_ACTUAL_USER_CONTEXTS_ID"
preview_id = "YOUR_ACTUAL_USER_CONTEXTS_PREVIEW_ID"

[[kv_namespaces]]
binding = "PROMPT_TEMPLATES"
id = "YOUR_ACTUAL_PROMPT_TEMPLATES_ID"
preview_id = "YOUR_ACTUAL_PROMPT_TEMPLATES_PREVIEW_ID"

[[kv_namespaces]]
binding = "USAGE_ANALYTICS"
id = "YOUR_ACTUAL_USAGE_ANALYTICS_ID"
preview_id = "YOUR_ACTUAL_USAGE_ANALYTICS_PREVIEW_ID"
```

### 3. Set Environment Secrets

```bash
# Set JWT secret
wrangler secret put JWT_SECRET
# Enter your secret when prompted

# For production environment
wrangler secret put JWT_SECRET --env production
```

### 4. Deploy

#### Development/Preview
```bash
npm run deploy
```

#### Production
```bash
npm run deploy:production
```

## Verify Deployment

1. **Check deployment status**
   ```bash
   wrangler tail
   ```

2. **Test the API**
   ```bash
   # Health check
   curl https://pathpilot.workers.dev/

   # Should return:
   # {
   #   "name": "PathPilot API",
   #   "version": "1.0.0",
   #   "status": "operational",
   #   ...
   # }
   ```

## Custom Domain (Optional)

1. Go to your Cloudflare dashboard
2. Navigate to Workers & Pages
3. Select your PathPilot worker
4. Go to "Custom Domains" tab
5. Add your custom domain

## Monitoring

1. **Real-time logs**
   ```bash
   wrangler tail
   ```

2. **Analytics**
   - View in Cloudflare dashboard under Workers Analytics

## Troubleshooting

### Common Issues

1. **KV namespace not found**
   - Ensure KV namespaces are created and IDs are correctly set in wrangler.toml

2. **JWT_SECRET not set**
   - Run `wrangler secret put JWT_SECRET` and enter your secret

3. **Build errors**
   - Run `npm run build` locally to check for TypeScript errors
   - Ensure all dependencies are installed: `npm install`

4. **Rate limiting**
   - Check Cloudflare Workers limits for your plan
   - Implement additional rate limiting if needed

## Rollback

To rollback to a previous version:

```bash
# List deployments
wrangler deployments list

# Rollback to specific version
wrangler rollback [deployment-id]
```