import React, { useState } from 'react';
import { ChampionMastery } from '../types/lol.ts';
import { USER_CHAMPIONS_MASTERY } from '../data/mockLolData.ts';
import {
  Trophy,
  Flame,
  Zap,
  Target,
  Swords,
  Shield,
  Layers,
  ChevronRight,
  TrendingUp,
  Award,
  Sparkles,
} from 'lucide-react';

interface ChampionsViewProps {
  initialChampionId?: string;
}

export const ChampionsView: React.FC<ChampionsViewProps> = ({ initialChampionId = 'Vayne' }) => {
  const [selectedChampId, setSelectedChampId] = useState<string>(initialChampionId);

  const selectedChamp =
    USER_CHAMPIONS_MASTERY.find((c) => c.championId === selectedChampId) || USER_CHAMPIONS_MASTERY[0];

  return (
    <div className="space-y-6">
      {/* Top Header Summary */}
      <div className="glass-panel glass-specular rounded-2xl p-5 border border-white/12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2 tracking-tight">
            <Trophy className="w-5 h-5 text-amber-400" />
            <span>Champion Intelligence &amp; Performance</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
            Visual build progressions, skill matrices, rune trees, and matchup winrates.
          </p>
        </div>
        <div className="flex items-center gap-2 font-mono text-xs">
          <span className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-slate-300">
            Carries: <strong className="text-white">{USER_CHAMPIONS_MASTERY.length}</strong>
          </span>
          <span className="px-3 py-1.5 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300">
            Peak WR: <strong className="text-rose-200">64.8%</strong>
          </span>
        </div>
      </div>

      {/* Main Grid: Left Roster Selection + Right Dedicated Deep Dive */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Most Played Champions List */}
        <div className="lg:col-span-4 space-y-3">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs uppercase font-mono tracking-wider text-slate-400 font-bold">
              Champion Pool ({USER_CHAMPIONS_MASTERY.length})
            </span>
            <span className="text-[11px] font-mono text-cyan-400">Select to inspect</span>
          </div>

          <div className="space-y-2">
            {USER_CHAMPIONS_MASTERY.map((champ, rankIdx) => {
              const isSelected = champ.championId === selectedChamp.championId;
              return (
                <button
                  key={champ.championId}
                  onClick={() => setSelectedChampId(champ.championId)}
                  className={`btn-tactile w-full text-left p-3 rounded-2xl border flex items-center justify-between transition-all ${
                    isSelected
                      ? 'bg-rose-500/20 border-rose-500/60 shadow-[0_0_24px_rgba(244,63,94,0.3)]'
                      : 'glass-panel-interactive border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono font-bold text-slate-500 w-4">
                      #{rankIdx + 1}
                    </span>
                    <div className="relative">
                      <img
                        src={champ.iconUrl}
                        alt={champ.championName}
                        className="w-12 h-12 rounded-xl object-cover border border-white/20"
                      />
                      <span className="absolute -bottom-1 -right-1 px-1.5 py-0.2 rounded text-[10px] font-bold font-mono bg-slate-950 border border-white/20 text-rose-300">
                        M{champ.masteryLevel}
                      </span>
                    </div>

                    <div>
                      <div className="text-sm font-bold text-white flex items-center gap-2">
                        <span>{champ.championName}</span>
                        <span className="text-[11px] font-mono font-semibold px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                          {champ.grade}
                        </span>
                      </div>
                      <div className="text-xs text-slate-400 font-mono mt-0.5">
                        {champ.gamesPlayed}G •{' '}
                        <span className="text-emerald-400 font-bold">{champ.winRate}% WR</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-xs font-mono font-bold text-cyan-300">
                      {champ.avgKills}/{champ.avgDeaths}/{champ.avgAssists}
                    </div>
                    <div className="text-[11px] font-mono text-slate-400 mt-0.5">
                      {champ.avgCsPerMin} CS/m
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Dedicated Champion Intelligence & Stats */}
        {/* Shows ONLY the selected champion (e.g. Kai'Sa), clean and visual */}
        <div className="lg:col-span-8">
          <div className="glass-panel glass-specular rounded-2xl overflow-hidden border border-white/12 relative space-y-6">
            {/* Splash Art Hero Header for Selected Champion */}
            <div className="relative h-56 sm:h-64 overflow-hidden">
              <img
                src={selectedChamp.splashUrl}
                alt={selectedChamp.championName}
                className="w-full h-full object-cover object-top filter brightness-[0.55] contrast-[1.08]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f19] via-[#0b0f19]/60 to-transparent" />
              
              {/* Badges on Splash */}
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-lg text-xs font-mono font-bold bg-rose-500/30 text-rose-200 border border-rose-500/50 backdrop-blur-md">
                  MASTERY {selectedChamp.masteryLevel} • {selectedChamp.masteryPoints.toLocaleString()} PTS
                </span>
                <span className="px-2.5 py-1 rounded-lg text-xs font-mono font-bold bg-cyan-500/30 text-cyan-200 border border-cyan-500/50 backdrop-blur-md">
                  ROLE: {selectedChamp.role}
                </span>
              </div>

              {/* Title & Name */}
              <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between">
                <div>
                  <h3 className="text-3xl font-black text-white tracking-tight flex items-center gap-2">
                    <span>{selectedChamp.championName}</span>
                    <span className="text-sm sm:text-base text-slate-400 font-normal italic">
                      — {selectedChamp.title}
                    </span>
                  </h3>
                  <div className="text-xs text-rose-400 font-mono mt-1 flex items-center gap-3">
                    <span className="flex items-center gap-1 font-bold">
                      <Flame className="w-3.5 h-3.5 text-rose-400" />
                      {selectedChamp.winRate}% Win Rate over {selectedChamp.gamesPlayed} Matches
                    </span>
                    <span>•</span>
                    <span className="text-amber-300 font-semibold font-mono">
                      {selectedChamp.pentakills} Pentakills
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">
                    Performance
                  </div>
                  <div className="text-3xl font-black text-amber-400 font-mono">
                    {selectedChamp.grade}
                  </div>
                </div>
              </div>
            </div>

            {/* Content Container */}
            <div className="p-6 pt-0 space-y-6">
              {/* Porofessor Performance Tags */}
              <div className="flex items-center gap-2 flex-wrap">
                {selectedChamp.poroTags.map((tag, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-mono"
                  >
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-white font-bold">{tag.tag}</span>
                    <span className="text-slate-400">({tag.metric})</span>
                  </div>
                ))}
              </div>

              {/* Champion Abilities Bar (Pictures) */}
              <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono mb-3 flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Abilities &amp; Skill Progression</span>
                </div>
                <div className="grid grid-cols-5 gap-2 sm:gap-3">
                  {selectedChamp.abilities.map((ability) => (
                    <div
                      key={ability.key}
                      className="p-2 sm:p-2.5 rounded-xl bg-white/5 border border-white/10 flex flex-col items-center text-center"
                    >
                      <div className="relative mb-1.5">
                        <img
                          src={ability.iconUrl}
                          alt={ability.name}
                          className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg object-cover border border-white/20 shadow-md"
                        />
                        <span className="absolute -top-1 -right-1 w-4 h-4 rounded-md bg-slate-950/90 border border-white/30 text-[10px] font-bold font-mono text-cyan-300 flex items-center justify-center">
                          {ability.key}
                        </span>
                      </div>
                      <span className="text-[11px] font-bold text-white truncate max-w-full">
                        {ability.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* ProBuildStats Skill Level Up Matrix (Levels 1-18 Grid) */}
              <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 overflow-x-auto scrollbar-none">
                <div className="flex items-center justify-between mb-3 text-xs font-mono">
                  <span className="font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-amber-400" />
                    <span>Skill Leveling Matrix (1 — 18)</span>
                  </span>
                  <span className="text-cyan-400 font-bold">
                    Priority: {selectedChamp.skillMatrix.maxOrder.join(' > ')}
                  </span>
                </div>

                <div className="min-w-[580px] space-y-1.5">
                  {selectedChamp.skillMatrix.progression.map((row) => (
                    <div key={row.skill} className="flex items-center gap-1.5">
                      <div className="w-7 h-7 rounded-lg bg-slate-900 border border-white/20 text-xs font-mono font-bold text-rose-300 flex items-center justify-center shrink-0">
                        {row.skill}
                      </div>
                      <div className="grid grid-cols-18 gap-1 flex-1">
                        {Array.from({ length: 18 }, (_, i) => i + 1).map((lvl) => {
                          const isLeveled = row.levels.includes(lvl);
                          return (
                            <div
                              key={lvl}
                              className={`h-7 rounded-md flex items-center justify-center text-[10px] font-mono font-bold transition-all ${
                                isLeveled
                                  ? 'bg-rose-500/80 text-white shadow-[0_0_8px_rgba(244,63,94,0.5)] border border-rose-400'
                                  : 'bg-white/[0.03] text-slate-600 border border-white/[0.04]'
                              }`}
                            >
                              {lvl}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Categorized Item Build Paths (With High-Res Item Pictures) */}
              <div className="space-y-4">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-300 font-mono flex items-center gap-1.5">
                  <Target className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Pro Item Builds &amp; Itemization</span>
                </div>

                {/* Starter Items */}
                <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10">
                  <div className="text-[11px] font-mono text-slate-400 mb-2 uppercase font-semibold">
                    Starter Items
                  </div>
                  <div className="flex items-center gap-3 flex-wrap">
                    {selectedChamp.itemBuildSets.starter.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center gap-2.5 p-2 rounded-xl bg-white/5 border border-white/10"
                      >
                        <img
                          src={item.iconUrl}
                          alt={item.name}
                          className="w-10 h-10 rounded-lg object-cover border border-white/20"
                        />
                        <div>
                          <div className="text-xs font-bold text-white">{item.name}</div>
                          <div className="text-[10px] font-mono text-amber-300">
                            {item.gold}g • <span className="text-emerald-400">{item.winRate}% WR</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Core 3-Rush Items */}
                <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10">
                  <div className="text-[11px] font-mono text-slate-400 mb-2 uppercase font-semibold flex items-center justify-between">
                    <span>Core 3-Item Rush</span>
                    <span className="text-emerald-400 font-bold">Highest Winrate Spike</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {selectedChamp.itemBuildSets.core.map((item, idx) => (
                      <div
                        key={item.id}
                        className="flex items-center gap-3 p-2.5 rounded-xl bg-white/5 border border-white/10 relative overflow-hidden"
                      >
                        <div className="absolute top-1 right-2 text-[10px] font-mono text-slate-500">
                          #{idx + 1}
                        </div>
                        <img
                          src={item.iconUrl}
                          alt={item.name}
                          className="w-11 h-11 rounded-lg object-cover border border-rose-500/40 shadow-md"
                        />
                        <div>
                          <div className="text-xs font-bold text-white">{item.name}</div>
                          <div className="text-[10px] font-mono text-amber-300 mt-0.5">
                            {item.gold}g
                          </div>
                          <div className="text-[10px] font-mono text-emerald-400 font-bold">
                            {item.winRate}% Win Rate
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Situational & Boots */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Situational Items */}
                  <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10">
                    <div className="text-[11px] font-mono text-slate-400 mb-2 uppercase font-semibold">
                      Situational 4th — 6th Items
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {selectedChamp.itemBuildSets.situational.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center gap-2 p-2 rounded-xl bg-white/5 border border-white/10"
                        >
                          <img
                            src={item.iconUrl}
                            alt={item.name}
                            className="w-9 h-9 rounded-lg object-cover border border-white/15"
                          />
                          <div className="min-w-0">
                            <div className="text-xs font-bold text-white truncate">{item.name}</div>
                            <div className="text-[10px] font-mono text-cyan-300 truncate">
                              {item.tag}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Boots Options */}
                  <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10">
                    <div className="text-[11px] font-mono text-slate-400 mb-2 uppercase font-semibold">
                      Boots Options
                    </div>
                    <div className="space-y-2">
                      {selectedChamp.itemBuildSets.boots.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center justify-between p-2 rounded-xl bg-white/5 border border-white/10"
                        >
                          <div className="flex items-center gap-2.5">
                            <img
                              src={item.iconUrl}
                              alt={item.name}
                              className="w-8 h-8 rounded-lg object-cover border border-white/20"
                            />
                            <div>
                              <div className="text-xs font-bold text-white">{item.name}</div>
                              <div className="text-[10px] font-mono text-slate-400">{item.tag}</div>
                            </div>
                          </div>
                          <span className="text-xs font-mono font-bold text-emerald-400">
                            {item.winRate}% WR
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Visual Rune Trees (OP.GG / Blitz Style) */}
              <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-300 font-mono mb-3 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Optimal Rune Loadout (OP.GG / Blitz)</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Primary Tree */}
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <div className="text-xs font-mono font-bold text-amber-300 mb-2">
                      {selectedChamp.runeTree.primaryStyle} (Primary)
                    </div>
                    <div className="flex items-center gap-2 mb-2 p-1.5 rounded-lg bg-amber-500/10 border border-amber-500/30">
                      <img
                        src={selectedChamp.runeTree.keystone.iconUrl}
                        alt={selectedChamp.runeTree.keystone.name}
                        className="w-8 h-8 rounded-full border border-amber-400"
                      />
                      <span className="text-xs font-bold text-white">
                        {selectedChamp.runeTree.keystone.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      {selectedChamp.runeTree.primaryPerks.map((perk, i) => (
                        <img
                          key={i}
                          src={perk.iconUrl}
                          alt={perk.name}
                          title={perk.name}
                          className="w-7 h-7 rounded-full border border-white/20 object-cover"
                        />
                      ))}
                    </div>
                  </div>

                  {/* Secondary Tree */}
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <div className="text-xs font-mono font-bold text-cyan-300 mb-2">
                      {selectedChamp.runeTree.secondaryStyle} (Secondary)
                    </div>
                    <div className="flex items-center gap-2.5 pt-2">
                      {selectedChamp.runeTree.secondaryPerks.map((perk, i) => (
                        <div key={i} className="flex items-center gap-1.5">
                          <img
                            src={perk.iconUrl}
                            alt={perk.name}
                            className="w-7 h-7 rounded-full border border-cyan-400/40 object-cover"
                          />
                          <span className="text-[11px] font-mono text-slate-300">{perk.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Stat Shards */}
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <div className="text-xs font-mono font-bold text-slate-300 mb-2">
                      Bonus Stat Shards
                    </div>
                    <div className="space-y-1.5">
                      {selectedChamp.runeTree.shards.map((shard, i) => (
                        <div key={i} className="flex items-center gap-2 text-[11px] font-mono text-slate-300">
                          <img src={shard.iconUrl} alt={shard.name} className="w-5 h-5 object-contain" />
                          <span>{shard.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Matchups Cards with Champion Portraits (Porofessor & OP.GG) */}
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-slate-300 font-mono mb-3 flex items-center gap-1.5">
                  <Swords className="w-3.5 h-3.5 text-rose-400" />
                  <span>Lane Matchups &amp; Counter Winrates</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {selectedChamp.matchups.map((matchup) => {
                    const isFavorable = matchup.difficulty === 'Favorable';
                    const isTough = matchup.difficulty === 'Tough';
                    return (
                      <div
                        key={matchup.championId}
                        className="p-3 rounded-2xl bg-white/[0.04] border border-white/10 flex flex-col justify-between"
                      >
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <div className="flex items-center gap-2">
                            <img
                              src={matchup.iconUrl}
                              alt={matchup.championName}
                              className="w-9 h-9 rounded-xl object-cover border border-white/20"
                            />
                            <div>
                              <div className="text-xs font-bold text-white">
                                {matchup.championName}
                              </div>
                              <span
                                className={`text-[10px] font-mono font-bold px-1.5 py-0.2 rounded ${
                                  isFavorable
                                    ? 'bg-emerald-500/20 text-emerald-300'
                                    : isTough
                                    ? 'bg-rose-500/20 text-rose-300'
                                    : 'bg-cyan-500/20 text-cyan-300'
                                }`}
                              >
                                {matchup.difficulty}
                              </span>
                            </div>
                          </div>
                          <span
                            className={`text-sm font-black font-mono ${
                              isFavorable
                                ? 'text-emerald-400'
                                : isTough
                                ? 'text-rose-400'
                                : 'text-cyan-400'
                            }`}
                          >
                            {matchup.winRate}% WR
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 leading-tight">
                          {matchup.tip}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Blitz CS Benchmark Comparison Bar */}
              <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10">
                <div className="flex items-center justify-between text-xs font-mono mb-2">
                  <span className="font-bold uppercase text-slate-300 flex items-center gap-1.5">
                    <TrendingUp className="w-3.5 h-3.5 text-cyan-400" />
                    <span>CS/Min Benchmark Comparison (Blitz.gg)</span>
                  </span>
                  <span className="text-emerald-400 font-bold">
                    You: {selectedChamp.benchmark.userCs} CS/m
                  </span>
                </div>
                <div className="relative w-full h-3 rounded-full bg-slate-900 border border-white/10 overflow-hidden">
                  <div
                    className="absolute top-0 bottom-0 left-0 bg-gradient-to-r from-cyan-500 to-rose-500 rounded-full"
                    style={{
                      width: `${Math.min(100, (selectedChamp.benchmark.userCs / 10) * 100)}%`,
                    }}
                  />
                  {/* Tier Average Marker */}
                  <div
                    className="absolute top-0 bottom-0 w-0.5 bg-white/70"
                    style={{
                      left: `${(selectedChamp.benchmark.tierAvgCs / 10) * 100}%`,
                    }}
                    title={`Tier Average: ${selectedChamp.benchmark.tierAvgCs}`}
                  />
                </div>
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mt-1.5">
                  <span>Tier Avg: {selectedChamp.benchmark.tierAvgCs} CS/m</span>
                  <span className="text-amber-300">Grandmaster Target: {selectedChamp.benchmark.proCs} CS/m</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
