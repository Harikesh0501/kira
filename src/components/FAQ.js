// src/components/FAQ.js
'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const FAQS = [
  {
    q: 'How does the face detection auto-lock work?',
    a: 'Kira uses your webcam to run background face checking. Using the dlib and face-recognition libraries, it verifies face landmarks. If you step away from your PC and no authorized face is detected for 5 seconds, Kira calls native Windows APIs to lock your screen (Win + L) instantly. This runs entirely offline.'
  },
  {
    q: 'How do I access the Remote CCTV stream on my phone?',
    a: 'When you initialize Kira on your desktop, it spins up a local FastAPI server (port 8000) and starts a secure SSH tunnel. The terminal prints a public tunnel URL (e.g. *.lhr.life) and a temporary connection PIN. You open the URL on your mobile browser, enter the PIN, and you can view your live desktop webcam stream or arm the motion monitor.'
  },
  {
    q: 'What are the installation requirements for python developer mode?',
    a: 'You will need Python 3.11. Because the dlib face-recognition library compiles native C++ code, you must install Visual Studio C++ Build Tools (with the Desktop Development with C++ workload enabled) during the initial python pip package setup.'
  },
  {
    q: 'How does the conversational memory work?',
    a: 'Kira keeps a sliding window context of your last 10 voice interactions (commands, parameters, and timestamps). When you speak a follow-up phrase like "And what about Mumbai?" or "Aur Delhi ka weather?", Kira automatically resolves the context from memory, injecting it into Gemini AI.'
  },
  {
    q: 'Which languages does Kira speak?',
    a: 'Kira supports full voice commands, command parsing, and spoken responses in English, Hindi, and Gujarati. If a command in English is not recognized, Kira falls back to scanning Romanized/written Hindi and Gujarati keywords automatically.'
  }
];

export default function FAQ({ hideHeader = false }) {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className={hideHeader ? "" : "faq-section"} id={hideHeader ? "" : "faq"} style={hideHeader ? { padding: 0 } : {}}>
      <div className={hideHeader ? "" : "container"}>
        
        {/* Section Header */}
        {!hideHeader && (
          <div className="section-header" style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 className="gradient-text">Frequently Asked Questions</h2>
            <p className="subtitle">
              Everything you need to know about compiler tools, python setups, language support, and CCTV security.
            </p>
          </div>
        )}

        {/* FAQ Accordions */}
        <div className="faq-list">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div 
                key={idx} 
                className={`faq-item glass-card glow-on-hover ${isOpen ? 'active' : ''}`}
                id={`faq-item-${idx}`}
                style={{ transition: 'all 0.25s ease' }}
              >
                <button 
                  className="faq-question" 
                  onClick={() => toggleFAQ(idx)}
                  aria-expanded={isOpen}
                  id={`faq-question-btn-${idx}`}
                  suppressHydrationWarning={true}
                >
                  <span className="q-text">{faq.q}</span>
                  <ChevronDown className={`chevron-icon ${isOpen ? 'rotate' : ''}`} size={18} />
                </button>
                <div style={{
                  maxHeight: isOpen ? '250px' : '0px',
                  overflow: 'hidden',
                  transition: 'max-height 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                }}>
                  <div className="faq-answer" style={{ padding: '0 2rem 1.5rem 2rem' }}>
                    <p>{faq.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
