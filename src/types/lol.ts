export interface ProfileTheme {
  id: string;
  name: string;
  championName: string;
  skinId: number;
  splashUrl: string;
  accentColor: string;
  hudStyle: 'project' | 'spirit-blossom' | 'kda' | 'inkshadow' | 'default';
  quote: string;
}

export interface SummonerRank {
  tier: 'IRON' | 'BRONZE' | 'SILVER' | 'GOLD' | 'PLATINUM' | 'EMERALD' | 'DIAMOND' | 'MASTER' | 'GRANDMASTER' | 'CHALLENGER';
  division: 'I' | 'II' | 'III' | 'IV';
  lp: number;
  wins: number;
  losses: number;
}

export interface PeakRankInfo {
  tier: 'IRON' | 'BRONZE' | 'SILVER' | 'GOLD' | 'PLATINUM' | 'EMERALD' | 'DIAMOND' | 'MASTER' | 'GRANDMASTER' | 'CHALLENGER';
  division?: 'I' | 'II' | 'III' | 'IV';
  lp?: number;
  season: string;
  dateAchieved?: string;
  percentile?: string;
}

export interface PastSeasonRank {
  season: string;
  shortBadge: string;
  year: number;
  tier: 'IRON' | 'BRONZE' | 'SILVER' | 'GOLD' | 'PLATINUM' | 'EMERALD' | 'DIAMOND' | 'MASTER' | 'GRANDMASTER' | 'CHALLENGER';
  division?: 'I' | 'II' | 'III' | 'IV';
  finalLp?: number;
  peakTier: 'IRON' | 'BRONZE' | 'SILVER' | 'GOLD' | 'PLATINUM' | 'EMERALD' | 'DIAMOND' | 'MASTER' | 'GRANDMASTER' | 'CHALLENGER';
  peakDivision?: 'I' | 'II' | 'III' | 'IV';
  peakLp?: number;
  peakRankDisplay: string;
  gamesPlayed: number;
  winRate: number;
  topChampion: { name: string; winRate: number; games: number; iconUrl?: string };
}

export interface UserProfile {
  id: string;
  summonerName: string;
  tagLine: string;
  region: string;
  summonerLevel: number;
  profileIconId: number;
  rank: SummonerRank;
  currentSeasonPeak?: PeakRankInfo;
  allTimePeak?: PeakRankInfo;
  previousSeasons?: PastSeasonRank[];
  profileTheme: ProfileTheme;
}

export interface MatchParticipant {
  summonerName: string;
  tagLine?: string;
  championName: string;
  championIcon: string;
  kills: number;
  deaths: number;
  assists: number;
  cs: number;
  damageDealt: number;
  items: number[];
  isSelf?: boolean;
}

export interface Match {
  matchId: string;
  gameMode: 'Ranked Solo' | 'Ranked Flex' | 'ARAM' | 'Normal Draft' | 'Arena';
  gameCreation: number;
  gameDuration: number; // in seconds
  win: boolean;
  champion: {
    id: string;
    name: string;
    iconUrl: string;
    splashUrl: string;
    level: number;
  };
  spell1: { id: string; name: string; iconUrl: string };
  spell2: { id: string; name: string; iconUrl: string };
  primaryRune: { id: string; name: string; iconUrl: string };
  secondaryRuneTree: { id: string; name: string; iconUrl: string };
  kills: number;
  deaths: number;
  assists: number;
  cs: number;
  visionScore: number;
  killParticipation: number;
  damageDealt: number;
  damageShare: number;
  goldEarned: number;
  multikill?: 'Penta Kill' | 'Quadra Kill' | 'Triple Kill' | 'Double Kill' | null;
  items: Array<{ id: number; name: string; iconUrl: string }>;
  trinket: { id: number; name: string; iconUrl: string };
  mvp: boolean;
  grade: 'S+' | 'S' | 'S-' | 'A+' | 'A' | 'A-' | 'B+' | 'B' | 'C';
  teams: {
    blue: MatchParticipant[];
    red: MatchParticipant[];
  };
}

export interface AbilityInfo {
  key: 'P' | 'Q' | 'W' | 'E' | 'R';
  name: string;
  iconUrl: string;
}

export interface ItemSetItem {
  id: number;
  name: string;
  iconUrl: string;
  gold: number;
  winRate: number;
  tag?: string;
}

export interface MatchupEntry {
  championId: string;
  championName: string;
  iconUrl: string;
  winRate: number;
  difficulty: 'Favorable' | 'Even' | 'Tough';
  tip: string;
}

export interface ChampionMastery {
  championId: string;
  championName: string;
  title: string;
  role: 'BOTTOM' | 'MIDDLE' | 'TOP' | 'JUNGLE' | 'SUPPORT';
  iconUrl: string;
  splashUrl: string;
  masteryLevel: number;
  masteryPoints: number;
  gamesPlayed: number;
  winRate: number;
  avgKills: number;
  avgDeaths: number;
  avgAssists: number;
  avgCsPerMin: number;
  damageShare: number;
  pentakills: number;
  grade: string;
  abilities: AbilityInfo[];
  skillMatrix: {
    maxOrder: string[];
    progression: Array<{ skill: 'Q' | 'W' | 'E' | 'R'; levels: number[] }>;
  };
  itemBuildSets: {
    starter: ItemSetItem[];
    core: ItemSetItem[];
    situational: ItemSetItem[];
    boots: ItemSetItem[];
  };
  runeTree: {
    primaryStyle: string;
    keystone: { name: string; iconUrl: string };
    primaryPerks: Array<{ name: string; iconUrl: string }>;
    secondaryStyle: string;
    secondaryPerks: Array<{ name: string; iconUrl: string }>;
    shards: Array<{ name: string; iconUrl: string }>;
  };
  matchups: MatchupEntry[];
  poroTags: Array<{ tag: string; metric: string; status: 'gold' | 'emerald' | 'cyan' }>;
  benchmark: {
    userCs: number;
    tierAvgCs: number;
    proCs: number;
  };
  builds: {
    coreItems: Array<{ id: number; name: string; iconUrl: string }>;
    runes: Array<{ name: string; iconUrl: string; type: string }>;
    spells: Array<{ name: string; iconUrl: string }>;
    skillPriority: string[];
    countersGoodAgainst: string[];
    countersWeakAgainst: string[];
  };
}

export interface LiveFeedItem {
  id: string;
  type: 'match_live' | 'pro_esports' | 'friend_activity' | 'patch_alert';
  title: string;
  subtitle: string;
  timestamp: string;
  status: 'live' | 'completed' | 'queued' | 'online';
  accent: 'rose' | 'cyan' | 'emerald' | 'amber';
  score?: string;
  championIcon?: string;
}

export interface RiotApiConfig {
  apiKey: string;
  region: string;
  isCustomKeySet: boolean;
  lastTestedStatus: 'idle' | 'testing' | 'valid' | 'invalid' | 'rate_limited';
  statusMessage?: string;
}
