import test from 'node:test';
import assert from 'node:assert/strict';
import { validateRiotApiKeyFormat } from './riotApi.ts';

test('validateRiotApiKeyFormat accepts valid RGAPI keys', () => {
  const validKey = 'RGAPI-12345678-abcd-1234-ef01-1234567890ab';
  assert.equal(validateRiotApiKeyFormat(validKey), true);
});

test('validateRiotApiKeyFormat rejects malformed keys', () => {
  assert.equal(validateRiotApiKeyFormat(''), false);
  assert.equal(validateRiotApiKeyFormat('random_string'), false);
  assert.equal(validateRiotApiKeyFormat('RGAPI-short'), false);
  assert.equal(validateRiotApiKeyFormat('API-12345678-abcd-1234-ef01-1234567890ab'), false);
});
