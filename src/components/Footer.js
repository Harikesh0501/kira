// src/components/Footer.js
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Terminal, Heart, Send, Check } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [subscribersCount, setSubscribersCount] = useState(0);
  const [error, setError] = useState('');

  const fetchCount = async () => {
    try {
      const res = await fetch('/api/waitlist');
      const data = await res.json();
      if (data.success) {
        setSubscribersCount(data.count);
      }
    } catch (err) {
      console.error('Error fetching waitlist count:', err);
    }
  };

  useEffect(() => {
    fetchCount();
    // Local storage check for waitlist subscription persistence
    if (typeof window !== 'undefined') {
      const waitlistSubscribed = localStorage.getItem('kira-waitlist-subscribed');
      if (waitlistSubscribed === 'true') {
        setSubmitted(true);
      }
    }
  }, []);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setError('');
    
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      
      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
        fetchCount(); // Refresh count
        // Persist subscription in local storage
        if (typeof window !== 'undefined') {
          localStorage.setItem('kira-waitlist-subscribed', 'true');
        }
      } else {
        setError(data.error || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      console.error('Subscription error:', err);
      setError('Network error. Please check your connection.');
    } finally {
      setLoading(false);
      setEmail('');
    }
  };

  return (
    <footer className="footer-area">
      <div className="container">

        {/* Footer Top */}
        <div className="footer-top">
          {/* Brand Info */}
          <div className="footer-info">
            <div className="footer-brand">
              <div className="footer-logo-wrapper" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                <img 
                  src="/kira_logo.png?v=2" 
                  alt="KIRA Logo" 
                  style={{ width: '32px', height: '32px', objectFit: 'cover', borderRadius: '50%', border: '1px solid rgba(6, 182, 212, 0.3)' }} 
                />
              </div>
              <span>KIRA</span>
            </div>
            <p className="footer-desc">
              Next-generation local-first desktop AI assistant. Fully offline, extensible, and completely secure.
            </p>

          </div>

          {/* Nav Columns: Product */}
          <div className="footer-links-column">
            <h4>Product</h4>
            <Link href="/features">Features</Link>
            <Link href="/playground">Live Demo</Link>
            <Link href="/pricing">Pricing</Link>
            <Link href="/help">Help Center</Link>
          </div>

          {/* Nav Columns: Resources */}
          <div className="footer-links-column">
            <h4>Resources</h4>
            <Link href="/#compatibility">Diagnostics</Link>
            <Link href="/help?tab=onboarding">Setup Guide</Link>
            <Link href="/#privacy-security">Privacy Protocols</Link>
            <Link href="/playground">Interactive Simulator</Link>
          </div>

          {/* Waitlist Subscription Column */}
          <div className="footer-waitlist">
            <h4>Join the waitlist</h4>
            <p className="waitlist-desc">Get notified about new desktop plugins, new local models, and core updates.</p>
            <p className="waitlist-social-proof" style={{ fontSize: '0.8rem', color: 'var(--accent-cyan)', marginBottom: '0.75rem', fontWeight: '500' }}>
              {subscribersCount > 0 
                ? `Join ${subscribersCount} user${subscribersCount !== 1 ? 's' : ''} waiting for v1.0.0-pro`
                : 'Be the first to join the waitlist for v1.0.0-pro'
              }
            </p>
            
            {submitted ? (
              <div className="waitlist-success" id="waitlist-success-msg">
                <Check size={16} />
                <span>You're on the list! Thank you.</span>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', width: '100%', gap: '0.5rem' }}>
                <form className="waitlist-form" onSubmit={handleSubscribe} id="waitlist-form">
                  <input
                    type="email"
                    placeholder="Enter email address"
                    className="waitlist-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                    required
                    id="waitlist-email-input"
                    suppressHydrationWarning={true}
                  />
                  <button 
                    type="submit" 
                    className="waitlist-submit"
                    disabled={loading}
                    aria-label="Subscribe"
                    id="waitlist-submit-btn"
                    suppressHydrationWarning={true}
                  >
                    {loading ? '...' : <Send size={16} />}
                  </button>
                </form>
                {error && (
                  <p style={{ color: '#ef4444', fontSize: '0.8rem', margin: '0.25rem 0 0 0.5rem', textAlign: 'left' }} id="waitlist-error-msg">
                    ⚠️ {error}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <p className="copyright">
            © {new Date().getFullYear()} Kira Desktop Project. All rights reserved.
          </p>
          <p className="credits">
            Created by Harikesh Patel for the future of AI.
          </p>
        </div>

      </div>
    </footer>
  );
}
