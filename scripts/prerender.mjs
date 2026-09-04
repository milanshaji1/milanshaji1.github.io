import { build } from 'vite';
import { readFile, writeFile, mkdtemp, rm } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

// Keep the temporary SSR bundle beside node_modules so its imports resolve.
const temporary = await mkdtemp(resolve('.prerender-'));
try {
  await build({ build: { ssr: 'src/entry-server.jsx', outDir: temporary } });
  const { render } = await import(pathToFileURL(join(temporary, 'entry-server.js')));
  const file = resolve('dist/index.html');
  const html = await readFile(file, 'utf8');
  const root = '<div id="root"></div>';
  if (!html.includes(root)) throw new Error('Missing empty root in Vite output');
  await writeFile(file, html.replace(root, () => `<div id="root">${render()}</div>`));
  console.log('[prerender] Portfolio HTML generated for GitHub Pages.');
} finally {
  await rm(temporary, { recursive: true, force: true });
}
