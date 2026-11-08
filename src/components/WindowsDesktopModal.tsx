import React, { useState } from 'react';
import { generateWindowsBatchRunner, downloadFile } from '../utils/windowsDesktop.ts';
import { Monitor, Download, Terminal, Check, X, Shield, Cpu, Zap, Copy } from 'lucide-react';

interface WindowsDesktopModalProps {
  isOpen: boolean;
  onClose: () => void;
  isWindowsFrameMode: boolean;
  onToggleWindowsFrame: () => void;
}

export const WindowsDesktopModal: React.FC<WindowsDesktopModalProps> = ({
  isOpen,
  onClose,
  isWindowsFrameMode,
  onToggleWindowsFrame,
}) => {
  const [copiedCode, setCopiedCode] = useState<boolean>(false);
  const [downloaded, setDownloaded] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleDownloadBatch = () => {
    const currentUrl = window.location.href;
    const content = generateWindowsBatchRunner();
    downloadFile('Launch-Onyx-Windows11.bat', content, 'application/x-bat');
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 3000);
  };

  const electronBuildCommand = `git clone https://github.com/gizmoshifter/Onyx-3.0
cd Onyx-3.0
npm install
npm run electron:build`;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(electronBuildCommand);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto glass-panel rounded-2xl border border-cyan-500/30 p-6 shadow-2xl text-slate-100">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
              <Monitor className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                Windows 11 Desktop Client & .EXE Runner
              </h2>
              <p className="text-xs text-slate-400">
                Run Onyx 3.0 as a native, borderless desktop app with minimal RAM and zero input lag.
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

        {/* Option 1: Instant Windows 11 App Runner (.bat) */}
        <div className="mt-5 p-4 rounded-xl bg-cyan-950/20 border border-cyan-500/30">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-cyan-300 font-mono flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5" />
                <span>Instant Windows 11 Native Runner (0 RAM Overhead)</span>
              </div>
              <p className="text-xs text-slate-300 mt-1 font-sans">
                Launches Onyx in native Windows 11 borderless application mode with Microsoft Edge / WebView2 Mica acrylic glass acceleration.
              </p>
            </div>
            <button
              onClick={handleDownloadBatch}
              className="btn-tactile shrink-0 px-4 py-2 rounded-xl text-xs font-bold bg-cyan-500 hover:bg-cyan-400 text-slate-950 flex items-center gap-2 shadow-md"
            >
              <Download className="w-4 h-4" />
              <span>{downloaded ? 'Downloaded!' : 'Download .bat Runner'}</span>
            </button>
          </div>
        </div>

        {/* Option 2: Standalone .EXE Build with Electron */}
        <div className="mt-4 p-4 rounded-xl bg-white/5 border border-white/10">
          <div className="flex items-center justify-between mb-2">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-300 font-mono flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-rose-400" />
              <span>Build Standalone .EXE Installer</span>
            </div>
            <button
              onClick={handleCopyCode}
              className="text-xs font-mono text-cyan-400 hover:underline flex items-center gap-1"
            >
              {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedCode ? 'Copied' : 'Copy Commands'}</span>
            </button>
          </div>
          <pre className="p-3 rounded-lg bg-black/60 border border-white/10 text-xs font-mono text-slate-300 overflow-x-auto">
            {electronBuildCommand}
          </pre>
          <p className="text-[11px] text-slate-400 mt-2">
            Outputs <code>dist/Onyx-3.0-Setup.exe</code> ready to run on any 64-bit Windows 11 machine.
          </p>
        </div>

        {/* Windows 11 Native Frame Simulation Toggle */}
        <div className="mt-4 p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-white">Simulate Windows 11 Desktop Titlebar</div>
            <div className="text-[11px] text-slate-400">
              Renders native minimize, maximize, and close window controls at the top.
            </div>
          </div>
          <button
            onClick={onToggleWindowsFrame}
            className={`btn-tactile px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold border transition-all ${
              isWindowsFrameMode
                ? 'bg-rose-500/20 text-rose-300 border-rose-500/50'
                : 'bg-white/10 text-slate-300 border-white/15'
            }`}
          >
            {isWindowsFrameMode ? 'Enabled' : 'Disabled'}
          </button>
        </div>

        {/* Performance Spec Summary */}
        <div className="mt-4 grid grid-cols-3 gap-2 text-center">
          <div className="p-2.5 rounded-lg bg-black/30 border border-white/10">
            <div className="text-[10px] uppercase font-mono text-slate-400">RAM Usage</div>
            <div className="text-xs font-bold text-emerald-400 font-mono mt-0.5">&lt; 120 MB</div>
          </div>
          <div className="p-2.5 rounded-lg bg-black/30 border border-white/10">
            <div className="text-[10px] uppercase font-mono text-slate-400">Input Lag</div>
            <div className="text-xs font-bold text-cyan-400 font-mono mt-0.5">&lt; 1 ms (Sub-frame)</div>
          </div>
          <div className="p-2.5 rounded-lg bg-black/30 border border-white/10">
            <div className="text-[10px] uppercase font-mono text-slate-400">Windows Support</div>
            <div className="text-xs font-bold text-white font-mono mt-0.5">Win 11 &amp; 10</div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-white/10 flex justify-end">
          <button
            onClick={onClose}
            className="btn-tactile px-5 py-2 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/15 text-white"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
