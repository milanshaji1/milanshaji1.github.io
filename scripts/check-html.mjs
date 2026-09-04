import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';

const html = readFileSync(new URL('../dist/index.html', import.meta.url), 'utf8');

test('initial HTML contains the portfolio before JavaScript runs', () => {
  assert.match(html, /<h1[^>]*>Milan Shaji<\/h1>/);
  for (const section of ['work', 'numbers', 'info', 'contact']) {
    assert.ok(html.includes(`id="${section}"`), `${section} is in the initial response`);
  }
  assert.match(html, /71%/);
  assert.match(html, /531\/531/);
  assert.match(html, /mailto:milan.s.shaji@gmail.com/);
  assert.doesNotMatch(html, /opacity:0(?:;|")/);
});

test('all project descriptions and links are available without JavaScript', () => {
  for (const project of ['paper-trail', 'dispatch', 'gesture-canvas', 'handtracked-vfx']) {
    assert.ok(html.includes(`https://github.com/milanshaji1/${project}`));
  }
  assert.match(html, /underperformed simply buying and holding the index/);
  assert.match(html, /A gradient-boosted early-warning model/);
  assert.equal((html.match(/<details\b/g) || []).length, 4);
  assert.equal((html.match(/<summary\b/g) || []).length, 4);
});
