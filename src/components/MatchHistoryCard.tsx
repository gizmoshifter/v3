import React, { useState } from 'react';
import { Match } from '../types/lol.ts';
import { calculateCSPerMin, calculateKDA, formatGameDuration, formatTimeAgo } from '../utils/lolMath.ts';
import { ChevronDown, ChevronUp, Crown, Zap, BarChart2, Shield } from 'lucide-react';

interface MatchHistoryCardProps {
  match: Match;
}

export const MatchHistoryCard: React.FC<MatchHistoryCardProps> = ({ match }) => {
  const [expanded, setExpanded] = useState<boolean>(false);
  const kda = calculateKDA(match.kills, match.deaths, match.assists);
  const csPerMin = calculateCSPerMin(match.cs, match.gameDuration);

  // Grade color map
  const getGradeStyle = (grade: string) => {
    if (grade.startsWith('S')) return 'bg-amber-500/20 text-amber-300 border-amber-500/40 shadow-[0_0_10px_rgba(245,158,11,0.2)]';
    if (grade.startsWith('A')) return 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40';
    return 'bg-slate-700/30 text-slate-300 border-slate-600/40';
  };

  // Always render exactly 6 item slots + trinket for standard OP.GG visual alignment
  const itemSlots = Array.from({ length: 6 }).map((_, i) => match.items[i] || { id: 0, name: 'Empty Slot', iconUrl: '' });

  return (
    <div
      className={`glass-panel-interactive rounded-xl overflow-hidden border transition-all ${
        match.win
          ? 'border-cyan-500/30 hover:border-cyan-400/50 bg-gradient-to-r from-cyan-950/20 via-slate-900/30 to-slate-900/40'
          : 'border-rose-500/30 hover:border-rose-400/50 bg-gradient-to-r from-rose-950/20 via-slate-900/30 to-slate-900/40'
      }`}
    >
      {/* Top Main Row - Strict Non-Overlapping Column Grid */}
      <div className="p-3 sm:p-3.5 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-2.5 sm:gap-3">
        {/* Left Block: Meta + Champion + Spells + Badges */}
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          {/* Col 1: Outcome & Duration */}
          <div className="w-[66px] shrink-0 flex flex-col items-center justify-center text-center">
            <span
              className={`text-xs font-black tracking-wider uppercase font-mono ${
                match.win ? 'text-cyan-400 cyan-hud-glow' : 'text-rose-400 project-vayne-glow'
              }`}
            >
              {match.win ? 'Victory' : 'Defeat'}
            </span>
            <span className="text-[11px] font-mono text-slate-300 font-semibold mt-0.5">
              {formatGameDuration(match.gameDuration)}
            </span>
            <span className="text-[10px] text-slate-400 font-mono">
              {match.gameMode}
            </span>
            <span className="text-[10px] text-slate-500 font-mono">
              {formatTimeAgo(match.gameCreation)}
            </span>
          </div>

          <div className="w-[1px] h-10 bg-white/10 hidden sm:block shrink-0" />

          {/* Col 2: Champion Avatar + Spells + Details & Badges */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Champion Portrait with overlaid level */}
            <div className="relative w-11 h-11 min-w-[44px] min-h-[44px] shrink-0 rounded-xl overflow-hidden bg-slate-900 border border-white/20 shadow-md group">
              <img
                src={match.champion.iconUrl}
                alt={match.champion.name}
                loading="lazy"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = `https://ddragon.leagueoflegends.com/cdn/14.24.1/img/champion/${match.champion.name || 'Vayne'}.png`;
                }}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              />
              <span className="absolute bottom-0.5 right-0.5 px-1 py-0.2 rounded text-[8px] font-bold font-mono bg-slate-950/90 border border-white/30 text-white shadow">
                {match.champion.level}
              </span>
            </div>

            {/* Spells & Runes: fixed 2x2 grid */}
            <div className="w-9 min-w-[36px] shrink-0 grid grid-cols-2 gap-0.5">
              <img
                src={match.spell1.iconUrl}
                alt={match.spell1.name}
                title={match.spell1.name}
                referrerPolicy="no-referrer"
                className="w-4 h-4 min-w-[16px] min-h-[16px] rounded object-cover border border-white/10 bg-slate-900 shrink-0"
              />
              <img
                src={match.primaryRune.iconUrl}
                alt={match.primaryRune.name}
                title={match.primaryRune.name}
                referrerPolicy="no-referrer"
                className="w-4 h-4 min-w-[16px] min-h-[16px] rounded-full object-cover bg-black/70 p-0.5 border border-amber-400/50 shrink-0"
              />
              <img
                src={match.spell2.iconUrl}
                alt={match.spell2.name}
                title={match.spell2.name}
                referrerPolicy="no-referrer"
                className="w-4 h-4 min-w-[16px] min-h-[16px] rounded object-cover border border-white/10 bg-slate-900 shrink-0"
              />
              <img
                src={match.secondaryRuneTree.iconUrl}
                alt={match.secondaryRuneTree.name}
                title={match.secondaryRuneTree.name}
                referrerPolicy="no-referrer"
                className="w-4 h-4 min-w-[16px] min-h-[16px] rounded-full object-cover bg-black/70 p-0.5 border border-white/20 shrink-0"
              />
            </div>

            {/* Champion Name & Badges */}
            <div className="w-[90px] shrink-0 flex flex-col justify-center">
              <div className="flex items-center gap-1">
                <span className="text-xs sm:text-sm font-bold text-white truncate">{match.champion.name}</span>
                <span className={`px-1 py-0.2 rounded text-[9px] font-bold font-mono border ${getGradeStyle(match.grade)}`}>
                  {match.grade}
                </span>
              </div>
              {/* Dedicated row for badges: MVP / Ace / Multikill */}
              <div className="flex items-center gap-1 mt-0.5 flex-wrap">
                {match.mvp && (
                  <span className="px-1.5 py-0.2 rounded text-[9px] font-bold font-mono bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center gap-0.5 shadow">
                    <Crown className="w-2.5 h-2.5 text-amber-400" />
                    MVP
                  </span>
                )}
                {!match.win && !match.mvp && match.damageShare >= 30 && (
                  <span className="px-1.5 py-0.2 rounded text-[9px] font-bold font-mono bg-purple-500/20 text-purple-300 border border-purple-500/40 shadow">
                    ACE
                  </span>
                )}
                {match.multikill && (
                  <span className="px-1.5 py-0.2 rounded text-[9px] font-bold font-mono bg-rose-500/20 text-rose-300 border border-rose-500/40 shadow animate-pulse">
                    {match.multikill.toUpperCase()}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="w-[1px] h-9 bg-white/10 hidden sm:block shrink-0" />

        {/* Center Block: KDA + CS/Damage */}
        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
          {/* Col 3: KDA Performance */}
          <div className="w-[88px] shrink-0 text-center font-mono">
            <div className="text-xs sm:text-sm font-black text-white tracking-wide">
              <span className="text-slate-100">{match.kills}</span>
              <span className="text-slate-500 mx-0.5">/</span>
              <span className="text-rose-400">{match.deaths}</span>
              <span className="text-slate-500 mx-0.5">/</span>
              <span className="text-slate-100">{match.assists}</span>
            </div>
            <div className="text-[11px] font-semibold text-cyan-400 mt-0.5">
              {kda.formatted} KDA
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5">
              {match.killParticipation}% P/Kill
            </div>
          </div>

          <div className="w-[1px] h-9 bg-white/10 hidden md:block shrink-0" />

          {/* Col 4: Farm, Damage & Vision */}
          <div className="w-[90px] shrink-0 text-xs font-mono text-slate-300 space-y-0.5">
            <div>
              <span className="text-white font-bold">{match.cs}</span>{' '}
              <span className="text-slate-400 text-[10px]">CS ({csPerMin}/m)</span>
            </div>
            <div>
              <span className="text-amber-300 font-semibold">{match.damageDealt.toLocaleString()}</span>{' '}
              <span className="text-slate-400 text-[10px]">Dmg ({match.damageShare}%)</span>
            </div>
            <div>
              <span className="text-cyan-300 font-semibold">{match.visionScore}</span>{' '}
              <span className="text-slate-400 text-[10px]">Vision</span>
            </div>
          </div>
        </div>

        <div className="w-[1px] h-9 bg-white/10 hidden lg:block shrink-0" />

        {/* Right Block: Items + Teams + Details */}
        <div className="flex items-center gap-3 sm:gap-4 shrink-0 ml-auto xl:ml-0">
          {/* Col 5: Items Grid (2x3) + Trinket - Strict 6-slot Fixed Grid */}
          <div className="w-[116px] shrink-0 flex items-center gap-1.5">
            <div className="w-[84px] shrink-0 grid grid-cols-3 gap-1">
              {itemSlots.map((item, idx) => (
                <div
                  key={idx}
                  className="w-6.5 h-6.5 min-w-[26px] min-h-[26px] rounded-md bg-black/60 border border-white/15 overflow-hidden relative group/item shrink-0"
                  title={item.name || 'Empty Slot'}
                >
                  {item.id > 0 ? (
                    <img
                      src={item.iconUrl}
                      alt={item.name}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover/item:scale-110 transition-transform"
                    />
                  ) : (
                    <div className="w-full h-full bg-slate-900/60 border border-white/5" />
                  )}
                </div>
              ))}
            </div>

            {/* Trinket */}
            <div
              className="w-6.5 h-6.5 min-w-[26px] min-h-[26px] rounded-md bg-black/60 border border-amber-400/40 overflow-hidden relative shrink-0 group/trinket"
              title={match.trinket.name}
            >
              <img
                src={match.trinket.iconUrl}
                alt={match.trinket.name}
                loading="lazy"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover/trinket:scale-110 transition-transform"
              />
            </div>
          </div>

          {/* Col 6: Compact Team Rosters */}
          <div className="hidden xl:flex items-center gap-2 py-1 px-2 rounded-lg bg-black/35 border border-white/5 shrink-0">
            <div className="space-y-0.5">
              {match.teams.blue.map((p, idx) => (
                <div key={idx} className="flex items-center gap-1">
                  <img
                    src={p.championIcon}
                    alt={p.championName}
                    title={`${p.summonerName} (${p.championName})`}
                    referrerPolicy="no-referrer"
                    className={`w-3.5 h-3.5 rounded object-cover shrink-0 ${p.isSelf ? 'ring-1 ring-rose-400' : ''}`}
                  />
                  <span className={`w-10 truncate text-[9px] font-mono leading-none ${p.isSelf ? 'text-rose-400 font-bold' : 'text-slate-400'}`}>
                    {p.summonerName}
                  </span>
                </div>
              ))}
            </div>
            <div className="space-y-0.5">
              {match.teams.red.map((p, idx) => (
                <div key={idx} className="flex items-center gap-1">
                  <img
                    src={p.championIcon}
                    alt={p.championName}
                    title={`${p.summonerName} (${p.championName})`}
                    referrerPolicy="no-referrer"
                    className="w-3.5 h-3.5 rounded object-cover shrink-0"
                  />
                  <span className="w-10 truncate text-[9px] font-mono leading-none text-slate-400">
                    {p.summonerName}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Col 7: Details Expand Button */}
          <button
            onClick={() => setExpanded(!expanded)}
            className="btn-tactile shrink-0 px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition-colors flex items-center justify-center gap-1 text-[11px] font-mono font-semibold"
            title="Toggle match breakdown"
          >
            <span>{expanded ? 'Hide' : 'Details'}</span>
            {expanded ? <ChevronUp className="w-3 h-3 text-rose-400" /> : <ChevronDown className="w-3 h-3 text-slate-400" />}
          </button>
        </div>
      </div>

      {/* Expanded Details Scoreboard */}
      {expanded && (
        <div className="border-t border-white/10 p-4 sm:p-6 bg-slate-950/80 backdrop-blur-xl animate-in slide-in-from-top-2 duration-200">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-300 font-mono flex items-center gap-2">
              <BarChart2 className="w-4 h-4 text-cyan-400" />
              <span>Full Match Scoreboard & Damage Analysis</span>
            </h4>
            <span className="text-xs font-mono text-slate-400">Match ID: {match.matchId}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Blue Team Scoreboard */}
            <div className="p-3 rounded-xl bg-cyan-950/20 border border-cyan-500/20">
              <div className="text-xs font-bold text-cyan-300 font-mono mb-2 flex items-center justify-between">
                <span>BLUE TEAM ({match.teams.blue.reduce((acc, p) => acc + p.kills, 0)} Kills)</span>
                <span>{match.win ? 'WINNER' : 'DEFEATED'}</span>
              </div>
              <div className="space-y-1.5">
                {match.teams.blue.map((p, idx) => (
                  <div
                    key={idx}
                    className={`flex items-center justify-between p-1.5 rounded-lg text-xs font-mono ${
                      p.isSelf ? 'bg-cyan-500/20 border border-cyan-400/40' : 'bg-black/30'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <img src={p.championIcon} alt={p.championName} className="w-6 h-6 rounded-md object-cover" />
                      <div>
                        <div className={`font-bold ${p.isSelf ? 'text-white' : 'text-slate-300'}`}>
                          {p.summonerName} {p.isSelf && '(You)'}
                        </div>
                        <div className="text-[10px] text-slate-400">{p.championName}</div>
                      </div>
                    </div>
                    <div className="text-center font-bold text-slate-200">
                      {p.kills}/{p.deaths}/{p.assists}
                    </div>
                    <div className="text-right text-slate-300">
                      <div className="text-[11px] font-semibold text-amber-300">{p.damageDealt.toLocaleString()} dmg</div>
                      <div className="text-[10px] text-slate-400">{p.cs} CS</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Red Team Scoreboard */}
            <div className="p-3 rounded-xl bg-rose-950/20 border border-rose-500/20">
              <div className="text-xs font-bold text-rose-300 font-mono mb-2 flex items-center justify-between">
                <span>RED TEAM ({match.teams.red.reduce((acc, p) => acc + p.kills, 0)} Kills)</span>
                <span>{!match.win ? 'WINNER' : 'DEFEATED'}</span>
              </div>
              <div className="space-y-1.5">
                {match.teams.red.map((p, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-1.5 rounded-lg text-xs font-mono bg-black/30"
                  >
                    <div className="flex items-center gap-2">
                      <img src={p.championIcon} alt={p.championName} className="w-6 h-6 rounded-md object-cover" />
                      <div>
                        <div className="font-bold text-slate-300">{p.summonerName}</div>
                        <div className="text-[10px] text-slate-400">{p.championName}</div>
                      </div>
                    </div>
                    <div className="text-center font-bold text-slate-200">
                      {p.kills}/{p.deaths}/{p.assists}
                    </div>
                    <div className="text-right text-slate-300">
                      <div className="text-[11px] font-semibold text-amber-300">{p.damageDealt.toLocaleString()} dmg</div>
                      <div className="text-[10px] text-slate-400">{p.cs} CS</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
