import test from 'node:test';
import assert from 'node:assert/strict';
import { getRankEmblemUrl, RANK_EMBLEMS } from './lolAssets.ts';

test('getRankEmblemUrl returns Emerald crest URL', () => {
  const url = getRankEmblemUrl('EMERALD');
  assert.equal(url, 'https://opgg-static.akamaized.net/images/medals_new/emerald.png');
});

test('getRankEmblemUrl handles lowercase and invalid tier gracefully', () => {
  assert.equal(getRankEmblemUrl('diamond'), 'https://opgg-static.akamaized.net/images/medals_new/diamond.png');
  assert.equal(getRankEmblemUrl('unknown'), RANK_EMBLEMS.EMERALD);
});
