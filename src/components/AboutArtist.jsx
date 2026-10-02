import React from 'react';
import { motion } from 'framer-motion';
import { FiCheck, FiAward, FiShield, FiMapPin } from 'react-icons/fi';
import { FaWhatsapp, FaInstagram } from 'react-icons/fa6';
import { ARTIST_INFO } from '../data/tattoosData';

export default function AboutArtist() {
  const openWhatsApp = () => {
    const text = encodeURIComponent("Olá! Gostaria de falar sobre um projeto com o WM Tattoo Studio (Goiânia-GO).");
    window.open(`https://wa.me/${ARTIST_INFO.whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <section id="about" className="mono-about-section">
      <div className="studio-container">
        {/* Section Header */}
        <motion.div 
          className="section-header-minimal"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="section-num">03 // ARTISTA & ESTÚDIO</span>
          <h2 className="section-heading-text">SOBRE O WM TATTOO STUDIO</h2>
        </motion.div>

        {/* 2-Column Minimalist Grid */}
        <div className="about-minimal-grid">
          {/* Left: Bio Card */}
          <motion.div 
            className="about-bio-card"
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="bio-logo-quote-wrap">
              <img 
                src="/images/wm-logo.png" 
                alt="WM Tattoo Studio Brasão Oficial" 
                className="bio-studio-crest" 
              />
              <div className="bio-quote-header">
                <span className="bio-pill">⚜ FILOSOFIA & IDENTIDADE</span>
                <p className="bio-quote-text">
                  “A imaginação é mais importante que o conhecimento.”
                </p>
              </div>
            </div>

            <p className="bio-summary">
              O <strong>WM Tattoo Studio</strong> (@wm_tattoo_studio) em <strong>Goiânia – GO</strong> une rigor técnico, precisão anatômica e visão artística autoral. Tatuador premiado 🏆 especializado em sombreados ricos em Preto & Cinza, traços femininos anatômicos e coberturas estratégicas.
            </p>

            <div className="bio-pills-list">
              <div className="bio-bullet">
                <FiCheck size={16} className="bullet-icon-bronze" />
                <span>Tatuador Premiado em Convenções</span>
              </div>
              <div className="bio-bullet">
                <FiCheck size={16} className="bullet-icon-bronze" />
                <span>Especialista em Preto e Cinza (Pr e Br)</span>
              </div>
              <div className="bio-bullet">
                <FiCheck size={16} className="bullet-icon-bronze" />
                <span>Coberturas Estratégicas (Cover-up)</span>
              </div>
              <div className="bio-bullet">
                <FiCheck size={16} className="bullet-icon-bronze" />
                <span>100% Descartável com Registro Anvisa</span>
              </div>
            </div>

            <div className="bio-actions-row">
              <motion.button 
                onClick={openWhatsApp} 
                className="btn-rounded-primary"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <FaWhatsapp size={17} />
                <span>Agendar no WhatsApp</span>
              </motion.button>

              <a 
                href={ARTIST_INFO.instagramUrl} 
                target="_blank" 
                rel="noreferrer" 
                className="btn-rounded-secondary"
              >
                <FaInstagram size={17} />
                <span>@wm_tattoo_studio</span>
              </a>
            </div>
          </motion.div>

          {/* Right: 3 Clean Minimal Metric Cards */}
          <div className="about-metrics-column">
            <motion.div 
              className="metric-card"
              initial={{ opacity: 0, x: 25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="metric-icon-box">
                <FiAward size={22} className="metric-icon-bronze" />
              </div>
              <div>
                <h4 className="metric-title">Tatuador Premiado 🏆</h4>
                <p className="metric-desc">Reconhecimento técnico em eventos pela perfeição em sombreados e traços.</p>
              </div>
            </motion.div>

            <motion.div 
              className="metric-card"
              initial={{ opacity: 0, x: 25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="metric-icon-box">
                <FiShield size={22} className="metric-icon-bronze" />
              </div>
              <div>
                <h4 className="metric-title">100% Biossegurança</h4>
                <p className="metric-desc">Materiais lacrados abertos na hora, descarte correto e rigor sanitário.</p>
              </div>
            </motion.div>

            <motion.div 
              className="metric-card"
              initial={{ opacity: 0, x: 25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="metric-icon-box">
                <FiMapPin size={22} className="metric-icon-bronze" />
              </div>
              <div>
                <h4 className="metric-title">Goiânia – GO</h4>
                <p className="metric-desc">Atendimento exclusivo com hora marcada em ambiente moderno e climatizado.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <style>{`
        .mono-about-section {
          padding: 5.5rem 0 5rem;
          background: #000000;
          border-top: 1px solid var(--border-subtle);
          position: relative;
        }

        .about-minimal-grid {
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: 2.25rem;
          margin-top: 2.5rem;
        }

        .about-bio-card {
          padding: 2.5rem;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          background: #09090b;
          border: 1px solid var(--color-bronze-border);
          border-radius: var(--radius-lg);
          box-shadow: 0 10px 35px rgba(0, 0, 0, 0.8), 0 0 20px rgba(179, 146, 116, 0.05);
        }

        .bio-logo-quote-wrap {
          display: flex;
          align-items: center;
          gap: 1.25rem;
          padding-bottom: 1.25rem;
          border-bottom: 1px solid var(--border-subtle);
        }

        .bio-studio-crest {
          width: 58px;
          height: 58px;
          object-fit: contain;
          filter: drop-shadow(0 0 8px rgba(179, 146, 116, 0.5));
          flex-shrink: 0;
        }

        .bio-quote-header {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }

        .bio-pill {
          font-family: var(--font-headline);
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--color-bronze-light);
        }

        .bio-quote-text {
          font-family: var(--font-headline);
          font-size: 1.15rem;
          font-weight: 700;
          font-style: italic;
          line-height: 1.4;
          color: #ffffff;
        }

        .bio-summary {
          font-family: var(--font-body);
          font-size: 0.95rem;
          color: var(--text-secondary);
          line-height: 1.7;
        }

        .bio-summary strong {
          color: #ffffff;
          font-weight: 600;
        }

        .bio-pills-list {
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
        }

        .bio-bullet {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          font-family: var(--font-headline);
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--text-secondary);
        }

        .bullet-icon-bronze {
          color: var(--color-bronze-light);
          flex-shrink: 0;
        }

        .bio-actions-row {
          display: flex;
          align-items: center;
          gap: 0.85rem;
          margin-top: 0.5rem;
          flex-wrap: wrap;
        }

        .btn-rounded-primary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.65rem;
          padding: 0.95rem 1.75rem;
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
          color: #000000;
          border-color: #ffffff;
          box-shadow: 0 8px 30px rgba(255, 255, 255, 0.35);
        }

        .btn-rounded-secondary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.65rem;
          padding: 0.95rem 1.65rem;
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
          text-decoration: none;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .btn-rounded-secondary:hover {
          background: rgba(179, 146, 116, 0.15);
          border-color: var(--color-bronze-light);
          color: var(--color-bronze-light);
        }

        /* Metrics Column */
        .about-metrics-column {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .metric-card {
          padding: 1.5rem 1.75rem;
          display: flex;
          align-items: flex-start;
          gap: 1.25rem;
          background: #09090b;
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          transition: all 0.2s ease;
        }

        .metric-card:hover {
          border-color: var(--color-bronze-border);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.8), 0 0 15px rgba(179, 146, 116, 0.08);
        }

        .metric-icon-box {
          width: 44px;
          height: 44px;
          border-radius: var(--radius-sm);
          background: rgba(179, 146, 116, 0.08);
          border: 1px solid var(--color-bronze-border);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--color-bronze-light);
          flex-shrink: 0;
        }

        .metric-icon-bronze {
          color: var(--color-bronze-light);
        }

        .metric-title {
          font-family: var(--font-headline);
          font-size: 1rem;
          font-weight: 800;
          color: #ffffff;
          margin-bottom: 0.25rem;
        }

        .metric-desc {
          font-family: var(--font-body);
          font-size: 0.82rem;
          color: var(--text-secondary);
          line-height: 1.5;
        }

        @media (max-width: 900px) {
          .about-minimal-grid {
            grid-template-columns: 1fr;
          }
          .about-bio-card {
            padding: 1.75rem;
          }
        }

        @media (max-width: 480px) {
          .bio-logo-quote-wrap {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.85rem;
          }
          .bio-studio-crest {
            width: 48px;
            height: 48px;
          }
          .bio-actions-row {
            flex-direction: column;
            width: 100%;
          }
          .btn-rounded-primary,
          .btn-rounded-secondary {
            width: 100%;
            min-height: 48px;
          }
        }
      `}</style>
    </section>
  );
}
