import React, { useState } from 'react';
import { UserProfile } from '../types/lol.ts';
import { POPULAR_SUMMONERS } from '../data/mockLolData.ts';
import { RIOT_REGIONS } from '../services/riotApi.ts';
import { X, Search, Check, User, Globe, Trophy } from 'lucide-react';
import { getRankEmblemUrl } from '../utils/lolAssets.ts';

interface UserSwitcherModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserProfile;
  onSelectUser: (user: UserProfile) => void;
}

export const UserSwitcherModal: React.FC<UserSwitcherModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onSelectUser,
}) => {
  const [searchName, setSearchName] = useState<string>('');
  const [searchTag, setSearchTag] = useState<string>('NA1');
  const [selectedRegion, setSelectedRegion] = useState<string>('NA1');

  if (!isOpen) return null;

  const handleCustomSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchName.trim()) return;

    // Build custom summoner profile
    const customUser: UserProfile = {
      id: `custom_${Date.now()}`,
      summonerName: searchName.trim(),
      tagLine: searchTag.trim() || 'NA1',
      region: selectedRegion,
      summonerLevel: Math.floor(Math.random() * 200) + 150,
      profileIconId: 3154,
      rank: {
        tier: 'EMERALD',
        division: 'II',
        lp: 52,
        wins: 114,
        losses: 98,
      },
      profileTheme: currentUser.profileTheme,
    };

    onSelectUser(customUser);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl glass-panel rounded-2xl border border-cyan-500/30 p-6 shadow-2xl text-slate-100">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Select Summoner Profile</h2>
              <p className="text-xs text-slate-400">
                Pick a user to view their match history, champion mastery, and stats.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="btn-tactile p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Custom Summoner Search */}
        <form onSubmit={handleCustomSearch} className="mt-5 p-4 rounded-xl bg-white/5 border border-white/10">
          <label className="text-xs font-semibold text-cyan-300 uppercase tracking-wider font-mono flex items-center gap-1.5 mb-2.5">
            <Search className="w-3.5 h-3.5" />
            <span>Search Any Summoner (Riot ID)</span>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-2">
            <div className="sm:col-span-6">
              <input
                type="text"
                placeholder="Game Name (e.g. sin)"
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-black/50 border border-white/15 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-medium"
              />
            </div>
            <div className="sm:col-span-3">
              <div className="relative">
                <span className="absolute left-2.5 top-2 text-xs text-slate-400 font-mono">#</span>
                <input
                  type="text"
                  placeholder="O00"
                  value={searchTag}
                  onChange={(e) => setSearchTag(e.target.value)}
                  className="w-full pl-6 pr-2 py-2 rounded-lg bg-black/50 border border-white/15 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-mono uppercase"
                />
              </div>
            </div>
            <div className="sm:col-span-3">
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="w-full px-2 py-2 rounded-lg bg-black/50 border border-white/15 text-xs text-white focus:outline-none focus:border-cyan-400 font-mono"
              >
                {RIOT_REGIONS.map((r) => (
                  <option key={r.id} value={r.id} className="bg-slate-900 text-white">
                    {r.id}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <button
            type="submit"
            disabled={!searchName.trim()}
            className="btn-tactile w-full mt-3 py-2 rounded-lg text-xs font-bold bg-cyan-500 hover:bg-cyan-400 disabled:opacity-40 text-slate-950 flex items-center justify-center gap-1.5 transition-all shadow-md"
          >
            <Search className="w-3.5 h-3.5" />
            <span>Load Summoner Profile</span>
          </button>
        </form>

        {/* Quick Pick Summoners */}
        <div className="mt-5">
          <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono flex items-center gap-1.5 mb-2.5">
            <Trophy className="w-3.5 h-3.5 text-amber-400" />
            <span>Quick Pick Profiles</span>
          </label>
          <div className="space-y-2">
            {POPULAR_SUMMONERS.map((sum) => {
              const isSelected = currentUser.summonerName === sum.summonerName && currentUser.tagLine === sum.tagLine;
              const isSelf = sum.id === 'user_sin' || sum.id === 'user_self';
              return (
                <button
                  key={sum.id}
                  onClick={() => {
                    onSelectUser(sum);
                    onClose();
                  }}
                  className={`btn-tactile w-full text-left p-3 rounded-xl border flex items-center justify-between transition-all ${
                    isSelected
                      ? 'bg-cyan-500/15 border-cyan-400 text-white shadow-[0_0_15px_rgba(6,182,212,0.2)]'
                      : 'bg-white/5 border-white/10 hover:border-white/20 text-slate-300 hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={`https://ddragon.leagueoflegends.com/cdn/14.24.1/img/profileicon/${sum.profileIconId}.png`}
                      alt={sum.summonerName}
                      className="w-10 h-10 rounded-lg object-cover border border-white/10"
                    />
                    <div>
                      <div className="text-xs font-bold flex items-center gap-1.5">
                        <span className="text-white">{sum.summonerName}</span>
                        <span className="text-cyan-400 font-mono">#{sum.tagLine}</span>
                        {isSelf && (
                          <span className="px-1.5 py-0.2 rounded text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                            YOU (OP.GG / RIOT)
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-slate-400 font-mono flex items-center gap-2 mt-0.5">
                        <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                          <img
                            src={getRankEmblemUrl(sum.rank.tier)}
                            alt={sum.rank.tier}
                            referrerPolicy="no-referrer"
                            className="w-4 h-4 object-contain"
                          />
                          {sum.rank.tier} {sum.rank.division} ({sum.rank.lp} LP)
                        </span>
                        {sum.allTimePeak && (
                          <>
                            <span>•</span>
                            <span className="text-amber-300 font-bold">Peak: {sum.allTimePeak.tier}</span>
                          </>
                        )}
                        <span>•</span>
                        <span>Lvl {sum.summonerLevel}</span>
                        <span>•</span>
                        <span className="uppercase">{sum.region}</span>
                      </div>
                    </div>
                  </div>

                  {isSelected ? (
                    <div className="p-1 rounded-full bg-cyan-400 text-slate-950">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  ) : (
                    <span className="text-xs text-slate-400 hover:text-white font-mono">
                      Select
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
