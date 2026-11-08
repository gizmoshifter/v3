import React, { useState } from 'react';
import { PastSeasonRank, PeakRankInfo, SummonerRank, UserProfile } from '../types/lol.ts';
import { getRankEmblemUrl } from '../utils/lolAssets.ts';
import { X, Trophy, Flame, TrendingUp, Calendar, Award, Check, Sparkles, SlidersHorizontal, Shield } from 'lucide-react';

interface PreviousSeasonsModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile;
  onUpdateRank: (newRank: SummonerRank) => void;
}

export const PreviousSeasonsModal: React.FC<PreviousSeasonsModalProps> = ({
  isOpen,
  onClose,
  user,
  onUpdateRank,
}) => {
  if (!isOpen) return null;

  const currentRank = user.rank;
  const currentSeasonPeak: PeakRankInfo = user.currentSeasonPeak || {
    tier: 'EMERALD',
    division: 'I',
    lp: 45,
    season: 'Season 2026 Split 1',
    dateAchieved: '2 weeks ago',
    percentile: 'Top 2.9% NA',
  };

  const allTimePeak: PeakRankInfo = user.allTimePeak || {
    tier: 'MASTER',
    division: 'I',
    lp: 140,
    season: 'Season 2024 Split 1',
    dateAchieved: 'May 2024',
    percentile: 'Top 0.8% NA',
  };

  const seasons: PastSeasonRank[] = user.previousSeasons || [];

  // Calibration state for setting exact rank if decayed or updated
  const [showAdjuster, setShowAdjuster] = useState<boolean>(false);
  const [selectedTier, setSelectedTier] = useState<SummonerRank['tier']>(currentRank.tier);
  const [selectedDivision, setSelectedDivision] = useState<SummonerRank['division']>(currentRank.division);
  const [selectedLp, setSelectedLp] = useState<number>(currentRank.lp);

  const handleApplyRank = () => {
    onUpdateRank({
      tier: selectedTier,
      division: selectedDivision,
      lp: Number(selectedLp),
      wins: currentRank.wins,
      losses: currentRank.losses,
    });
    setShowAdjuster(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl max-h-[90vh] flex flex-col rounded-2xl glass-panel glass-specular border border-white/15 shadow-2xl overflow-hidden bg-slate-950/90">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between shrink-0 bg-slate-900/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold text-white font-mono">
                  Rank History & Previous Seasons Peaks
                </h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  OP.GG Verified
                </span>
              </div>
              <p className="text-xs text-slate-400">
                {user.summonerName} #{user.tagLine} • {user.region} Server • Peak Rankings Archive
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1">
          {/* Top Spotlight Cards: All-Time Peak vs Current Split Peak */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* All-Time Peak Spotlight */}
            <div className="relative p-4 rounded-xl bg-gradient-to-br from-purple-950/40 via-slate-900/40 to-slate-950 border border-purple-500/30 overflow-hidden shadow-lg group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl pointer-events-none" />
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono uppercase tracking-wider bg-purple-500/20 text-purple-300 border border-purple-500/40 flex items-center gap-1 w-fit mb-2">
                    <Sparkles className="w-3 h-3 text-purple-400" />
                    All-Time Highest Peak
                  </span>
                  <div className="text-xl sm:text-2xl font-black text-white font-mono flex items-center gap-2">
                    <span className="text-purple-300">{allTimePeak.tier}</span>
                    <span className="text-sm text-purple-400 font-bold bg-purple-500/15 px-2 py-0.5 rounded border border-purple-500/30">
                      {allTimePeak.lp} LP
                    </span>
                  </div>
                  <div className="text-xs text-slate-300 font-mono mt-1">
                    {allTimePeak.season}
                  </div>
                  <div className="text-[11px] text-purple-300 font-semibold mt-1">
                    Percentile: {allTimePeak.percentile || 'Top 0.8% NA'}
                  </div>
                </div>
                <img
                  src={getRankEmblemUrl(allTimePeak.tier)}
                  alt={`${allTimePeak.tier} Crest`}
                  className="w-16 h-16 object-contain filter drop-shadow-[0_0_15px_rgba(168,85,247,0.4)] group-hover:scale-105 transition-transform shrink-0"
                />
              </div>
            </div>

            {/* Current Season 2026 Breakdown */}
            <div className="relative p-4 rounded-xl bg-gradient-to-br from-emerald-950/40 via-slate-900/40 to-slate-950 border border-emerald-500/30 overflow-hidden shadow-lg group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1 w-fit mb-2">
                    <Flame className="w-3 h-3 text-emerald-400" />
                    Season 2026 Split 1
                  </span>

                  <div className="space-y-1.5 mt-1">
                    <div className="text-xs font-mono flex items-center gap-1.5 flex-wrap">
                      <span className="text-slate-400">Current:</span>
                      <span className="font-extrabold text-emerald-400 text-sm">{currentRank.tier} {currentRank.division}</span>
                      <span className="text-[11px] bg-emerald-500/20 px-1.5 py-0.2 rounded text-emerald-300 font-bold border border-emerald-500/30">
                        {currentRank.lp} LP
                      </span>
                    </div>

                    <div className="text-xs font-mono flex items-center gap-1.5 flex-wrap">
                      <span className="text-slate-400">Season Peak:</span>
                      <span className="font-bold text-amber-300">{currentSeasonPeak.tier} {currentSeasonPeak.division}</span>
                      <span className="text-[11px] bg-amber-500/20 px-1.5 py-0.2 rounded text-amber-300 font-bold border border-amber-500/30">
                        {currentSeasonPeak.lp} LP
                      </span>
                    </div>
                  </div>

                  <div className="text-[11px] text-emerald-400/90 font-mono mt-1.5">
                    {currentRank.wins}W {currentRank.losses}L ({Math.round((currentRank.wins / (currentRank.wins + currentRank.losses)) * 100)}% WR)
                  </div>
                </div>
                <img
                  src={getRankEmblemUrl(currentRank.tier)}
                  alt={`${currentRank.tier} Crest`}
                  className="w-16 h-16 object-contain filter drop-shadow-[0_0_15px_rgba(16,185,129,0.4)] group-hover:scale-105 transition-transform shrink-0"
                />
              </div>
            </div>
          </div>

          {/* Quick Rank Calibrator / Clarifier Toggle */}
          <div className="p-3.5 rounded-xl bg-slate-900/50 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <SlidersHorizontal className="w-4 h-4 text-cyan-400 shrink-0" />
              <div>
                <div className="text-xs font-bold text-white font-mono">
                  Rank Verification & Status Calibration
                </div>
                <div className="text-[11px] text-slate-400">
                  Currently showing <span className="text-emerald-400 font-bold">{currentRank.tier} {currentRank.division} ({currentRank.lp} LP)</span> as active rank. Need to adjust between current and peak?
                </div>
              </div>
            </div>
            <button
              onClick={() => setShowAdjuster(!showAdjuster)}
              className="btn-tactile px-3 py-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 text-xs font-mono font-bold shrink-0 self-start sm:self-auto"
            >
              {showAdjuster ? 'Hide Calibrator' : 'Adjust Active Rank'}
            </button>
          </div>

          {/* Adjuster Form */}
          {showAdjuster && (
            <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-500/30 space-y-3 animate-in slide-in-from-top-2 duration-150">
              <div className="text-xs font-mono font-bold text-cyan-300">
                Quick-Select or Calibrate Current Ranked Tier:
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  { tier: 'EMERALD' as const, div: 'IV' as const, lp: 68, label: 'Emerald IV (68 LP) - Current' },
                  { tier: 'EMERALD' as const, div: 'I' as const, lp: 45, label: 'Emerald I (45 LP) - Season Peak' },
                  { tier: 'PLATINUM' as const, div: 'I' as const, lp: 85, label: 'Platinum I (85 LP)' },
                  { tier: 'DIAMOND' as const, div: 'IV' as const, lp: 25, label: 'Diamond IV (25 LP)' },
                ].map((preset, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setSelectedTier(preset.tier);
                      setSelectedDivision(preset.div);
                      setSelectedLp(preset.lp);
                    }}
                    className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold border transition-colors ${
                      selectedTier === preset.tier && selectedDivision === preset.div && selectedLp === preset.lp
                        ? 'bg-cyan-500/30 text-cyan-200 border-cyan-400'
                        : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10'
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-3 gap-3 pt-2">
                <div>
                  <label className="block text-[11px] font-mono text-slate-400 mb-1">Tier</label>
                  <select
                    value={selectedTier}
                    onChange={(e) => setSelectedTier(e.target.value as SummonerRank['tier'])}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-black/60 border border-white/15 text-xs font-mono text-white"
                  >
                    {['IRON', 'BRONZE', 'SILVER', 'GOLD', 'PLATINUM', 'EMERALD', 'DIAMOND', 'MASTER', 'GRANDMASTER', 'CHALLENGER'].map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-mono text-slate-400 mb-1">Division</label>
                  <select
                    value={selectedDivision}
                    onChange={(e) => setSelectedDivision(e.target.value as SummonerRank['division'])}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-black/60 border border-white/15 text-xs font-mono text-white"
                  >
                    {['I', 'II', 'III', 'IV'].map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-mono text-slate-400 mb-1">LP</label>
                  <input
                    type="number"
                    min={0}
                    max={100}
                    value={selectedLp}
                    onChange={(e) => setSelectedLp(Number(e.target.value))}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-black/60 border border-white/15 text-xs font-mono text-white"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  onClick={() => setShowAdjuster(false)}
                  className="px-3 py-1.5 rounded-lg text-xs font-mono bg-white/5 text-slate-300 hover:bg-white/10"
                >
                  Cancel
                </button>
                <button
                  onClick={handleApplyRank}
                  className="px-4 py-1.5 rounded-lg text-xs font-mono font-bold bg-emerald-500/30 text-emerald-200 border border-emerald-400/50 hover:bg-emerald-500/40 flex items-center gap-1.5"
                >
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  Save Rank Setting
                </button>
              </div>
            </div>
          )}

          {/* Previous Seasons Peak History Matrix */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 font-mono flex items-center gap-2">
                <Calendar className="w-4 h-4 text-cyan-400" />
                <span>Historical Season Peaks & Final Rankings</span>
              </h4>
              <span className="text-[11px] font-mono text-slate-400">
                5 Recorded Seasons (S11 – S14)
              </span>
            </div>

            <div className="space-y-2.5">
              {seasons.map((season, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-slate-900/40 hover:bg-slate-900/60 border border-white/10 transition-all flex flex-col md:flex-row md:items-center justify-between gap-3 group"
                >
                  {/* Season Badge & Crest */}
                  <div className="flex items-center gap-3">
                    <div className="relative shrink-0">
                      <img
                        src={getRankEmblemUrl(season.peakTier)}
                        alt={`${season.peakTier} Emblem`}
                        className="w-10 h-10 object-contain filter drop-shadow group-hover:scale-105 transition-transform"
                      />
                      <span className="absolute -bottom-1 -right-1 px-1 py-0.2 rounded text-[8px] font-bold font-mono bg-black/90 border border-white/30 text-white">
                        {season.shortBadge}
                      </span>
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-white font-mono">{season.season}</span>
                        <span className="px-1.5 py-0.2 rounded text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-0.5">
                          <Award className="w-2.5 h-2.5 text-amber-400" />
                          Peak: {season.peakRankDisplay}
                        </span>
                      </div>
                      <div className="text-xs text-slate-400 font-mono mt-0.5">
                        End Rank: <span className="text-slate-200 font-semibold">{season.tier} {season.division || ''} ({season.finalLp ?? 0} LP)</span>
                      </div>
                    </div>
                  </div>

                  {/* Stats: Win Rate, Total Games, Top Champion */}
                  <div className="flex items-center gap-4 sm:gap-6 text-xs font-mono shrink-0 ml-13 md:ml-0">
                    <div className="text-left sm:text-right">
                      <div className="text-slate-300 font-bold">{season.gamesPlayed} Games</div>
                      <div className="text-emerald-400 font-semibold">{season.winRate}% Win Rate</div>
                    </div>

                    <div className="w-[1px] h-8 bg-white/10 hidden sm:block" />

                    <div className="flex items-center gap-2">
                      {season.topChampion.iconUrl && (
                        <img
                          src={season.topChampion.iconUrl}
                          alt={season.topChampion.name}
                          className="w-7 h-7 rounded-lg object-cover border border-white/15"
                        />
                      )}
                      <div>
                        <div className="text-white font-bold">{season.topChampion.name}</div>
                        <div className="text-[10px] text-amber-300 font-mono">
                          {season.topChampion.games}G ({season.topChampion.winRate}% WR)
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/10 bg-slate-900/60 flex items-center justify-between shrink-0">
          <div className="text-xs text-slate-400 font-mono flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5 text-emerald-400" />
            <span>Peak ranks are permanently archived from official Riot season end snapshots.</span>
          </div>
          <button
            onClick={onClose}
            className="btn-tactile px-4 py-1.5 rounded-lg text-xs font-mono font-bold bg-white/10 hover:bg-white/15 text-white border border-white/15"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
