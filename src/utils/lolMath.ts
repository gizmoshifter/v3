/**
 * Pure calculation utilities for League of Legends player performance,
 * match analysis, and champion mastery statistics.
 */

export interface KDAResult {
  ratio: number;
  formatted: string;
  isPerfect: boolean;
}

export function calculateKDA(kills: number, deaths: number, assists: number): KDAResult {
  if (deaths === 0) {
    const sum = kills + assists;
    return {
      ratio: sum > 0 ? sum : 0,
      formatted: 'Perfect',
      isPerfect: true,
    };
  }
  const ratio = (kills + assists) / deaths;
  return {
    ratio: Number(ratio.toFixed(2)),
    formatted: `${ratio.toFixed(2)}:1`,
    isPerfect: false,
  };
}

export function calculateCSPerMin(cs: number, durationSeconds: number): number {
  if (durationSeconds <= 0) return 0;
  const minutes = durationSeconds / 60;
  return Number((cs / minutes).toFixed(1));
}

export function calculateKillParticipation(
  kills: number,
  assists: number,
  teamTotalKills: number
): number {
  if (teamTotalKills <= 0) return 0;
  const raw = ((kills + assists) / teamTotalKills) * 100;
  return Math.min(100, Math.round(raw));
}

export function calculateDamageShare(playerDamage: number, teamDamage: number): number {
  if (teamDamage <= 0) return 0;
  const raw = (playerDamage / teamDamage) * 100;
  return Math.min(100, Math.round(raw));
}

export type PerformanceGrade = 'S+' | 'S' | 'S-' | 'A+' | 'A' | 'A-' | 'B+' | 'B' | 'C';

export function calculatePerformanceGrade(metrics: {
  win: boolean;
  kda: number;
  csPerMin: number;
  kp: number;
}): PerformanceGrade {
  let score = 0;

  // Win factor
  if (metrics.win) score += 20;

  // KDA factor
  if (metrics.kda >= 5.0) score += 35;
  else if (metrics.kda >= 3.5) score += 28;
  else if (metrics.kda >= 2.5) score += 20;
  else if (metrics.kda >= 1.5) score += 12;
  else score += 5;

  // CS/min factor (for carries/laners)
  if (metrics.csPerMin >= 8.5) score += 25;
  else if (metrics.csPerMin >= 7.0) score += 20;
  else if (metrics.csPerMin >= 5.5) score += 15;
  else score += 8;

  // Kill Participation factor
  if (metrics.kp >= 65) score += 20;
  else if (metrics.kp >= 50) score += 15;
  else if (metrics.kp >= 35) score += 10;
  else score += 5;

  if (score >= 90) return 'S+';
  if (score >= 82) return 'S';
  if (score >= 75) return 'S-';
  if (score >= 68) return 'A+';
  if (score >= 60) return 'A';
  if (score >= 52) return 'A-';
  if (score >= 42) return 'B+';
  if (score >= 32) return 'B';
  return 'C';
}

export function formatGameDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}m ${secs < 10 ? '0' : ''}${secs}s`;
}

export function formatTimeAgo(timestamp: number): string {
  const now = Date.now();
  const diffMs = Math.max(0, now - timestamp);
  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMinutes < 1) return 'Just now';
  if (diffMinutes < 60) return `${diffMinutes}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 30) return `${diffDays}d ago`;
  return `${Math.floor(diffDays / 30)}mo ago`;
}

export function romanToArabicDivision(division?: string): string {
  if (!division) return '';
  switch (division.toUpperCase()) {
    case 'I': return '1';
    case 'II': return '2';
    case 'III': return '3';
    case 'IV': return '4';
    case 'V': return '5';
    default: return division;
  }
}

export function formatTierBadge(tier: string, division?: string): string {
  const t = tier.toUpperCase();
  if (t === 'MASTER' || t === 'GRANDMASTER' || t === 'CHALLENGER') {
    return t.charAt(0) + t.slice(1).toLowerCase();
  }
  const firstLetter = t.charAt(0);
  const arabic = romanToArabicDivision(division);
  return `${firstLetter}${arabic}`;
}
