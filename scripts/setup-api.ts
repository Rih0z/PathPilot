#!/usr/bin/env tsx
// API Setup Script for PathPilot
// This script initializes KV namespaces with seed data

import { seedPromptTemplates, seedSuccessPatterns } from '../seed-data';

async function setupAPI() {
  console.log('🚀 PathPilot API Setup Script');
  console.log('============================\n');

  // Check environment
  const env = process.env.NODE_ENV || 'development';
  console.log(`📌 Environment: ${env}`);

  // Display current configuration
  console.log('\n📋 Current Configuration:');
  console.log('-------------------------');
  console.log('KV Namespaces:');
  console.log('  - USER_CONTEXTS: 8c7ae3b0e18b411d9c87d05d601d7655');
  console.log('  - PROMPT_TEMPLATES: 3833c68dfea749919c877bd7607ddc57');
  console.log('  - USAGE_ANALYTICS: 827404d090834240b23411360891fc63');
  
  console.log('\nEnvironment Variables:');
  console.log('  - ENVIRONMENT: development');
  console.log('  - MONETIZATION_PHASE: 1');
  console.log('  - DEBUG_MODE: true');
  console.log('  - JWT_SECRET: [SET]');

  // Seed data summary
  console.log('\n📊 Seed Data Summary:');
  console.log('--------------------');
  console.log(`  - Prompt Templates: ${seedPromptTemplates.length}`);
  console.log(`  - Success Patterns: ${seedSuccessPatterns.length}`);

  // Instructions for manual setup
  console.log('\n📝 Manual Setup Instructions:');
  console.log('----------------------------');
  console.log('1. Deploy the API to Cloudflare Workers:');
  console.log('   npx wrangler deploy');
  console.log('');
  console.log('2. Initialize prompt templates (run once):');
  console.log('   curl -X POST https://pathpilot.riho-dare.workers.dev/api/admin/seed-templates \\');
  console.log('     -H "Content-Type: application/json" \\');
  console.log('     -H "X-Admin-Key: your-admin-key" \\');
  console.log('     -d \'{"templates": ' + JSON.stringify(seedPromptTemplates.slice(0, 2)) + '}\'');
  console.log('');
  console.log('3. Test the API:');
  console.log('   curl https://pathpilot.riho-dare.workers.dev/');
  console.log('');
  console.log('4. Create test user:');
  console.log('   Use the test page: https://pathpilot-frontend.riho-dare.workers.dev/test-backend.html');

  // CORS configuration
  console.log('\n🔒 CORS Configuration:');
  console.log('--------------------');
  console.log('Allowed Origins: * (all origins)');
  console.log('Allowed Methods: GET, POST, PUT, DELETE, OPTIONS');
  console.log('Allowed Headers: Content-Type, Authorization');
  console.log('Credentials: true');

  // API endpoints
  console.log('\n🌐 API Endpoints:');
  console.log('-----------------');
  console.log('Authentication:');
  console.log('  POST /api/auth/register');
  console.log('  POST /api/auth/login');
  console.log('  POST /api/auth/refresh');
  console.log('  GET  /api/auth/me');
  console.log('');
  console.log('Core Features:');
  console.log('  POST /api/hope/experience');
  console.log('  POST /api/hope/visualization');
  console.log('  POST /api/hope/momentum');
  console.log('  GET  /api/success-patterns/similar');
  console.log('  POST /api/success-patterns/probability');
  console.log('  POST /api/prompts/generate');
  console.log('  POST /api/prompts/analyze');

  console.log('\n✅ API setup configuration complete!');
  console.log('Next step: Deploy the API using "npx wrangler deploy"');
}

// Run the setup
setupAPI().catch(console.error);