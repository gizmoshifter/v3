import React from 'react';
import { UserProfile, RiotApiConfig } from '../types/lol.ts';
import { LiveFeedDockPosition } from './LiveFeedDrawer.tsx';
import {
  Hexagon,
  Sparkles,
  UserCheck,
  Key,
  Monitor,
  Radio,
  Swords,
  Trophy,
  BarChart3,
  Minus,
  Square,
  X,
  Palette,
  Crosshair,
  Newspaper,
} from 'lucide-react';
import { getRankEmblemUrl } from '../utils/lolAssets.ts';

export type MainNavTab = 'matches' | 'champions' | 'champ-select' | 'news' | 'analytics';

interface HeaderNavProps {
  currentUser: UserProfile;
  activeTab: MainNavTab;
  onChangeTab: (tab: MainNavTab) => void;
  onOpenThemeModal: () => void;
  onOpenUserSwitcher: () => void;
  onOpenRiotApiModal: () => void;
  onOpenWindowsModal: () => void;
  onOpenPreviousSeasons?: () => void;
  liveFeedPosition: LiveFeedDockPosition;
  onChangeLiveFeedPosition: (pos: LiveFeedDockPosition) => void;
  isWindowsFrameMode: boolean;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  currentUser,
  activeTab,
  onChangeTab,
  onOpenThemeModal,
  onOpenUserSwitcher,
  onOpenRiotApiModal,
  onOpenWindowsModal,
  onOpenPreviousSeasons,
  liveFeedPosition,
  onChangeLiveFeedPosition,
  isWindowsFrameMode,
}) => {
  return (
    <header className="sticky top-0 z-30 w-full glass-panel border-b border-white/10 backdrop-blur-2xl">
      {/* Optional Windows 11 Desktop Titlebar */}
      {isWindowsFrameMode && (
        <div className="w-full h-8 bg-slate-950/90 border-b border-white/10 flex items-center justify-between px-3 text-slate-400 select-none text-[11px] font-mono">
          <div className="flex items-center gap-2">
            <Hexagon className="w-3.5 h-3.5 text-rose-500 fill-rose-500/20" />
            <span className="text-slate-300 font-semibold">League of Legends Companion (Win11 x64)</span>
          </div>
          <div className="flex items-center">
            <button className="h-8 px-3 hover:bg-white/10 text-slate-400 hover:text-white transition-colors">
              <Minus className="w-3 h-3" />
            </button>
            <button className="h-8 px-3 hover:bg-white/10 text-slate-400 hover:text-white transition-colors">
              <Square className="w-2.5 h-2.5" />
            </button>
            <button className="h-8 px-3 hover:bg-rose-600 text-slate-400 hover:text-white transition-colors">
              <X className="w-3 h-3" />
            </button>
          </div>
        </div>
      )}

      {/* Main Navigation Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Brand & Tabs */}
        <div className="flex items-center gap-6">
          {/* Minimal Onyx Gemstone Icon (No text words) */}
          <div className="group relative flex items-center cursor-default" title="Onyx">
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-b from-white/20 via-white/5 to-transparent p-[1px] shadow-[0_4px_20px_rgba(0,0,0,0.6)] backdrop-blur-md">
              <div className="w-full h-full rounded-[11px] bg-gradient-to-br from-slate-900 via-slate-950 to-black flex items-center justify-center overflow-hidden border border-white/10 group-hover:border-rose-500/40 transition-colors">
                {/* Faceted Onyx Obsidian Gem Icon */}
                <svg
                  viewBox="0 0 24 24"
                  className="w-5 h-5 text-white filter drop-shadow-[0_0_8px_rgba(244,63,94,0.4)]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polygon points="6 3 18 3 22 9 12 22 2 9" fill="url(#onyx-facet-grad)" stroke="rgba(255,255,255,0.7)" />
                  <line x1="2" y1="9" x2="22" y2="9" stroke="rgba(244,63,94,0.6)" />
                  <line x1="12" y1="22" x2="9" y2="9" stroke="rgba(255,255,255,0.4)" />
                  <line x1="12" y1="22" x2="15" y2="9" stroke="rgba(255,255,255,0.4)" />
                  <line x1="6" y1="3" x2="9" y2="9" stroke="rgba(6,182,212,0.6)" />
                  <line x1="18" y1="3" x2="15" y2="9" stroke="rgba(6,182,212,0.6)" />
                  <defs>
                    <linearGradient id="onyx-facet-grad" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#1e2230" stopOpacity="0.95" />
                      <stop offset="50%" stopColor="#0d111d" stopOpacity="0.98" />
                      <stop offset="100%" stopColor="#05070e" stopOpacity="1" />
                    </linearGradient>
                  </defs>
                </svg>
                {/* Specular Liquid Glass Sheen */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/15 to-transparent pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="hidden md:flex items-center gap-1 bg-white/5 p-1 rounded-xl border border-white/10">
            <button
              onClick={() => onChangeTab('matches')}
              className={`btn-tactile px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                activeTab === 'matches'
                  ? 'bg-rose-500/25 text-rose-200 border border-rose-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
              }`}
            >
              <Swords className="w-3.5 h-3.5" />
              <span>Matches</span>
            </button>

            <button
              onClick={() => onChangeTab('champions')}
              className={`btn-tactile px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                activeTab === 'champions'
                  ? 'bg-rose-500/25 text-rose-200 border border-rose-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
              }`}
            >
              <Trophy className="w-3.5 h-3.5" />
              <span>Champions</span>
            </button>

            <button
              onClick={() => onChangeTab('champ-select')}
              className={`btn-tactile px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                activeTab === 'champ-select'
                  ? 'bg-rose-500/25 text-rose-200 border border-rose-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
              }`}
            >
              <Crosshair className="w-3.5 h-3.5 text-cyan-400" />
              <span>Draft &amp; Pro Builds</span>
            </button>

            <button
              onClick={() => onChangeTab('news')}
              className={`btn-tactile px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                activeTab === 'news'
                  ? 'bg-rose-500/25 text-rose-200 border border-rose-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
              }`}
            >
              <Newspaper className="w-3.5 h-3.5 text-purple-400" />
              <span>News &amp; Patches</span>
            </button>

            <button
              onClick={() => onChangeTab('analytics')}
              className={`btn-tactile px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                activeTab === 'analytics'
                  ? 'bg-rose-500/25 text-rose-200 border border-rose-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Performance</span>
            </button>
          </nav>
        </div>

        {/* Right Side: Active User Chip & Tool Buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Active User Chip */}
          <button
            onClick={onOpenUserSwitcher}
            className="btn-tactile flex items-center gap-2 p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all text-left"
            title="Switch User Profile"
          >
            <img
              src={`https://ddragon.leagueoflegends.com/cdn/14.24.1/img/profileicon/${currentUser.profileIconId}.png`}
              alt={currentUser.summonerName}
              referrerPolicy="no-referrer"
              className="w-7 h-7 rounded-lg object-cover border border-white/20"
            />
            <div className="hidden sm:block">
              <div className="text-xs font-bold text-white flex items-center gap-1">
                <span>{currentUser.summonerName}</span>
                <span className="text-[10px] text-rose-400 font-mono">#{currentUser.tagLine}</span>
              </div>
              <div className="text-[10px] text-slate-300 font-mono flex items-center gap-1">
                <img
                  src={getRankEmblemUrl(currentUser.rank.tier)}
                  alt={currentUser.rank.tier}
                  referrerPolicy="no-referrer"
                  className="w-3.5 h-3.5 object-contain"
                />
                <span className="text-emerald-400 font-bold">{currentUser.rank.tier} {currentUser.rank.division}</span>
              </div>
            </div>
            <UserCheck className="w-3.5 h-3.5 text-cyan-400 ml-1 hidden sm:block" />
          </button>

          {/* Peak Rank Quick Trigger Button */}
          {onOpenPreviousSeasons && (
            <button
              onClick={onOpenPreviousSeasons}
              className="btn-tactile hidden md:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-mono font-bold transition-colors shadow-sm"
              title="View Peak Ranks & Previous Seasons Matrix"
            >
              <Trophy className="w-3.5 h-3.5 text-amber-400" />
              <span>Peak: {currentUser.allTimePeak?.tier || 'MASTER'}</span>
            </button>
          )}

          {/* Theme Switcher Button */}
          <button
            onClick={onOpenThemeModal}
            className="btn-tactile p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-rose-300 hover:text-rose-200 transition-colors"
            title={`Theme & Background: ${currentUser.profileTheme.name}`}
          >
            <Palette className="w-4 h-4 text-rose-400" />
          </button>

          {/* Live Feed Dock Toggle */}
          <button
            onClick={() => {
              const nextPos: LiveFeedDockPosition =
                liveFeedPosition === 'side-hover'
                  ? 'top-ticker'
                  : liveFeedPosition === 'top-ticker'
                  ? 'lower-section'
                  : 'side-hover';
              onChangeLiveFeedPosition(nextPos);
            }}
            className="btn-tactile hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-slate-300"
            title="Cycle Live Feed dock position (Side / Top / Bottom)"
          >
            <Radio className="w-3.5 h-3.5 text-rose-400" />
            <span className="hidden lg:inline">Feed:</span>
            <span className="text-cyan-400 font-bold uppercase">{liveFeedPosition.split('-')[0]}</span>
          </button>

          {/* Riot API Key Button */}
          <button
            onClick={onOpenRiotApiModal}
            className="btn-tactile flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-slate-300"
            title="Configure Riot API Key"
          >
            <Key className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Riot API</span>
          </button>

          {/* Windows 11 Desktop Button */}
          <button
            onClick={onOpenWindowsModal}
            className="btn-tactile px-3 py-1.5 rounded-xl text-xs font-bold bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400/40 text-cyan-200 flex items-center gap-1.5 shadow-[0_0_12px_rgba(6,182,212,0.2)]"
            title="Run on Windows 11 as .EXE"
          >
            <Monitor className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline">Win 11 App</span>
          </button>
        </div>
      </div>

      {/* Mobile Sub-Navigation Bar */}
      <div className="md:hidden flex items-center justify-around border-t border-white/10 py-1.5 bg-black/40 overflow-x-auto">
        <button
          onClick={() => onChangeTab('matches')}
          className={`text-xs font-semibold py-1 px-2.5 rounded-lg whitespace-nowrap ${
            activeTab === 'matches' ? 'text-rose-400 bg-rose-500/10' : 'text-slate-400'
          }`}
        >
          Matches
        </button>
        <button
          onClick={() => onChangeTab('champions')}
          className={`text-xs font-semibold py-1 px-2.5 rounded-lg whitespace-nowrap ${
            activeTab === 'champions' ? 'text-rose-400 bg-rose-500/10' : 'text-slate-400'
          }`}
        >
          Champions
        </button>
        <button
          onClick={() => onChangeTab('champ-select')}
          className={`text-xs font-semibold py-1 px-2.5 rounded-lg whitespace-nowrap ${
            activeTab === 'champ-select' ? 'text-rose-400 bg-rose-500/10' : 'text-slate-400'
          }`}
        >
          Draft &amp; Counters
        </button>
        <button
          onClick={() => onChangeTab('news')}
          className={`text-xs font-semibold py-1 px-2.5 rounded-lg whitespace-nowrap ${
            activeTab === 'news' ? 'text-rose-400 bg-rose-500/10' : 'text-slate-400'
          }`}
        >
          News
        </button>
        <button
          onClick={() => onChangeTab('analytics')}
          className={`text-xs font-semibold py-1 px-2.5 rounded-lg whitespace-nowrap ${
            activeTab === 'analytics' ? 'text-rose-400 bg-rose-500/10' : 'text-slate-400'
          }`}
        >
          Analytics
        </button>
      </div>
    </header>
  );
};
