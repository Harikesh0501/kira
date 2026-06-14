// src/components/Hero.js
'use client';

import React, { useEffect, useState, useRef } from 'react';
import { Download, ArrowRight, Shield, Cpu, Zap, ChevronDown } from 'lucide-react';

const PLATFORMS = {
  Windows: {
    label: 'Download for Windows',
    file: 'https://drive.google.com/uc?export=download&confirm=t&id=1r8M0cDq1llmlO4cZzCvz2JkQMsM9tkc_',
    subtext: 'Windows 10/11 x64'
  }
};

const TAGLINES = ["Reimagined by AI.", "Controlled by Voice.", "100% Private."];

export default function Hero() {
  const [activePlatform] = useState('Windows');
  const [isMounted, setIsMounted] = useState(false);
  const [taglineText, setTaglineText] = useState("");
  const [taglineIdx, setTaglineIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    let timer;
    const currentFullText = TAGLINES[taglineIdx];

    const handleType = () => {
      if (!isDeleting) {
        setTaglineText(currentFullText.substring(0, taglineText.length + 1));
        setTypingSpeed(100);

        if (taglineText === currentFullText) {
          setTypingSpeed(2000); // Wait before starting delete
          setIsDeleting(true);
        }
      } else {
        setTaglineText(currentFullText.substring(0, taglineText.length - 1));
        setTypingSpeed(50);

        if (taglineText === "") {
          setIsDeleting(false);
          setTaglineIdx((prev) => (prev + 1) % TAGLINES.length);
        }
      }
    };

    timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [taglineText, isDeleting, taglineIdx, typingSpeed, isMounted]);



  const currentPlatform = PLATFORMS[activePlatform];

  return (
    <section className="hero-section" id="hero">
      <div className="hero-grid-overlay"></div>
      
      {/* Glowing Arc Reactor / Siri Voice Sphere backdrop */}
      <div className="voice-sphere-container">
        <div className="voice-sphere-ring">
          <div className="voice-sphere-ring-inner"></div>
        </div>
        <div className="voice-sphere-core"></div>
      </div>

      <div className="container hero-container">
        
        {/* Release Pill Tag */}
        <div className="release-tag-wrapper">
          <div className="release-tag">
            <span className="pulse-dot"></span>
            <span className="tag-text">v1.0.0 Now Available</span>
          </div>
        </div>

        {/* Hero Copy */}
        <div className="hero-content">
          <h1 className="hero-title">
            Your Desktop. <br />
            <span className="gradient-text-accent">
              {isMounted ? taglineText : "Reimagined by AI."}
              {isMounted && <span className="typewriter-cursor"></span>}
            </span>
          </h1>
          <p className="subtitle hero-subtitle">
            Kira is a local, privacy-first AI voice assistant for your computer. 
            Automate workflows, analyze files, and run system tasks instantly—100% offline and secure.
          </p>

          {/* Call-to-actions */}
          <div className="hero-actions">
            
            {/* Direct Download Button */}
            <a 
              href={currentPlatform.file} 
              download="Kira-Installer.exe"
              className="btn btn-primary btn-large"
              id="hero-download-btn"
            >
              <Download size={20} />
              <span>{currentPlatform.label}</span>
            </a>

            <a href="#simulator" className="btn btn-secondary btn-large" id="hero-demo-btn">
              <span>Try Live Demo</span>
              <ArrowRight size={18} />
            </a>
          </div>

          <div className="system-req">
            <span>Requires Windows 10/11 x64 • Free & Open Source Core • Works Offline</span>
          </div>

          {/* Quick value badges */}
          <div className="value-badges">
            <div className="value-badge">
              <Shield className="badge-icon text-purple" size={16} />
              <span>100% Local & Private</span>
            </div>
            <div className="value-badge">
              <Cpu className="badge-icon text-cyan" size={16} />
              <span>Runs on your hardware</span>
            </div>
            <div className="value-badge">
              <Zap className="badge-icon text-pink" size={16} />
              <span>Instant command execution</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
