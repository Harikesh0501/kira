// src/components/HelpCenter.js
'use client';

import React, { useState, useEffect } from 'react';
import { Search, HelpCircle, Terminal, Shield, Cpu, MessageSquare, ChevronDown, Copy, Check, Folder, Smartphone, QrCode, FileText, Code, ChevronLeft, ChevronRight, CheckCircle2, Volume2 } from 'lucide-react';
import FAQ from './FAQ';

const CATEGORIES = ['All', 'System Control', 'Security Guard', 'AI & Vision', 'Media & Social'];

const COMMAND_DATABASE = [
  {
    category: 'System Control',
    title: '⏰ What Time Is It?',
    desc: 'Reports the current system time.',
    en: 'What time is it?',
    hi: 'Samay kya hai / Kitne baje hain',
    gu: 'Ketla vage che / Samay shu che'
  },
  {
    category: 'System Control',
    title: '🌤️ Check Weather',
    desc: 'Provides OpenWeather updates for your location.',
    en: 'What is the weather in [City]?',
    hi: 'Mausam batao / Mausam kaisa hai',
    gu: 'Havaman kevo che / Havaman batav'
  },
  {
    category: 'System Control',
    title: '🖥️ App closer',
    desc: 'Gracefully closes active apps searching window titles.',
    en: 'Close Google Chrome / Close [App Name]',
    hi: 'Chrome band karo / App band kar do',
    gu: 'Chrome band kar / App bandh kar'
  },
  {
    category: 'System Control',
    title: '🔋 Battery & System Health',
    desc: 'Reports CPU load, RAM usage, and battery levels.',
    en: 'System status / How is my battery?',
    hi: 'Battery kitni hai / Charge kitna hai',
    gu: 'Battery ketli che / Charge ketlo che'
  },
  {
    category: 'Security Guard',
    title: '🛡️ Webcam security lock',
    desc: 'Monitors camera; locks Windows screen after 5 seconds away.',
    en: 'Enable security mode / Disable security',
    hi: 'Security chalu karo / Security band karo',
    gu: 'Security chalu kar / Security bandh kar'
  },
  {
    category: 'AI & Vision',
    title: '👁️ Vision Screen Reader',
    desc: 'Saves screenshot and uses Gemini Vision AI to describe details.',
    en: 'What is on my screen? / Read my screen',
    hi: 'Screen kya hai / Screen read karo',
    gu: 'Screen shu che / Screen vanch'
  },
  {
    category: 'AI & Vision',
    title: '🎯 Text OCR clicking',
    desc: 'Scans the screen and moves mouse to click target text.',
    en: 'Click [Target Text] / Click on [Text]',
    hi: 'Click karo [Text]',
    gu: 'Click kar [Text]'
  },
  {
    category: 'AI & Vision',
    title: '🧠 Gemini AI Assistant',
    desc: 'Prompts Gemini 2.5 Flash online with conversational memory.',
    en: 'Ask AI [your question] / Ask Kira',
    hi: 'AI se pucho [question] / Kira se pucho',
    gu: 'AI ne puchh [question] / Kira ne puchh'
  },
  {
    category: 'Media & Social',
    title: '📱 WhatsApp Messaging',
    desc: 'Sends voice dictated messages to a target WhatsApp contact.',
    en: 'Send a WhatsApp message',
    hi: 'WhatsApp pe message bhejo / Message bhejo',
    gu: 'WhatsApp par message mokl / Message mokl'
  },
  {
    category: 'Media & Social',
    title: '🎬 YouTube Playback',
    desc: 'Directly plays music, movies, or tutorials on YouTube.',
    en: 'Play [Video Name] on YouTube',
    hi: 'YouTube par gaana chalao / Gaana bajao',
    gu: 'YouTube par geet vajav / Music chalav'
  },
  {
    category: 'System Control',
    title: '📧 Voice Gmail SMTP Sender',
    desc: 'Composes and sends emails to your contacts over SMTP by voice.',
    en: 'Email [contact] / mail [contact]',
    hi: 'Email bhejo / mail bhejo',
    gu: 'Email mokl / mail mokl'
  },
  {
    category: 'System Control',
    title: '📬 Email AI Summarizer',
    desc: 'Checks recent inbox emails and speaks a 3-point AI summary digest.',
    en: 'Summarize email / summarize my last email',
    hi: 'Email summarize kar / email summary batao',
    gu: 'Email summarize kar / email summary batav'
  },
  {
    category: 'System Control',
    title: '📂 Workspace Memory Anchor',
    desc: 'Registers or restores active workspace folder path states.',
    en: 'set active project / resume yesterday\'s work',
    hi: 'active project set karo',
    gu: 'active project set kar'
  },
  {
    category: 'System Control',
    title: '📁 Duplicate File Cleaner',
    desc: 'Computes MD5 checksums across active folders to locate duplicate files.',
    en: 'find duplicate files / check duplicates',
    hi: 'duplicate files dhoondo',
    gu: 'duplicate file shodh'
  },
  {
    category: 'AI & Vision',
    title: '🖥️ Vision-Action Workflow Loop',
    desc: 'Runs search workflows: performs Google query, copies text, opens notepad and saves file.',
    en: 'search google for [query] and save to notepad',
    hi: 'google search karke notepad me save karo',
    gu: 'google search kari ne notepad ma save kar'
  },
  {
    category: 'AI & Vision',
    title: '📄 Local File Summarizer',
    desc: 'Parses local PDF/DOCX/TXT file buffers and speaks a structured digest.',
    en: 'summarize file [path] / summarize document',
    hi: 'file summarize kar / document summarize kar',
    gu: 'file summarize kar / document summarize kar'
  },
  {
    category: 'Security Guard',
    title: '💬 WhatsApp Pair Notification',
    desc: 'Automatically texts the secure portal tunnel connection link to the owner on startup.',
    en: 'Auto-WhatsApp pairing link notification',
    hi: 'WhatsApp link notify option',
    gu: 'WhatsApp notification link option'
  }
];

