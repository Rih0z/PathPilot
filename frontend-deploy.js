// Cloudflare Workers script to serve the frontend SPA
export default {
  async fetch(request, env) {
    try {
      const url = new URL(request.url);
      let pathname = url.pathname;

      // Remove trailing slash
      if (pathname !== '/' && pathname.endsWith('/')) {
        pathname = pathname.slice(0, -1);
      }

      // Map paths to files in the dist directory
      const assetMap = {
        '/': '/index.html',
        '/index.html': '/index.html',
        '/test.html': '/test.html',
        '/debug.html': '/debug.html',
        '/test-comm.html': '/test-comm.html',
        '/test-backend.html': '/test-backend.html',
        '/test-live.html': '/test-live.html',
        '/assets/index-3bf37aed.js': '/assets/index-3bf37aed.js',
        '/assets/index-d4f9a48c.css': '/assets/index-d4f9a48c.css',
        '/assets/react-vendor-92c95717.js': '/assets/react-vendor-92c95717.js',
        '/assets/router-fc7b80f6.js': '/assets/router-fc7b80f6.js',
        '/assets/animation-b65740af.js': '/assets/animation-b65740af.js',
        '/assets/chevron-right-a1aef98b.js': '/assets/chevron-right-a1aef98b.js',
        '/assets/arrow-right-d7e18c8e.js': '/assets/arrow-right-d7e18c8e.js',
        '/assets/user-a22eb28b.js': '/assets/user-a22eb28b.js',
        '/assets/target-aebb36a0.js': '/assets/target-aebb36a0.js',
        '/assets/trending-up-81d5aa31.js': '/assets/trending-up-81d5aa31.js',
        '/assets/OnboardingPage-4463779c.js': '/assets/OnboardingPage-4463779c.js',
        '/assets/LandingPage-3983651f.js': '/assets/LandingPage-3983651f.js',
        '/assets/DashboardPage-e2eb9db7.js': '/assets/DashboardPage-e2eb9db7.js',
        '/assets/ProfilePage-c848a532.js': '/assets/ProfilePage-c848a532.js',
      };

      // For client-side routing, serve index.html for all non-asset routes
      let assetPath = assetMap[pathname];
      if (!assetPath && !pathname.startsWith('/assets/')) {
        assetPath = '/index.html';
      } else if (!assetPath) {
        return new Response('Not Found', { status: 404 });
      }

      // Try to get the asset from KV namespace
      const asset = await env.ASSETS.get(assetPath, 'stream');
      if (!asset) {
        console.error(`Asset not found in KV: ${assetPath}`);
        return new Response('Not Found', { status: 404 });
      }

      // Determine content type
      const contentType = getContentType(assetPath);

      // Return the asset with appropriate headers
      return new Response(asset, {
        headers: {
          'Content-Type': contentType,
          'Cache-Control': assetPath.includes('/assets/') 
            ? 'public, max-age=31536000, immutable' 
            : 'public, max-age=3600',
          'X-Content-Type-Options': 'nosniff',
        },
      });
    } catch (error) {
      console.error('Worker error:', error);
      return new Response(`Internal Server Error: ${error.message}`, { 
        status: 500,
        headers: { 'Content-Type': 'text/plain' }
      });
    }
  },
};

function getContentType(path) {
  const ext = path.split('.').pop();
  const types = {
    'html': 'text/html; charset=utf-8',
    'js': 'application/javascript; charset=utf-8',
    'css': 'text/css; charset=utf-8',
    'json': 'application/json; charset=utf-8',
    'map': 'application/json; charset=utf-8',
  };
  return types[ext] || 'text/plain; charset=utf-8';
}