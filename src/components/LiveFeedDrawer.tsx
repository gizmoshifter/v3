import React, { useState } from 'react';
import { LiveFeedItem } from '../types/lol.ts';
import { LIVE_FEED_ITEMS } from '../data/mockLolData.ts';
import { Radio, ChevronLeft, ChevronRight, Layout, Minimize2, ExternalLink, Activity, Flame } from 'lucide-react';

export type LiveFeedDockPosition = 'side-hover' | 'top-ticker' | 'lower-section';

interface LiveFeedDrawerProps {
  position: LiveFeedDockPosition;
  onChangePosition: (pos: LiveFeedDockPosition) => void;
}

export const LiveFeedDrawer: React.FC<LiveFeedDrawerProps> = ({
  position,
  onChangePosition,
}) => {
  const [isSideHovered, setIsSideHovered] = useState<boolean>(false);
  const [isPinnedOpen, setIsPinnedOpen] = useState<boolean>(false);

  // Position 1: Top Ticker Bar
  if (position === 'top-ticker') {
    return (
      <div className="w-full glass-panel rounded-xl px-4 py-2.5 border border-white/10 flex items-center justify-between gap-4 overflow-hidden mb-5">
        <div className="flex items-center gap-2 shrink-0">
          <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
          <span className="text-xs font-mono font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1">
            <Radio className="w-3.5 h-3.5" />
            <span>LIVE FEED:</span>
          </span>
        </div>

        <div className="flex-1 overflow-x-auto whitespace-nowrap flex items-center gap-6 text-xs font-mono scrollbar-none py-1">
          {LIVE_FEED_ITEMS.map((item) => (
            <div key={item.id} className="flex items-center gap-2 shrink-0">
              <span
                className={`px-1.5 py-0.2 rounded text-[10px] font-bold ${
                  item.accent === 'rose'
                    ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                    : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                }`}
              >
                {item.status.toUpperCase()}
              </span>
              <span className="font-bold text-slate-200">{item.title}</span>
              <span className="text-slate-400 text-[11px]">— {item.subtitle}</span>
              <span className="text-slate-600 font-normal">|</span>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={() => onChangePosition('side-hover')}
            className="btn-tactile text-[11px] font-mono px-2 py-1 rounded bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10"
            title="Move to side hover column"
          >
            Move to Side
          </button>
          <button
            onClick={() => onChangePosition('lower-section')}
            className="btn-tactile text-[11px] font-mono px-2 py-1 rounded bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10"
            title="Move to lower section"
          >
            Move to Bottom
          </button>
        </div>
      </div>
    );
  }

  // Position 2: Lower Section (at bottom of page)
  if (position === 'lower-section') {
    return (
      <div className="glass-panel rounded-2xl p-6 border border-white/10 mt-8">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-white font-mono flex items-center gap-2">
              <Radio className="w-4 h-4 text-rose-400" />
              <span>Live League Activity & Esports Radar</span>
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onChangePosition('side-hover')}
              className="btn-tactile text-xs font-mono px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10"
            >
              Dock to Side Hover
            </button>
            <button
              onClick={() => onChangePosition('top-ticker')}
              className="btn-tactile text-xs font-mono px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10"
            >
              Dock to Top Ticker
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {LIVE_FEED_ITEMS.map((item) => (
            <div
              key={item.id}
              className="p-3.5 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-[11px] font-mono mb-1.5">
                  <span
                    className={`px-2 py-0.5 rounded font-bold ${
                      item.accent === 'rose'
                        ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                        : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                    }`}
                  >
                    {item.status.toUpperCase()}
                  </span>
                  <span className="text-slate-400">{item.timestamp}</span>
                </div>
                <div className="text-xs font-bold text-white mb-1">{item.title}</div>
                <p className="text-[11px] text-slate-300">{item.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Position 3 (Default): Side Column Accessible When Hovering Mouse Near Right Edge!
  const isExpanded = isSideHovered || isPinnedOpen;

  return (
    <>
      {/* Invisible hover trigger zone along right viewport edge */}
      <div
        onMouseEnter={() => setIsSideHovered(true)}
        className="fixed top-20 right-0 w-8 h-[calc(100vh-80px)] z-40 pointer-events-auto"
      />

      {/* Edge Handle Tab (always visible, pulsing gently) */}
      <button
        onClick={() => setIsPinnedOpen(!isPinnedOpen)}
        onMouseEnter={() => setIsSideHovered(true)}
        className={`fixed right-0 top-36 z-40 p-2.5 rounded-l-xl bg-slate-900/90 border-l border-y border-rose-500/50 backdrop-blur-xl text-rose-400 shadow-[0_0_20px_rgba(244,63,94,0.35)] flex items-center gap-1.5 transition-transform duration-200 cursor-pointer ${
          isExpanded ? 'translate-x-full opacity-0 pointer-events-none' : 'translate-x-0 opacity-100'
        }`}
        title="Hover near right edge or click to open Live Feed"
      >
        <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
        <span className="text-[11px] font-mono font-bold tracking-widest [writing-mode:vertical-lr] py-2">
          LIVE FEED
        </span>
        <ChevronLeft className="w-4 h-4 text-rose-400" />
      </button>

      {/* Slide-out Drawer Column */}
      <aside
        onMouseEnter={() => setIsSideHovered(true)}
        onMouseLeave={() => setIsSideHovered(false)}
        className={`fixed top-16 right-0 w-84 sm:w-96 h-[calc(100vh-64px)] z-40 glass-panel border-l border-rose-500/40 shadow-2xl flex flex-col transition-all duration-300 ease-out transform ${
          isExpanded ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Drawer Header */}
        <div className="p-4 border-b border-white/10 flex items-center justify-between bg-black/40">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider text-white font-mono flex items-center gap-1.5">
              <Radio className="w-3.5 h-3.5 text-rose-400" />
              <span>Live LoL Radar</span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Pin Toggle */}
            <button
              onClick={() => setIsPinnedOpen(!isPinnedOpen)}
              className={`text-[10px] font-mono px-2 py-0.5 rounded border transition-colors ${
                isPinnedOpen
                  ? 'bg-rose-500/30 text-rose-300 border-rose-500/50'
                  : 'bg-white/5 text-slate-400 border-white/10 hover:text-white'
              }`}
            >
              {isPinnedOpen ? 'Pinned' : 'Auto-Hide'}
            </button>

            {/* Position Change Quick Menu */}
            <button
              onClick={() => onChangePosition('top-ticker')}
              className="text-slate-400 hover:text-white p-1"
              title="Switch to Top Ticker"
            >
              <Layout className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => {
                setIsPinnedOpen(false);
                setIsSideHovered(false);
              }}
              className="text-slate-400 hover:text-white p-1"
              title="Close drawer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Live Items List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          <div className="text-[10px] font-mono uppercase text-slate-400 tracking-wider">
            Active Pro Games & Friend Lobbies
          </div>

          {LIVE_FEED_ITEMS.map((item) => (
            <div
              key={item.id}
              className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all group"
            >
              <div className="flex items-center justify-between text-[11px] font-mono mb-1">
                <span
                  className={`px-1.5 py-0.2 rounded font-bold text-[10px] ${
                    item.accent === 'rose'
                      ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                      : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                  }`}
                >
                  {item.status.toUpperCase()}
                </span>
                <span className="text-slate-400 text-[10px]">{item.timestamp}</span>
              </div>

              <div className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors">
                {item.title}
              </div>
              <p className="text-[11px] text-slate-300 mt-1 leading-snug">{item.subtitle}</p>

              {item.score && (
                <div className="mt-2 text-xs font-mono font-bold text-rose-400 flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5" />
                  <span>Score: {item.score}</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom Placement Controls */}
        <div className="p-3 border-t border-white/10 bg-black/30 flex items-center justify-between text-[11px] font-mono text-slate-400">
          <span>Docking: Side Edge</span>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => onChangePosition('top-ticker')}
              className="hover:text-cyan-300 underline"
            >
              Top Bar
            </button>
            <span>•</span>
            <button
              onClick={() => onChangePosition('lower-section')}
              className="hover:text-cyan-300 underline"
            >
              Bottom Feed
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
