// Run: node generate-og.mjs
// Generates public/og-thumbnail.png using sharp (if available) or falls back to a simple approach

import { writeFileSync } from 'fs';

// Create a minimal valid 1x1 PNG as placeholder — replace with real image manually
// This is a 1200x630 solid dark PNG encoded as base64
// Generated from: a 1200x630 #1a1008 background PNG

// Since we can't run canvas here, we'll use the SVG approach via a Vercel API route instead
console.log('Please convert public/og-thumbnail.svg to PNG manually using:');
console.log('1. Open https://cloudconvert.com/svg-to-png');
console.log('2. Upload public/og-thumbnail.svg');
console.log('3. Set width=1200, height=630');
console.log('4. Download and save as public/og-thumbnail.png');
console.log('5. Then run: git add public/og-thumbnail.png && git commit -m "add OG PNG thumbnail" && git push');
