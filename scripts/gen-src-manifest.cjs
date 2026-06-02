// Manifest generator for BookHavenBookstore_Sophia.
//
// This repo is served straight from `main` (GitHub Pages -> deploy from branch
// -> main -> root) with NO build step, so there is no dist/. The manifest must
// therefore be written to the REPO ROOT, where Pages serves it, rather than to
// a dist/ directory like build-pipeline projects use.
//
// Usage (run manually whenever the file list in src/ changes, then commit the
// resulting src-manifest.json):
//   node scripts/gen-src-manifest.cjs
//   git add src-manifest.json && git commit -m "Update source manifest" && git push
//
// Output: src-manifest.json at the repo root, served at
//   https://rsterenchak.github.io/BookHavenBookstore_Sophia/src-manifest.json
// which the in-app Claude assistant fetches to populate its file picker.
//
// The published `files` are bare filenames from src/. The worker prepends the
// configured srcPrefix ("src/") at attach time to build the raw.githubusercontent
// URL, so the manifest does not need to include the src/ prefix itself.

const fs = require('fs');
const path = require('path');

// Source files live in src/ (one level up from scripts/, then into src).
const srcDir = path.resolve(__dirname, '..', 'src');
// Output goes to the REPO ROOT (one level up from scripts/), NOT dist/,
// because the site is served directly from the repo root on main.
const outDir = path.resolve(__dirname, '..');

const files = fs
  .readdirSync(srcDir)
  .filter((f) => /\.(?:jsx?|tsx?|css|html)$/.test(f))
  .sort();

const manifest = {
  generatedAt: new Date().toISOString(),
  sha: process.env.GITHUB_SHA || '',
  files,
};

fs.writeFileSync(
  path.join(outDir, 'src-manifest.json'),
  JSON.stringify(manifest, null, 2)
);

console.log('src-manifest.json written to repo root:', files.length, 'files');
