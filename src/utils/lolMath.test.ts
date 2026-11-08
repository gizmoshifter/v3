import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateKDA,
  calculateCSPerMin,
  calculateKillParticipation,
  calculateDamageShare,
  calculatePerformanceGrade,
  formatGameDuration,
  formatTimeAgo,
} from './lolMath.ts';

test('calculateKDA returns perfect for 0 deaths', () => {
  const result = calculateKDA(12, 0, 8);
  assert.equal(result.isPerfect, true);
  assert.equal(result.formatted, 'Perfect');
  assert.equal(result.ratio, 20);
});

test('calculateKDA calculates ratio with deaths correctly', () => {
  const result = calculateKDA(10, 2, 5);
  assert.equal(result.isPerfect, false);
  assert.equal(result.ratio, 7.5);
  assert.equal(result.formatted, '7.50:1');
});

test('calculateCSPerMin computes accurate farm rate', () => {
  // 250 cs in 30 minutes (1800s) -> 8.3 cs/min
  const csRate = calculateCSPerMin(250, 1800);
  assert.equal(csRate, 8.3);
});

test('calculateKillParticipation computes rounded percentage bounded at 100', () => {
  assert.equal(calculateKillParticipation(5, 5, 20), 50);
  assert.equal(calculateKillParticipation(0, 0, 0), 0);
  assert.equal(calculateKillParticipation(10, 10, 15), 100);
});

test('calculateDamageShare returns expected percentage', () => {
  assert.equal(calculateDamageShare(35000, 100000), 35);
  assert.equal(calculateDamageShare(0, 0), 0);
});

test('calculatePerformanceGrade assigns high rank for strong play', () => {
  const grade = calculatePerformanceGrade({
    win: true,
    kda: 6.2,
    csPerMin: 9.1,
    kp: 70,
  });
  assert.equal(grade, 'S+');
});

test('formatGameDuration formats minutes and seconds cleanly', () => {
  assert.equal(formatGameDuration(1845), '30m 45s');
  assert.equal(formatGameDuration(1205), '20m 05s');
});

test('romanToArabicDivision maps Roman numerals to Arabic correctly', async () => {
  const { romanToArabicDivision } = await import('./lolMath.ts');
  assert.equal(romanToArabicDivision('IV'), '4');
  assert.equal(romanToArabicDivision('I'), '1');
  assert.equal(romanToArabicDivision('II'), '2');
  assert.equal(romanToArabicDivision('III'), '3');
  assert.equal(romanToArabicDivision(undefined), '');
});

test('formatTierBadge returns standard OP.GG compact badges', async () => {
  const { formatTierBadge } = await import('./lolMath.ts');
  assert.equal(formatTierBadge('DIAMOND', 'IV'), 'D4');
  assert.equal(formatTierBadge('DIAMOND', 'I'), 'D1');
  assert.equal(formatTierBadge('PLATINUM', 'I'), 'P1');
  assert.equal(formatTierBadge('EMERALD', 'IV'), 'E4');
  assert.equal(formatTierBadge('MASTER'), 'Master');
});
