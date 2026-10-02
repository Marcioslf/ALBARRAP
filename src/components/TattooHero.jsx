import React from 'react';
import { motion } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa6';
import { FiArrowRight, FiShield, FiMapPin, FiAward, FiCheck } from 'react-icons/fi';
import { ARTIST_INFO } from '../data/tattoosData';

export default function TattooHero({ onExploreGallery, onOpenBudget }) {
  const openWhatsApp = () => {
    const text = encodeURIComponent("Olá! Gostaria de agendar um horário ou solicitar orçamento no WM Tattoo Studio (Goiânia-GO).");
    window.open(`https://wa.me/${ARTIST_INFO.whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <section className="mono-hero-section" id="hero">
      {/* FULL BLEED SEAMLESS GENERATIVE CINEMATIC BACKDROP */}
      <div className="hero-cinematic-backdrop">
        <div className="cinematic-photo-wrap">
          <img 
            src="/images/wm-hero-cinematic-flipped.jpg" 
            alt="WM Tattoo Studio - Tatuador Premiado em Goiânia em ação" 
            className="cinematic-photo-img"
          />
          
          {/* Edge Softening Gradients - Seamless transition into #000000 */}
          <div className="edge-soften-left" />
          <div className="edge-soften-top" />
          <div className="edge-soften-bottom" />
          <div className="edge-soften-right" />
          <div className="edge-soften-radial" />
        </div>

        {/* Ambient Precision Lighting Glow */}
        <div className="cinematic-glow-spot" />
      </div>

      <div className="studio-container hero-content-container">
        {/* Left Side: Minimalist Rounded Editorial Content */}
        <motion.div 
          className="hero-editorial-left"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Top Badges */}
          <div className="hero-pills-row">
            <span className="pill-rounded-solid">
              <img src="/images/wm-logo.png" alt="WM Crest" className="hero-pill-logo" />
              <span>WM TATTOO</span>
            </span>
            <span className="pill-rounded-ghost">
              <FiAward size={13} className="text-bronze" />
              <span>TATUADOR PREMIADO 🏆</span>
            </span>
            <span className="pill-rounded-ghost">
              <FiMapPin size={12} className="text-bronze" />
              <span>GOIÂNIA – GO</span>
            </span>
          </div>

          {/* Main Title in Rounded Outfit Font */}
          <h1 className="hero-main-title">
            <span className="hero-title-white">WM TATTOO</span>
            <span className="hero-title-sub">STUDIO</span>
          </h1>

          {/* Quote & Philosophy */}
          <p className="hero-motto">
            “A imaginação é mais importante que o conhecimento.”
          </p>

          {/* Minimalist Specialties Tags */}
          <div className="hero-tags-row">
            <span className="hero-tag"><span className="tag-fleur">⚜</span> Preto & Cinza (Pr e Br)</span>
            <span className="hero-tag-sep">•</span>
            <span className="hero-tag"><span className="tag-fleur">⚜</span> Feminina</span>
            <span className="hero-tag-sep">•</span>
            <span className="hero-tag"><span className="tag-fleur">⚜</span> Cobertura</span>
          </div>

          {/* Direct Minimal CTAs */}
          <div className="hero-actions-row">
            <motion.button 
              onClick={openWhatsApp} 
              className="btn-rounded-primary"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
            >
              <FaWhatsapp size={18} />
              <span>Orçar no WhatsApp</span>
            </motion.button>

            <motion.button 
              onClick={onExploreGallery} 
              className="btn-rounded-secondary"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
            >
              <span>Ver Portfólio</span>
              <FiArrowRight size={16} />
            </motion.button>
          </div>

          {/* Clean Assurance Footer */}
          <div className="hero-assurance-bar">
            <div className="assurance-item">
              <FiShield size={14} className="text-bronze" />
              <span>Padrão Anvisa</span>
            </div>
            <span className="assurance-sep">/</span>
            <div className="assurance-item">
              <FiAward size={14} className="text-bronze" />
              <span>Projetos Autorais</span>
            </div>
            <span className="assurance-sep">/</span>
            <div className="assurance-item">
              <FiCheck size={14} className="text-bronze" />
              <span>Hora Marcada</span>
            </div>
          </div>
        </motion.div>

        {/* Floating Minimal Live Pill */}
        <motion.div 
          className="hero-live-status-floating"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="live-status-capsule">
            <img src="/images/wm-logo.png" alt="WM Tattoo" className="live-logo-crest" />
            <div className="live-text-block">
              <span className="live-title">WM TATTOO STUDIO</span>
              <span className="live-sub">Goiânia-GO • Atendimento Exclusivo</span>
            </div>
          </div>
        </motion.div>
      </div>

      <style>{`
        .mono-hero-section {
          position: relative;
          min-height: 94vh;
          width: 100%;
          background: #000000;
          display: flex;
          align-items: center;
          overflow: hidden;
          padding: 6.5rem 0 4rem;
        }

        /* SEAMLESS GENERATIVE BACKDROP */
        .hero-cinematic-backdrop {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 1;
          overflow: hidden;
        }

        .cinematic-photo-wrap {
          position: absolute;
          top: 0;
          right: 0;
          width: 68%;
          height: 100%;
          max-width: 1150px;
        }

        .cinematic-photo-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center 30%;
          filter: contrast(1.12) brightness(0.98) saturate(0.98);
          opacity: 0.95;
        }

        /* Multi-directional smooth edge softening into pure black #000000 */
        .edge-soften-left {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to right,
            #000000 0%,
            #000000 10%,
            rgba(0, 0, 0, 0.9) 26%,
            rgba(0, 0, 0, 0.4) 55%,
            transparent 100%
          );
        }

        .edge-soften-top {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 22%;
          background: linear-gradient(to bottom, #000000 0%, rgba(0, 0, 0, 0.75) 45%, transparent 100%);
        }

        .edge-soften-bottom {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 28%;
          background: linear-gradient(to top, #000000 0%, rgba(0, 0, 0, 0.85) 45%, transparent 100%);
        }

        .edge-soften-right {
          position: absolute;
          top: 0;
          bottom: 0;
          right: 0;
          width: 10%;
          background: linear-gradient(to left, #000000 0%, transparent 100%);
        }

        .edge-soften-radial {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 60% 45%, transparent 45%, rgba(0, 0, 0, 0.4) 80%, #000000 100%);
        }

        .cinematic-glow-spot {
          position: absolute;
          top: 35%;
          right: 25%;
          width: 500px;
          height: 500px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(255, 255, 255, 0.06) 0%, transparent 70%);
          pointer-events: none;
        }

        /* HERO CONTENT */
        .hero-content-container {
          position: relative;
          z-index: 2;
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          max-width: 1380px;
          margin: 0 auto;
        }

        .hero-editorial-left {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          max-width: 620px;
        }

        .hero-pills-row {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          flex-wrap: wrap;
        }

        .pill-rounded-solid {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.35rem 0.85rem;
          background: var(--gradient-bronze);
          color: #000000;
          font-family: var(--font-headline);
          font-size: 0.72rem;
          font-weight: 800;
          letter-spacing: 0.08em;
          border-radius: var(--radius-pill);
          border: 1px solid var(--color-bronze-light);
          text-transform: uppercase;
          box-shadow: 0 2px 12px var(--color-bronze-glow);
        }

        .hero-pill-logo {
          width: 17px;
          height: 17px;
          object-fit: contain;
          flex-shrink: 0;
        }

        .pill-rounded-ghost {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.35rem 0.85rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--color-bronze-border);
          border-radius: var(--radius-pill);
          color: var(--text-secondary);
          font-family: var(--font-headline);
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          backdrop-filter: blur(10px);
        }

        .text-bronze {
          color: var(--color-bronze-light);
        }

        .hero-main-title {
          font-family: var(--font-headline);
          font-size: clamp(3.2rem, 6.2vw, 5.2rem);
          font-weight: 900;
          line-height: 0.95;
          letter-spacing: -0.03em;
          text-transform: uppercase;
          display: flex;
          flex-direction: column;
          gap: 0.1rem;
        }

        .hero-title-white {
          color: #ffffff;
          text-shadow: 0 0 40px rgba(255, 255, 255, 0.25);
        }

        .hero-title-sub {
          background: var(--gradient-bronze-text);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .hero-motto {
          font-family: var(--font-headline);
          font-size: 1.15rem;
          font-weight: 500;
          color: #f4f4f5;
          line-height: 1.5;
          font-style: italic;
          max-width: 520px;
          border-left: 2px solid var(--color-bronze);
          padding-left: 1rem;
          margin: 0.25rem 0;
        }

        .hero-tags-row {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          flex-wrap: wrap;
          font-family: var(--font-headline);
          font-size: 0.78rem;
          font-weight: 700;
          color: var(--text-secondary);
          letter-spacing: 0.04em;
        }

        .hero-tag {
          color: #ffffff;
          background: rgba(255, 255, 255, 0.05);
          padding: 0.25rem 0.65rem;
          border-radius: var(--radius-sm);
          border: 1px solid var(--color-bronze-border);
          backdrop-filter: blur(8px);
        }

        .tag-fleur {
          color: var(--color-bronze-light);
          margin-right: 0.15rem;
        }

        .hero-tag-sep {
          color: var(--text-dim);
        }

        .hero-actions-row {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-top: 0.5rem;
          flex-wrap: wrap;
        }

        .btn-rounded-primary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.65rem;
          padding: 0.95rem 1.85rem;
          background: var(--gradient-bronze);
          color: #000000;
          font-family: var(--font-headline);
          font-size: 0.82rem;
          font-weight: 800;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          border-radius: var(--radius-pill);
          border: 1px solid var(--color-bronze-light);
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 4px 20px var(--color-bronze-glow);
        }

        .btn-rounded-primary:hover {
          background: #ffffff;
          border-color: #ffffff;
          color: #000000;
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(255, 255, 255, 0.35);
        }

        .btn-rounded-secondary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.65rem;
          padding: 0.95rem 1.75rem;
          background: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(10px);
          color: #ffffff;
          font-family: var(--font-headline);
          font-size: 0.82rem;
          font-weight: 700;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          border-radius: var(--radius-pill);
          border: 1px solid rgba(255, 255, 255, 0.25);
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .btn-rounded-secondary:hover {
          background: rgba(179, 146, 116, 0.15);
          border-color: var(--color-bronze-light);
          color: var(--color-bronze-light);
          transform: translateY(-2px);
        }

        .hero-assurance-bar {
          display: flex;
          align-items: center;
          gap: 0.85rem;
          font-family: var(--font-headline);
          font-size: 0.72rem;
          font-weight: 600;
          color: var(--text-muted);
          margin-top: 0.5rem;
          padding-top: 1rem;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          flex-wrap: wrap;
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }

        .assurance-item {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          color: var(--text-secondary);
        }

        .assurance-sep {
          color: var(--text-dim);
        }

        /* Floating Capsule on Negative Space */
        .hero-live-status-floating {
          display: flex;
          align-items: flex-end;
          justify-content: flex-end;
          align-self: flex-end;
          margin-bottom: 2rem;
        }

        .live-status-capsule {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.6rem 1.25rem;
          background: rgba(8, 8, 10, 0.75);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid var(--color-bronze-border);
          border-radius: var(--radius-pill);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.85), 0 0 20px rgba(179, 146, 116, 0.1);
        }

        .live-logo-crest {
          width: 32px;
          height: 32px;
          object-fit: contain;
          filter: drop-shadow(0 0 6px rgba(179, 146, 116, 0.6));
          flex-shrink: 0;
        }

        .live-dot-pulse {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #ffffff;
          box-shadow: 0 0 10px #ffffff;
          animation: pulseDot 2s infinite ease-in-out;
          flex-shrink: 0;
        }

        @keyframes pulseDot {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.4); opacity: 0.6; }
        }

        .live-text-block {
          display: flex;
          flex-direction: column;
        }

        .live-title {
          font-family: var(--font-headline);
          font-size: 0.74rem;
          font-weight: 800;
          letter-spacing: 0.08em;
          color: #ffffff;
          text-transform: uppercase;
        }

        .live-sub {
          font-family: var(--font-body);
          font-size: 0.65rem;
          color: var(--text-muted);
        }

        @media (max-width: 992px) {
          .cinematic-photo-wrap {
            width: 100%;
            opacity: 0.35;
          }
          .cinematic-photo-img {
            object-position: 65% 25%;
          }
          .edge-soften-left {
            background: linear-gradient(to right, #000000 0%, rgba(0, 0, 0, 0.95) 45%, rgba(0, 0, 0, 0.6) 100%);
          }
          .edge-soften-bottom {
            height: 35%;
            background: linear-gradient(to top, #000000 0%, rgba(0, 0, 0, 0.95) 60%, transparent 100%);
          }
          .hero-editorial-left {
            max-width: 100%;
          }
          .hero-live-status-floating {
            display: none;
          }
        }

        @media (max-width: 640px) {
          .mono-hero-section {
            padding: 5.5rem 0 3rem;
            min-height: auto;
          }
          .hero-main-title {
            font-size: clamp(2.4rem, 11vw, 3.6rem);
          }
          .hero-motto {
            font-size: clamp(0.95rem, 3.8vw, 1.1rem);
            line-height: 1.45;
          }
          .hero-editorial-left {
            gap: 1rem;
          }
        }

        @media (max-width: 480px) {
          .mono-hero-section {
            padding: 5rem 0 2.5rem;
          }
          .hero-pills-row {
            gap: 0.35rem;
          }
          .pill-rounded-solid {
            font-size: 0.68rem;
            padding: 0.28rem 0.65rem;
          }
          .pill-rounded-ghost {
            font-size: 0.66rem;
            padding: 0.28rem 0.6rem;
            gap: 0.3rem;
          }
          .hero-actions-row {
            flex-direction: column;
            width: 100%;
            gap: 0.7rem;
            margin-top: 0.25rem;
          }
          .btn-rounded-primary,
          .btn-rounded-secondary {
            width: 100%;
            min-height: 48px;
            font-size: 0.82rem;
            justify-content: center;
          }
          .hero-tags-row {
            gap: 0.4rem;
            font-size: 0.72rem;
          }
          .hero-tag-sep {
            display: none;
          }
          .hero-assurance-bar {
            gap: 0.5rem;
            font-size: 0.68rem;
            padding-top: 0.75rem;
          }
          .assurance-sep {
            display: none;
          }
          .assurance-item {
            background: rgba(255, 255, 255, 0.03);
            padding: 0.25rem 0.6rem;
            border-radius: var(--radius-pill);
            border: 1px solid var(--border-subtle);
          }
        }
      `}</style>
    </section>
  );
}
