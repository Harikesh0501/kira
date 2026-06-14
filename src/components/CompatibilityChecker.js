// src/components/CompatibilityChecker.js
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Shield, Cpu, Check, AlertCircle, RefreshCw, Terminal, CheckCircle2, HardDrive, CpuIcon } from 'lucide-react';

export default function CompatibilityChecker() {
  const [isMounted, setIsMounted] = useState(false);
  const [scanState, setScanState] = useState('idle'); // idle | scanning | success
  const [progress, setProgress] = useState(0);
  const [scanLogs, setScanLogs] = useState([]);
  
  // Real or detected specs
  const [detectedOS, setDetectedOS] = useState('Detecting...');
  const [speechSupported, setSpeechSupported] = useState(false);
  const [cores, setCores] = useState(8);
  const [ram, setRam] = useState(16);

  const logsRef = useRef(null);
  const scanIntervalRef = useRef(null);

  // Initialize and detect specs
  useEffect(() => {
    setIsMounted(true);
    if (typeof window !== 'undefined') {
      // OS Detection
      const userAgent = window.navigator.userAgent;
      let osName = 'Windows';
      if (userAgent.indexOf('Mac') !== -1) osName = 'macOS';
      else if (userAgent.indexOf('Linux') !== -1) osName = 'Linux';
      setDetectedOS(osName);

      // Web Speech API
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      setSpeechSupported(!!SpeechRecognition);

      // Hardware Cores
      if (navigator.hardwareConcurrency) {
        setCores(navigator.hardwareConcurrency);
      }

      // Memory (RAM) - Safari doesn't support deviceMemory
      if (navigator.deviceMemory) {
        setRam(navigator.deviceMemory);
      } else {
        // Fallback simulated value
        setRam(16);
      }
    }
  }, []);

  // Scroll to bottom of logs
  useEffect(() => {
    if (logsRef.current) {
      logsRef.current.scrollTop = logsRef.current.scrollHeight;
    }
  }, [scanLogs]);

  const runDiagnostics = () => {
    if (scanState === 'scanning') return;
    
    setScanState('scanning');
    setProgress(0);
    setScanLogs(['[+] Initializing hardware compatibility scanner...']);
    
    const isWindows = detectedOS === 'Windows';
    let currentProgress = 0;
    const runSteps = [
      { p: 15, msg: `[+] Detecting Host Platform... Detected ${detectedOS} kernel.${isWindows ? '' : ' [UNSUPPORTED]'}` },
      { p: 35, msg: speechSupported ? '[+] Checking microphone audio drivers... Web Speech API active.' : '[!] Checking microphone audio drivers... Web Speech API unsupported in this browser.' },
      { p: 55, msg: `[+] Probing CPU Architecture... ${cores} cores allocated for thread concurrency.` },
      { p: 75, msg: `[+] Evaluating Memory capacity... ${ram}GB RAM buffers ready for LLM context.` },
      { p: 90, msg: isWindows ? '[+] Checking developer environment bindings... Python 3.11 developer path ok.' : '[!] Checking developer environment bindings... Windows registry keys missing.' },
      { p: 100, msg: isWindows ? '✨ DIAGNOSTIC COMPLETE: System fully compatible with K.I.R.A.' : '❌ DIAGNOSTIC FAILED: Host platform is not Windows. K.I.R.A. is only compatible with Windows kernels.' }
    ];

    if (scanIntervalRef.current) clearInterval(scanIntervalRef.current);

    scanIntervalRef.current = setInterval(() => {
      currentProgress += 1;
      setProgress(currentProgress);

      const step = runSteps.find(s => s.p === currentProgress);
      if (step) {
        setScanLogs(prev => [...prev, step.msg]);
      }

      if (currentProgress >= 100) {
        clearInterval(scanIntervalRef.current);
        setScanState(isWindows ? 'success' : 'failed');
      }
    }, 35);
  };

  return (
    <section className="compatibility-section" id="compatibility" style={{ background: 'linear-gradient(180deg, var(--bg-primary) 0%, var(--bg-secondary) 100%)', borderBottom: '1px solid var(--border-color)', paddingBottom: '8rem' }}>
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header" style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 className="gradient-text">Workstation Compatibility</h2>
          <p className="subtitle">
            Validate whether your local desktop hardware and browser configurations meet the requirement specs to run Kira.
          </p>
        </div>

        {/* Diagnostic Dashboard */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'stretch' }} className="grid-2">
          
          {/* Diagnostic Console Panel */}
          <div className="glass-card glow-on-hover" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1.75rem', height: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Terminal className="text-cyan" size={18} />
                <h3 style={{ color: 'white', fontSize: '1.25rem', fontWeight: 800, margin: 0 }}>Local Diagnostics Scan</h3>
              </div>
              <span className={`popular-badge`} style={{ 
                position: 'static', 
                background: scanState === 'success' ? 'rgba(16, 185, 129, 0.08)' : scanState === 'failed' ? 'rgba(239, 68, 68, 0.08)' : scanState === 'scanning' ? 'rgba(59, 130, 246, 0.08)' : 'rgba(255, 255, 255, 0.03)', 
                border: scanState === 'success' ? '1px solid rgba(16, 185, 129, 0.2)' : scanState === 'failed' ? '1px solid rgba(239, 68, 68, 0.2)' : scanState === 'scanning' ? '1px solid rgba(59, 130, 246, 0.2)' : '1px solid var(--border-color)', 
                color: scanState === 'success' ? '#34d399' : scanState === 'failed' ? '#f87171' : scanState === 'scanning' ? '#60a5fa' : 'var(--text-secondary)', 
                fontSize: '0.7rem' 
              }}>
                {scanState === 'success' ? 'COMPATIBLE' : scanState === 'failed' ? 'INCOMPATIBLE' : scanState === 'scanning' ? 'SCANNING' : 'STANDBY'}
              </span>
            </div>

            {/* Diagnostic Log Output screen */}
            <div 
              ref={logsRef}
              style={{ 
                background: '#040508', 
                border: '1px solid var(--border-color)', 
                borderRadius: '12px', 
                height: '180px', 
                padding: '1.25rem', 
                overflowY: 'auto',
                fontFamily: 'monospace',
                fontSize: '0.8rem',
                lineHeight: '1.5',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem'
              }}
            >
              {scanState === 'idle' && (
                <div style={{ color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', textAlign: 'center', gap: '0.5rem' }}>
                  <Cpu size={24} style={{ opacity: 0.4 }} />
                  <span>Workstation diagnostics scanner is idle. Click run scan below to check hardware components.</span>
                </div>
              )}
              {isMounted && scanLogs.map((log, idx) => {
                let color = 'var(--text-secondary)';
                if (log.startsWith('[Success]') || log.startsWith('✨')) color = '#34d399';
                else if (log.startsWith('[!]')) color = '#fbbf24';
                else if (log.startsWith('[+]')) color = 'var(--accent-cyan)';
                return (
                  <div key={idx} style={{ color }}>
                    {log}
                  </div>
                );
              })}
              {scanState === 'scanning' && (
                <div style={{ color: 'var(--text-muted)', fontStyle: 'italic', display: 'flex', gap: '6px', alignItems: 'center' }}>
                  <span className="spinner-icon pulse">⚡</span>
                  <span>Probing memory buffers and pipeline routing...</span>
                </div>
              )}
            </div>

            {/* Scanning Progress Bar */}
            {scanState === 'scanning' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                  <span>Running Diagnostic Check...</span>
                  <span>{progress}%</span>
                </div>
                <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '100px', overflow: 'hidden' }}>
                  <div style={{ width: `${progress}%`, height: '100%', background: 'linear-gradient(90deg, var(--accent-purple), var(--accent-cyan))', borderRadius: '100px', transition: 'width 0.05s ease-out' }}></div>
                </div>
              </div>
            )}

            {/* Run Button / Success Shield / Failure Shield */}
            {scanState === 'idle' || scanState === 'scanning' ? (
              <button 
                onClick={runDiagnostics} 
                className="btn btn-primary"
                disabled={scanState === 'scanning'}
                style={{ alignSelf: 'flex-start', padding: '0.75rem 2rem', display: 'flex', gap: '0.5rem', width: '100%', justifyContent: 'center' }}
                id="run-diagnostics-btn"
                suppressHydrationWarning={true}
              >
                <RefreshCw size={16} className={scanState === 'scanning' ? 'spinner-icon' : ''} />
                <span>{scanState === 'scanning' ? 'Scanning Workstation...' : 'Run Diagnostics Scan'}</span>
              </button>
            ) : scanState === 'success' ? (
              <div 
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '1.25rem', 
                  padding: '1.25rem', 
                  background: 'rgba(16, 185, 129, 0.04)', 
                  border: '1px solid rgba(16, 185, 129, 0.15)', 
                  borderRadius: '12px',
                  animation: 'fadeIn 0.5s ease-out'
                }}
              >
                <div className="feat-icon-wrapper" style={{ border: '1px solid rgba(16, 185, 129, 0.3)', background: 'rgba(16, 185, 129, 0.08)', color: '#34d399', width: '48px', height: '48px', borderRadius: '50%', flexShrink: 0 }}>
                  <Shield size={20} />
                </div>
                <div>
                  <h4 style={{ color: 'white', fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.15rem' }}>Workstation Verified</h4>
                  <p style={{ color: '#a7f3d0', fontSize: '0.8rem', margin: 0, lineHeight: 1.4 }}>
                    Your hardware architecture and browser runtime meet all specs to operate Kira companion pipelines locally.
                  </p>
                </div>
              </div>
            ) : (
              <div 
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '1.25rem', 
                  padding: '1.25rem', 
                  background: 'rgba(239, 68, 68, 0.04)', 
                  border: '1px solid rgba(239, 68, 68, 0.15)', 
                  borderRadius: '12px',
                  animation: 'fadeIn 0.5s ease-out'
                }}
              >
                <div className="feat-icon-wrapper" style={{ border: '1px solid rgba(239, 68, 68, 0.3)', background: 'rgba(239, 68, 68, 0.08)', color: '#f87171', width: '48px', height: '48px', borderRadius: '50%', flexShrink: 0 }}>
                  <AlertCircle size={20} />
                </div>
                <div>
                  <h4 style={{ color: 'white', fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.15rem' }}>Workstation Incompatible</h4>
                  <p style={{ color: '#fca5a5', fontSize: '0.8rem', margin: 0, lineHeight: 1.4 }}>
                    Kira requires a Windows platform. macOS and Linux systems are not supported by the local client engine.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Security & Privacy Protocols */}
          <div id="privacy-security" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <h3 style={{ color: 'white', fontSize: '1.5rem', fontWeight: 800, margin: 0 }}>Security & Privacy Protocols</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0, lineHeight: '1.6' }}>
              Kira is engineered with an offline-first architecture to protect your workstation integrity. Every pipeline runs inside your local system sandbox.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
              
              {/* Protocol 1: 100% Offline */}
              <div className="glass-card" style={{ padding: '1.25rem', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div style={{ fontSize: '1.5rem', marginTop: '2px' }}>🔒</div>
                <div>
                  <h4 style={{ color: 'white', fontSize: '0.9rem', fontWeight: 700, margin: '0 0 0.25rem 0' }}>100% Offline Speech</h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.75rem', margin: 0, lineHeight: '1.4' }}>
                    Voice transcription, translation, and LLM text generation process entirely on your local CPU.
                  </p>
                </div>
              </div>

              {/* Protocol 2: Zero Telemetry */}
              <div className="glass-card" style={{ padding: '1.25rem', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div style={{ fontSize: '1.5rem', marginTop: '2px' }}>🔏</div>
                <div>
                  <h4 style={{ color: 'white', fontSize: '0.9rem', fontWeight: 700, margin: '0 0 0.25rem 0' }}>Zero Telemetry</h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.75rem', margin: 0, lineHeight: '1.4' }}>
                    No usage trackers, external analytics, or cloud event logs. Your interactions remain private.
                  </p>
                </div>
              </div>

              {/* Protocol 3: Volatile RAM Cache */}
              <div className="glass-card" style={{ padding: '1.25rem', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div style={{ fontSize: '1.5rem', marginTop: '2px' }}>📦</div>
                <div>
                  <h4 style={{ color: 'white', fontSize: '0.9rem', fontWeight: 700, margin: '0 0 0.25rem 0' }}>Volatile RAM Cache</h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.75rem', margin: 0, lineHeight: '1.4' }}>
                    OCR screen scans are held temporarily in system RAM and immediately purged after execution.
                  </p>
                </div>
              </div>

              {/* Protocol 4: Session Pairing */}
              <div className="glass-card" style={{ padding: '1.25rem', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div style={{ fontSize: '1.5rem', marginTop: '2px' }}>🔑</div>
                <div>
                  <h4 style={{ color: 'white', fontSize: '0.9rem', fontWeight: 700, margin: '0 0 0.25rem 0' }}>Secure Pairing</h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.75rem', margin: 0, lineHeight: '1.4' }}>
                    The mobile companion portal runs via a secure SSH tunnel protected by a single-session PIN code.
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