export default function HelpCenter() {
  const [activeHelpTab, setActiveHelpTab] = useState('commands');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [openIdx, setOpenIdx] = useState(null);
  const [copiedText, setCopiedText] = useState('');
  const [mockCodeTab, setMockCodeTab] = useState('csv');
  const [activeStep, setActiveStep] = useState(0);
  const [showAllResults, setShowAllResults] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [pairingAlertSimulated, setPairingAlertSimulated] = useState(false);
  const [simulatedMessages, setSimulatedMessages] = useState([]);
  const [isSimulatingChat, setIsSimulatingChat] = useState(false);
  const [chatStep, setChatStep] = useState(0); // 0: initial, 1: connecting, 2: message 1 typing, 3: message 2 typing, 4: connected, 5: coupled

  // Parse URL query parameter or hash on mount/navigation to activate respective tab
  useEffect(() => {
    const handleUrlChange = () => {
      if (typeof window !== 'undefined') {
        const params = new URLSearchParams(window.location.search);
        const tab = params.get('tab');
        if (tab) {
          setActiveHelpTab(tab);
        } else {
          const hash = window.location.hash;
          if (hash === '#faq') {
            setActiveHelpTab('faq');
          } else if (hash === '#onboarding' || hash === '#setup') {
            setActiveHelpTab('onboarding');
          }
        }
      }
    };

    handleUrlChange();
    
    // Listen for state pops
    window.addEventListener('popstate', handleUrlChange);
    return () => window.removeEventListener('popstate', handleUrlChange);
  }, []);

  const handleCopy = (text) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text)
        .then(() => {
          setCopiedText(text);
          setTimeout(() => setCopiedText(''), 2000);
        })
        .catch((err) => {
          console.error('Could not copy text: ', err);
          fallbackCopyTextToClipboard(text);
        });
    } else {
      fallbackCopyTextToClipboard(text);
    }
  };

  const fallbackCopyTextToClipboard = (text) => {
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
        setCopiedText(text);
        setTimeout(() => setCopiedText(''), 2000);
      }
    } catch (err) {
      console.error('Fallback: Unable to copy', err);
    }
  };

  const handleSpeak = (text, lang) => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel(); // cancel current speaking
      const utterance = new SpeechSynthesisUtterance(text);
      if (lang === 'gu') {
        utterance.lang = 'gu-IN';
      } else if (lang === 'hi') {
        utterance.lang = 'hi-IN';
      } else {
        utterance.lang = 'en-US';
      }
      window.speechSynthesis.speak(utterance);
    }
  };

  const startPairingSimulation = (e) => {
    if (e) e.preventDefault();
    if (!phoneNumber) return;
    setIsSimulatingChat(true);
    setPairingAlertSimulated(true);
    setChatStep(1);
    setSimulatedMessages([]);

    // Step 1: KIRA starts connecting
    setTimeout(() => {
      setChatStep(2); // shows typing/connecting status
      
      // Step 2: KIRA sends first message
      setTimeout(() => {
        setSimulatedMessages(prev => [
          ...prev,
          { id: 1, text: '⚡ Secure tunnel active: http://lhr.life/auth', time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) }
        ]);
        setChatStep(3); // typing second message
        
        // Step 3: KIRA sends second message
        setTimeout(() => {
          setSimulatedMessages(prev => [
            ...prev,
            { id: 2, text: '🔑 Access PIN: 4892 (This PIN authorizes mobile portal coupling).', time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) }
          ]);
          setIsSimulatingChat(false);
          setChatStep(4); // finished sending, waiting for confirmation
        }, 1500);
      }, 1500);
    }, 1000);
  };

  const CATEGORY_META = {
    'System Control': { color: 'purple', icon: <Terminal size={14} className="text-purple" /> },
    'Security Guard': { color: 'pink', icon: <Shield size={14} className="text-pink" /> },
    'AI & Vision': { color: 'cyan', icon: <Cpu size={14} className="text-cyan" /> },
    'Media & Social': { color: 'pink', icon: <MessageSquare size={14} className="text-pink" /> }
  };

  const filteredCommands = COMMAND_DATABASE.filter((cmd) => {
    // Category Filter
    const matchesCategory = activeCategory === 'All' || cmd.category === activeCategory;
    
    // Search Query Filter
    const query = searchQuery.toLowerCase();
    const matchesSearch = 
      cmd.title.toLowerCase().includes(query) ||
      cmd.desc.toLowerCase().includes(query) ||
      cmd.en.toLowerCase().includes(query) ||
      cmd.hi.toLowerCase().includes(query) ||
      cmd.gu.toLowerCase().includes(query);

    return matchesCategory && matchesSearch;
  });

  return (
    <section className="faq-section" id="help" style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)', paddingBottom: '8rem' }}>
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header" style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 className="gradient-text">Interactive Command & Help Center</h2>
          <p className="subtitle">
            Search Kira voice prompts across all categories and three different languages.
          </p>
        </div>

        {/* Main Tabbed Switcher */}
        <div className="simulator-tabs" style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '3rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem', flexWrap: 'wrap' }}>
          <button
            className={`sim-tab-btn tab-purple ${activeHelpTab === 'commands' ? 'active' : ''}`}
            onClick={() => setActiveHelpTab('commands')}
            style={{ fontSize: '1rem', padding: '0.75rem 1.5rem', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            id="help-tab-btn-commands"
          >
            <span>💬 Voice Prompts</span>
          </button>
          <button
            className={`sim-tab-btn tab-cyan ${activeHelpTab === 'keys' ? 'active' : ''}`}
            onClick={() => setActiveHelpTab('keys')}
            style={{ fontSize: '1rem', padding: '0.75rem 1.5rem', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            id="help-tab-btn-keys"
          >
            <span>⌨️ Hotkey Cheat-Sheet</span>
          </button>
          <button
            className={`sim-tab-btn tab-pink ${activeHelpTab === 'faq' ? 'active' : ''}`}
            onClick={() => setActiveHelpTab('faq')}
            style={{ fontSize: '1rem', padding: '0.75rem 1.5rem', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            id="help-tab-btn-faq"
          >
            <span>❓ General FAQs</span>
          </button>
          <button
            className={`sim-tab-btn tab-purple ${activeHelpTab === 'onboarding' ? 'active' : ''}`}
            onClick={() => setActiveHelpTab('onboarding')}
            style={{ fontSize: '1rem', padding: '0.75rem 1.5rem', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            id="help-tab-btn-onboarding"
            suppressHydrationWarning={true}
          >
            <span>🚀 First-Time Setup</span>
          </button>
        </div>

        {/* Tab 1: Voice Prompts */}
        {activeHelpTab === 'commands' && (
          <div style={{ animation: 'fadeIn 0.3s ease' }}>
            {/* Command Search Controls */}
            <div className="help-controls" style={{ maxWidth: '800px', margin: '0 auto 3rem auto' }}>
              
              {/* Search bar */}
              <div className="console-input-wrapper help-search-wrapper" style={{ display: 'flex', gap: '0.5rem', padding: '10px 16px', background: 'rgba(5, 6, 8, 0.8)', marginBottom: '2rem', borderRadius: '12px' }}>
                <Search size={18} className="text-muted" style={{ flexShrink: 0, marginTop: '2px' }} />
                <input
                  type="text"
                  placeholder="Search commands... (e.g. weather, mausam, gaana, security, click)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="console-user-input"
                  style={{ fontSize: '0.95rem' }}
                  id="help-search-input"
                />
              </div>

              {/* Categories Tab Selector */}
              <div className="simulator-tabs" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.5rem', borderBottom: 'none' }}>
                {CATEGORIES.map((cat) => {
                  const meta = CATEGORY_META[cat];
                  const colorClass = meta ? `tab-${meta.color}` : 'tab-cyan';
                  return (
                    <button
                      key={cat}
                      className={`sim-tab-btn ${colorClass} ${activeCategory === cat ? 'active' : ''}`}
                      onClick={() => setActiveCategory(cat)}
                      id={`help-cat-btn-${cat.toLowerCase().replace(' & ', '-')}`}
                      style={{ fontSize: '0.85rem', padding: '0.6rem 1.25rem', borderRadius: '8px' }}
                    >
                      {cat === 'System Control' && <Terminal size={14} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'middle' }} />}
                      {cat === 'Security Guard' && <Shield size={14} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'middle' }} />}
                      {cat === 'AI & Vision' && <Cpu size={14} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'middle' }} />}
                      {cat === 'Media & Social' && <MessageSquare size={14} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'middle' }} />}
                      <span>{cat}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Command Display List */}
            <div className="faq-list" style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {searchQuery.length === 0 && activeCategory === 'All' ? (
                /* Search Placeholder Layout */
                <div className="glass-card" style={{ padding: '3rem 2rem', textAlign: 'center', borderRadius: '12px', border: '1px solid var(--border-color)', background: 'rgba(255, 255, 255, 0.01)' }}>
                  <HelpCircle size={40} className="text-muted" style={{ margin: '0 auto 1.25rem auto', display: 'block', opacity: 0.4 }} />
                  <h4 style={{ color: 'white', fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Search-First Command Center</h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', maxWidth: '500px', margin: '0 auto 1.5rem auto', lineHeight: '1.5' }}>
                    Kira supports over 250+ bilingual commands. Use the search bar above or choose a category chip to explore voice actions.
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.75rem' }}>
                    <button onClick={() => setSearchQuery('email')} className="btn btn-secondary" style={{ fontSize: '0.75rem', padding: '0.4rem 0.8rem', border: '1px solid var(--border-color)', borderRadius: '50px', background: 'rgba(255,255,255,0.02)', color: 'var(--text-secondary)', cursor: 'pointer' }}>Try "email"</button>
                    <button onClick={() => setSearchQuery('weather')} className="btn btn-secondary" style={{ fontSize: '0.75rem', padding: '0.4rem 0.8rem', border: '1px solid var(--border-color)', borderRadius: '50px', background: 'rgba(255,255,255,0.02)', color: 'var(--text-secondary)', cursor: 'pointer' }}>Try "weather"</button>
                    <button onClick={() => setSearchQuery('notepad')} className="btn btn-secondary" style={{ fontSize: '0.75rem', padding: '0.4rem 0.8rem', border: '1px solid var(--border-color)', borderRadius: '50px', background: 'rgba(255,255,255,0.02)', color: 'var(--text-secondary)', cursor: 'pointer' }}>Try "notepad"</button>
                    <button onClick={() => { setActiveCategory('System Control'); setOpenIdx(null); }} className="btn btn-secondary" style={{ fontSize: '0.75rem', padding: '0.4rem 0.8rem', border: '1px solid var(--border-color)', borderRadius: '50px', background: 'rgba(255,255,255,0.02)', color: 'var(--text-secondary)', cursor: 'pointer' }}>Browse System Control</button>
                  </div>
                </div>
              ) : filteredCommands.length > 0 ? (
                <>
                  {filteredCommands.slice(0, showAllResults ? filteredCommands.length : 6).map((cmd, idx) => {
                    const isOpen = openIdx === idx || searchQuery.length > 0;
                    const meta = CATEGORY_META[cmd.category];
                    return (
                      <div 
                        key={idx} 
                        className={`faq-item glass-card ${isOpen ? 'active' : ''}`}
                        style={{ transition: 'all 0.25s ease' }}
                        id={`help-card-item-${idx}`}
                      >
                        {/* Accordion Header */}
                        <button
                          onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                          style={{
                            width: '100%',
                            background: 'none',
                            border: 'none',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: '1.5rem 2rem',
                            cursor: 'pointer',
                            textAlign: 'left'
                          }}
                          id={`help-question-btn-${idx}`}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                            <div className={`feat-icon-wrapper wrapper-${meta?.color || 'cyan'}`} style={{ width: '36px', height: '36px', borderRadius: '50%' }}>
                              {meta?.icon || <Terminal size={14} />}
                            </div>
                            <h3 style={{ fontSize: '1.15rem', color: 'white', fontWeight: 700, margin: 0 }}>{cmd.title}</h3>
                            <span className="popular-badge" style={{ position: 'static', padding: '0.25rem 0.65rem', background: 'rgba(6, 182, 212, 0.08)', border: '1px solid rgba(6, 182, 212, 0.2)', color: 'var(--accent-cyan)', fontSize: '0.7rem' }}>
                              {cmd.category}
                            </span>
                          </div>
                          <ChevronDown 
                            className="chevron-icon" 
                            style={{ 
                              color: 'var(--text-secondary)',
                              transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                              transition: 'transform 0.3s ease',
                              flexShrink: 0
                            }} 
                            size={18} 
                          />
                        </button>

                        {/* Accordion Content */}
                        <div style={{
                          maxHeight: isOpen ? '800px' : '0px',
                          overflow: 'hidden',
                          transition: 'max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
                        }}>
                          <div style={{ padding: '0 2rem 1.75rem 2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.6 }}>{cmd.desc}</p>
                            
                            {/* Redesigned Command translations list */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                              {/* English Row */}
                              <div className="translation-row">
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600, width: '100px' }}>🇬🇧 English</span>
                                  <code style={{ color: 'white', fontFamily: 'monospace', fontSize: '0.85rem' }}>"{cmd.en}"</code>
                                </div>
                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                  <button 
                                    onClick={() => handleSpeak(cmd.en, 'en')}
                                    className="copy-btn"
                                    title="Listen English command"
                                    id={`speak-en-${idx}`}
                                    suppressHydrationWarning={true}
                                  >
                                    <Volume2 size={14} />
                                  </button>
                                  <button 
                                    onClick={() => handleCopy(cmd.en)}
                                    className="copy-btn"
                                    title="Copy English command"
                                    id={`copy-en-${idx}`}
                                    suppressHydrationWarning={true}
                                  >
                                    {copiedText === cmd.en ? <Check size={14} style={{ color: '#34d399' }} /> : <Copy size={14} />}
                                  </button>
                                </div>
                              </div>

                              {/* Hindi Row */}
                              <div className="translation-row">
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600, width: '100px' }}>🇮🇳 Hindi</span>
                                  <code style={{ color: '#fed7aa', fontFamily: 'monospace', fontSize: '0.85rem' }}>"{cmd.hi}"</code>
                                </div>
                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                  <button 
                                    onClick={() => handleSpeak(cmd.hi, 'hi')}
                                    className="copy-btn"
                                    title="Listen Hindi command"
                                    id={`speak-hi-${idx}`}
                                    suppressHydrationWarning={true}
                                  >
                                    <Volume2 size={14} />
                                  </button>
                                  <button 
                                    onClick={() => handleCopy(cmd.hi)}
                                    className="copy-btn"
                                    title="Copy Hindi command"
                                    id={`copy-hi-${idx}`}
                                    suppressHydrationWarning={true}
                                  >
                                    {copiedText === cmd.hi ? <Check size={14} style={{ color: '#34d399' }} /> : <Copy size={14} />}
                                  </button>
                                </div>
                              </div>

                              {/* Gujarati Row */}
                              <div className="translation-row">
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600, width: '100px' }}>🇮🇳 Gujarati</span>
                                  <code style={{ color: '#d9f99d', fontFamily: 'monospace', fontSize: '0.85rem' }}>"{cmd.gu}"</code>
                                </div>
                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                  <button 
                                    onClick={() => handleSpeak(cmd.gu, 'gu')}
                                    className="copy-btn"
                                    title="Listen Gujarati command"
                                    id={`speak-gu-${idx}`}
                                    suppressHydrationWarning={true}
                                  >
                                    <Volume2 size={14} />
                                  </button>
                                  <button 
                                    onClick={() => handleCopy(cmd.gu)}
                                    className="copy-btn"
                                    title="Copy Gujarati command"
                                    id={`copy-gu-${idx}`}
                                    suppressHydrationWarning={true}
                                  >
                                    {copiedText === cmd.gu ? <Check size={14} style={{ color: '#34d399' }} /> : <Copy size={14} />}
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  {filteredCommands.length > 6 && (
                    <button
                      type="button"
                      onClick={() => setShowAllResults(!showAllResults)}
                      style={{
                        margin: '1.5rem auto 0 auto',
                        padding: '0.65rem 2rem',
                        fontSize: '0.85rem',
                        border: '1px solid var(--border-color)',
                        borderRadius: '8px',
                        background: 'rgba(255,255,255,0.02)',
                        color: 'white',
                        cursor: 'pointer',
                        display: 'block',
                        fontWeight: 600,
                        transition: 'all 0.25s ease'
                      }}
                      id="help-toggle-all-btn"
                    >
                      <span>{showAllResults ? 'Show Less Commands' : `Show All ${filteredCommands.length} Commands`}</span>
                    </button>
                  )}
                </>
              ) : (
                <div style={{ textAlign: 'center', padding: '4rem 2rem', color: 'var(--text-muted)' }}>
                  <HelpCircle size={36} style={{ margin: '0 auto 1rem auto', display: 'block', opacity: 0.5 }} />
                  <p style={{ fontSize: '0.95rem' }}>No commands match your search query. Try another term!</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab 2: Hotkey Cheat-Sheet */}
        {activeHelpTab === 'keys' && (
          <div style={{ animation: 'fadeIn 0.3s ease' }}>
            {/* Printable Shortcuts Cheat-Sheet Section */}
            <div id="printable-cheat-sheet" className="glass-card glow-on-hover" style={{ maxWidth: '800px', margin: '0 auto', padding: '3rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1.5rem' }} className="no-print">
                <div>
                  <h3 style={{ fontSize: '1.5rem', color: 'white', fontWeight: 800, marginBottom: '0.35rem' }}>⌨️ Keyboard & Voice Shortcuts Cheat-Sheet</h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Quick reference guide for daily workflows. Save or print as PDF.</p>
                </div>
                <a 
                  href="/README.md"
                  download="README.md"
                  className="btn btn-primary"
                  style={{ padding: '0.6rem 1.5rem', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}
                  id="print-cheat-sheet-btn"
                >
                  <span>Download README Cheat-Sheet</span>
                </a>
              </div>

              {/* This header only shows during printing */}
              <div className="print-only" style={{ marginBottom: '2.5rem', borderBottom: '2px solid #333', paddingBottom: '1rem' }}>
                <h2 style={{ fontSize: '2.2rem', color: 'black', marginBottom: '0.5rem', fontWeight: 800 }}>KIRA DESKTOP CHEAT-SHEET</h2>
                <p style={{ color: '#555', fontSize: '1.05rem', margin: 0 }}>Next-generation offline desktop AI assistant quick reference.</p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }} className="cheat-sheet-grid">
                {/* Keyboard Hotkeys */}
                <div>
                  <h4 style={{ fontSize: '1.15rem', color: 'white', fontWeight: 700, borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem', marginBottom: '1.5rem' }}>Keyboard Hotkeys</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.9rem' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>Wake up / Listen</span>
                      <kbd className="kbd-cyber">Win + Alt + J</kbd>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.9rem' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>Stop speaking / Mute</span>
                      <kbd className="kbd-cyber">Esc</kbd>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.9rem' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>Lock Workstation</span>
                      <kbd className="kbd-cyber">Win + Alt + L</kbd>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.9rem' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>Pair Companion Portal</span>
                      <kbd className="kbd-cyber">Win + Alt + P</kbd>
                    </div>
                  </div>
                </div>

                {/* Voice Command Reference */}
                <div>
                  <h4 style={{ fontSize: '1.15rem', color: 'white', fontWeight: 700, borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem', marginBottom: '1.5rem' }}>Voice Commands</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.9rem' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>Query Weather</span>
                      <code style={{ color: 'var(--accent-cyan)', fontFamily: 'monospace', fontSize: '0.8rem', background: 'rgba(6, 182, 212, 0.05)', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>"weather in Mumbai"</code>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.9rem' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>Close Application</span>
                      <code style={{ color: 'var(--accent-cyan)', fontFamily: 'monospace', fontSize: '0.8rem', background: 'rgba(6, 182, 212, 0.05)', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>"close Chrome"</code>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.9rem' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>Run Security Guard</span>
                      <code style={{ color: 'var(--accent-cyan)', fontFamily: 'monospace', fontSize: '0.8rem', background: 'rgba(6, 182, 212, 0.05)', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>"enable security mode"</code>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.9rem' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>OCR Screen Click</span>
                      <code style={{ color: 'var(--accent-cyan)', fontFamily: 'monospace', fontSize: '0.8rem', background: 'rgba(6, 182, 212, 0.05)', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>"click settings"</code>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {activeHelpTab === 'faq' && (
          <div style={{ animation: 'fadeIn 0.3s ease', maxWidth: '800px', margin: '0 auto' }}>
            <FAQ hideHeader={true} />
          </div>
        )}

        {/* Tab 4: First-Time Setup & Onboarding */}
        {activeHelpTab === 'onboarding' && (
          <div style={{ animation: 'fadeIn 0.3s ease', maxWidth: '1000px', margin: '0 auto' }}>
            {/* Inject Custom Styles */}
            <style>{`
              @keyframes scan-line {
                0% { top: 0%; }
                50% { top: 100%; }
                100% { top: 0%; }
              }
              @keyframes blink-rec {
                0%, 100% { opacity: 0.2; }
                50% { opacity: 1; }
              }
              @keyframes float-face {
                0%, 100% { transform: translateY(0px) rotate(0deg); }
                50% { transform: translateY(-5px) rotate(1deg); }
              }
              @keyframes pulse-ring {
                0% { transform: scale(0.95); opacity: 0.1; }
                50% { transform: scale(1.05); opacity: 0.3; }
                100% { transform: scale(0.95); opacity: 0.1; }
              }
              .face-scanning-container {
                position: relative;
                width: 100%;
                height: 250px;
                background: linear-gradient(180deg, #070913 0%, #0a0d1b 100%);
                border: 1px solid rgba(6, 182, 212, 0.25);
                box-shadow: 0 0 20px rgba(6, 182, 212, 0.05) inset;
                border-radius: 12px;
                overflow: hidden;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
              }
              .scanner-laser {
                position: absolute;
                left: 0;
                width: 100%;
                height: 3px;
                background: linear-gradient(90deg, transparent, var(--accent-cyan), transparent);
                box-shadow: 0 0 10px var(--accent-cyan);
                animation: scan-line 4s linear infinite;
                z-index: 10;
              }
              .face-grid {
                width: 120px;
                height: 120px;
                border: 1px dashed rgba(6, 182, 212, 0.4);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                position: relative;
                animation: float-face 4s ease-in-out infinite;
              }
              .face-grid::before {
                content: '';
                position: absolute;
                width: 140px;
                height: 140px;
                border: 1px solid rgba(6, 182, 212, 0.15);
                border-radius: 50%;
                animation: pulse-ring 2s ease-in-out infinite;
              }
              .rec-dot {
                width: 8px;
                height: 8px;
                background-color: #ef4444;
                border-radius: 50%;
                display: inline-block;
                animation: blink-rec 1.5s infinite;
                margin-right: 6px;
              }
              .file-tab {
                padding: 0.5rem 1rem;
                cursor: pointer;
                font-family: var(--font-sans);
                font-size: 0.8rem;
                font-weight: 600;
                background: #080a10;
                border: 1px solid var(--border-color);
                border-bottom: none;
                border-radius: 6px 6px 0 0;
                color: var(--text-muted);
                transition: all 0.2s ease;
                display: flex;
                align-items: center;
                gap: 0.35rem;
              }
              .file-tab:hover {
                color: var(--text-secondary);
              }
              .file-tab.active {
                background: #0d1220;
                color: white;
                border-top: 2px solid var(--accent-purple);
                border-left-color: var(--border-color);
                border-right-color: var(--border-color);
              }
              .mock-phone {
                width: 220px;
                height: 340px;
                background: #080c14;
                border: 8px solid #1f2937;
                border-radius: 30px;
                padding: 1.5rem 1rem 1rem 1rem;
                position: relative;
                box-shadow: 0 20px 40px -15px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.05);
                display: flex;
                flex-direction: column;
                justify-content: space-between;
              }
              .mock-phone::before {
                content: '';
                position: absolute;
                top: 8px;
                left: 50%;
                transform: translateX(-50%);
                width: 50px;
                height: 10px;
                background: #1f2937;
                border-radius: 10px;
              }
              .phone-screen {
                flex-grow: 1;
                background: #030712;
                border-radius: 16px;
                padding: 0.75rem;
                display: flex;
                flex-direction: column;
                gap: 0.75rem;
                overflow: hidden;
                border: 1px solid rgba(255,255,255,0.02);
              }
              .whatsapp-bubble-received {
                background: #202c33;
                color: #e9edef;
                padding: 0.6rem;
                border-radius: 8px 8px 8px 0px;
                font-size: 0.7rem;
                line-height: 1.4;
                align-self: flex-start;
                max-width: 95%;
                box-shadow: 0 1px 2px rgba(0,0,0,0.3);
                font-family: sans-serif;
              }
              .step-num-badge {
                font-size: 3.5rem;
                font-weight: 900;
                line-height: 1;
                background: linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                position: absolute;
                top: 1.5rem;
                right: 2rem;
                user-select: none;
              }
              
              /* Setup wizard progress tracker styles */
              .wizard-tracker {
                display: flex;
                justify-content: space-between;
                align-items: center;
                position: relative;
                margin: 1.5rem auto 3.5rem auto;
                max-width: 800px;
                padding: 0 1rem;
              }
              .wizard-tracker::before {
                content: '';
                position: absolute;
                top: 24px;
                left: 10%;
                right: 10%;
                height: 2px;
                background: var(--border-color);
                z-index: 1;
              }
              .wizard-tracker-progress {
                position: absolute;
                top: 24px;
                left: 10%;
                height: 2px;
                background: linear-gradient(90deg, var(--accent-purple), var(--accent-cyan));
                z-index: 2;
                transition: width 0.4s ease;
              }
              .wizard-node {
                display: flex;
                flex-direction: column;
                align-items: center;
                position: relative;
                z-index: 3;
                cursor: pointer;
                background: none;
                border: none;
                outline: none;
                width: 120px;
              }
              .wizard-node-circle {
                width: 48px;
                height: 48px;
                border-radius: 50%;
                background: #0d1220;
                border: 2px solid var(--border-color);
                display: flex;
                align-items: center;
                justify-content: center;
                color: var(--text-muted);
                font-weight: bold;
                font-size: 0.95rem;
                transition: all 0.3s ease;
                box-shadow: 0 4px 10px rgba(0,0,0,0.4);
              }
              .wizard-node:hover .wizard-node-circle {
                border-color: var(--border-color-hover);
                color: var(--text-secondary);
              }
              .wizard-node.active .wizard-node-circle {
                background: rgba(139, 92, 246, 0.1);
                border-color: var(--accent-purple);
                color: white;
                box-shadow: 0 0 20px rgba(139, 92, 246, 0.4);
              }
              .wizard-node.completed .wizard-node-circle {
                background: rgba(52, 211, 153, 0.1);
                border-color: #34d399;
                color: #34d399;
                box-shadow: 0 0 20px rgba(52, 211, 153, 0.2);
              }
              .wizard-node-label {
                margin-top: 0.75rem;
                font-size: 0.85rem;
                font-weight: 600;
                font-family: var(--font-heading);
                color: var(--text-muted);
                transition: color 0.3s ease;
                text-align: center;
              }
              .wizard-node.active .wizard-node-label {
                color: white;
              }
              .wizard-node.completed .wizard-node-label {
                color: #34d399;
              }
              
              /* Wizard card styles */
              .wizard-card {
                background: var(--bg-card);
                border: 1px solid var(--border-color);
                border-radius: 16px;
                overflow: hidden;
                box-shadow: 0 10px 30px rgba(0,0,0,0.5);
                display: flex;
                flex-direction: column;
                animation: slideIn 0.4s ease-out;
              }
              @keyframes slideIn {
                from { opacity: 0; transform: translateY(15px); }
                to { opacity: 1; transform: translateY(0); }
              }
              .wizard-card-header {
                padding: 1.75rem 2.5rem;
                border-bottom: 1px solid var(--border-color);
                background: rgba(16, 20, 30, 0.4);
                display: flex;
                justify-content: space-between;
                align-items: center;
                flex-wrap: wrap;
                gap: 1rem;
              }
              .wizard-card-body {
                padding: 2.5rem;
              }
              .wizard-card-footer {
                padding: 1.5rem 2.5rem;
                border-top: 1px solid var(--border-color);
                background: rgba(16, 20, 30, 0.4);
                display: flex;
                justify-content: space-between;
                align-items: center;
              }
              
              /* Step grid layout */
              .step-grid {
                display: grid;
                grid-template-columns: 1.2fr 0.8fr;
                gap: 2.5rem;
              }
              @media (max-width: 900px) {
                .step-grid {
                  grid-template-columns: 1fr;
                  gap: 2rem;
                }
              }

              /* Typing Indicator and WhatsApp Animations */
              .typing-dot {
                width: 5px;
                height: 5px;
                background: #8696a0;
                border-radius: 50%;
                display: inline-block;
                animation: typingBounce 1.2s infinite ease-in-out;
              }
              @keyframes typingBounce {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-4px); }
              }
              @keyframes slideUp {
                from { transform: translateY(10px); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
              }
              @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
              }
              @keyframes zoomIn {
                from { transform: scale(0.95); opacity: 0; }
                to { transform: scale(1); opacity: 1; }
              }
            `}</style>
            
            {/* Intro Header */}
            <div className="glass-card glow-on-hover" style={{ padding: '2.25rem', borderLeft: '4px solid var(--accent-purple)', marginBottom: '2.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem' }}>
                <div>
                  <h3 style={{ color: 'white', display: 'flex', alignItems: 'center', gap: '0.65rem', fontSize: '1.45rem', marginBottom: '0.4rem', fontWeight: 800 }}>
                    ⚡ KIRA First-Time Configuration Guide
                  </h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.6', margin: 0, maxWidth: '750px' }}>
                    Follow this interactive setup wizard to configure local directories, capture offline biometrics, and pair your mobile companion screen.
                  </p>
                </div>
                <span className="popular-badge" style={{ position: 'static', background: 'rgba(139, 92, 246, 0.08)', border: '1px solid rgba(139, 92, 246, 0.2)', color: 'var(--accent-purple)', fontSize: '0.75rem', padding: '0.35rem 0.85rem' }}>
                  Platform: Windows 10 / 11
                </span>
              </div>
            </div>

            {/* Horizontal Setup Tracker */}
            <div className="wizard-tracker">
              <div className="wizard-tracker-progress" style={{ width: activeStep === 0 ? '0%' : activeStep === 1 ? '50%' : '100%' }}></div>
              <button 
                className={`wizard-node ${activeStep >= 0 ? (activeStep > 0 ? 'completed' : 'active') : ''}`}
                onClick={() => activeStep < 3 && setActiveStep(0)}
                disabled={activeStep === 3}
                id="wizard-step-btn-0"
              >
                <div className="wizard-node-circle">
                  {activeStep > 0 ? <CheckCircle2 size={18} /> : <Folder size={18} />}
                </div>
                <span className="wizard-node-label">Contacts Sync</span>
              </button>
              <button 
                className={`wizard-node ${activeStep >= 1 ? (activeStep > 1 ? 'completed' : 'active') : ''}`}
                onClick={() => activeStep < 3 && setActiveStep(1)}
                disabled={activeStep === 3}
                id="wizard-step-btn-1"
              >
                <div className="wizard-node-circle">
                  {activeStep > 1 ? <CheckCircle2 size={18} /> : <Shield size={18} />}
                </div>
                <span className="wizard-node-label">Face Security</span>
              </button>
              <button 
                className={`wizard-node ${activeStep >= 2 ? (activeStep > 2 ? 'completed' : 'active') : ''}`}
                onClick={() => activeStep < 3 && setActiveStep(2)}
                disabled={activeStep === 3}
                id="wizard-step-btn-2"
              >
                <div className="wizard-node-circle">
                  {activeStep > 2 ? <CheckCircle2 size={18} /> : <Smartphone size={18} />}
                </div>
                <span className="wizard-node-label">Mobile Pairing</span>
              </button>
            </div>

            {/* Wizard Card Body */}
            {activeStep === 3 ? (
              /* Success / Completed Screen */
              <div className="wizard-card" style={{ animation: 'slideIn 0.4s ease-out' }}>
                <div className="wizard-card-body" style={{ textAlign: 'center', padding: '4rem 2.5rem' }}>
                  <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '70px', height: '70px', borderRadius: '50%', background: 'rgba(52, 211, 153, 0.1)', color: '#34d399', marginBottom: '1.5rem', boxShadow: '0 0 30px rgba(52, 211, 153, 0.2)' }}>
                    <CheckCircle2 size={40} />
                  </div>
                  <h3 style={{ fontSize: '1.75rem', color: 'white', fontWeight: 800, marginBottom: '0.75rem' }}>Configuration Complete!</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', maxWidth: '600px', margin: '0 auto 2.5rem auto', lineHeight: '1.6' }}>
                    KIRA is fully initialized and operational. Your local directory, biometric security profiles, and encrypted companion server are successfully set up and ready to run.
                  </p>
                  
                  {/* Diagnostic Console Box */}
                  <div style={{ background: '#030406', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '1.5rem', maxWidth: '600px', margin: '0 auto 3rem auto', textAlign: 'left', fontFamily: 'monospace', fontSize: '0.8rem' }}>
                    <div style={{ color: '#a78bfa', marginBottom: '0.5rem' }}>$ python kira_check.py --verbose</div>
                    <div style={{ color: '#34d399' }}>✓ VERIFYING CONTACTS INDEX DIRECTORY: Found %USERPROFILE%/.jarvis/contacts.csv</div>
                    <div style={{ color: '#34d399' }}>✓ LOADING LOCAL EMBEDDINGS BASE: face_profile.dat verified [HOG model]</div>
                    <div style={{ color: '#34d399' }}>✓ REMOTE FASTAPI DEPLOYMENT HANDSHAKE: Local server listening on port 8000</div>
                    <div style={{ color: '#34d399' }}>✓ TUNNEL TUNNELING TUNNEL: SSH tunnel secure handshake established</div>
                    <div style={{ color: 'var(--text-muted)', marginTop: '0.75rem' }}>Status: KIRA Multi-Agent Daemon ready. Listening for speech input.</div>
                  </div>

                  <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                    <button 
                      onClick={() => { setActiveStep(0); setActiveHelpTab('commands'); }} 
                      className="btn btn-primary"
                      style={{ padding: '0.75rem 2rem' }}
                      id="wizard-btn-commands"
                    >
                      Browse Voice Commands
                    </button>
                    <button 
                      onClick={() => setActiveStep(0)} 
                      className="btn btn-secondary"
                      style={{ padding: '0.75rem 2rem' }}
                      id="wizard-btn-restart"
                    >
                      Reconfigure Setup
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="wizard-card">
                {/* Header info */}
                <div className="wizard-card-header">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div className={`feat-icon-wrapper ${activeStep === 0 ? 'wrapper-purple' : activeStep === 1 ? 'wrapper-cyan' : 'wrapper-pink'}`} style={{ width: '38px', height: '38px', borderRadius: '50%' }}>
                      {activeStep === 0 ? <Folder size={15} /> : activeStep === 1 ? <Shield size={15} /> : <Smartphone size={15} />}
                    </div>
                    <div>
                      <h4 style={{ color: 'white', fontSize: '1.15rem', fontWeight: 800, margin: 0 }}>
                        {activeStep === 0 ? 'Sync Contact Book Directory' : activeStep === 1 ? 'Enroll Offline Face Security Profile' : 'QR Companion & WhatsApp Auto-Pairing'}
                      </h4>
                    </div>
                  </div>
                  <span style={{ fontSize: '0.75rem', fontFamily: 'monospace', color: 'var(--text-muted)' }}>
                    STEP {activeStep + 1} OF 3
                  </span>
                </div>

                {/* Body details */}
                <div className="wizard-card-body">
                  {activeStep === 0 && (
                    <div className="step-grid">
                      {/* Left info */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.6', margin: 0 }}>
                          KIRA processes local contacts index structures completely offline to route texts with voice triggers like <em>"Send WhatsApp to Papa"</em>. On its initial boot, the assistant initializes your local setup path.
                        </p>

                        {/* File Path Visual */}
                        <div style={{ background: 'rgba(5, 6, 8, 0.8)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '0.75rem 1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', fontSize: '0.8rem', fontFamily: 'monospace', color: '#fed7aa' }}>
                            <Terminal size={14} className="text-muted" />
                            <span>%USERPROFILE%\.jarvis\contacts.csv</span>
                          </div>
                          <button 
                            onClick={() => handleCopy('C:\\Users\\' + (typeof window !== 'undefined' ? 'Username' : '') + '\\.jarvis\\contacts.csv')}
                            className="btn btn-secondary" 
                            style={{ padding: '0.35rem 0.85rem', fontSize: '0.7rem', borderRadius: '6px' }}
                            suppressHydrationWarning={true}
                          >
                            {copiedText.includes('contacts.csv') ? <Check size={11} style={{ color: '#34d399', marginRight: '4px' }} /> : <Copy size={11} style={{ marginRight: '4px' }} />}
                            <span>Copy Path</span>
                          </button>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '0.5rem' }}>
                          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent-purple)', marginTop: '0.55rem', flexShrink: 0 }}></div>
                            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                              <strong>Google Contacts Sync:</strong> Export contacts as a standard <strong>Google CSV</strong>. Save it inside the directory as <code style={{ color: 'var(--accent-cyan)' }}>contacts.csv</code>. Column 0 maps to names, Column 18 maps to phone values.
                            </span>
                          </div>
                          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent-purple)', marginTop: '0.55rem', flexShrink: 0 }}></div>
                            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                              <strong>Manual Directory Index:</strong> Alternately, create a file named <code style={{ color: 'var(--accent-cyan)' }}>contacts.json</code> inside the directory to manually link targets. All Indian country prefix formatting is completed automatically.
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Right Code Tab switcher */}
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        {/* Tab Headers */}
                        <div style={{ display: 'flex', gap: '2px', background: 'rgba(0,0,0,0.2)', padding: '4px 4px 0 4px', borderRadius: '8px 8px 0 0', border: '1px solid var(--border-color)', borderBottom: 'none' }}>
                          <button 
                            className={`file-tab ${mockCodeTab === 'csv' ? 'active' : ''}`}
                            onClick={() => setMockCodeTab('csv')}
                            id="setup-code-tab-csv"
                          >
                            <FileText size={12} />
                            <span>contacts.csv</span>
                          </button>
                          <button 
                            className={`file-tab ${mockCodeTab === 'json' ? 'active' : ''}`}
                            onClick={() => setMockCodeTab('json')}
                            id="setup-code-tab-json"
                          >
                            <Code size={12} />
                            <span>contacts.json</span>
                          </button>
                        </div>
                        
                        {/* Editor window mock */}
                        <div style={{ background: '#0d1220', border: '1px solid var(--border-color)', borderRadius: '0 0 12px 12px', padding: '1.25rem', fontFamily: 'monospace', fontSize: '0.8rem', overflowX: 'auto', minHeight: '190px' }}>
                          {mockCodeTab === 'csv' ? (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                              <div style={{ color: 'var(--text-muted)' }}>1  # CSV Layout Structure</div>
                              <div style={{ color: '#ec4899' }}>2  Name,Given Name,Additional Name,Family Name,...,Phone 1 - Value</div>
                              <div style={{ color: 'white' }}>3  John Doe,John,,Doe,...,+919876543210</div>
                              <div style={{ color: 'white' }}>4  Papa,,,,,9510020435</div>
                              <div style={{ color: 'white' }}>5  Mummy,,,,,+919898098980</div>
                            </div>
                          ) : (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                              <div style={{ color: 'var(--text-muted)' }}>1  {"{"}</div>
                              <div style={{ color: 'var(--accent-cyan)' }}>2    "Papa": <span style={{ color: '#d9f99d' }}>"+919510020435"</span>,</div>
                              <div style={{ color: 'var(--accent-cyan)' }}>3    "Mummy": <span style={{ color: '#d9f99d' }}>"+919898098980"</span>,</div>
                              <div style={{ color: 'var(--accent-cyan)' }}>4    "Office Partner": <span style={{ color: '#d9f99d' }}>"+919998887776"</span></div>
                              <div style={{ color: 'white' }}>5  {"}"}</div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {activeStep === 1 && (
                    <div className="step-grid">
                      {/* Left info */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.6', margin: 0 }}>
                          To keep desktop workflows private, KIRA monitors workstation boundaries and locks Windows instantly if you leave your workstation or if an unregistered user sits down.
                        </p>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent-cyan)', marginTop: '0.55rem', flexShrink: 0 }}></div>
                            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                              Say <code style={{ color: '#fed7aa' }}>"enable security mode"</code> to initialize the interactive voice setup assistant.
                            </span>
                          </div>
                          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent-cyan)', marginTop: '0.55rem', flexShrink: 0 }}></div>
                            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                              Face the webcam directory. KIRA takes **10 offline snap coordinates** to train a localized HOG biometric safety pattern model.
                            </span>
                          </div>
                          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent-cyan)', marginTop: '0.55rem', flexShrink: 0 }}></div>
                            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                              <strong>18-Second Lock Timeout:</strong> When security is enabled, if KIRA runs verification cycles and detects no authorized face for **6 iterations (18 seconds)**, it locks Windows natively.
                            </span>
                          </div>
                        </div>

                        {/* File Path Visual */}
                        <div style={{ background: 'rgba(5, 6, 8, 0.8)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '0.75rem 1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', fontSize: '0.8rem', fontFamily: 'monospace', color: '#fed7aa' }}>
                            <Terminal size={14} className="text-muted" />
                            <span>~/.jarvis/security/face_profile.dat</span>
                          </div>
                          <button 
                            onClick={() => handleCopy('C:\\Users\\' + (typeof window !== 'undefined' ? 'Username' : '') + '\\.jarvis\\security\\face_profile.dat')}
                            className="btn btn-secondary" 
                            style={{ padding: '0.35rem 0.85rem', fontSize: '0.7rem', borderRadius: '6px' }}
                            suppressHydrationWarning={true}
                          >
                            {copiedText.includes('face_profile.dat') ? <Check size={11} style={{ color: '#34d399', marginRight: '4px' }} /> : <Copy size={11} style={{ marginRight: '4px' }} />}
                            <span>Copy Path</span>
                          </button>
                        </div>
                      </div>

                      {/* Right Biometrics Simulation */}
                      <div className="face-scanning-container">
                        <div className="scanner-laser"></div>
                        <div style={{ position: 'absolute', top: '12px', left: '12px', display: 'flex', alignItems: 'center', fontSize: '0.65rem', color: '#ef4444', fontFamily: 'monospace', fontWeight: 'bold' }}>
                          <span className="rec-dot"></span>
                          <span>BIOMETRIC SCANNING</span>
                        </div>
                        
                        <div className="face-grid">
                          {/* Face Landmark Mesh Outline SVG */}
                          <svg width="60" height="70" viewBox="0 0 60 70" fill="none" style={{ opacity: 0.65 }}>
                            <path d="M30 5C45 5 50 15 50 30C50 45 42 60 30 65C18 60 10 45 10 30C10 15 15 5 30 5Z" stroke="#00FFFF" strokeWidth="1.5" strokeDasharray="3 3"/>
                            <circle cx="20" cy="28" r="3" fill="#00FFFF"/>
                            <circle cx="40" cy="28" r="3" fill="#00FFFF"/>
                            <path d="M28 32H32V42H28V32Z" stroke="#00FFFF" strokeWidth="1"/>
                            <path d="M20 50C25 55 35 55 40 50" stroke="#00FFFF" strokeWidth="1.5" strokeLinecap="round"/>
                            
                            {/* Biometric Mesh Dots */}
                            <circle cx="30" cy="18" r="1.5" fill="#ef4444" />
                            <circle cx="15" cy="40" r="1.5" fill="#ef4444" />
                            <circle cx="45" cy="40" r="1.5" fill="#ef4444" />
                            <circle cx="30" cy="60" r="1.5" fill="#ef4444" />
                          </svg>
                        </div>
                        
                        <div style={{ marginTop: '1.25rem', textAlign: 'center' }}>
                          <div style={{ fontSize: '0.8rem', color: 'white', fontFamily: 'monospace', fontWeight: 'bold' }}>TRAINING COMPLETED</div>
                          <div style={{ fontSize: '0.65rem', color: 'var(--accent-cyan)', fontFamily: 'monospace', marginTop: '0.2rem' }}>10 / 10 snapshots saved locally</div>
                          
                          <div style={{ width: '130px', height: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '10px', marginTop: '0.5rem', overflow: 'hidden', margin: '0.5rem auto 0 auto' }}>
                            <div style={{ width: '100%', height: '100%', background: 'var(--accent-cyan)', borderRadius: '10px' }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeStep === 2 && (
                    <div className="step-grid">
                      {/* Left info */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.6', margin: 0 }}>
                          Expose a secure FastAPI local network connection and pair KIRA securely to your smartphone web screen via reverse tunnels.
                        </p>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent-pink)', marginTop: '0.55rem', flexShrink: 0 }}></div>
                            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                              <strong>FastAPI Tunneling:</strong> Spin up the reverse tunnel endpoint. KIRA will output an encrypted connection link and local PIN.
                            </span>
                          </div>
                          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent-pink)', marginTop: '0.55rem', flexShrink: 0 }}></div>
                            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                              <strong>WhatsApp Live Triggers:</strong> Enter your personal WhatsApp number in the Companion Dashboard Settings. It compiles into local <code style={{ color: 'white' }}>config.json</code>. On next boot, KIRA sends live tunnel connection URLs to WhatsApp automatically.
                            </span>
                          </div>
                        </div>

                        {/* Interactive Form */}
                        <form onSubmit={startPairingSimulation} style={{
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '0.75rem',
                          background: 'rgba(255, 255, 255, 0.02)',
                          padding: '1rem',
                          borderRadius: '8px',
                          border: '1px solid var(--border-color)',
                          marginTop: '0.5rem'
                        }}>
                          <label style={{ fontSize: '0.75rem', color: 'var(--accent-cyan)', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                            Phone Number Pairing Setup
                          </label>
                          <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <input 
                              type="tel"
                              value={phoneNumber}
                              onChange={(e) => setPhoneNumber(e.target.value)}
                              placeholder="e.g. +91 98765 43210"
                              required
                              style={{
                                flexGrow: 1,
                                background: '#080c14',
                                border: '1px solid var(--border-color)',
                                borderRadius: '6px',
                                padding: '0.5rem 0.75rem',
                                color: 'white',
                                fontSize: '0.85rem',
                                outline: 'none',
                                transition: 'border-color 0.2s'
                              }}
                            />
                            <button
                              type="submit"
                              disabled={isSimulatingChat || !phoneNumber}
                              style={{
                                background: 'linear-gradient(135deg, var(--accent-purple) 0%, var(--accent-cyan) 100%)',
                                color: 'white',
                                border: 'none',
                                borderRadius: '6px',
                                padding: '0.5rem 1rem',
                                fontSize: '0.8rem',
                                fontWeight: 'bold',
                                cursor: 'pointer',
                                opacity: (isSimulatingChat || !phoneNumber) ? 0.6 : 1,
                                transition: 'transform 0.1s, opacity 0.2s'
                              }}
                            >
                              {isSimulatingChat ? 'Pairing...' : 'Simulate Pairing Alert'}
                            </button>
                          </div>
                          <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>
                            * This is a simulated pairing request to demonstrate the real FastAPI backend functionality.
                          </span>
                        </form>
                      </div>

                      {/* Right Mock Phone & Scanner */}
                      <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap' }}>
                        {/* Simulated Phone */}
                        <div className="mock-phone" style={{ width: '230px', height: '350px', padding: '0px', overflow: 'hidden', display: 'flex', flexDirection: 'column', background: '#0b141a', border: '6px solid #202c33', borderRadius: '24px' }}>
                          
                          {/* WhatsApp Chat Header */}
                          <div style={{
                            background: '#202c33',
                            padding: '0.5rem 0.75rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                            position: 'relative'
                          }}>
                            {/* Avatar */}
                            <div style={{
                              width: '28px',
                              height: '28px',
                              borderRadius: '50%',
                              background: 'var(--accent-purple-glow)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              border: '1px solid var(--accent-purple)'
                            }}>
                              <Terminal size={14} style={{ color: 'var(--accent-cyan)' }} />
                            </div>
                            {/* Contact Details */}
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                              <span style={{ color: 'white', fontSize: '0.75rem', fontWeight: 'bold', fontFamily: 'sans-serif' }}>KIRA Desktop</span>
                              <span style={{ color: (chatStep === 2 || chatStep === 3) ? '#00e575' : '#8696a0', fontSize: '0.55rem', fontFamily: 'sans-serif', fontWeight: 'normal' }}>
                                {chatStep === 1 ? 'connecting...' : (chatStep === 2 || chatStep === 3) ? 'typing...' : 'online'}
                              </span>
                            </div>
                            <span style={{
                              position: 'absolute',
                              right: '0.75rem',
                              width: '6px',
                              height: '6px',
                              borderRadius: '50%',
                              background: chatStep === 1 ? '#eab308' : '#00ffaa'
                            }}></span>
                          </div>

                          {/* Chat Screen/Viewport */}
                          <div style={{
                            flexGrow: 1,
                            padding: '0.75rem',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '0.5rem',
                            overflowY: 'auto',
                            background: '#0b141a'
                          }}>
                            {/* Initial Waiting message */}
                            {!pairingAlertSimulated && (
                              <div style={{
                                margin: 'auto',
                                textAlign: 'center',
                                color: '#8696a0',
                                fontSize: '0.65rem',
                                fontFamily: 'sans-serif',
                                padding: '1rem',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: '0.5rem'
                              }}>
                                <Smartphone size={24} style={{ opacity: 0.4 }} />
                                <span>Enter your number and click "Simulate Pairing Alert" to receive the SSH connection keys</span>
                              </div>
                            )}

                            {/* Typing Indicator Bubble */}
                            {(chatStep === 2 || chatStep === 3) && simulatedMessages.length === (chatStep - 2) && (
                              <div className="whatsapp-bubble-received" style={{ display: 'flex', alignItems: 'center', gap: '4px', background: '#202c33', padding: '0.5rem 0.75rem', borderRadius: '0px 8px 8px 8px', width: 'fit-content' }}>
                                <span className="typing-dot" style={{ animationDelay: '0s' }}></span>
                                <span className="typing-dot" style={{ animationDelay: '0.2s' }}></span>
                                <span className="typing-dot" style={{ animationDelay: '0.4s' }}></span>
                              </div>
                            )}

                            {/* Simulated Messages */}
                            {simulatedMessages.map((msg, i) => (
                              <div key={msg.id} className="whatsapp-bubble-received" style={{
                                animation: 'slideUp 0.3s ease forwards',
                                background: '#202c33',
                                borderRadius: '0px 8px 8px 8px',
                                alignSelf: 'flex-start',
                                padding: '0.5rem 0.65rem',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '0.25rem',
                                position: 'relative',
                                width: 'fit-content',
                                maxWidth: '90%'
                              }}>
                                <span style={{ fontSize: '0.7rem', color: '#e9edef', fontFamily: 'sans-serif', wordBreak: 'break-all' }}>
                                  {msg.text}
                                </span>
                                <span style={{ fontSize: '0.5rem', color: '#8696a0', alignSelf: 'flex-end', marginTop: '2px', fontFamily: 'sans-serif' }}>
                                  {msg.time}
                                </span>
                              </div>
                            ))}

                            {/* Connection Action Overlay */}
                            {chatStep === 4 && (
                              <div style={{
                                animation: 'fadeIn 0.5s ease forwards',
                                background: 'rgba(32, 44, 51, 0.95)',
                                border: '1px solid rgba(255, 255, 255, 0.05)',
                                borderRadius: '8px',
                                padding: '0.5rem',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: '0.35rem',
                                marginTop: 'auto'
                              }}>
                                <span style={{ fontSize: '0.65rem', color: '#00ffaa', fontWeight: 'bold', fontFamily: 'sans-serif' }}>⚡ Ready to Pair!</span>
                                <button 
                                  onClick={() => setChatStep(5)}
                                  style={{
                                    background: '#00a884',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '4px',
                                    padding: '0.35rem 0.75rem',
                                    fontSize: '0.65rem',
                                    fontWeight: 'bold',
                                    width: '100%',
                                    cursor: 'pointer',
                                    transition: 'background 0.2s'
                                  }}
                                >
                                  Authorize Dashboard Coupling
                                </button>
                              </div>
                            )}

                            {/* Coupled Success Screen */}
                            {chatStep === 5 && (
                              <div style={{
                                animation: 'zoomIn 0.3s ease forwards',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '0.5rem',
                                background: 'rgba(11, 20, 26, 0.9)',
                                borderRadius: '8px',
                                padding: '1rem',
                                margin: 'auto',
                                border: '1px solid #00a884'
                              }}>
                                <div style={{
                                  width: '32px',
                                  height: '32px',
                                  borderRadius: '50%',
                                  background: 'rgba(0, 168, 132, 0.15)',
                                  border: '2px solid #00a884',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  color: '#00a884'
                                }}>
                                  <Check size={18} />
                                </div>
                                <span style={{ color: 'white', fontSize: '0.75rem', fontWeight: 'bold', fontFamily: 'sans-serif' }}>Coupled!</span>
                                <span style={{ color: '#8696a0', fontSize: '0.6rem', textAlign: 'center', fontFamily: 'sans-serif' }}>
                                  FastAPI tunnel authorized for number {phoneNumber}
                                </span>
                              </div>
                            )}
                          </div>

                          {/* WhatsApp Input Mock Bar */}
                          <div style={{
                            background: '#202c33',
                            padding: '0.35rem 0.5rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.35rem',
                            borderTop: '1px solid rgba(255, 255, 255, 0.05)'
                          }}>
                            <div style={{
                              flexGrow: 1,
                              background: '#2a3942',
                              borderRadius: '16px',
                              padding: '0.25rem 0.5rem',
                              color: '#8696a0',
                              fontSize: '0.65rem',
                              fontFamily: 'sans-serif',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between'
                            }}>
                              <span>Type a message...</span>
                              <span style={{ fontSize: '0.75rem' }}>😊</span>
                            </div>
                            <div style={{
                              width: '24px',
                              height: '24px',
                              borderRadius: '50%',
                              background: '#00a884',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: 'white',
                              fontSize: '0.65rem'
                            }}>
                              🎤
                            </div>
                          </div>

                        </div>

                        {/* QR Code Mini Panel */}
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                          <div style={{ border: '2px solid var(--accent-pink)', borderRadius: '8px', padding: '8px', background: 'rgba(236,72,153,0.04)', position: 'relative', overflow: 'hidden' }}>
                            <div className="scanner-laser" style={{ animationDuration: '2.5s' }}></div>
                            <QrCode size={64} className="text-pink" style={{ opacity: 0.8 }} />
                          </div>
                          <span style={{ fontSize: '0.6rem', color: 'var(--text-muted)', fontFamily: 'monospace' }}>SCAN QR CODE</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Footer buttons */}
                <div className="wizard-card-footer">
                  <button 
                    onClick={() => activeStep > 0 && setActiveStep(activeStep - 1)}
                    disabled={activeStep === 0}
                    className="btn btn-secondary"
                    style={{ padding: '0.5rem 1.25rem', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}
                    id="wizard-btn-prev"
                  >
                    <ChevronLeft size={16} />
                    <span>Back</span>
                  </button>
                  
                  <button 
                    onClick={() => setActiveStep(activeStep + 1)}
                    className="btn btn-primary"
                    style={{ padding: '0.5rem 1.5rem', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}
                    id="wizard-btn-next-step"
                  >
                    <span>{activeStep === 2 ? 'Finish Setup' : 'Next Step'}</span>
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

      </div>
    </section>
  );
}
