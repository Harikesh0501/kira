// src/components/Navbar.js
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Terminal, Download, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`navbar-header ${scrolled ? 'scrolled' : ''}`}>
      <div className="container nav-container">
        <Link href="/" className="nav-brand" id="nav-brand-link">
          <div className="brand-icon-wrapper" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
            <img 
              src="/kira_logo.png?v=2" 
              alt="KIRA Logo" 
              style={{ width: '28px', height: '28px', objectFit: 'cover', borderRadius: '50%', border: '1px solid rgba(6, 182, 212, 0.3)' }} 
            />
          </div>
          <span className="brand-name">KIRA</span>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="nav-menu">
          <Link href="/features" className="nav-link" id="nav-features-link">Features</Link>
          <Link href="/playground" className="nav-link" id="nav-simulator-link">Live Demo</Link>
          <Link href="/pricing" className="nav-link" id="nav-pricing-link">Pricing</Link>
          <Link href="/help" className="nav-link" id="nav-help-link">Help Center</Link>
        </nav>

        <div className="nav-actions">
          <a 
            href="https://drive.google.com/uc?export=download&confirm=t&id=1r8M0cDq1llmlO4cZzCvz2JkQMsM9tkc_" 
            className="btn btn-primary btn-sm nav-btn" 
            id="nav-download-cta"
          >
            <Download size={16} />
            <span>Get Kira</span>
          </a>
          <button 
            className="mobile-menu-toggle" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            id="mobile-nav-toggle"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <div className={`mobile-drawer ${mobileMenuOpen ? 'open' : ''}`}>
        <nav className="mobile-nav-links">
          <Link 
            href="/features" 
            onClick={() => setMobileMenuOpen(false)} 
            className="mobile-link"
            id="mobile-features-link"
          >
            Features
          </Link>
          <Link 
            href="/playground" 
            onClick={() => setMobileMenuOpen(false)} 
            className="mobile-link"
            id="mobile-simulator-link"
          >
            Live Demo
          </Link>
          <Link 
            href="/pricing" 
            onClick={() => setMobileMenuOpen(false)} 
            className="mobile-link"
            id="mobile-pricing-link"
          >
            Pricing
          </Link>
          <Link 
            href="/help" 
            onClick={() => setMobileMenuOpen(false)} 
            className="mobile-link"
            id="mobile-help-link"
          >
            Help Center
          </Link>
          <a 
            href="https://drive.google.com/uc?export=download&confirm=t&id=1r8M0cDq1llmlO4cZzCvz2JkQMsM9tkc_" 
            onClick={() => setMobileMenuOpen(false)} 
            className="btn btn-primary"
            style={{ width: '100%', justifyContent: 'center', marginTop: '1rem' }}
            id="mobile-download-btn"
          >
            <Download size={18} />
            <span>Get Kira</span>
          </a>
        </nav>
      </div>
    </header>
  );
}
