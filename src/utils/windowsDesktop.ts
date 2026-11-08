/**
 * Windows 11 Desktop Application Package & Runner generator.
 * Creates an ultra-lightweight Windows 11 native launcher (.bat / WebView2 window)
 * and Electron build instructions for standalone .exe creation.
 */

export function generateWindowsBatchRunner(): string {
  return `@echo off
:: ============================================================================
:: ONYX 3.0 - LEAGUE OF LEGENDS COMPANION (WINDOWS 11 NATIVE RUNNER)
:: High performance, low-RAM, liquid glass desktop overlay for LoL
:: ============================================================================
title Onyx 3.0 - LoL Companion
color 0B
cls
echo.
echo  ==============================================================
echo   [ONYX 3.0] Initializing Windows 11 Glass Desktop Mode...
echo  ==============================================================
echo.

:: Get local or hosted URL
set ONYX_URL=%~1
if "%ONYX_URL%"=="" (
  set ONYX_URL=http://localhost:3000
)

echo [*] Launching Onyx in high-framerate borderless Windows 11 window...
echo [*] Target URL: %ONYX_URL%

:: Try to launch with Microsoft Edge in standalone app mode (Mica / acrylic glass enabled)
start msedge --app="%ONYX_URL%" --window-size=1440,900 --enable-features=MicaTitlebar,AcrylicWindow --disable-features=TranslateUI --high-dpi-support=1

if %ERRORLEVEL% NEQ 0 (
  :: Fallback to Chrome app mode
  start chrome --app="%ONYX_URL%" --window-size=1440,900
)

echo.
echo [OK] Onyx 3.0 is running on Windows 11!
echo You can minimize or press Alt+Tab to switch between League of Legends and Onyx.
exit /b 0
`;
}

export function generateElectronConfig() {
  return {
    name: 'onyx-lol-companion',
    productName: 'Onyx 3.0',
    version: '3.0.0',
    description: 'High-performance liquid glass League of Legends match tracker and companion',
    main: 'electron-main.cjs',
    scripts: {
      'electron:start': 'electron electron-main.cjs',
      'electron:build': 'electron-builder --win nsis --x64',
    },
  };
}

export function downloadFile(filename: string, content: string, mimeType: string = 'text/plain') {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
