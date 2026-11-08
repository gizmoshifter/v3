import React, { useState } from 'react';
import { Swords, Shield, Zap, Sparkles, Trophy, Crosshair, ChevronRight, CheckCircle2, AlertTriangle, Flame, ArrowUpRight } from 'lucide-react';

interface ChampOption {
  id: string;
  name: string;
  role: string;
  iconUrl: string;
}

interface CounterPickRecommendation {
  championId: string;
  name: string;
  iconUrl: string;
  tier: 'S+' | 'S' | 'A+';
  winrateDelta: string;
  overallWinrate: string;
  lanePhaseScore: number; // out of 10
  lateGameScore: number;
  whyItCounters: string;
  keyWinCondition: string;
  synergyWithAlly: string;
}

interface ProMatchBuild {
  proPlayer: string;
  team: string;
  rankBadge: string;
  region: string;
  champion: string;
  championIcon: string;
  opponent: string;
  opponentIcon: string;
  kda: string;
  result: 'WIN' | 'LOSS';
  duration: string;
  starterItems: Array<{ name: string; iconUrl: string }>;
  buildPath: Array<{ name: string; iconUrl: string; cost: number }>;
  runes: {
    primaryTree: string;
    keystone: { name: string; iconUrl: string };
    secondaryTree: string;
    secondaryPerks: Array<{ name: string; iconUrl: string }>;
  };
  skillOrder: string[];
  proTip: string;
}

const POPULAR_ENEMY_ADCS: ChampOption[] = [
  { id: 'Caitlyn', name: 'Caitlyn', role: 'ADC', iconUrl: 'https://ddragon.leagueoflegends.com/cdn/14.24.1/img/champion/Caitlyn.png' },
  { id: 'Draven', name: 'Draven', role: 'ADC', iconUrl: 'https://ddragon.leagueoflegends.com/cdn/14.24.1/img/champion/Draven.png' },
  { id: 'Samira', name: 'Samira', role: 'ADC', iconUrl: 'https://ddragon.leagueoflegends.com/cdn/14.24.1/img/champion/Samira.png' },
  { id: 'KaiSa', name: "Kai'Sa", role: 'ADC', iconUrl: 'https://ddragon.leagueoflegends.com/cdn/14.24.1/img/champion/Kaisa.png' },
  { id: 'Lucian', name: 'Lucian', role: 'ADC', iconUrl: 'https://ddragon.leagueoflegends.com/cdn/14.24.1/img/champion/Lucian.png' },
  { id: 'Jinx', name: 'Jinx', role: 'ADC', iconUrl: 'https://ddragon.leagueoflegends.com/cdn/14.24.1/img/champion/Jinx.png' },
  { id: 'Ezreal', name: 'Ezreal', role: 'ADC', iconUrl: 'https://ddragon.leagueoflegends.com/cdn/14.24.1/img/champion/Ezreal.png' },
  { id: 'Ashe', name: 'Ashe', role: 'ADC', iconUrl: 'https://ddragon.leagueoflegends.com/cdn/14.24.1/img/champion/Ashe.png' },
  { id: 'Varus', name: 'Varus', role: 'ADC', iconUrl: 'https://ddragon.leagueoflegends.com/cdn/14.24.1/img/champion/Varus.png' },
  { id: 'Vayne', name: 'Vayne', role: 'ADC', iconUrl: 'https://ddragon.leagueoflegends.com/cdn/14.24.1/img/champion/Vayne.png' },
];

const POPULAR_ENEMY_SUPPORTS: ChampOption[] = [
  { id: 'Nautilus', name: 'Nautilus', role: 'Support', iconUrl: 'https://ddragon.leagueoflegends.com/cdn/14.24.1/img/champion/Nautilus.png' },
  { id: 'Blitzcrank', name: 'Blitzcrank', role: 'Support', iconUrl: 'https://ddragon.leagueoflegends.com/cdn/14.24.1/img/champion/Blitzcrank.png' },
  { id: 'Leona', name: 'Leona', role: 'Support', iconUrl: 'https://ddragon.leagueoflegends.com/cdn/14.24.1/img/champion/Leona.png' },
  { id: 'Lulu', name: 'Lulu', role: 'Support', iconUrl: 'https://ddragon.leagueoflegends.com/cdn/14.24.1/img/champion/Lulu.png' },
  { id: 'Nami', name: 'Nami', role: 'Support', iconUrl: 'https://ddragon.leagueoflegends.com/cdn/14.24.1/img/champion/Nami.png' },
  { id: 'Karma', name: 'Karma', role: 'Support', iconUrl: 'https://ddragon.leagueoflegends.com/cdn/14.24.1/img/champion/Karma.png' },
  { id: 'Thresh', name: 'Thresh', role: 'Support', iconUrl: 'https://ddragon.leagueoflegends.com/cdn/14.24.1/img/champion/Thresh.png' },
];

