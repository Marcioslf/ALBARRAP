import React from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight, FiShield, FiFeather, FiLayers } from 'react-icons/fi';
import { ARTIST_INFO } from '../data/tattoosData';

export default function SpecialtiesSectors() {
  const openWhatsAppSector = (sectorTitle) => {
    const text = encodeURIComponent(`Olá! Gostaria de fazer um orçamento no WM Tattoo Studio para o estilo: ${sectorTitle}.`);
    window.open(`https://wa.me/${ARTIST_INFO.whatsappNumber}?text=${text}`, '_blank');
  };

  const sectors = [
    {
      id: 'black-grey',
      title: 'Preto e Cinza',
      subtitle: 'Pr e Br // Sombreados & Texturas',
      desc: 'Gradientes ultra-suaves de Grey Wash com contrastes profundos, realismo e projetos orientais/autorais.',
      icon: FiLayers,
      badge: 'Assinatura',
    },
    {
      id: 'feminine',
      title: 'Tatuagem Feminina',
      subtitle: 'Fluidez & Anatomia',
      desc: 'Composições delicadas com traços finos e anatômicos, desenhadas exclusivamente para a silhueta do seu corpo.',
      icon: FiFeather,
      badge: 'Exclusivo',
    },
    {
      id: 'coverup',
      title: 'Cobertura (Cover-up)',
      subtitle: 'Restauração Estratégica',
      desc: 'Engenharia visual para cobrir tatuagens antigas e cicatrizes com arte nova de alto impacto, sem necessidade de laser.',
      icon: FiShield,
      badge: 'Especialista',
    },
  ];

  return (
    <section id="sectors" className="mono-sectors-section">
      <div className="studio-container">
        {/* Minimalist Section Header */}
        <motion.div 
          className="section-header-minimal"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="section-num">01 // ESPECIALIDADES</span>
          <h2 className="section-heading-text">ESTILOS & DOMÍNIO TÉCNICO</h2>
        </motion.div>

        {/* 3 Streamlined Minimalist Cards */}
        <div className="mono-sectors-grid">
          {sectors.map((sec, idx) => {
            const Icon = sec.icon;
            return (
              <motion.div 
                key={sec.id}
                className="sector-minimal-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
              >
                <div className="card-top-header">
                  <div className="card-icon-bubble">
                    <Icon size={20} />
                  </div>
                  <span className="card-badge-pill">{sec.badge}</span>
                </div>

                <h3 className="card-title-text">{sec.title}</h3>
                <span className="card-subtitle-text">{sec.subtitle}</span>
                <p className="card-desc-text">{sec.desc}</p>

                <div className="card-footer-action">
                  <motion.button 
                    onClick={() => openWhatsAppSector(sec.title)}
                    className="btn-sector-cta"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span>Orçar Estilo</span>
                    <FiArrowRight size={14} />
                  </motion.button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <style>{`
        .mono-sectors-section {
          padding: clamp(3.5rem, 8vw, 5.5rem) 0 clamp(2.5rem, 6vw, 5rem);
          background-color: var(--bg-black);
          border-top: 1px solid var(--border-subtle);
          position: relative;
        }

        .mono-sectors-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.75rem;
          margin-top: 2.5rem;
        }

        .sector-minimal-card {
          padding: 2.25rem 2rem;
          display: flex;
          flex-direction: column;
          background: #09090b;
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-lg);
          transition: all 0.3s ease;
        }

        .sector-minimal-card:hover {
          border-color: rgba(255, 255, 255, 0.3);
          background: #0e0e12;
          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.8);
        }

        .card-top-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.5rem;
        }

        .card-icon-bubble {
          width: 44px;
          height: 44px;
          border-radius: var(--radius-sm);
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--border-subtle);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ffffff;
        }

        .card-badge-pill {
          font-family: var(--font-headline);
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          padding: 0.25rem 0.65rem;
          border-radius: var(--radius-pill);
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: var(--text-secondary);
        }

        .card-title-text {
          font-family: var(--font-headline);
          font-size: 1.35rem;
          font-weight: 800;
          color: #ffffff;
          margin-bottom: 0.25rem;
        }

        .card-subtitle-text {
          font-family: var(--font-headline);
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--text-muted);
          text-transform: uppercase;
          margin-bottom: 1rem;
          letter-spacing: 0.04em;
        }

        .card-desc-text {
          font-family: var(--font-body);
          font-size: 0.9rem;
          color: var(--text-secondary);
          line-height: 1.6;
          margin-bottom: 1.75rem;
        }

        .card-footer-action {
          margin-top: auto;
        }

        .btn-sector-cta {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          width: 100%;
          min-height: 44px;
          padding: 0.75rem 1rem;
          font-family: var(--font-headline);
          font-size: 0.78rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          border-radius: var(--radius-pill);
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid var(--border-subtle);
          color: #ffffff;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .btn-sector-cta:hover {
          background: #ffffff;
          color: #000000;
          border-color: #ffffff;
        }

        @media (max-width: 1024px) {
          .mono-sectors-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 1.25rem;
          }
        }

        @media (max-width: 700px) {
          .mono-sectors-grid {
            grid-template-columns: 1fr;
            gap: 1.25rem;
            margin-top: 1.75rem;
          }
          .sector-minimal-card {
            padding: 1.65rem 1.35rem;
          }
        }
      `}</style>
    </section>
  );
}
