import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Menu, X, Sparkles, Radio, Rocket } from 'lucide-react';

export default function Navbar({ onOpenLeadModal, onTriggerWarp }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: "Soluções", href: "#solucoes" },
    { name: "Cases", href: "#cases" },
    { name: "Calculadora ROI", href: "#calculadora" },
    { name: "Metodologia", href: "#metodologia" },
    { name: "Planos", href: "#planos" },
    { name: "FAQ", href: "#faq" }
  ];

  return (
    <motion.header 
      className={`navbar-header ${isScrolled ? 'scrolled' : ''}`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="container nav-container">
        {/* Logo */}
        <a href="#" className="logo-brand">
          <div className="logo-icon-box">
            <Sparkles className="logo-icon" size={19} />
          </div>
          <div className="logo-text-group">
            <span className="logo-title">NEXUS<span className="logo-dot">.</span></span>
            <span className="logo-subtitle">COSMOS STUDIO</span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="desktop-nav">
          {navLinks.map((link, idx) => (
            <a key={idx} href={link.href} className="nav-link">
              {link.name}
            </a>
          ))}
        </nav>

        {/* CTA Actions */}
        <div className="nav-actions">
          {/* Warp Speed Trigger Button */}
          {onTriggerWarp && (
            <button 
              onClick={onTriggerWarp}
              className="warp-trigger-btn desktop-only-badge"
              title="Acionar Hiperespaço 3D"
            >
              <Rocket size={14} className="text-cyan" />
              <span>Dobra Espacial</span>
            </button>
          )}

          <div className="badge badge-emerald desktop-only-badge">
            <span className="status-dot"></span>
            Vagas Q3/Q4 Abertas
          </div>

          <motion.button 
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => onOpenLeadModal("Diagnóstico Gratuito - Navbar")}
            className="btn btn-primary btn-sm btn-glow"
          >
            <span>Agendar Diagnóstico</span>
            <ArrowRight size={16} />
          </motion.button>
          
          {/* Mobile Hamburger */}
          <button 
            className="mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Abrir Menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="mobile-menu-overlay">
          <div className="mobile-menu-content">
            <div className="mobile-menu-header">
              <span className="logo-title">NEXUS<span className="logo-dot">.</span></span>
              <button 
                onClick={() => setMobileMenuOpen(false)}
                className="close-mobile-btn"
              >
                <X size={24} />
              </button>
            </div>
            <nav className="mobile-nav-links">
              {navLinks.map((link, idx) => (
                <a 
                  key={idx} 
                  href={link.href} 
                  className="mobile-nav-link"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
            </nav>
            <div className="mobile-menu-footer">
              <button 
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenLeadModal("Diagnóstico Mobile");
                }}
                className="btn btn-primary btn-lg"
                style={{ width: '100%' }}
              >
                <span>Solicitar Proposta</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .navbar-header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          padding: 1.25rem 0;
          transition: all var(--transition-smooth);
        }

        .navbar-header.scrolled {
          padding: 0.85rem 0;
          background: rgba(3, 4, 7, 0.88);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid var(--border-cosmic-subtle);
          box-shadow: 0 10px 35px rgba(0, 0, 0, 0.7);
        }

        .nav-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1.5rem;
        }

        .logo-brand {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .logo-icon-box {
          width: 40px;
          height: 40px;
          border-radius: var(--radius-sm);
          background: linear-gradient(135deg, rgba(6, 182, 212, 0.25), rgba(99, 102, 241, 0.25));
          border: 1px solid rgba(6, 182, 212, 0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--cosmic-neon-blue);
          box-shadow: 0 0 20px rgba(6, 182, 212, 0.35);
        }

        .logo-text-group {
          display: flex;
          flex-direction: column;
        }

        .logo-title {
          font-family: var(--font-heading);
          font-weight: 800;
          font-size: 1.35rem;
          letter-spacing: 0.06em;
          color: #ffffff;
          line-height: 1;
        }

        .logo-dot {
          color: var(--cosmic-cyan);
        }

        .logo-subtitle {
          font-size: 0.62rem;
          font-family: var(--font-mono);
          letter-spacing: 0.2em;
          color: var(--cosmic-neon-blue);
          margin-top: 2px;
        }

        .desktop-nav {
          display: flex;
          align-items: center;
          gap: 1.75rem;
          background: rgba(13, 17, 28, 0.6);
          padding: 0.5rem 1.25rem;
          border-radius: var(--radius-full);
          border: 1px solid var(--border-cosmic-subtle);
          backdrop-filter: blur(12px);
        }

        .nav-link {
          font-size: 0.9rem;
          font-weight: 500;
          color: var(--text-muted);
          position: relative;
        }

        .nav-link:hover {
          color: #ffffff;
        }

        .nav-actions {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .warp-trigger-btn {
          background: rgba(6, 182, 212, 0.1);
          border: 1px solid rgba(6, 182, 212, 0.3);
          color: var(--cosmic-neon-blue);
          font-family: var(--font-mono);
          font-size: 0.75rem;
          font-weight: 600;
          padding: 0.35rem 0.85rem;
          border-radius: var(--radius-full);
          display: flex;
          align-items: center;
          gap: 0.4rem;
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .warp-trigger-btn:hover {
          background: rgba(6, 182, 212, 0.2);
          box-shadow: 0 0 15px rgba(6, 182, 212, 0.4);
          transform: translateY(-1px);
        }

        .desktop-only-badge {
          display: flex;
        }

        .status-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #10b981;
          box-shadow: 0 0 8px #10b981;
          display: inline-block;
          animation: pulse-glow 2s infinite ease-in-out;
        }

        .mobile-toggle {
          display: none;
          background: transparent;
          border: none;
          color: var(--text-main);
          cursor: pointer;
          padding: 0.5rem;
        }

        @media (max-width: 992px) {
          .desktop-nav, .desktop-only-badge {
            display: none;
          }
          .mobile-toggle {
            display: block;
          }
        }

        /* Mobile Overlay */
        .mobile-menu-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(3, 4, 7, 0.98);
          backdrop-filter: blur(24px);
          z-index: 2000;
          display: flex;
          flex-direction: column;
          padding: 1.5rem;
        }

        .mobile-menu-content {
          display: flex;
          flex-direction: column;
          height: 100%;
          justify-content: space-between;
        }

        .mobile-menu-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 1.5rem;
          border-bottom: 1px solid var(--border-cosmic-subtle);
        }

        .close-mobile-btn {
          background: transparent;
          border: none;
          color: var(--text-muted);
          cursor: pointer;
        }

        .mobile-nav-links {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          margin: 2rem 0;
        }

        .mobile-nav-link {
          font-size: 1.35rem;
          font-weight: 700;
          font-family: var(--font-heading);
          color: var(--text-main);
        }

        .mobile-nav-link:hover {
          color: var(--cosmic-cyan);
        }
      `}</style>
    </motion.header>
  );
}
