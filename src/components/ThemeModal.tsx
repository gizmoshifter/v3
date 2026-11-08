import React, { useState } from 'react';
import { ProfileTheme, UserProfile } from '../types/lol.ts';
import { AVAILABLE_THEMES, AVAILABLE_PROFILE_ICONS } from '../data/mockLolData.ts';
import { X, Check, Sparkles, Image, Shield, AlertCircle } from 'lucide-react';

interface ThemeModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserProfile;
  onSaveTheme: (theme: ProfileTheme, iconId: number) => void;
}

export const ThemeModal: React.FC<ThemeModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onSaveTheme,
}) => {
  const [selectedTheme, setSelectedTheme] = useState<ProfileTheme>(currentUser.profileTheme);
  const [selectedIconId, setSelectedIconId] = useState<number>(currentUser.profileIconId);
  const [customSplashInput, setCustomSplashInput] = useState<string>('');
  const [showNotification, setShowNotification] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleApply = () => {
    let finalTheme = { ...selectedTheme };
    if (customSplashInput.trim()) {
      finalTheme.splashUrl = customSplashInput.trim();
      finalTheme.name = 'Custom LoL Skin Splash';
    }
    onSaveTheme(finalTheme, selectedIconId);
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
      onClose();
    }, 400);
  };

  const handleResetToProjectVayne = () => {
    const projectVayne = AVAILABLE_THEMES[0];
    setSelectedTheme(projectVayne);
    setSelectedIconId(1211);
    setCustomSplashInput('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto glass-panel rounded-2xl border border-rose-500/30 p-6 shadow-2xl text-slate-100">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-rose-500/20 text-rose-400 border border-rose-500/30">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                Customize Profile Theme & Background
              </h2>
              <p className="text-xs text-slate-400">
                Configure your background splash art, summoner avatar icon, and visual HUD style.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="btn-tactile p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Live Preview Card */}
        <div className="mt-5 relative h-36 rounded-xl overflow-hidden border border-white/15 shadow-md">
          <img
            src={customSplashInput.trim() || selectedTheme.splashUrl}
            alt={selectedTheme.name}
            className="w-full h-full object-cover object-top filter brightness-[0.6]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
          <div className="absolute bottom-3 left-4 flex items-center gap-3">
            <div className="relative w-12 h-12 rounded-xl p-0.5 bg-gradient-to-br from-rose-500 to-cyan-500">
              <img
                src={`https://ddragon.leagueoflegends.com/cdn/14.24.1/img/profileicon/${selectedIconId}.png`}
                alt="Selected icon"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <div>
              <div className="text-sm font-bold text-white flex items-center gap-1.5">
                <span>{currentUser.summonerName}</span>
                <span className="text-xs text-rose-400 font-mono">#{currentUser.tagLine}</span>
              </div>
              <div className="text-xs text-cyan-300 font-mono">
                Theme: {selectedTheme.name}
              </div>
            </div>
          </div>
          <div className="absolute top-3 right-3">
            <button
              onClick={handleResetToProjectVayne}
              className="text-[11px] font-mono px-2.5 py-1 rounded bg-rose-500/30 hover:bg-rose-500/40 border border-rose-500/50 text-rose-200"
            >
              Reset to PROJECT: Vayne
            </button>
          </div>
        </div>

        {/* Preset Splash Themes */}
        <div className="mt-6">
          <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono flex items-center gap-1.5 mb-3">
            <Image className="w-4 h-4 text-rose-400" />
            <span>Profile Background Themes</span>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {AVAILABLE_THEMES.map((theme) => {
              const isSelected = selectedTheme.id === theme.id && !customSplashInput.trim();
              return (
                <button
                  key={theme.id}
                  onClick={() => {
                    setSelectedTheme(theme);
                    setCustomSplashInput('');
                  }}
                  className={`btn-tactile text-left relative p-3 rounded-xl border flex items-center gap-3 transition-all ${
                    isSelected
                      ? 'bg-rose-500/15 border-rose-500 text-white shadow-[0_0_15px_rgba(244,63,94,0.25)]'
                      : 'bg-white/5 border-white/10 hover:border-white/20 text-slate-300 hover:bg-white/10'
                  }`}
                >
                  <img
                    src={theme.splashUrl}
                    alt={theme.name}
                    className="w-16 h-12 object-cover rounded-lg border border-white/10"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-bold truncate flex items-center justify-between">
                      <span>{theme.name}</span>
                      {isSelected && <Check className="w-4 h-4 text-rose-400 shrink-0 ml-1" />}
                    </div>
                    <div className="text-[11px] text-slate-400 font-mono truncate">
                      {theme.championName} Skin
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Profile Icon Selector */}
        <div className="mt-6">
          <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono flex items-center gap-1.5 mb-3">
            <Shield className="w-4 h-4 text-cyan-400" />
            <span>Summoner Profile Icon</span>
          </label>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
            {AVAILABLE_PROFILE_ICONS.map((icon) => {
              const isSelected = selectedIconId === icon.id;
              return (
                <button
                  key={icon.id}
                  onClick={() => setSelectedIconId(icon.id)}
                  className={`btn-tactile group relative p-1.5 rounded-xl border flex flex-col items-center gap-1.5 transition-all ${
                    isSelected
                      ? 'bg-cyan-500/20 border-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.3)]'
                      : 'bg-white/5 border-white/10 hover:border-white/20'
                  }`}
                >
                  <img
                    src={icon.url}
                    alt={icon.name}
                    className="w-12 h-12 object-cover rounded-lg group-hover:scale-105 transition-transform"
                  />
                  <span className="text-[10px] text-slate-300 font-mono text-center truncate w-full">
                    {icon.name.split(' ')[0]}
                  </span>
                  {isSelected && (
                    <div className="absolute top-1 right-1 w-4 h-4 rounded-full bg-cyan-400 text-slate-950 flex items-center justify-center">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Custom Splash URL input (Optional for pro users) */}
        <div className="mt-6">
          <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono flex items-center gap-1.5 mb-2">
            <span>Custom Riot Splash URL (Optional)</span>
          </label>
          <input
            type="text"
            placeholder="e.g. https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Vayne_10.jpg"
            value={customSplashInput}
            onChange={(e) => setCustomSplashInput(e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/15 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-500/60 font-mono"
          />
        </div>

        {/* Action Buttons */}
        <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="btn-tactile px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white bg-white/5 hover:bg-white/10"
          >
            Cancel
          </button>
          <button
            onClick={handleApply}
            className="btn-tactile px-5 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-400 hover:to-pink-500 text-white shadow-[0_0_20px_rgba(244,63,94,0.4)] flex items-center gap-2"
          >
            <Check className="w-4 h-4" />
            <span>Save Profile Theme</span>
          </button>
        </div>
      </div>
    </div>
  );
};
