import React, { useState } from 'react';
import { RiotApiConfig } from '../types/lol.ts';
import { RIOT_REGIONS, testRiotApiKey, validateRiotApiKeyFormat } from '../services/riotApi.ts';
import { Key, X, Check, AlertCircle, ShieldAlert, ExternalLink, RefreshCw } from 'lucide-react';

interface RiotApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: RiotApiConfig;
  onSaveConfig: (config: RiotApiConfig) => void;
}

export const RiotApiKeyModal: React.FC<RiotApiKeyModalProps> = ({
  isOpen,
  onClose,
  config,
  onSaveConfig,
}) => {
  const [apiKeyInput, setApiKeyInput] = useState<string>(config.apiKey || '');
  const [regionInput, setRegionInput] = useState<string>(config.region || 'NA1');
  const [isTesting, setIsTesting] = useState<boolean>(false);
  const [testResult, setTestResult] = useState<{ valid: boolean; message: string } | null>(null);

  if (!isOpen) return null;

  const handleTestKey = async () => {
    setIsTesting(true);
    setTestResult(null);
    const res = await testRiotApiKey(apiKeyInput, regionInput);
    setIsTesting(false);
    setTestResult(res);
  };

  const handleSave = () => {
    const isCustom = apiKeyInput.trim().length > 0;
    const isKeyValid = validateRiotApiKeyFormat(apiKeyInput.trim());

    const newConfig: RiotApiConfig = {
      apiKey: apiKeyInput.trim(),
      region: regionInput,
      isCustomKeySet: isCustom,
      lastTestedStatus: isCustom ? (isKeyValid ? 'valid' : 'invalid') : 'idle',
      statusMessage: isCustom ? 'Riot API Key saved and active!' : 'Default simulation active.',
    };

    onSaveConfig(newConfig);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg glass-panel rounded-2xl border border-rose-500/30 p-6 shadow-2xl text-slate-100">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-rose-500/20 text-rose-400 border border-rose-500/30">
              <Key className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                Riot Games API Configuration
              </h2>
              <p className="text-xs text-slate-400">
                Connect your personal Riot Developer API Key to query live Riot servers.
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

        {/* Input Form */}
        <div className="mt-5 space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono flex items-center justify-between mb-1.5">
              <span>Riot Developer API Key</span>
              <a
                href="https://developer.riotgames.com"
                target="_blank"
                rel="noreferrer"
                className="text-[11px] text-rose-400 hover:underline flex items-center gap-1 font-sans"
              >
                <span>Get key at developer.riotgames.com</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </label>
            <input
              type="password"
              placeholder="RGAPI-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
              value={apiKeyInput}
              onChange={(e) => {
                setApiKeyInput(e.target.value);
                setTestResult(null);
              }}
              className="w-full px-3 py-2.5 rounded-lg bg-black/50 border border-white/15 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-rose-400 font-mono tracking-wider"
            />
            <p className="text-[11px] text-slate-400 mt-1 font-sans">
              Personal Riot API keys are formatted as UUID prefixed by <code>RGAPI-</code> and refresh every 24 hours.
            </p>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono block mb-1.5">
              Default Riot Region
            </label>
            <select
              value={regionInput}
              onChange={(e) => setRegionInput(e.target.value)}
              className="w-full px-3 py-2.5 rounded-lg bg-black/50 border border-white/15 text-xs text-white focus:outline-none focus:border-rose-400 font-mono"
            >
              {RIOT_REGIONS.map((r) => (
                <option key={r.id} value={r.id} className="bg-slate-900 text-white">
                  {r.name}
                </option>
              ))}
            </select>
          </div>

          {/* Test Button & Result */}
          <div className="pt-2">
            <button
              onClick={handleTestKey}
              disabled={isTesting || !apiKeyInput.trim()}
              className="btn-tactile w-full py-2 rounded-lg text-xs font-semibold bg-white/10 hover:bg-white/15 border border-white/15 text-slate-200 disabled:opacity-40 flex items-center justify-center gap-1.5 transition-all"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isTesting ? 'animate-spin' : ''}`} />
              <span>{isTesting ? 'Testing Riot Connection...' : 'Test API Key'}</span>
            </button>

            {testResult && (
              <div
                className={`mt-3 p-3 rounded-xl text-xs font-mono flex items-start gap-2 border ${
                  testResult.valid
                    ? 'bg-emerald-950/30 text-emerald-300 border-emerald-500/30'
                    : 'bg-rose-950/30 text-rose-300 border-rose-500/30'
                }`}
              >
                {testResult.valid ? (
                  <Check className="w-4 h-4 shrink-0 text-emerald-400 mt-0.5" />
                ) : (
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-400 mt-0.5" />
                )}
                <span>{testResult.message}</span>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="btn-tactile px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white bg-white/5"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="btn-tactile px-5 py-2 rounded-xl text-xs font-bold bg-rose-500 hover:bg-rose-400 text-white shadow-[0_0_20px_rgba(244,63,94,0.4)] flex items-center gap-1.5"
          >
            <Check className="w-4 h-4" />
            <span>Save Configuration</span>
          </button>
        </div>
      </div>
    </div>
  );
};
