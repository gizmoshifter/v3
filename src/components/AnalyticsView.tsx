import React from 'react';
import { UserProfile } from '../types/lol.ts';
import { ERIC_MATCH_HISTORY } from '../data/mockLolData.ts';
import { BarChart3, TrendingUp, Zap, Target, Eye, Swords, ShieldCheck, Award } from 'lucide-react';

interface AnalyticsViewProps {
  user: UserProfile;
}

export const AnalyticsView: React.FC<AnalyticsViewProps> = ({ user }) => {
  const matches = ERIC_MATCH_HISTORY;
  const totalMatches = matches.length;
  const wins = matches.filter((m) => m.win).length;
  const winRate = Math.round((wins / totalMatches) * 100);

  const avgKills = (matches.reduce((acc, m) => acc + m.kills, 0) / totalMatches).toFixed(1);
  const avgDeaths = (matches.reduce((acc, m) => acc + m.deaths, 0) / totalMatches).toFixed(1);
  const avgAssists = (matches.reduce((acc, m) => acc + m.assists, 0) / totalMatches).toFixed(1);
  const avgCS = Math.round(matches.reduce((acc, m) => acc + m.cs, 0) / totalMatches);
  const avgVision = Math.round(matches.reduce((acc, m) => acc + m.visionScore, 0) / totalMatches);
  const avgKP = Math.round(matches.reduce((acc, m) => acc + m.killParticipation, 0) / totalMatches);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-panel rounded-2xl p-6 border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-rose-400" />
            <span>Combat Efficiency &amp; Performance Radar</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Aggregated analytical trends over your recent competitive matches.
          </p>
        </div>
        <div className="flex items-center gap-2 font-mono text-xs">
          <span className="px-3 py-1.5 rounded-lg bg-rose-500/15 border border-rose-500/30 text-rose-300">
            Carry Rating: <strong className="text-rose-200">S+ (Elite)</strong>
          </span>
        </div>
      </div>

      {/* High-level KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-panel p-5 rounded-2xl border border-white/10 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
            <span>Win Rate (Recent)</span>
            <TrendingUp className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-black text-emerald-400 font-mono my-2">{winRate}%</div>
          <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
            <div className="bg-emerald-400 h-full rounded-full" style={{ width: `${winRate}%` }} />
          </div>
          <div className="text-[11px] text-slate-400 font-mono mt-1.5">{wins}W - {totalMatches - wins}L</div>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-white/10 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
            <span>Average KDA</span>
            <Swords className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white font-mono my-2">
            {avgKills} / {avgDeaths} / {avgAssists}
          </div>
          <div className="text-xs font-mono text-cyan-400 font-bold">
            {((Number(avgKills) + Number(avgAssists)) / Number(avgDeaths)).toFixed(2)}:1 Ratio
          </div>
          <div className="text-[11px] text-slate-400 font-mono mt-0.5">Top 3.8% of Tier</div>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-white/10 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
            <span>Kill Participation</span>
            <Target className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-3xl font-black text-amber-400 font-mono my-2">{avgKP}%</div>
          <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
            <div className="bg-amber-400 h-full rounded-full" style={{ width: `${avgKP}%` }} />
          </div>
          <div className="text-[11px] text-slate-400 font-mono mt-1.5">High Teamfight Impact</div>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-white/10 flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
            <span>Average CS</span>
            <Zap className="w-4 h-4 text-rose-400" />
          </div>
          <div className="text-3xl font-black text-rose-300 font-mono my-2">{avgCS}</div>
          <div className="text-xs font-mono text-emerald-400 font-bold">~ 8.4 CS / min</div>
          <div className="text-[11px] text-slate-400 font-mono mt-0.5">Wave Control Priority</div>
        </div>
      </div>

      {/* Analytical Insights & Strengths */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-panel rounded-2xl p-6 border border-white/10">
          <h3 className="text-sm font-bold uppercase tracking-wider text-white font-mono mb-4 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Key Gameplay Strengths</span>
          </h3>
          <ul className="space-y-3 text-xs text-slate-300">
            <li className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-start gap-2.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 mt-1 shrink-0" />
              <div>
                <strong className="text-white">Late Game Teamfight Positioning:</strong> Consistently accounts for 34%+ of total team damage output in games exceeding 25 minutes.
              </div>
            </li>
            <li className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-start gap-2.5">
              <span className="w-2 h-2 rounded-full bg-cyan-400 mt-1 shrink-0" />
              <div>
                <strong className="text-white">CS Consistency:</strong> Averaging 8.4 CS/minute ensures rapid item power-spikes across Vayne and Kai'Sa games.
              </div>
            </li>
            <li className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-start gap-2.5">
              <span className="w-2 h-2 rounded-full bg-rose-400 mt-1 shrink-0" />
              <div>
                <strong className="text-white">PROJECT: Vayne Hyper-Carry:</strong> 68.5% win rate over 184 matches makes Vayne your primary win condition.
              </div>
            </li>
          </ul>
        </div>

        <div className="glass-panel rounded-2xl p-6 border border-white/10">
          <h3 className="text-sm font-bold uppercase tracking-wider text-white font-mono mb-4 flex items-center gap-2">
            <Eye className="w-4 h-4 text-cyan-400" />
            <span>Vision &amp; Objective Control</span>
          </h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs font-mono mb-1 text-slate-300">
                <span>Vision Score / Game</span>
                <span className="text-cyan-400 font-bold">{avgVision} Score</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                <div className="bg-cyan-400 h-full rounded-full" style={{ width: '72%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-mono mb-1 text-slate-300">
                <span>Dragon Participation</span>
                <span className="text-amber-400 font-bold">78% Rate</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                <div className="bg-amber-400 h-full rounded-full" style={{ width: '78%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-mono mb-1 text-slate-300">
                <span>Baron Power Plays</span>
                <span className="text-rose-400 font-bold">85% Win on Take</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                <div className="bg-rose-400 h-full rounded-full" style={{ width: '85%' }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
