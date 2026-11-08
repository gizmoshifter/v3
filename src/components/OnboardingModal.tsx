import React, { useState, useEffect } from 'react';
import { UserProfile } from '../types/lol.ts';
import { Shield, Sparkles, Check, ArrowRight, UserCheck, Flame, Compass } from 'lucide-react';

interface OnboardingModalProps {
  currentUser: UserProfile;
  isOpen: boolean;
  onSave: (summonerName: string, tagLine: string, region: string) => void;
  onClose: () => void;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({
  currentUser,
  isOpen,
  onSave,
  onClose,
}) => {
  const [name, setName] = useState(currentUser.summonerName || 'sin');
  const [tag, setTag] = useState(currentUser.tagLine || 'O00');
  const [region, setRegion] = useState(currentUser.region || 'NA');

  useEffect(() => {
    setName(currentUser.summonerName || 'sin');
    setTag(currentUser.tagLine || 'O00');
    setRegion(currentUser.region || 'NA');
  }, [currentUser]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onSave(name.trim(), tag.trim() || 'NA1', region);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg glass-panel glass-specular rounded-2xl border border-white/20 p-6 sm:p-8 shadow-2xl overflow-hidden">
        {/* Ambient Top Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-32 bg-rose-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-500/30 to-cyan-500/30 border border-white/20 flex items-center justify-center shadow-md">
              <Compass className="w-5 h-5 text-rose-400" />
            </div>
            <div>
              <h2 className="text-xl font-black text-white tracking-wide">
                Welcome to Onyx Companion
              </h2>
              <p className="text-xs text-slate-400 font-mono">
                Set your primary Riot ID for personalized match history &amp; stats
              </p>
            </div>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed my-4 bg-white/5 p-3 rounded-xl border border-white/10">
            Configure your League of Legends account once. Onyx will set this summoner as your default home dashboard, tracking your Emerald ranked progress, champion masteries, and counter-pick recommendations.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Summoner Name & Tag */}
            <div>
              <label className="block text-xs font-mono font-semibold text-slate-300 mb-1.5">
                Riot ID (Game Name #Tag)
              </label>
              <div className="grid grid-cols-3 gap-2">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="sin"
                  required
                  className="col-span-2 px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/15 text-white font-mono text-sm placeholder:text-slate-600 focus:outline-none focus:border-rose-400/60 focus:ring-1 focus:ring-rose-400/60 transition-all"
                />
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-slate-500 font-mono text-sm">#</span>
                  <input
                    type="text"
                    value={tag}
                    onChange={(e) => setTag(e.target.value.replace('#', ''))}
                    placeholder="O00"
                    required
                    className="w-full pl-7 pr-3 py-2.5 rounded-xl bg-black/50 border border-white/15 text-rose-300 font-mono text-sm placeholder:text-slate-600 focus:outline-none focus:border-rose-400/60 focus:ring-1 focus:ring-rose-400/60 transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Server Region */}
            <div>
              <label className="block text-xs font-mono font-semibold text-slate-300 mb-1.5">
                Riot Server / Platform Region
              </label>
              <select
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/15 text-white font-mono text-sm focus:outline-none focus:border-cyan-400/60 focus:ring-1 focus:ring-cyan-400/60 transition-all"
              >
                <option value="NA">North America (NA1) — Current Server</option>
                <option value="EUW">Europe West (EUW1)</option>
                <option value="KR">Korea (KR)</option>
                <option value="EUNE">Europe Nordic &amp; East (EUN1)</option>
                <option value="OCE">Oceania (OC1)</option>
                <option value="BR">Brazil (BR1)</option>
                <option value="LAN">Latin America North (LA1)</option>
              </select>
            </div>

            {/* Quick Profile Snapshot Preview */}
            <div className="p-3.5 rounded-xl bg-gradient-to-r from-emerald-950/20 via-slate-900/40 to-cyan-950/20 border border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src="https://ddragon.leagueoflegends.com/cdn/14.24.1/img/profileicon/1211.png"
                  alt="OP.GG Icon"
                  referrerPolicy="no-referrer"
                  className="w-10 h-10 rounded-lg object-cover border border-emerald-500/40"
                />
                <div>
                  <div className="text-xs font-bold text-white font-mono">
                    {name || 'sin'} #{tag || 'O00'}
                  </div>
                  <div className="text-[11px] text-emerald-400 font-semibold font-mono flex items-center gap-1">
                    <span>Emerald IV (68 LP)</span>
                    <span className="text-slate-500">•</span>
                    <span className="text-cyan-300">OP.GG Verified</span>
                  </div>
                </div>
              </div>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Default Home
              </span>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="btn-tactile px-4 py-2 rounded-xl text-xs font-mono font-semibold text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
              >
                Skip For Now
              </button>
              <button
                type="submit"
                className="btn-tactile px-5 py-2.5 rounded-xl text-xs font-mono font-bold bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-400 hover:to-rose-500 text-white border border-rose-400/50 flex items-center gap-2 shadow-[0_0_16px_rgba(244,63,94,0.35)]"
              >
                <Check className="w-4 h-4" />
                <span>Save &amp; Open Home</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
