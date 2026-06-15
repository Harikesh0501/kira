'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  Download, Terminal, Check, Copy, Cpu, Code, 
  ShieldCheck, Play, HelpCircle, HardDrive, RefreshCw, 
  AlertCircle, Sparkles, Laptop, TerminalSquare, Info
} from 'lucide-react';

export default function DownloadBanner() {
  // Configuration is fixed to Windows
  const activeOS = 'Windows';
  const activeShell = 'powershell';
  const [activeMode, setActiveMode] = useState('desktop'); // desktop | cli

  // Desktop Simulator State
  const [desktopState, setDesktopState] = useState('idle'); // idle | simulating | completed
  const [desktopLogs, setDesktopLogs] = useState([]);
  const [desktopProgress, setDesktopProgress] = useState(0);

  // CLI Simulator State
  const [cliState, setCliState] = useState('idle'); // idle | simulating | completed
  const [cliLogs, setCliLogs] = useState([]);
  const [cliProgress, setCliProgress] = useState(0);
  const [copied, setCopied] = useState(false);

  const desktopTerminalRef = useRef(null);
  const cliTerminalRef = useRef(null);

  // Scroll terminal logs to bottom automatically (without moving browser viewport)
  useEffect(() => {
    if (desktopTerminalRef.current) {
      desktopTerminalRef.current.scrollTop = desktopTerminalRef.current.scrollHeight;
    }
  }, [desktopLogs]);

  useEffect(() => {
    if (cliTerminalRef.current) {
      cliTerminalRef.current.scrollTop = cliTerminalRef.current.scrollHeight;
    }
  }, [cliLogs]);

  // Constant size metrics for All-in-One installer (3.8 GB total)
  const installerSize = '3.8 GB';
  const estDownloadTime = '12m 40s';

  // Commands helper
  const getCliCommand = () => {
    if (activeShell === 'bash') {
      return 'curl -fsSL https://usekira.ai/install.sh | bash';
    }
    return 'irm https://usekira.ai/install.ps1 | iex';
  };

  // Run log animations
  const runSimulatedLogs = (steps, setLogs, setProgress, setState, onComplete) => {
    setState('simulating');
    setLogs([]);
    setProgress(0);

    let currentStep = 0;
    const runNextStep = () => {
      if (currentStep < steps.length) {
        const step = steps[currentStep];
        if (step.progress !== undefined) {
          setProgress(step.progress);
        }
        setLogs(prev => [...prev, step.text]);
        currentStep++;
        setTimeout(runNextStep, step.delay || 400);
      } else {
        setState('completed');
        if (onComplete) onComplete();
      }
    };
    runNextStep();
  };

  // Auto-run simulation on mount to make the terminal look alive
  useEffect(() => {
    // Windows simulation steps (All-in-One payload bundle)
    const windowsSteps = [
      { text: '📡 Connecting to Kira CDN gateway (secure-cdn.usekira.ai)...', delay: 350, progress: 5 },
      { text: '🔒 SSL/TLS handshake completed. Session keys negotiated.', delay: 300, progress: 12 },
      { text: '💻 Target system verified: Windows (x86_64 architecture).', delay: 300, progress: 20 },
      { text: '📦 Querying package manifest for v1.2.0-stable...', delay: 400, progress: 30 },
      { text: '🔧 Packing All-In-One installer bundle (Size: 3.8 GB)...', delay: 500, progress: 45 },
      { text: '📦 Bundled features: [Core App Shell] [Llama-3 8B Local LLM] [Developer CLI Tools]', delay: 300, progress: 50 },
      { text: '📥 Starting secure payload transfer...', delay: 300, progress: 55 },
      { text: '📥 Downloading components... [====>               ] 25%', delay: 250, progress: 65 },
      { text: '📥 Downloading components... [==========>         ] 55%', delay: 250, progress: 75 },
      { text: '📥 Downloading components... [===============>    ] 80%', delay: 250, progress: 88 },
      { text: '📥 Downloading components... [====================] 100%', delay: 300, progress: 100 },
      { text: '🛡️ Verifying cryptographic SHA-256 signature... OK.', delay: 400, progress: 100 },
      { text: '🎉 SUCCESS: Offline installer compilation finished.', delay: 300, progress: 100 },
      { text: '💾 Kira-Installer.exe compilation finished. Ready for deployment.', delay: 300, progress: 100 }
    ];

    const timer = setTimeout(() => {
      runSimulatedLogs(
        windowsSteps, 
        setDesktopLogs, 
        setDesktopProgress, 
        setDesktopState
      );
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // CLI run simulation
  const handleCliSimulation = () => {
    if (cliState === 'simulating') return;

    const cmd = getCliCommand();
    const isBash = activeShell === 'bash';

    const cliSteps = [
      { text: `$ ${cmd}`, delay: 450, progress: 10 },
      { text: `  [+] Connecting to Kira CLI repository mirror...`, delay: 350, progress: 20 },
      { text: `  [+] Downloading script manifest: ${isBash ? 'install.sh' : 'install.ps1'}...`, delay: 400, progress: 35 },
      { text: `  [+] Launching local workstation diagnostics...`, delay: 450, progress: 50 },
      { text: `      - CPU: Architecture detected ${isBash ? 'x86_64/ARM64' : 'x64-Windows'}. OK`, delay: 300, progress: 60 },
      { text: `      - Memory: Hardware capacity meets developer standards. OK`, delay: 300, progress: 70 },
      { text: `  [+] Compiling installation tree directories...`, delay: 350, progress: 80 },
      { text: `      - Creating local workspace ~/.kira/bin... OK`, delay: 200, progress: 85 },
      { text: `      - Creating local cache ~/.kira/models... OK`, delay: 200, progress: 90 },
      { text: `  [+] Registering environmental variables. Adding 'kira' path bindings...`, delay: 400, progress: 95 },
      { text: `  ✨ Kira CLI engine successfully installed in developer paths!`, delay: 350, progress: 100 },
      { text: `  💡 Run 'kira --help' or 'kira init' to initialize offline background services.`, delay: 100, progress: 100 }
    ];

    runSimulatedLogs(cliSteps, setCliLogs, setCliProgress, setCliState);
  };

  // Copy helper
  const handleCopyCommand = () => {
    const text = getCliCommand();
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text)
        .then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        })
        .catch((err) => {
          console.error('Could not copy text: ', err);
          fallbackCopyText(text);
        });
    } else {
      fallbackCopyText(text);
    }
  };

  const fallbackCopyText = (text) => {
    try {
      const textArea = document.createElement("textarea");
      textArea.value = text;
      textArea.style.top = "0";
      textArea.style.left = "0";
      textArea.style.position = "fixed";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      const successful = document.execCommand('copy');
      document.body.removeChild(textArea);
      if (successful) {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch (err) {
      console.error('Fallback copy failed: ', err);
    }
  };

  return (
    <div className="container" style={{ marginBottom: '6rem' }}>
      {/* Component Styles */}
      <style>{`
        .station-card {
          border-radius: 20px;
          border: 1px solid var(--border-color);
          overflow: hidden;
          position: relative;
        }
        
        .station-header {
          padding: 2.5rem 2.5rem 1.5rem 2.5rem;
          border-bottom: 1px solid var(--border-color);
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: rgba(11, 13, 19, 0.4);
        }

        .station-grid {
          display: grid;
          grid-template-columns: 5fr 7fr;
          min-height: 500px;
        }

        @media (max-width: 968px) {
          .station-grid {
            grid-template-columns: 1fr;
          }
        }

        /* Configurator section */
        .configurator-panel {
          padding: 2.5rem;
          border-right: 1px solid var(--border-color);
          background: rgba(8, 10, 15, 0.8);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        @media (max-width: 968px) {
          .configurator-panel {
            border-right: none;
            border-bottom: 1px solid var(--border-color);
          }
        }

        .config-title {
          font-family: var(--font-heading);
          font-size: 1.25rem;
          color: var(--text-primary);
          margin-bottom: 1.5rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .meta-list {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          margin-bottom: 2rem;
        }

        .meta-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 0.75rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.04);
        }

        .meta-label {
          color: var(--text-secondary);
          font-size: 0.9rem;
        }

        .meta-value {
          color: var(--text-primary);
          font-weight: 600;
          font-size: 0.9rem;
        }

        .installer-features {
          background: rgba(16, 20, 30, 0.4);
          border: 1px solid var(--border-color);
          border-radius: 12px;
          padding: 1.25rem;
          margin-bottom: 1.5rem;
        }

        .feature-item-row {
          display: flex;
          align-items: center;
          gap: 0.50rem;
          font-size: 0.85rem;
          color: var(--text-secondary);
          margin-bottom: 0.5rem;
        }

        .feature-item-row:last-child {
          margin-bottom: 0;
        }

        .config-summary {
          border-top: 1px solid var(--border-color);
          padding-top: 1.5rem;
        }

        .summary-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 0.5rem;
          font-size: 0.9rem;
          color: var(--text-secondary);
        }

        .summary-total {
          font-family: var(--font-heading);
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .summary-total-size {
          color: var(--accent-cyan);
        }

        /* Console Section */
        .console-panel {
          padding: 2.5rem;
          background: rgba(5, 6, 8, 0.9);
          display: flex;
          flex-direction: column;
        }

        .mode-selectors {
          display: flex;
          border-bottom: 1px solid var(--border-color);
          margin-bottom: 1.5rem;
          gap: 1.5rem;
        }

        .mode-tab {
          padding-bottom: 0.75rem;
          color: var(--text-secondary);
          font-weight: 600;
          font-size: 0.95rem;
          background: none;
          border: none;
          cursor: pointer;
          position: relative;
          transition: color var(--transition-fast);
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .mode-tab:hover {
          color: var(--text-primary);
        }

        .mode-tab.active {
          color: var(--text-primary);
        }

        .mode-tab.active::after {
          content: '';
          position: absolute;
          bottom: -1px;
          left: 0;
          width: 100%;
          height: 2px;
          background: linear-gradient(90deg, var(--accent-purple), var(--accent-cyan));
        }

        /* Terminal Window */
        .cyber-terminal {
          background: #030406;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 10px;
          overflow: hidden;
          flex: 1;
          display: flex;
          flex-direction: column;
          box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.8);
        }

        .terminal-header {
          background: rgba(16, 20, 30, 0.5);
          padding: 0.5rem 1rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .terminal-dots {
          display: flex;
          gap: 6px;
        }

        .terminal-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }

        .terminal-title {
          font-family: 'Courier New', Courier, monospace;
          font-size: 0.75rem;
          color: var(--text-muted);
        }

        .terminal-body {
          padding: 1.25rem;
          font-family: 'Courier New', Courier, monospace;
          font-size: 0.85rem;
          color: #10b981;
          line-height: 1.5;
          flex: 1;
          overflow-y: auto;
          max-height: 240px;
          min-height: 180px;
        }

        .terminal-log-row {
          margin-bottom: 0.25rem;
          word-break: break-all;
          white-space: pre-wrap;
        }

        .terminal-progress-container {
          background: rgba(255, 255, 255, 0.05);
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          padding: 0.75rem 1.25rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 0.85rem;
        }

        .terminal-progress-bar-wrapper {
          flex: 1;
          height: 4px;
          background: rgba(255, 255, 255, 0.08);
          border-radius: 2px;
          margin: 0 1rem;
          overflow: hidden;
        }

        .terminal-progress-bar-fill {
          height: 100%;
          background: linear-gradient(90deg, var(--accent-purple), var(--accent-cyan));
          border-radius: 2px;
          transition: width 0.1s ease-out;
        }

        /* Tabs OS selectors */
        .os-selectors {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 1rem;
        }

        .os-tab {
          padding: 0.5rem 1rem;
          border-radius: 8px;
          border: 1px solid var(--border-color);
          background: rgba(16, 20, 30, 0.3);
          color: var(--text-secondary);
          cursor: pointer;
          font-weight: 500;
          font-size: 0.85rem;
          display: flex;
          align-items: center;
          gap: 0.35rem;
          transition: all var(--transition-fast);
        }

        .os-tab:hover {
          border-color: rgba(255, 255, 255, 0.15);
          color: var(--text-primary);
        }

        .os-tab.active {
          border-color: var(--accent-cyan);
          background: rgba(6, 182, 212, 0.05);
          color: var(--accent-cyan);
        }

        /* CLI command codebox */
        .cli-code-container {
          background: #030406;
          border: 1px solid var(--border-color);
          border-radius: 10px;
          padding: 0.75rem 1rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1rem;
        }

        .cli-code-text {
          font-family: 'Courier New', Courier, monospace;
          color: var(--text-primary);
          font-size: 0.85rem;
          overflow-x: auto;
          white-space: nowrap;
          flex: 1;
          margin-right: 1rem;
        }

        .cli-btn-icon {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.05);
          color: var(--text-secondary);
          width: 32px;
          height: 32px;
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .cli-btn-icon:hover {
          background: rgba(255, 255, 255, 0.1);
          color: var(--text-primary);
          border-color: rgba(255, 255, 255, 0.1);
        }

        /* CTA buttons */
        .btn-station-action {
          width: 100%;
          padding: 1rem;
          border-radius: 10px;
          border: none;
          background: linear-gradient(135deg, var(--accent-purple), var(--accent-cyan));
          color: white;
          font-weight: 600;
          font-family: var(--font-heading);
          font-size: 1rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          margin-bottom: 1.5rem;
          transition: all var(--transition-fast);
          box-shadow: 0 4px 20px rgba(139, 92, 246, 0.2);
        }

        .btn-station-action:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 6px 24px rgba(139, 92, 246, 0.35);
        }

        .btn-station-action:active:not(:disabled) {
          transform: translateY(0);
        }

        .btn-station-action:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          box-shadow: none;
        }

        /* Alternate links */
        .station-footer {
          margin-top: 1.25rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 0.8rem;
          color: var(--text-secondary);
        }

        .station-ver-badge {
          padding: 0.2rem 0.5rem;
          border-radius: 4px;
          background: rgba(255, 255, 255, 0.05);
          font-family: 'Courier New', Courier, monospace;
          color: var(--text-muted);
        }
      `}</style>

      <div className="station-card glass-card" id="download">
        {/* Banner header title */}
        <div className="station-header">
          <div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: '800', fontFamily: 'var(--font-heading)' }} className="gradient-text">
              Kira Workstation Installer
            </h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
              Download the secure offline bundle and configure your local desktop agent in minutes.
            </p>
          </div>
          <Sparkles style={{ color: 'var(--accent-purple)' }} size={24} />
        </div>

        <div className="station-grid">
          {/* Left panel: Metadata Info */}
          <div className="configurator-panel">
            <div>
              <div className="config-title">
                <Info size={18} style={{ color: 'var(--accent-purple)' }} />
                <span>Installer Bundle Info</span>
              </div>
              
              <div className="meta-list">
                <div className="meta-row">
                  <span className="meta-label">Package Name</span>
                  <span className="meta-value">Kira Offline Suite</span>
                </div>
                <div className="meta-row">
                  <span className="meta-label">Version</span>
                  <span className="meta-value">v1.2.0-stable</span>
                </div>
                <div className="meta-row">
                  <span className="meta-label">Target Architecture</span>
                  <span className="meta-value">x64 / ARM64</span>
                </div>
                <div className="meta-row">
                  <span className="meta-label">Verification</span>
                  <span className="meta-value" style={{ color: '#10b981' }}>✓ SHA-256 Signed</span>
                </div>
              </div>

              <div style={{ color: 'var(--text-primary)', fontWeight: '600', fontSize: '0.85rem', marginBottom: '0.75rem' }}>
                Included Modules:
              </div>
              <div className="installer-features">
                <div className="feature-item-row">
                  <Check size={14} style={{ color: 'var(--accent-cyan)' }} />
                  <span>🖥️ Kira Desktop Client Core Engine</span>
                </div>
                <div className="feature-item-row">
                  <Check size={14} style={{ color: 'var(--accent-cyan)' }} />
                  <span>🧠 Llama-3 8B Local LLM Model (Pre-trained)</span>
                </div>
                <div className="feature-item-row">
                  <Check size={14} style={{ color: 'var(--accent-cyan)' }} />
                  <span>💻 Developer SDK & PATH Terminal Utilities</span>
                </div>
              </div>
            </div>

            {/* Size summary */}
            <div className="config-summary">
              <div className="summary-row">
                <span>Distribution Node:</span>
                <span>Global Multi-region CDN</span>
              </div>
              <div className="summary-row" style={{ marginTop: '0.75rem' }}>
                <span className="summary-total">Total Package Size:</span>
                <span className="summary-total-size summary-total">{installerSize}</span>
              </div>
              <div className="summary-row" style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                <span>Est. Download Time (~40 Mbps):</span>
                <span>{estDownloadTime}</span>
              </div>
            </div>
          </div>

          {/* Right panel: Terminal simulators and buttons */}
          <div className="console-panel">
            {/* Tab Mode selectors */}
            <div className="mode-selectors">
              <button 
                className={`mode-tab ${activeMode === 'desktop' ? 'active' : ''}`}
                onClick={() => setActiveMode('desktop')}
                suppressHydrationWarning={true}
              >
                <Laptop size={16} />
                <span>Desktop GUI Installer</span>
              </button>
              <button 
                className={`mode-tab ${activeMode === 'cli' ? 'active' : ''}`}
                onClick={() => setActiveMode('cli')}
                suppressHydrationWarning={true}
              >
                <TerminalSquare size={16} />
                <span>Developer CLI Script</span>
              </button>
            </div>

            {/* Content for Desktop mode */}
            {activeMode === 'desktop' && (
              <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                {/* Status Indicator Card instead of Download button */}
                <div style={{
                  background: 'rgba(6, 182, 212, 0.02)',
                  border: '1px solid rgba(6, 182, 212, 0.15)',
                  borderRadius: '12px',
                  padding: '1.25rem',
                  marginBottom: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  boxShadow: '0 4px 20px rgba(6, 182, 212, 0.05)',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  {/* Decorative glowing gradient border */}
                  <div style={{
                    position: 'absolute',
                    top: 0, left: 0, width: '4px', height: '100%',
                    background: 'linear-gradient(to bottom, var(--accent-cyan), #a78bfa)'
                  }}></div>
                  
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '40px',
                    height: '40px',
                    borderRadius: '8px',
                    background: 'rgba(6, 182, 212, 0.1)',
                    color: 'var(--accent-cyan)',
                    flexShrink: 0
                  }}>
                    <Info size={20} />
                  </div>
                  
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ color: 'white', fontWeight: '700', fontSize: '0.9rem', marginBottom: '0.15rem' }}>
                      Large Offline Bundle (~3.8 GB)
                    </div>
                    <div style={{ color: 'var(--text-secondary)', fontSize: '0.78rem', lineHeight: '1.35' }}>
                      To initialize installation, run the automated setup command inside the <strong>Developer CLI Script</strong> tab.
                    </div>
                  </div>
                </div>

                {/* Live Console outputs */}
                <div className="cyber-terminal">
                  <div className="terminal-header">
                    <div className="terminal-dots">
                      <div className="terminal-dot" style={{ backgroundColor: '#ef4444' }}></div>
                      <div className="terminal-dot" style={{ backgroundColor: '#eab308' }}></div>
                      <div className="terminal-dot" style={{ backgroundColor: '#22c55e' }}></div>
                    </div>
                    <div className="terminal-title">kira-download-daemon.exe</div>
                  </div>
                  
                  {/* Progress panel if downloading/compiling */}
                  {desktopState === 'simulating' && (
                    <div className="terminal-progress-container">
                      <span>Status: Downloading Bundle</span>
                      <div className="terminal-progress-bar-wrapper">
                        <div className="terminal-progress-bar-fill" style={{ width: `${desktopProgress}%` }}></div>
                      </div>
                      <span>{desktopProgress}%</span>
                    </div>
                  )}

                  <div className="terminal-body" ref={desktopTerminalRef}>
                    {desktopLogs.length === 0 ? (
                      <div style={{ color: 'var(--text-muted)', fontFamily: 'monospace' }}>
                        KIRA CDN pipeline: STANDBY. Connecting to CDN network...
                      </div>
                    ) : (
                      desktopLogs.map((log, index) => {
                        let color = '#34d399'; // green/emerald for info
                        if (log.includes('[ALERT]') || log.includes('[ACCESS ERROR]')) color = '#fb7185'; // rose/pink
                        if (log.includes('[WARNING]')) color = '#fbbf24'; // amber
                        if (log.includes('📡') || log.includes('🔧')) color = '#a78bfa'; // purple/lavender
                        if (log.includes('🎉') || log.includes('SUCCESS')) color = '#22d3ee'; // cyan

                        return (
                          <div key={index} className="terminal-log-row" style={{ color }}>
                            {log}
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Content for CLI mode */}
            {activeMode === 'cli' && (
              <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>

                {/* Shell Command Code Box */}
                <div className="cli-code-container">
                  <div className="cli-code-text">{getCliCommand()}</div>
                  <button 
                    className="cli-btn-icon" 
                    onClick={handleCopyCommand}
                    title="Copy command to clipboard"
                    id="cli-copy-btn"
                    suppressHydrationWarning={true}
                  >
                    {copied ? <Check size={16} style={{ color: '#10b981' }} /> : <Copy size={16} />}
                  </button>
                </div>

                {/* Simulate Execution Trigger */}
                <button 
                  className="btn-station-action"
                  onClick={handleCliSimulation}
                  disabled={cliState === 'simulating'}
                  suppressHydrationWarning={true}
                >
                  <Play size={16} />
                  <span>{cliState === 'simulating' ? 'Running installation scripts...' : 'Simulate Terminal Installation'}</span>
                </button>

                {/* CLI Live Terminal Box */}
                <div className="cyber-terminal">
                  <div className="terminal-header">
                    <div className="terminal-dots">
                      <div className="terminal-dot" style={{ backgroundColor: '#ef4444' }}></div>
                      <div className="terminal-dot" style={{ backgroundColor: '#eab308' }}></div>
                      <div className="terminal-dot" style={{ backgroundColor: '#22c55e' }}></div>
                    </div>
                    <div className="terminal-title">{activeShell === 'bash' ? 'bash - ~/.kira/install.sh' : 'pwsh - install.ps1'}</div>
                  </div>

                  {cliState === 'simulating' && (
                    <div className="terminal-progress-container">
                      <span>Status: Running</span>
                      <div className="terminal-progress-bar-wrapper">
                        <div className="terminal-progress-bar-fill" style={{ width: `${cliProgress}%` }}></div>
                      </div>
                      <span>{cliProgress}%</span>
                    </div>
                  )}

                  <div className="terminal-body" style={{ color: '#e5e7eb' }} ref={cliTerminalRef}>
                    {cliLogs.length === 0 ? (
                      <div style={{ color: 'var(--text-muted)' }}>
                        Terminal Simulation Mode: STANDBY. Click "Simulate Terminal Installation" to run script downloads.
                      </div>
                    ) : (
                      cliLogs.map((log, index) => {
                        let color = '#d1d5db'; // default grey
                        if (log.startsWith('$')) color = '#f3f4f6'; // command row white
                        if (log.includes('✨') || log.includes('successfully')) color = '#34d399'; // green success
                        if (log.includes('[+]')) color = '#60a5fa'; // light blue tags
                        if (log.includes('- OS:') || log.includes('- Memory:')) color = '#fbbf24'; // yellow checks

                        return (
                          <div key={index} className="terminal-log-row" style={{ color }}>
                            {log}
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Extra build metrics in footer */}
            <div className="station-footer">
              <span className="station-ver-badge">Build: v1.2.0-stable</span>
              <span>All-In-One offline installation packages</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
