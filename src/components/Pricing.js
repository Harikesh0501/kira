// src/components/Pricing.js
'use client';

import React, { useState } from 'react';
import { Check, Download, Zap } from 'lucide-react';

const PLANS = [
  {
    name: 'Core Edition',
    price: '$0',
    period: 'Free Forever',
    desc: 'Run completely offline on your own machine. Ideal for local privacy.',
    features: [
      'Local model integration (Ollama / Llama3)',
      '100% offline speech recognition & TTS',
      'Hindi + Gujarati voice commands support',
      'Start Menu application closer & launcher',
      'Low memory Rust-core background thread'
    ],
    cta: 'Download Installer',
    href: '/kira-installer.exe',
    primary: false
  },
  {
    name: 'Pro Edition',
    price: '$9',
    period: 'per month',
    desc: 'Unlock remote streaming, advanced screen vision, and cloud AI fallbacks.',
    features: [
      'Gemini 2.5 Flash API Key integration',
      'Remote CCTV mobile streaming (LHR tunnel)',
      'Webcam Face Security & Auto-Lock',
      'EasyOCR Smart Screen text clicking',
      'Gemini Vision AI screen reading',
      'Neural Voice synthesis replies'
    ],
    cta: 'Get Pro Access',
    href: '#download',
    primary: true
  }
];

export default function Pricing() {
  const [billingPeriod, setBillingPeriod] = useState('monthly'); // 'monthly' | 'annual'

  const getPriceInfo = (planName) => {
    if (planName === 'Core Edition') {
      return { price: '$0', period: 'Free Forever' };
    }
    // Pro Edition
    return billingPeriod === 'monthly'
      ? { price: '$9', period: 'per month' }
      : { price: '$7', period: 'per month, billed annually' };
  };

  return (
    <section className="pricing-section" id="pricing">
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header" style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 className="gradient-text">Choose Your Edition</h2>
          <p className="subtitle" style={{ marginBottom: '2rem' }}>
            Start free with local AI models, or upgrade to access advanced remote CCTV and screen vision tools.
          </p>

          {/* Billing Switcher Toggle Switch */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
            <span style={{ fontSize: '0.9rem', color: billingPeriod === 'monthly' ? 'white' : 'var(--text-secondary)', fontWeight: 500 }}>Monthly</span>
            <button 
              onClick={() => setBillingPeriod(billingPeriod === 'monthly' ? 'annual' : 'monthly')}
              style={{
                width: '50px',
                height: '26px',
                borderRadius: '50px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid var(--border-color)',
                position: 'relative',
                cursor: 'pointer',
                padding: '2px',
                display: 'flex',
                alignItems: 'center',
                transition: 'all 0.3s ease',
                outline: 'none'
              }}
              aria-label="Toggle billing period"
              id="pricing-billing-toggle"
              suppressHydrationWarning={true}
            >
              <div style={{
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                background: 'var(--accent-cyan)',
                position: 'absolute',
                left: billingPeriod === 'monthly' ? '3px' : '25px',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: '0 0 8px var(--accent-cyan)'
              }}></div>
            </button>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '0.9rem', color: billingPeriod === 'annual' ? 'white' : 'var(--text-secondary)', fontWeight: 500 }}>Annually</span>
              <span style={{ fontSize: '0.65rem', padding: '0.15rem 0.5rem', background: 'rgba(6, 182, 212, 0.1)', color: 'var(--accent-cyan)', border: '1px solid rgba(6, 182, 212, 0.2)', borderRadius: '50px', fontWeight: 600 }}>SAVE 22%</span>
            </div>
          </div>
        </div>

        {/* Pricing Layout */}
        <div className="pricing-grid">
          {PLANS.map((plan, idx) => {
            const priceInfo = getPriceInfo(plan.name);
            return (
              <div 
                key={idx} 
                className={`pricing-card glass-card glow-on-hover ${plan.primary ? 'pro-highlight' : ''}`}
                id={`pricing-card-${idx}`}
              >
                {plan.primary && (
                  <div className="popular-badge">
                    <Zap size={12} />
                    <span>MOST POPULAR</span>
                  </div>
                )}
                
                <div className="card-header-pricing">
                  <h3 className="plan-name">{plan.name}</h3>
                  <div className="plan-price-wrapper">
                    <span className="plan-price">{priceInfo.price}</span>
                    <span className="plan-period">{priceInfo.period}</span>
                  </div>
                  <p className="plan-desc">{plan.desc}</p>
                </div>

                <div className="divider"></div>

                <ul className="plan-features">
                  {plan.features.map((feat, fIdx) => (
                    <li key={fIdx} className="feature-item">
                      <div className="check-icon-wrapper">
                        <Check size={14} className="check-icon" />
                      </div>
                      <span className="feature-text">{feat}</span>
                    </li>
                  ))}
                </ul>

                <div className="card-footer-pricing">
                  <a 
                    href={plan.href} 
                    download={plan.href === '/kira-installer.exe' ? 'Kira-Installer.exe' : undefined}
                    className={`btn ${plan.primary ? 'btn-primary' : 'btn-secondary'} pricing-cta`}
                    id={`pricing-cta-${idx}`}
                  >
                    {plan.href === '/kira-installer.exe' && <Download size={16} />}
                    <span>{plan.cta}</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