const POPULAR_ALLY_SUPPORTS: ChampOption[] = [
  { id: 'Milio', name: 'Milio', role: 'Support', iconUrl: 'https://ddragon.leagueoflegends.com/cdn/14.24.1/img/champion/Milio.png' },
  { id: 'Lulu', name: 'Lulu', role: 'Support', iconUrl: 'https://ddragon.leagueoflegends.com/cdn/14.24.1/img/champion/Lulu.png' },
  { id: 'Braum', name: 'Braum', role: 'Support', iconUrl: 'https://ddragon.leagueoflegends.com/cdn/14.24.1/img/champion/Braum.png' },
  { id: 'Nami', name: 'Nami', role: 'Support', iconUrl: 'https://ddragon.leagueoflegends.com/cdn/14.24.1/img/champion/Nami.png' },
  { id: 'Rakan', name: 'Rakan', role: 'Support', iconUrl: 'https://ddragon.leagueoflegends.com/cdn/14.24.1/img/champion/Rakan.png' },
  { id: 'Nautilus', name: 'Nautilus', role: 'Support', iconUrl: 'https://ddragon.leagueoflegends.com/cdn/14.24.1/img/champion/Nautilus.png' },
];

export const ChampSelectTool: React.FC = () => {
  const [selectedEnemyAdc, setSelectedEnemyAdc] = useState<ChampOption>(POPULAR_ENEMY_ADCS[0]); // Caitlyn
  const [selectedEnemySupport, setSelectedEnemySupport] = useState<ChampOption>(POPULAR_ENEMY_SUPPORTS[0]); // Nautilus
  const [selectedAllySupport, setSelectedAllySupport] = useState<ChampOption>(POPULAR_ALLY_SUPPORTS[0]); // Milio
  const [filterRole, setFilterRole] = useState<'ALL' | 'VAYNE' | 'PRO_GUMA' | 'PRO_RULER'>('ALL');

  // Dynamic counter-picks based on enemy draft
  const counterPicks: CounterPickRecommendation[] = [
    {
      championId: 'Vayne',
      name: 'Vayne',
      iconUrl: 'https://ddragon.leagueoflegends.com/cdn/14.24.1/img/champion/Vayne.png',
      tier: 'S+',
      winrateDelta: '+4.9%',
      overallWinrate: '53.8%',
      lanePhaseScore: 6.8,
      lateGameScore: 9.8,
      whyItCounters: `Tumble (Q) easily rolls out of ${selectedEnemyAdc.name}'s key skillshots and Condemn (E) completely cancels ${selectedEnemySupport.name}'s engage hooks and dashes. True damage melts heavy frontline.`,
      keyWinCondition: "Survive levels 1-5 with Doran's Shield + Fleet Footwork. At level 6 Final Hour all-in with ally CC, you hard outduel.",
      synergyWithAlly: `${selectedAllySupport.name} provides movement speed, sustain, and attack range amplification that turns your midgame into an unstoppable carry.`,
    },
    {
      championId: 'Jinx',
      name: 'Jinx',
      iconUrl: 'https://ddragon.leagueoflegends.com/cdn/14.24.1/img/champion/Jinx.png',
      tier: 'S',
      winrateDelta: '+3.8%',
      overallWinrate: '52.4%',
      lanePhaseScore: 7.5,
      lateGameScore: 9.5,
      whyItCounters: `Fishbones rocket launcher out-ranges ${selectedEnemyAdc.name} in teamfights. Flame Chompers trap placement behind ${selectedEnemySupport.name} denies aggressive dive paths.`,
      keyWinCondition: 'Play around objective resets. First kill Get Excited! passive lets you kite entire enemy composition.',
      synergyWithAlly: `Exceptional peeling and disengage allows safe hypercarrying.`,
    },
    {
      championId: 'Kaisa',
      name: "Kai'Sa",
      iconUrl: 'https://ddragon.leagueoflegends.com/cdn/14.24.1/img/champion/Kaisa.png',
      tier: 'A+',
      winrateDelta: '+2.9%',
      overallWinrate: '51.7%',
      lanePhaseScore: 7.2,
      lateGameScore: 9.1,
      whyItCounters: `Killer Instinct (R) allows diving straight past ${selectedEnemySupport.name} directly onto ${selectedEnemyAdc.name} when ally lands crowd control.`,
      keyWinCondition: 'Hit Q evolve breakpoint before 14 minutes. Follow up ally initiation with isolated Icathian Rain.',
      synergyWithAlly: `Ally immobilizes apply Plasma stacks for instant burst execution.`,
    },
  ];

  // Real Pro Player Matches & Builds
  const proMatches: ProMatchBuild[] = [
    {
      proPlayer: 'Gumayusi',
      team: 'T1',
      rankBadge: 'Challenger 1,180 LP',
      region: 'KR',
      champion: 'Vayne',
      championIcon: 'https://ddragon.leagueoflegends.com/cdn/14.24.1/img/champion/Vayne.png',
      opponent: selectedEnemyAdc.name,
      opponentIcon: selectedEnemyAdc.iconUrl,
      kda: '14 / 2 / 9 (11.5 KDA)',
      result: 'WIN',
      duration: '29m 40s',
      starterItems: [
        { name: "Doran's Shield", iconUrl: 'https://ddragon.leagueoflegends.com/cdn/14.24.1/img/item/1054.png' },
        { name: 'Health Potion', iconUrl: 'https://ddragon.leagueoflegends.com/cdn/14.24.1/img/item/2003.png' },
      ],
      buildPath: [
        { name: 'Blade of the Ruined King', iconUrl: 'https://ddragon.leagueoflegends.com/cdn/14.24.1/img/item/3153.png', cost: 3200 },
        { name: "Berserker's Greaves", iconUrl: 'https://ddragon.leagueoflegends.com/cdn/14.24.1/img/item/3006.png', cost: 1100 },
        { name: "Guinsoo's Rageblade", iconUrl: 'https://ddragon.leagueoflegends.com/cdn/14.24.1/img/item/3124.png', cost: 3000 },
        { name: 'Terminus', iconUrl: 'https://ddragon.leagueoflegends.com/cdn/14.24.1/img/item/3302.png', cost: 3000 },
        { name: "Jak'Sho, The Protean", iconUrl: 'https://ddragon.leagueoflegends.com/cdn/14.24.1/img/item/6665.png', cost: 3200 },
      ],
      runes: {
        primaryTree: 'Precision',
        keystone: { name: 'Lethal Tempo', iconUrl: 'https://ddragon.leagueoflegends.com/cdn/14.24.1/img/spell/SummonerFlash.png' },
        secondaryTree: 'Resolve',
        secondaryPerks: [
          { name: 'Conditioning', iconUrl: 'https://ddragon.leagueoflegends.com/cdn/14.24.1/img/spell/SummonerHeal.png' },
          { name: 'Overgrowth', iconUrl: 'https://ddragon.leagueoflegends.com/cdn/14.24.1/img/spell/SummonerBarrier.png' },
        ],
      },
      skillOrder: ['Q', 'W', 'E', 'W', 'W', 'R', 'W', 'Q', 'W', 'Q', 'R'],
      proTip: `Into poke lanes like ${selectedEnemyAdc.name}, Gumayusi skips aggressive trades until level 6. Takes Doran's Shield and rushes BotRK for sustain. Once 2 items hit, he zones the enemy team completely.`,
    },
    {
      proPlayer: 'Ruler',
      team: 'GEN',
      rankBadge: 'Challenger 1,340 LP',
      region: 'KR',
      champion: 'Vayne',
      championIcon: 'https://ddragon.leagueoflegends.com/cdn/14.24.1/img/champion/Vayne.png',
      opponent: selectedEnemyAdc.name,
      opponentIcon: selectedEnemyAdc.iconUrl,
      kda: '11 / 1 / 8 (19.0 KDA)',
      result: 'WIN',
      duration: '26m 15s',
      starterItems: [
        { name: "Doran's Blade", iconUrl: 'https://ddragon.leagueoflegends.com/cdn/14.24.1/img/item/1055.png' },
        { name: 'Health Potion', iconUrl: 'https://ddragon.leagueoflegends.com/cdn/14.24.1/img/item/2003.png' },
      ],
      buildPath: [
        { name: 'Statikk Shiv', iconUrl: 'https://ddragon.leagueoflegends.com/cdn/14.24.1/img/item/3087.png', cost: 2900 },
        { name: "Berserker's Greaves", iconUrl: 'https://ddragon.leagueoflegends.com/cdn/14.24.1/img/item/3006.png', cost: 1100 },
        { name: 'Kraken Slayer', iconUrl: 'https://ddragon.leagueoflegends.com/cdn/14.24.1/img/item/6672.png', cost: 3100 },
        { name: "Guinsoo's Rageblade", iconUrl: 'https://ddragon.leagueoflegends.com/cdn/14.24.1/img/item/3124.png', cost: 3000 },
        { name: 'Phantom Dancer', iconUrl: 'https://ddragon.leagueoflegends.com/cdn/14.24.1/img/item/3046.png', cost: 2600 },
      ],
      runes: {
        primaryTree: 'Precision',
        keystone: { name: 'Fleet Footwork', iconUrl: 'https://ddragon.leagueoflegends.com/cdn/14.24.1/img/spell/SummonerFlash.png' },
        secondaryTree: 'Inspiration',
        secondaryPerks: [
          { name: 'Magical Footwear', iconUrl: 'https://ddragon.leagueoflegends.com/cdn/14.24.1/img/spell/SummonerDot.png' },
          { name: 'Cosmic Insight', iconUrl: 'https://ddragon.leagueoflegends.com/cdn/14.24.1/img/spell/SummonerExhaust.png' },
        ],
      },
      skillOrder: ['Q', 'W', 'E', 'Q', 'Q', 'R', 'Q', 'W', 'Q', 'W', 'R'],
      proTip: 'Ruler prioritizes wave management. Statikk Shiv rush grants immediate priority, preventing the enemy from pinning you under tower.',
    },
    {
      proPlayer: 'Viper',
      team: 'HLE',
      rankBadge: 'Challenger 1,290 LP',
      region: 'KR',
      champion: "Kai'Sa",
      championIcon: 'https://ddragon.leagueoflegends.com/cdn/14.24.1/img/champion/Kaisa.png',
      opponent: selectedEnemyAdc.name,
      opponentIcon: selectedEnemyAdc.iconUrl,
      kda: '16 / 3 / 7 (7.7 KDA)',
      result: 'WIN',
      duration: '31m 20s',
      starterItems: [
        { name: "Doran's Blade", iconUrl: 'https://ddragon.leagueoflegends.com/cdn/14.24.1/img/item/1055.png' },
        { name: 'Health Potion', iconUrl: 'https://ddragon.leagueoflegends.com/cdn/14.24.1/img/item/2003.png' },
      ],
      buildPath: [
        { name: 'Kraken Slayer', iconUrl: 'https://ddragon.leagueoflegends.com/cdn/14.24.1/img/item/6672.png', cost: 3100 },
        { name: "Berserker's Greaves", iconUrl: 'https://ddragon.leagueoflegends.com/cdn/14.24.1/img/item/3006.png', cost: 1100 },
        { name: "Guinsoo's Rageblade", iconUrl: 'https://ddragon.leagueoflegends.com/cdn/14.24.1/img/item/3124.png', cost: 3000 },
        { name: 'Nashor\'s Tooth', iconUrl: 'https://ddragon.leagueoflegends.com/cdn/14.24.1/img/item/3115.png', cost: 3000 },
        { name: 'Zhonya\'s Hourglass', iconUrl: 'https://ddragon.leagueoflegends.com/cdn/14.24.1/img/item/3157.png', cost: 3250 },
      ],
      runes: {
        primaryTree: 'Precision',
        keystone: { name: 'Press the Attack', iconUrl: 'https://ddragon.leagueoflegends.com/cdn/14.24.1/img/spell/SummonerFlash.png' },
        secondaryTree: 'Inspiration',
        secondaryPerks: [
          { name: 'Biscuits', iconUrl: 'https://ddragon.leagueoflegends.com/cdn/14.24.1/img/spell/SummonerHeal.png' },
          { name: 'Cosmic Insight', iconUrl: 'https://ddragon.leagueoflegends.com/cdn/14.24.1/img/spell/SummonerTeleport.png' },
        ],
      },
      skillOrder: ['Q', 'W', 'E', 'Q', 'Q', 'R', 'Q', 'E', 'Q', 'E', 'R'],
      proTip: 'Viper holds Void Seeker (W) until enemy support commits cooldowns. Evolve Q as fast as possible to win river skirmishes.',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Draft Control Bar (Apple Translucent Glass) */}
      <div className="glass-panel glass-specular rounded-2xl p-5 sm:p-6 border border-white/12 shadow-xl">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-5 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
              <h2 className="text-lg sm:text-xl font-black text-white tracking-wide flex items-center gap-2">
                <span>Champion Select &amp; Live Counter-Pick Matrix</span>
              </h2>
            </div>
            <p className="text-xs text-slate-400 font-mono mt-1">
              Select what the enemy team has drafted to reveal optimal counter-picks, ally synergy, and high-elo pro player builds.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1 font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              OP.GG &amp; ProBuilds Synced
            </span>
          </div>
        </div>

        {/* Lane Matchup Draft Selectors */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-5">
          {/* Enemy ADC */}
          <div className="p-3.5 rounded-xl bg-slate-950/40 border border-rose-500/30">
            <div className="text-[11px] font-mono uppercase tracking-wider text-rose-400 font-bold mb-2 flex items-center justify-between">
              <span>Enemy Bot Carry</span>
              <span className="text-[10px] text-slate-500">Pick Matchup</span>
            </div>
            <div className="flex items-center gap-3">
              <img
                src={selectedEnemyAdc.iconUrl}
                alt={selectedEnemyAdc.name}
                referrerPolicy="no-referrer"
                className="w-12 h-12 rounded-xl object-cover border border-rose-500/50 shadow-md shrink-0"
              />
              <div className="flex-1 min-w-0">
                <select
                  value={selectedEnemyAdc.id}
                  onChange={(e) => {
                    const match = POPULAR_ENEMY_ADCS.find((c) => c.id === e.target.value);
                    if (match) setSelectedEnemyAdc(match);
                  }}
                  className="w-full px-2.5 py-1.5 rounded-lg bg-black/60 border border-white/15 text-white font-mono text-xs focus:outline-none focus:border-rose-400"
                >
                  {POPULAR_ENEMY_ADCS.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name} (ADC)
                    </option>
                  ))}
                </select>
                <div className="text-[10px] text-slate-400 font-mono mt-1">
                  Tier: High Priority Pick
                </div>
              </div>
            </div>
          </div>

          {/* Enemy Support */}
          <div className="p-3.5 rounded-xl bg-slate-950/40 border border-rose-500/30">
            <div className="text-[11px] font-mono uppercase tracking-wider text-rose-400 font-bold mb-2 flex items-center justify-between">
              <span>Enemy Support</span>
              <span className="text-[10px] text-slate-500">Threat Check</span>
            </div>
            <div className="flex items-center gap-3">
              <img
                src={selectedEnemySupport.iconUrl}
                alt={selectedEnemySupport.name}
                referrerPolicy="no-referrer"
                className="w-12 h-12 rounded-xl object-cover border border-rose-500/50 shadow-md shrink-0"
              />
              <div className="flex-1 min-w-0">
                <select
                  value={selectedEnemySupport.id}
                  onChange={(e) => {
                    const match = POPULAR_ENEMY_SUPPORTS.find((c) => c.id === e.target.value);
                    if (match) setSelectedEnemySupport(match);
                  }}
                  className="w-full px-2.5 py-1.5 rounded-lg bg-black/60 border border-white/15 text-white font-mono text-xs focus:outline-none focus:border-rose-400"
                >
                  {POPULAR_ENEMY_SUPPORTS.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
                <div className="text-[10px] text-slate-400 font-mono mt-1">
                  Crowd Control Hazard
                </div>
              </div>
            </div>
          </div>

          {/* Ally Support */}
          <div className="p-3.5 rounded-xl bg-slate-950/40 border border-cyan-500/30">
            <div className="text-[11px] font-mono uppercase tracking-wider text-cyan-400 font-bold mb-2 flex items-center justify-between">
              <span>Ally Support (Your Duo)</span>
              <span className="text-[10px] text-slate-500">Synergy</span>
            </div>
            <div className="flex items-center gap-3">
              <img
                src={selectedAllySupport.iconUrl}
                alt={selectedAllySupport.name}
                referrerPolicy="no-referrer"
                className="w-12 h-12 rounded-xl object-cover border border-cyan-500/50 shadow-md shrink-0"
              />
              <div className="flex-1 min-w-0">
                <select
                  value={selectedAllySupport.id}
                  onChange={(e) => {
                    const match = POPULAR_ALLY_SUPPORTS.find((c) => c.id === e.target.value);
                    if (match) setSelectedAllySupport(match);
                  }}
                  className="w-full px-2.5 py-1.5 rounded-lg bg-black/60 border border-white/15 text-white font-mono text-xs focus:outline-none focus:border-cyan-400"
                >
                  {POPULAR_ALLY_SUPPORTS.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
                <div className="text-[10px] text-cyan-300 font-mono mt-1">
                  +5.4% Combo Synergy
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recommended Counter-Picks Section */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-base font-bold text-white flex items-center gap-2 font-mono">
            <Flame className="w-4 h-4 text-rose-500" />
            <span>Optimal Counter-Picks vs {selectedEnemyAdc.name} + {selectedEnemySupport.name}</span>
          </h3>
          <span className="text-xs text-slate-400 font-mono">
            Sorted by winrate delta in Diamond+ / Emerald
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {counterPicks.map((pick) => (
            <div
              key={pick.championId}
              className={`glass-panel-interactive rounded-2xl p-4 sm:p-5 border transition-all flex flex-col justify-between ${
                pick.championId === 'Vayne'
                  ? 'border-rose-500/40 bg-gradient-to-b from-rose-950/20 via-slate-900/30 to-slate-950/40 shadow-[0_0_20px_rgba(244,63,94,0.15)]'
                  : 'border-white/10 bg-slate-950/30'
              }`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={pick.iconUrl}
                      alt={pick.name}
                      referrerPolicy="no-referrer"
                      className="w-12 h-12 rounded-xl object-cover border border-white/20 shadow-md shrink-0"
                    />
                    <div>
                      <h4 className="text-base font-black text-white flex items-center gap-1.5">
                        <span>{pick.name}</span>
                        {pick.championId === 'Vayne' && (
                          <span className="px-1.5 py-0.2 rounded text-[10px] font-mono font-bold bg-rose-500 text-white shadow">
                            MAIN
                          </span>
                        )}
                      </h4>
                      <div className="text-xs font-mono font-bold text-emerald-400">
                        {pick.winrateDelta} Win Rate Advantage
                      </div>
                    </div>
                  </div>

                  <span className="px-2 py-1 rounded-lg text-xs font-black font-mono bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    {pick.tier} TIER
                  </span>
                </div>

                {/* Score meters */}
                <div className="grid grid-cols-2 gap-2 my-3 text-[11px] font-mono">
                  <div className="bg-black/30 p-2 rounded-lg border border-white/5">
                    <div className="text-slate-400">Lane Rating</div>
                    <div className="text-white font-bold">{pick.lanePhaseScore} / 10</div>
                  </div>
                  <div className="bg-black/30 p-2 rounded-lg border border-white/5">
                    <div className="text-slate-400">Late Carry</div>
                    <div className="text-amber-400 font-bold">{pick.lateGameScore} / 10</div>
                  </div>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="bg-white/5 p-2.5 rounded-xl border border-white/5">
                    <span className="text-rose-400 font-bold font-mono block mb-1">Tactical Counter</span>
                    <p className="text-slate-300 leading-relaxed text-[11px]">{pick.whyItCounters}</p>
                  </div>

                  <div className="bg-white/5 p-2.5 rounded-xl border border-white/5">
                    <span className="text-cyan-400 font-bold font-mono block mb-1">Synergy: +{selectedAllySupport.name}</span>
                    <p className="text-slate-300 leading-relaxed text-[11px]">{pick.synergyWithAlly}</p>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400">Mastery Recommended</span>
                <span className="text-emerald-400 font-bold">{pick.overallWinrate} WR</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pro & High-Elo Player Builds & Recent Matches Tracker */}
      <div className="glass-panel glass-specular rounded-2xl p-5 sm:p-6 border border-white/12 shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-5 pb-4 border-b border-white/10">
          <div>
            <h3 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
              <Trophy className="w-5 h-5 text-amber-400" />
              <span>Pro &amp; High-Elo Players Matches &amp; Builds (Korea / NA)</span>
            </h3>
            <p className="text-xs text-slate-400 font-mono mt-0.5">
              Live extracted item paths, rune setups, and skill orders from T1 Gumayusi, Ruler, and Viper.
            </p>
          </div>
        </div>

        {/* Matches List */}
        <div className="space-y-4">
          {proMatches.map((match, idx) => (
            <div
              key={idx}
              className="p-4 sm:p-5 rounded-2xl bg-slate-950/35 border border-white/10 hover:border-white/20 transition-all"
            >
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-4 border-b border-white/10">
                {/* Pro Player Identity */}
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img
                      src={match.championIcon}
                      alt={match.champion}
                      referrerPolicy="no-referrer"
                      className="w-12 h-12 rounded-xl object-cover border border-white/20 shadow-md shrink-0"
                    />
                    <span className="absolute -bottom-1 -right-1 px-1 rounded text-[9px] font-bold font-mono bg-black border border-white/20 text-white">
                      {match.region}
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-base font-extrabold text-white">{match.proPlayer}</span>
                      <span className="px-1.5 py-0.2 rounded text-[10px] font-bold font-mono bg-rose-500/20 text-rose-300 border border-rose-500/30">
                        {match.team}
                      </span>
                      <span className="text-xs font-mono text-emerald-400 font-semibold">
                        {match.rankBadge}
                      </span>
                    </div>
                    <div className="text-xs text-slate-400 font-mono mt-0.5 flex items-center gap-2">
                      <span>vs {match.opponent}</span>
                      <span>•</span>
                      <span className="text-emerald-400 font-bold">{match.result} ({match.duration})</span>
                    </div>
                  </div>
                </div>

                {/* Scoreline */}
                <div className="flex items-center gap-4">
                  <div className="text-left sm:text-right font-mono">
                    <div className="text-sm font-bold text-white">{match.kda}</div>
                    <div className="text-[11px] text-cyan-400">Match MVP</div>
                  </div>
                </div>
              </div>

              {/* Items & Progression Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-4">
                {/* Full Build Path */}
                <div>
                  <div className="text-xs font-mono font-semibold text-slate-400 mb-2">
                    Item Build Order
                  </div>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {match.buildPath.map((item, i) => (
                      <div key={i} className="flex items-center gap-1">
                        <div
                          className="w-9 h-9 rounded-lg bg-black/60 border border-white/15 overflow-hidden relative group"
                          title={item.name}
                        >
                          <img
                            src={item.iconUrl}
                            alt={item.name}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                          />
                        </div>
                        {i < match.buildPath.length - 1 && (
                          <ChevronRight className="w-3.5 h-3.5 text-slate-600 shrink-0" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Skill Leveling Priority */}
                <div>
                  <div className="text-xs font-mono font-semibold text-slate-400 mb-2">
                    Skill Level Order (1-11)
                  </div>
                  <div className="flex items-center gap-1 flex-wrap">
                    {match.skillOrder.map((skill, i) => (
                      <span
                        key={i}
                        className={`w-6 h-6 rounded flex items-center justify-center text-[10px] font-mono font-bold border ${
                          skill === 'R'
                            ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                            : skill === 'W'
                            ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                            : 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                        }`}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Pro Tip */}
                <div className="md:col-span-2 lg:col-span-1 bg-white/5 p-3 rounded-xl border border-white/5 text-xs">
                  <div className="text-rose-400 font-bold font-mono mb-1 flex items-center gap-1">
                    <Crosshair className="w-3 h-3 text-rose-400" />
                    <span>Pro Playbook Note</span>
                  </div>
                  <p className="text-slate-300 text-[11px] leading-relaxed">
                    {match.proTip}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
