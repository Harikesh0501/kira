// src/components/Features.js
'use client';

import React, { useState } from 'react';
import { 
  Brain, Mic, ShieldAlert, Cpu, Eye, Lock,
  Code, Play, FileText, Search, Mail, Sliders, Calculator
} from 'lucide-react';

const SUITES = {
  security: {
    label: '🛡️ Security & Privacy',
    color: 'pink',
    desc: 'Local biometric algorithms and hardware fail-safes that guard your workstation offline and keep you in absolute control.',
    features: [
      {
        icon: <ShieldAlert className="feat-icon text-pink" size={24} />,
        title: 'Webcam Auto-Lock',
        desc: 'Local face landmark scanners monitor your presence. Instantly lock your Windows screen (Win+L) after 5 seconds away.'
      },
      {
        icon: <Eye className="feat-icon text-pink" size={24} />,
        title: 'Remote CCTV Streaming',
        desc: 'Access your PC webcam stream securely from anywhere via a mobile companion portal protected by PIN handshakes.'
      },
      {
        icon: <Lock className="feat-icon text-pink" size={24} />,
        title: 'Emergency Corner Stop',
        desc: 'Instant PyAutoGUI automation override. Move the mouse to any of the 4 screen corners to interrupt active actions immediately.'
      },
      {
        icon: <Mic className="feat-icon text-pink" size={24} />,
        title: 'Barge-In Voice Mute',
        desc: 'Speech engine allows interruption. Start speaking mid-sentence and Kira immediately silences its voice response to listen.'
      }
    ]
  },
  developer: {
    label: '⚙️ Workspace Automation',
    color: 'purple',
    desc: 'Autonomous developer agents and office file parsers executing multi-step workflows directly inside your workspace.',
    features: [
      {
        icon: <Code className="feat-icon text-purple" size={24} />,
        title: 'Coder Agent',
        desc: 'Refactors code blocks autonomously, edits files, and runs post-patch compile verification checks to ensure zero errors.'
      },
      {
        icon: <Play className="feat-icon text-purple" size={24} />,
        title: 'Runner & QA Agent',
        desc: 'Detects framework configurations, spins up background server daemons, and triggers Selenium browser integration tests.'
      },
      {
        icon: <FileText className="feat-icon text-purple" size={24} />,
        title: 'PDF/DOCX Summarizer',
        desc: 'Prompts for local documents, extracts raw text, and generates 3-point AI digests using offline or online LLM pipelines.'
      },
      {
        icon: <Search className="feat-icon text-purple" size={24} />,
        title: 'MD5 Duplicate Finder',
        desc: 'Scans workspace directories and computes MD5 hashes to identify, catalog, and safely purge duplicate files.'
      }
    ]
  },
  conversational: {
    label: '🗣️ Assistant & Utilities',
    color: 'cyan',
    desc: 'Bilingual speech recognition, email integration, and context-aware tools to streamline your daily workflow.',
    features: [
      {
        icon: <Brain className="feat-icon text-cyan" size={24} />,
        title: 'Siri-Level Memory',
        desc: 'Rolling context window of the last 10 interactions. Contextually link multiple questions without repeating subject details.'
      },
      {
        icon: <Mail className="feat-icon text-cyan" size={24} />,
        title: 'Gmail & SMTP Control',
        desc: 'Send emails via SMTP voice dictation, summarize unread mail, and check recent inboxes in the background.'
      },
      {
        icon: <Sliders className="feat-icon text-cyan" size={24} />,
        title: 'Mood Personality Engine',
        desc: 'Kira dynamically adjusts tone, humor, and greetings based on the hour (Cheerful, Focused, Relaxed, or Sleepy).'
      },
      {
        icon: <Calculator className="feat-icon text-cyan" size={24} />,
        title: 'Voice Math & Dictionary',
        desc: 'Execute calculations using natural language or retrieve quick definitions from word index APIs.'
      }
    ]
  }
};

export default function Features() {
  const [activeSuite, setActiveSuite] = useState('security');

  const suiteData = SUITES[activeSuite];

  return (
    <section className="features-section" id="features">
      <div className="container">
        
        {/* Component-Specific Custom Styles */}
        <style>{`
          .suite-tabs {
            display: flex;
            justify-content: center;
            gap: 1.5rem;
            margin-bottom: 2.5rem;
            flex-wrap: wrap;
            border-bottom: 1px solid var(--border-color);
            padding-bottom: 1.5rem;
          }
          .suite-tab-btn {
            background: rgba(255, 255, 255, 0.02);
            border: 1px solid var(--border-color);
            color: var(--text-secondary);
            padding: 0.8rem 1.75rem;
            font-size: 0.95rem;
            font-weight: 600;
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            display: flex;
            align-items: center;
            gap: 0.5rem;
          }
          .suite-tab-btn:hover {
            color: white;
            background: rgba(255, 255, 255, 0.05);
            border-color: var(--text-muted);
          }
          .suite-tab-btn.active.tab-pink {
            background: rgba(236, 72, 153, 0.08);
            border-color: var(--accent-pink);
            color: white;
            box-shadow: 0 0 15px rgba(236, 72, 153, 0.25);
          }
          .suite-tab-btn.active.tab-purple {
            background: rgba(139, 92, 246, 0.08);
            border-color: var(--accent-purple);
            color: white;
            box-shadow: 0 0 15px rgba(139, 92, 246, 0.25);
          }
          .suite-tab-btn.active.tab-cyan {
            background: rgba(6, 182, 212, 0.08);
            border-color: var(--accent-cyan);
            color: white;
            box-shadow: 0 0 15px rgba(6, 182, 212, 0.25);
          }
          .suite-intro-card {
            text-align: center;
            max-width: 800px;
            margin: 0 auto 3.5rem auto;
            padding: 2rem;
            border-radius: 12px;
            animation: fadeIn 0.4s ease;
          }
          .suite-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 2rem;
            animation: slideUp 0.4s ease-out;
          }
          @keyframes slideUp {
            from { opacity: 0; transform: translateY(15px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}</style>

        {/* Section Header */}
        <div className="section-header" style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 className="gradient-text">Advanced Siri-Level Features</h2>
          <p className="subtitle">
            Kira brings continuous voice control, multi-language speech, face security, and dual AI engines directly to your Windows desktop.
          </p>
        </div>

        {/* Suite Tab Selection Bar */}
        <div className="suite-tabs">
          {Object.entries(SUITES).map(([key, value]) => (
            <button
              key={key}
              onClick={() => setActiveSuite(key)}
              className={`suite-tab-btn ${activeSuite === key ? `active tab-${value.color}` : ''}`}
              id={`suite-tab-btn-${key}`}
            >
              <span>{value.label}</span>
            </button>
          ))}
        </div>

        {/* Active Suite Meta Description Card */}
        <div className="suite-intro-card glass-card">
          <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', margin: 0, lineHeight: '1.6' }}>
            {suiteData.desc}
          </p>
        </div>

        {/* Active Suite Features Grid */}
        <div className="suite-grid">
          {suiteData.features.map((feat, idx) => (
            <div 
              key={idx} 
              className={`feature-card glass-card glow-on-hover card-${suiteData.color}`} 
              id={`feature-card-${idx}`}
            >
              <div className={`feat-icon-wrapper wrapper-${suiteData.color}`}>
                {feat.icon}
              </div>
              <h3 className="feat-title">{feat.title}</h3>
              <p className="feat-desc">{feat.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
