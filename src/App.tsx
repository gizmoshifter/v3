/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect } from 'react';
import { UserProfile, ProfileTheme, RiotApiConfig, Match } from './types/lol.ts';
import { CURRENT_USER_DEFAULT, ERIC_MATCH_HISTORY, USER_CHAMPIONS_MASTERY } from './data/mockLolData.ts';
import { HeaderNav, MainNavTab } from './components/HeaderNav.tsx';
import { ProfileBanner } from './components/ProfileBanner.tsx';
import { MatchHistoryCard } from './components/MatchHistoryCard.tsx';
import { ChampionsView } from './components/ChampionsView.tsx';
import { AnalyticsView } from './components/AnalyticsView.tsx';
import { ChampSelectTool } from './components/ChampSelectTool.tsx';
import { LolNewsHub } from './components/LolNewsHub.tsx';
import { OnboardingModal } from './components/OnboardingModal.tsx';
import { LiveFeedDrawer, LiveFeedDockPosition } from './components/LiveFeedDrawer.tsx';
import { ThemeModal } from './components/ThemeModal.tsx';
import { UserSwitcherModal } from './components/UserSwitcherModal.tsx';
import { RiotApiKeyModal } from './components/RiotApiKeyModal.tsx';
import { WindowsDesktopModal } from './components/WindowsDesktopModal.tsx';
import { PreviousSeasonsModal } from './components/PreviousSeasonsModal.tsx';
import { LiquidAuroraBackground } from './components/LiquidAuroraBackground.tsx';
import {
  Swords,
  Filter,
  Search,
  Sparkles,
  Trophy,
  RefreshCw,
  Flame,
  Zap,
  CheckCircle2,
} from 'lucide-react';

