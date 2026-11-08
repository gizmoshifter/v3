import React, { useState } from 'react';
import { UserProfile } from '../types/lol.ts';
import { Shield, Sparkles, Trophy, Crosshair, Palette, UserCheck, Flame, RefreshCw, CheckCircle2 } from 'lucide-react';
import { getRankEmblemUrl } from '../utils/lolAssets.ts';
import { formatTierBadge } from '../utils/lolMath.ts';

interface ProfileBannerProps {
  user: UserProfile;
  onOpenThemeModal: () => void;
  onOpenUserSwitcher: () => void;
  onOpenPreviousSeasons: () => void;
}

export const ProfileBanner: React.FC<ProfileBannerProps> = ({
  user,
  onOpenThemeModal,
  onOpenUserSwitcher,
  onOpenPreviousSeasons,
}) => {
  const { rank, profileTheme } = user;
  const winRate = Math.round((rank.wins / (rank.wins + rank.losses)) * 100);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [syncedToast, setSyncedToast] = useState<boolean>(false);

  const currentSeasonPeak = user.currentSeasonPeak || {
    tier: 'EMERALD',
    division: 'I',
    lp: 45,
    season: 'Season 2026 Split 1',
    percentile: 'Top 2.9% NA',
  };

  const allTimePeak = user.allTimePeak || {
    tier: 'MASTER',
    division: 'I',
    lp: 140,
    season: 'Season 2024 Split 1',
    percentile: 'Top 0.8% NA',
  };

  const handleSyncOpgg = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      setSyncedToast(true);
      setTimeout(() => setSyncedToast(false), 3000);
    }, 800);
  };

  return (
    <div className="relative w-full rounded-2xl overflow-hidden glass-panel glass-specular border border-white/12 shadow-2xl transition-all duration-300">
      {/* Background Splash with subtle cyber gradient and liquid glass overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={profileTheme.splashUrl}
          alt={profileTheme.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-top filter brightness-[0.40] contrast-[1.15] transform scale-105 transition-transform duration-700 ease-out"
        />
        {/* Multi-layered glass gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#06080e] via-[#06080e]/60 to-transparent" />
        <div
          className="absolute inset-0 opacity-30 mix-blend-color-dodge pointer-events-none"
          style={{
            background: `radial-gradient(circle at 75% 30%, ${profileTheme.accentColor} 0%, transparent 60%)`,
          }}
        />
        <div className="absolute inset-0 project-scanlines opacity-20 pointer-events-none" />
      </div>

      {/* Cyber HUD Brackets */}
      <div className="absolute top-3 left-4 text-[10px] tracking-widest font-mono text-white/50 flex items-center gap-2 z-20">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        <span>RIOT.ACCOUNT // OP.GG SYNCED (CURRENT: {rank.tier} {rank.division} • PEAK: {allTimePeak.tier} {allTimePeak.lp}LP)</span>
        {syncedToast && (
          <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Synced with OP.GG
          </span>
        )}
      </div>

      <div className="absolute top-3 right-4 flex items-center gap-2 z-20">
        <button
          onClick={onOpenPreviousSeasons}
          className="btn-tactile px-3 py-1.5 rounded-lg text-xs font-semibold bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-200 backdrop-blur-md flex items-center gap-1.5 shadow-sm"
          title="View Season Peaks & Past Seasons History"
        >
          <Trophy className="w-3.5 h-3.5 text-amber-400" />
          <span>Peak Ranks</span>
        </button>
        <button
          onClick={handleSyncOpgg}
          disabled={isSyncing}
          className="btn-tactile px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 text-emerald-200 backdrop-blur-md flex items-center gap-1.5 shadow-sm"
          title="Fetch latest stats & icon from OP.GG / Riot API"
        >
          <RefreshCw className={`w-3.5 h-3.5 text-emerald-400 ${isSyncing ? 'animate-spin' : ''}`} />
          <span>{isSyncing ? 'Syncing...' : 'Sync OP.GG'}</span>
        </button>
        <button
          onClick={onOpenUserSwitcher}
          className="btn-tactile px-3 py-1.5 rounded-lg text-xs font-semibold bg-white/10 hover:bg-white/15 border border-white/15 text-slate-200 backdrop-blur-md flex items-center gap-1.5 shadow-sm"
          title="Switch active summoner"
        >
          <UserCheck className="w-3.5 h-3.5 text-cyan-400" />
          <span>Switch User</span>
        </button>
        <button
          onClick={onOpenThemeModal}
          className="btn-tactile px-3 py-1.5 rounded-lg text-xs font-semibold bg-white/10 hover:bg-white/15 border border-white/15 text-slate-200 backdrop-blur-md flex items-center gap-1.5 shadow-sm"
          title="Customize Theme & Background"
        >
          <Palette className="w-3.5 h-3.5 text-rose-400" />
          <span>Background</span>
        </button>
      </div>

      {/* Banner Content */}
      <div className="relative z-10 p-6 sm:p-8 flex flex-col md:flex-row md:items-end justify-between gap-6 pt-12">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
          {/* Avatar with cybernetic border */}
          <div className="relative group">
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl p-1 bg-gradient-to-br from-rose-500/60 via-purple-500/40 to-cyan-500/60 shadow-[0_0_24px_rgba(244,63,94,0.35)]">
              <img
                src={`https://ddragon.leagueoflegends.com/cdn/14.24.1/img/profileicon/${user.profileIconId}.png`}
                alt={user.summonerName}
                className="w-full h-full object-cover rounded-xl"
              />
              {/* Level Badge */}
              <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full text-[11px] font-bold font-mono bg-slate-900 border border-rose-500/50 text-rose-300 shadow-md">
                LVL {user.summonerLevel}
              </div>
            </div>
            {/* Quick theme trigger badge */}
            <button
              onClick={onOpenThemeModal}
              className="absolute -top-1.5 -right-1.5 p-1 rounded-full bg-slate-900/90 border border-white/20 text-white/80 hover:text-rose-400 transition-colors shadow-lg"
              title="Change summoner icon"
            >
              <Sparkles className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Summoner Name & Status */}
          <div>
            <div className="flex items-center gap-2.5 flex-wrap">
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white flex items-center gap-2">
                <span>{user.summonerName}</span>
                <span className="text-base font-semibold text-rose-400/90 font-mono">#{user.tagLine}</span>
              </h1>
              <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                {user.region}
              </span>
              <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                <Crosshair className="w-3 h-3 text-emerald-400" />
                {profileTheme.name}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 italic mt-1.5 max-w-md font-sans">
              "{profileTheme.quote}"
            </p>

            {/* OP.GG Previous Seasons Badging Row */}
            <div className="flex items-center gap-1.5 mt-2.5 flex-wrap">
              <span className="text-[10px] font-mono text-slate-400 font-semibold uppercase tracking-wider">
                Previous Seasons:
              </span>
              {user.previousSeasons?.slice(0, 4).map((ps, idx) => (
                <button
                  key={idx}
                  onClick={onOpenPreviousSeasons}
                  className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 transition-colors flex items-center gap-1 group/badge"
                  title={`${ps.season}: Finished ${ps.tier} ${ps.division || ''} • Peak: ${ps.peakRankDisplay} • Click to open season peaks history`}
                >
                  <span className="text-slate-400 group-hover/badge:text-slate-200">{ps.shortBadge}:</span>
                  <span className={ps.tier === 'MASTER' ? 'text-purple-300 font-black' : ps.tier === 'DIAMOND' ? 'text-cyan-300 font-bold' : 'text-emerald-300 font-bold'}>
                    {formatTierBadge(ps.tier, ps.division)}
                  </span>
                  <span className="text-[9px] text-amber-300/90 font-medium">
                    (Peak {formatTierBadge(ps.peakTier, ps.peakDivision)})
                  </span>
                </button>
              ))}
              <button
                onClick={onOpenPreviousSeasons}
                className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-500/30 transition-colors flex items-center gap-1 shadow-sm"
                title="View full previous seasons peak rankings"
              >
                <Trophy className="w-2.5 h-2.5 text-amber-400" />
                <span>+ All Seasons</span>
              </button>
            </div>

            {/* Micro Quick Badges */}
            <div className="flex items-center gap-3 mt-2.5 text-xs text-slate-400 flex-wrap">
              <div className="flex items-center gap-1 text-emerald-400 font-medium">
                <Flame className="w-3.5 h-3.5" />
                <span>68% Vayne Win Rate</span>
              </div>
              <span className="text-white/20">•</span>
              <div className="flex items-center gap-1 text-cyan-300">
                <Shield className="w-3.5 h-3.5 text-cyan-400" />
                <span>Top 4.2% NA</span>
              </div>
              <span className="text-white/20">•</span>
              <span className="text-slate-400">Favorite Role: ADC (Bot 88%)</span>
            </div>
          </div>
        </div>

        {/* Dual Rank & Stats Snapshot Widget: Current Rank + Peak Ranks */}
        <div
          onClick={onOpenPreviousSeasons}
          className="flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-slate-950/55 backdrop-blur-xl px-5 py-3.5 rounded-xl border border-white/12 self-stretch md:self-auto justify-between md:justify-end shadow-inner relative group/rank cursor-pointer hover:border-amber-400/40 transition-colors"
          title="Click to view full peak rank breakdown and previous seasons"
        >
          {/* Official Current Rank Emblem */}
          <div className="flex items-center gap-3.5">
            <div className="relative shrink-0 flex items-center justify-center">
              <img
                src={getRankEmblemUrl(rank.tier)}
                alt={`${rank.tier} Emblem`}
                referrerPolicy="no-referrer"
                className="w-13 h-13 sm:w-15 sm:h-15 object-contain filter drop-shadow-[0_0_12px_rgba(16,185,129,0.45)] group-hover/rank:scale-105 transition-transform"
              />
            </div>

            <div className="text-left">
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] uppercase tracking-wider text-emerald-400 font-bold font-mono bg-emerald-500/20 px-1.5 py-0.2 rounded border border-emerald-500/30">
                  CURRENT RANK
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Solo/Duo</span>
              </div>
              <div className="text-base sm:text-lg font-black text-white flex items-center gap-1.5 font-mono mt-0.5">
                <span className="text-emerald-400 font-extrabold tracking-wide">{rank.tier} {rank.division}</span>
                <span className="text-xs font-mono text-emerald-300 font-bold ml-0.5 bg-emerald-500/20 px-1.5 py-0.5 rounded border border-emerald-500/30">
                  {rank.lp} LP
                </span>
              </div>
              <div className="text-xs text-slate-300 font-mono mt-0.5">
                <span className="text-emerald-400 font-bold">{rank.wins}W</span>{' '}
                <span className="text-rose-400 font-bold">{rank.losses}L</span>{' '}
                <span className="text-cyan-300 font-bold">({winRate}%)</span>
              </div>
            </div>
          </div>

          <div className="w-[1px] h-12 bg-white/10 hidden sm:block" />

          {/* Peak Rank Section */}
          <div className="text-left sm:text-right font-mono">
            <div className="flex sm:justify-end items-center gap-1 text-[10px] uppercase tracking-wider text-amber-400 font-bold">
              <Trophy className="w-3 h-3 text-amber-400" />
              <span>PEAK RANKINGS</span>
            </div>
            <div className="text-xs text-slate-200 font-semibold mt-0.5 flex sm:justify-end items-center gap-1 whitespace-nowrap">
              <span className="text-slate-400 text-[11px]">Split Peak:</span>
              <span className="text-emerald-300 font-bold">{currentSeasonPeak.tier} {currentSeasonPeak.division} ({currentSeasonPeak.lp} LP)</span>
            </div>
            <div className="text-xs text-purple-300 font-black mt-0.5 flex sm:justify-end items-center gap-1 whitespace-nowrap">
              <span className="text-slate-400 text-[11px]">All-Time:</span>
              <span className="bg-purple-500/20 px-1.5 py-0.2 rounded border border-purple-500/30 text-purple-300">
                {allTimePeak.tier} {allTimePeak.lp} LP
              </span>
            </div>
            <div className="text-[10px] text-cyan-400/90 font-mono mt-0.5 sm:text-right group-hover/rank:underline">
              View 5 Previous Seasons →
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
