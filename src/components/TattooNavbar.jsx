import React, { useState, useEffect } from 'react';
import { FaWhatsapp, FaInstagram } from 'react-icons/fa6';
import { ARTIST_INFO } from '../data/tattoosData';

export default function TattooNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 80);

      const sections = ['hero', 'sectors', 'gallery', 'about', 'budget'];
      let current = 'hero';

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.45 && rect.bottom >= window.innerHeight * 0.15) {
            current = sectionId;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    if (id === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const openWhatsApp = () => {
    const text = encodeURIComponent("Olá! Gostaria de consultar horários e orçamentos no WM Tattoo Studio (Goiânia-GO).");
    window.open(`https://wa.me/${ARTIST_INFO.whatsappNumber}?text=${text}`, '_blank');
  };

  const navLinks = [
    { id: 'hero', label: 'Início' },
    { id: 'sectors', label: 'Especialidades' },
    { id: 'gallery', label: 'Portfólio' },
    { id: 'about', label: 'Sobre' },
    { id: 'budget', label: 'Orçamento' },
  ];

  return (
    <div className={`mono-dock-wrapper ${isScrolled ? 'is-bottom' : 'is-top'}`}>
      <nav className="mono-dock-capsule" aria-label="Menu Principal">
        {/* Brand */}
        <button 
          onClick={() => scrollToSection('hero')} 
          className="mono-dock-brand"
          title="WM Tattoo Studio"
        >
          <img 
            src="/images/wm-logo.png" 
            alt="WM Tattoo Studio Crest" 
            className="dock-logo-img" 
          />
          <span className="dock-brand-text">WM TATTOO</span>
        </button>

        {/* Links */}
        <div className="mono-dock-links">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`mono-dock-link ${isActive ? 'active' : ''}`}
              >
                {link.label}
              </button>
            );
          })}
        </div>

        {/* Minimal Social & WhatsApp */}
        <div className="mono-dock-cta-wrap">
          <a
            href={ARTIST_INFO.instagramUrl}
            target="_blank"
            rel="noreferrer"
            className="dock-mini-social"
            title="Instagram @wm_tattoo_studio"
            aria-label="Instagram"
          >
            <FaInstagram size={14} />
          </a>

          <button onClick={openWhatsApp} className="dock-mini-whatsapp" title="WhatsApp WM Tattoo Studio">
            <FaWhatsapp size={14} />
          </button>
        </div>
      </nav>

      <style>{`
        .mono-dock-wrapper {
          position: fixed;
          left: 0;
          right: 0;
          z-index: 1000;
          display: flex;
          justify-content: center;
          padding: 0 1rem;
          pointer-events: none;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .mono-dock-wrapper.is-top {
          top: 16px;
          bottom: auto;
        }

        .mono-dock-wrapper.is-bottom {
          top: auto;
          bottom: 18px;
        }

        .mono-dock-capsule {
          pointer-events: auto;
          display: flex;
          align-items: center;
          gap: 0.3rem;
          padding: 0.35rem 0.5rem;
          background: rgba(8, 8, 10, 0.9);
          backdrop-filter: blur(20px) saturate(180%);
          -webkit-backdrop-filter: blur(20px) saturate(180%);
          border: 1px solid var(--color-bronze-border);
          border-radius: var(--radius-pill);
          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.95), 0 0 20px rgba(179, 146, 116, 0.08);
        }

        .mono-dock-brand {
          display: flex;
          align-items: center;
          gap: 0.45rem;
          padding: 0.28rem 0.75rem 0.28rem 0.5rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-pill);
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .mono-dock-brand:hover {
          background: rgba(179, 146, 116, 0.15);
          border-color: var(--color-bronze);
          box-shadow: 0 0 12px var(--color-bronze-glow);
        }

        .mono-dock-brand:hover .dock-brand-text {
          color: var(--color-bronze-light);
        }

        .dock-logo-img {
          width: 22px;
          height: 22px;
          object-fit: contain;
          filter: drop-shadow(0 0 4px rgba(179, 146, 116, 0.4));
          flex-shrink: 0;
        }

        .dock-brand-text {
          font-family: var(--font-headline);
          font-size: 0.74rem;
          font-weight: 800;
          color: #ffffff;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          white-space: nowrap;
        }

        .mono-dock-links {
          display: flex;
          align-items: center;
          gap: 0.15rem;
          padding: 0 0.2rem;
          overflow-x: auto;
          scrollbar-width: none;
          -ms-overflow-style: none;
          -webkit-overflow-scrolling: touch;
        }

        .mono-dock-links::-webkit-scrollbar {
          display: none;
        }

        .mono-dock-link {
          padding: 0.38rem 0.75rem;
          background: transparent;
          border: none;
          color: var(--text-secondary);
          font-family: var(--font-headline);
          font-size: 0.75rem;
          font-weight: 600;
          cursor: pointer;
          border-radius: var(--radius-pill);
          transition: all 0.2s ease;
          white-space: nowrap;
          flex-shrink: 0;
        }

        .mono-dock-link:hover {
          color: var(--color-bronze-light);
          background: rgba(179, 146, 116, 0.1);
        }

        .mono-dock-link.active {
          background: var(--gradient-bronze);
          color: #000000;
          font-weight: 800;
          box-shadow: 0 0 12px var(--color-bronze-glow);
        }

        .mono-dock-cta-wrap {
          display: flex;
          align-items: center;
          gap: 0.3rem;
          margin-left: 0.15rem;
          flex-shrink: 0;
        }

        .dock-mini-social {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          border: 1px solid var(--border-subtle);
          color: var(--text-secondary);
          display: flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          transition: all 0.2s ease;
          flex-shrink: 0;
        }

        .dock-mini-social:hover {
          background: rgba(255, 255, 255, 0.15);
          color: #ffffff;
        }

        .dock-mini-whatsapp {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: #ffffff;
          border: 1px solid #ffffff;
          color: #000000;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
          flex-shrink: 0;
        }

        .dock-mini-whatsapp:hover {
          transform: scale(1.08);
        }

        @media (max-width: 768px) {
          .mono-dock-wrapper.is-bottom {
            bottom: max(14px, env(safe-area-inset-bottom, 14px));
          }
          .mono-dock-capsule {
            max-width: calc(100vw - 1.25rem);
            padding: 0.28rem 0.4rem;
            gap: 0.25rem;
          }
          .dock-mini-social {
            display: none;
          }
        }

        @media (max-width: 480px) {
          .mono-dock-capsule {
            padding: 0.22rem 0.32rem;
            gap: 0.2rem;
          }
          .mono-dock-brand {
            padding: 0.3rem 0.55rem;
            gap: 0.35rem;
          }
          .dock-brand-text {
            font-size: 0.68rem;
          }
          .mono-dock-link {
            padding: 0.32rem 0.42rem;
            font-size: 0.68rem;
          }
          .dock-mini-whatsapp {
            width: 28px;
            height: 28px;
          }
        }

        @media (max-width: 360px) {
          .dock-brand-text {
            display: none;
          }
          .mono-dock-brand {
            padding: 0.35rem 0.45rem;
          }
        }
      `}</style>
    </div>
  );
}