export default function App() {
  // Active User Profile (Default: sin #O00 with PROJECT: Vayne theme)
  const [currentUser, setCurrentUser] = useState<UserProfile>(CURRENT_USER_DEFAULT);

  // Active View Tab
  const [activeTab, setActiveTab] = useState<MainNavTab>('matches');

  // Live Feed Docking Position: defaults to 'side-hover' (accessed when scrolling/hovering near right edge)
  const [liveFeedPosition, setLiveFeedPosition] = useState<LiveFeedDockPosition>('side-hover');

  // Windows 11 Desktop Titlebar simulation
  const [isWindowsFrameMode, setIsWindowsFrameMode] = useState<boolean>(false);

  // Modals
  const [themeModalOpen, setThemeModalOpen] = useState<boolean>(false);
  const [userSwitcherOpen, setUserSwitcherOpen] = useState<boolean>(false);
  const [riotApiModalOpen, setRiotApiModalOpen] = useState<boolean>(false);
  const [windowsModalOpen, setWindowsModalOpen] = useState<boolean>(false);
  const [onboardingOpen, setOnboardingOpen] = useState<boolean>(false);
  const [previousSeasonsOpen, setPreviousSeasonsOpen] = useState<boolean>(false);

  // Check one-time onboarding status from localStorage
  useEffect(() => {
    try {
      const configured = localStorage.getItem('onyx_summoner_configured');
      if (!configured) {
        setOnboardingOpen(true);
      } else {
        const storedName = localStorage.getItem('onyx_summoner_name');
        const storedTag = localStorage.getItem('onyx_summoner_tag');
        const storedRegion = localStorage.getItem('onyx_summoner_region');
        if (storedName) {
          setCurrentUser((prev) => ({
            ...prev,
            summonerName: storedName,
            tagLine: storedTag || prev.tagLine,
            region: storedRegion || prev.region,
          }));
        }
      }
    } catch {
      // Ignore if localStorage unavailable
    }
  }, []);

  const handleSaveOnboarding = (name: string, tag: string, region: string) => {
    setCurrentUser((prev) => ({
      ...prev,
      summonerName: name,
      tagLine: tag,
      region,
    }));
    try {
      localStorage.setItem('onyx_summoner_configured', 'true');
      localStorage.setItem('onyx_summoner_name', name);
      localStorage.setItem('onyx_summoner_tag', tag);
      localStorage.setItem('onyx_summoner_region', region);
    } catch {
      // Ignore
    }
    setOnboardingOpen(false);
  };

  // Match filters
  const [queueFilter, setQueueFilter] = useState<string>('ALL');
  const [resultFilter, setResultFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Riot API Config
  const [riotConfig, setRiotConfig] = useState<RiotApiConfig>({
    apiKey: '',
    region: 'NA1',
    isCustomKeySet: false,
    lastTestedStatus: 'idle',
  });

  // Filtered Matches (Memoized for zero-lag rendering)
  const filteredMatches = useMemo(() => {
    return ERIC_MATCH_HISTORY.filter((match) => {
      if (queueFilter !== 'ALL' && match.gameMode !== queueFilter) return false;
      if (resultFilter === 'WIN' && !match.win) return false;
      if (resultFilter === 'LOSS' && match.win) return false;
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const champMatch = match.champion.name.toLowerCase().includes(query);
        const playerMatch =
          match.teams.blue.some((p) => p.summonerName.toLowerCase().includes(query)) ||
          match.teams.red.some((p) => p.summonerName.toLowerCase().includes(query));
        if (!champMatch && !playerMatch) return false;
      }
      return true;
    });
  }, [queueFilter, resultFilter, searchQuery]);

  // Handle Theme Change
  const handleSaveTheme = (theme: ProfileTheme, iconId: number) => {
    setCurrentUser((prev) => ({
      ...prev,
      profileTheme: theme,
      profileIconId: iconId,
    }));
  };

  return (
    <div className="min-h-screen bg-[#05070d] text-slate-100 flex flex-col relative selection:bg-rose-500/30 selection:text-rose-200">
      {/* GPU-Accelerated Apple iOS Liquid Aurora Mesh (Randomized non-repeating color collision) */}
      <LiquidAuroraBackground accentColor={currentUser.profileTheme.accentColor} />

      {/* Top Header Navigation */}
      <HeaderNav
        currentUser={currentUser}
        activeTab={activeTab}
        onChangeTab={setActiveTab}
        onOpenThemeModal={() => setThemeModalOpen(true)}
        onOpenUserSwitcher={() => setUserSwitcherOpen(true)}
        onOpenRiotApiModal={() => setRiotApiModalOpen(true)}
        onOpenWindowsModal={() => setWindowsModalOpen(true)}
        onOpenPreviousSeasons={() => setPreviousSeasonsOpen(true)}
        liveFeedPosition={liveFeedPosition}
        onChangeLiveFeedPosition={setLiveFeedPosition}
        isWindowsFrameMode={isWindowsFrameMode}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-[1600px] w-full mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* Top Ticker Live Feed (if docked at top) */}
        {liveFeedPosition === 'top-ticker' && (
          <LiveFeedDrawer position={liveFeedPosition} onChangePosition={setLiveFeedPosition} />
        )}

        {/* Profile Hero Banner */}
        <ProfileBanner
          user={currentUser}
          onOpenThemeModal={() => setThemeModalOpen(true)}
          onOpenUserSwitcher={() => setUserSwitcherOpen(true)}
          onOpenPreviousSeasons={() => setPreviousSeasonsOpen(true)}
        />

        {/* TAB 1: Matches & Recent Games Overview */}
        {activeTab === 'matches' && (
          <div className="space-y-6">
            {/* Quick Top Champions Summary Bar + Filter Bar */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
              {/* Left Column: Match History List */}
              <div className="xl:col-span-8 2xl:col-span-9 space-y-4">
                {/* Match Filter & Search Toolbar */}
                <div className="glass-panel rounded-xl p-3 sm:p-4 border border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                  {/* Queue Type Pills */}
                  <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
                    {['ALL', 'Ranked Solo', 'ARAM', 'Ranked Flex'].map((q) => (
                      <button
                        key={q}
                        onClick={() => setQueueFilter(q)}
                        className={`btn-tactile px-3 py-1.5 rounded-lg text-xs font-mono font-semibold shrink-0 transition-all ${
                          queueFilter === q
                            ? 'bg-rose-500/25 text-rose-300 border border-rose-500/40 shadow-sm'
                            : 'bg-white/5 text-slate-400 hover:text-white border border-white/10'
                        }`}
                      >
                        {q === 'ALL' ? 'All Queues' : q}
                      </button>
                    ))}
                  </div>

                  {/* Result Filter & Search Input */}
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 bg-black/40 p-1 rounded-lg border border-white/10">
                      <button
                        onClick={() => setResultFilter('ALL')}
                        className={`btn-tactile px-2 py-1 rounded text-[11px] font-mono ${
                          resultFilter === 'ALL' ? 'bg-white/15 text-white font-bold' : 'text-slate-400'
                        }`}
                      >
                        All
                      </button>
                      <button
                        onClick={() => setResultFilter('WIN')}
                        className={`btn-tactile px-2 py-1 rounded text-[11px] font-mono ${
                          resultFilter === 'WIN' ? 'bg-cyan-500/30 text-cyan-300 font-bold' : 'text-slate-400'
                        }`}
                      >
                        Wins
                      </button>
                      <button
                        onClick={() => setResultFilter('LOSS')}
                        className={`btn-tactile px-2 py-1 rounded text-[11px] font-mono ${
                          resultFilter === 'LOSS' ? 'bg-rose-500/30 text-rose-300 font-bold' : 'text-slate-400'
                        }`}
                      >
                        Losses
                      </button>
                    </div>

                    <div className="relative flex-1 sm:w-44">
                      <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-400" />
                      <input
                        type="text"
                        placeholder="Search champion..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-8 pr-2.5 py-1.5 rounded-lg bg-black/50 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-400 font-mono"
                      />
                    </div>
                  </div>
                </div>

                {/* Match Cards List */}
                <div className="space-y-3">
                  {filteredMatches.length > 0 ? (
                    filteredMatches.map((match) => (
                      <MatchHistoryCard key={match.matchId} match={match} />
                    ))
                  ) : (
                    <div className="glass-panel rounded-2xl p-8 text-center border border-white/10">
                      <Swords className="w-8 h-8 text-slate-500 mx-auto mb-2" />
                      <h4 className="text-sm font-bold text-white">No matches found</h4>
                      <p className="text-xs text-slate-400 mt-1">
                        Try clearing filters or search queries.
                      </p>
                      <button
                        onClick={() => {
                          setQueueFilter('ALL');
                          setResultFilter('ALL');
                          setSearchQuery('');
                        }}
                        className="btn-tactile mt-3 px-3 py-1.5 rounded-lg text-xs font-mono font-semibold bg-white/10 hover:bg-white/15 text-white"
                      >
                        Reset Filters
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column: Most Played Champions Quick Showcase */}
              <div className="xl:col-span-4 2xl:col-span-3 space-y-4">
                <div className="glass-panel rounded-2xl p-5 border border-white/10">
                  <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-white font-mono flex items-center gap-1.5">
                      <Trophy className="w-4 h-4 text-amber-400" />
                      <span>Most Played Champions</span>
                    </h3>
                    <button
                      onClick={() => setActiveTab('champions')}
                      className="text-xs text-rose-400 hover:text-rose-300 font-mono font-semibold"
                    >
                      View All Pool &rarr;
                    </button>
                  </div>

                  <div className="space-y-3">
                    {USER_CHAMPIONS_MASTERY.slice(0, 3).map((champ) => (
                      <button
                        key={champ.championId}
                        onClick={() => setActiveTab('champions')}
                        className="btn-tactile w-full text-left p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all flex items-center justify-between group"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={champ.iconUrl}
                            alt={champ.championName}
                            className="w-10 h-10 rounded-xl object-cover border border-white/15 group-hover:scale-105 transition-transform"
                          />
                          <div>
                            <div className="text-xs font-bold text-white flex items-center gap-1.5">
                              <span>{champ.championName}</span>
                              <span className="text-[10px] font-mono px-1 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                                {champ.grade}
                              </span>
                            </div>
                            <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                              {champ.gamesPlayed} Games •{' '}
                              <span className="text-emerald-400 font-bold">{champ.winRate}% WR</span>
                            </div>
                          </div>
                        </div>

                        <div className="text-right">
                          <div className="text-xs font-mono font-bold text-cyan-300">
                            {champ.avgKills}/{champ.avgDeaths}/{champ.avgAssists}
                          </div>
                          <div className="text-[10px] text-slate-400 font-mono">
                            {champ.avgCsPerMin} CS/m
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-slate-400">
                    <span className="truncate max-w-[200px]">Background: {currentUser.profileTheme.name}</span>
                    <button
                      onClick={() => setThemeModalOpen(true)}
                      className="text-cyan-400 hover:underline shrink-0"
                    >
                      Customize
                    </button>
                  </div>
                </div>

                {/* Performance Highlights Widget */}
                <div className="glass-panel rounded-2xl p-5 border border-white/10 bg-gradient-to-br from-rose-950/20 to-slate-900/60">
                  <div className="flex items-center gap-2 text-rose-400 mb-2 font-mono text-xs font-bold uppercase tracking-wider">
                    <Flame className="w-4 h-4 text-rose-400" />
                    <span>Combat Rating: S+ Tier</span>
                  </div>
                  <p className="text-xs text-slate-300 font-sans leading-relaxed">
                    Your Vayne late-game damage share is in the top <strong>3.2%</strong> of all North American Emerald ADCs.
                  </p>
                  <div className="mt-3 flex items-center gap-2">
                    <span className="px-2 py-1 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-mono font-bold border border-emerald-500/30">
                      +18 LP / Win
                    </span>
                    <span className="px-2 py-1 rounded bg-rose-500/20 text-rose-300 text-[10px] font-mono font-bold border border-rose-500/30">
                      5 Pentakills Season
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: Dedicated Champion Mastery & Analytics View */}
        {activeTab === 'champions' && <ChampionsView initialChampionId="Vayne" />}

        {/* TAB 3: Champion Select Counter-Picks & High-Elo Builds */}
        {activeTab === 'champ-select' && <ChampSelectTool />}

        {/* TAB 4: League News, Patch Notes 15.1 & Weekly Skin Sales */}
        {activeTab === 'news' && <LolNewsHub />}

        {/* TAB 5: Advanced Analytics View */}
        {activeTab === 'analytics' && <AnalyticsView user={currentUser} />}

        {/* Lower Live Feed Section (if docked at bottom) */}
        {liveFeedPosition === 'lower-section' && (
          <LiveFeedDrawer position={liveFeedPosition} onChangePosition={setLiveFeedPosition} />
        )}
      </main>

      {/* Side Hover Live Feed Drawer (if docked at side-hover) */}
      {liveFeedPosition === 'side-hover' && (
        <LiveFeedDrawer position={liveFeedPosition} onChangePosition={setLiveFeedPosition} />
      )}

      {/* Modals */}
      <ThemeModal
        isOpen={themeModalOpen}
        onClose={() => setThemeModalOpen(false)}
        currentUser={currentUser}
        onSaveTheme={handleSaveTheme}
      />

      <UserSwitcherModal
        isOpen={userSwitcherOpen}
        onClose={() => setUserSwitcherOpen(false)}
        currentUser={currentUser}
        onSelectUser={(newUser) => setCurrentUser(newUser)}
      />

      <RiotApiKeyModal
        isOpen={riotApiModalOpen}
        onClose={() => setRiotApiModalOpen(false)}
        config={riotConfig}
        onSaveConfig={setRiotConfig}
      />

      <WindowsDesktopModal
        isOpen={windowsModalOpen}
        onClose={() => setWindowsModalOpen(false)}
        isWindowsFrameMode={isWindowsFrameMode}
        onToggleWindowsFrame={() => setIsWindowsFrameMode(!isWindowsFrameMode)}
      />

      {/* One-Time Summoner Onboarding Modal */}
      <OnboardingModal
        isOpen={onboardingOpen}
        currentUser={currentUser}
        onClose={() => setOnboardingOpen(false)}
        onSave={handleSaveOnboarding}
      />

      {/* Previous Seasons & Peak Ranks History Modal */}
      <PreviousSeasonsModal
        isOpen={previousSeasonsOpen}
        onClose={() => setPreviousSeasonsOpen(false)}
        user={currentUser}
        onUpdateRank={(newRank) => {
          setCurrentUser((prev) => ({
            ...prev,
            rank: newRank,
          }));
        }}
      />
    </div>
  );
}
