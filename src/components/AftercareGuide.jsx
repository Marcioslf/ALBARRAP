import React from 'react';
import { motion } from 'framer-motion';
import { FiDroplet, FiSun, FiHeart, FiShield, FiSlash } from 'react-icons/fi';
import { AFTERCARE_STEPS } from '../data/tattoosData';

export default function AftercareGuide() {
  const stepIcons = [FiShield, FiDroplet, FiHeart, FiSun];

  return (
    <section id="aftercare" className="mono-aftercare-section">
      <div className="studio-container">
        {/* Section Header */}
        <motion.div 
          className="section-header-minimal"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="section-num">05 // CUIDADOS</span>
          <h2 className="section-heading-text">GUIA DE CICATRIZAÇÃO</h2>
        </motion.div>

        {/* 4 Clean Minimal Steps */}
        <div className="aftercare-steps-grid">
          {AFTERCARE_STEPS.map((step, idx) => {
            const Icon = stepIcons[idx] || FiShield;
            return (
              <motion.div 
                key={idx} 
                className="step-minimal-card"
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.08 }}
              >
                <div className="step-icon-row">
                  <div className="step-icon-box">
                    <Icon size={18} />
                  </div>
                  <span className="step-number">{step.step}</span>
                </div>
                <h3 className="step-title">{step.title}</h3>
                <p className="step-description">{step.desc}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Prohibitions Clean Strip */}
        <div className="aftercare-warning-strip">
          <div className="warning-item">
            <span className="warn-cross">✕</span>
            <span>Sem sol direto na cicatrização</span>
          </div>
          <div className="warning-item">
            <span className="warn-cross">✕</span>
            <span>Sem piscina ou mar por 25 dias</span>
          </div>
          <div className="warning-item">
            <span className="warn-cross">✕</span>
            <span>Não arranque casquinhas</span>
          </div>
        </div>
      </div>

      <style>{`
        .mono-aftercare-section {
          padding: clamp(3.5rem, 8vw, 5.5rem) 0 clamp(2.5rem, 6vw, 4.5rem);
          background: #000000;
          border-top: 1px solid var(--border-subtle);
          position: relative;
        }

        .aftercare-steps-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
          margin-top: 2.5rem;
          margin-bottom: 2rem;
        }

        .step-minimal-card {
          padding: 1.75rem 1.5rem;
          background: #09090b;
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
          transition: all 0.2s ease;
        }

        .step-minimal-card:hover {
          border-color: var(--color-bronze-border);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.8), 0 0 15px rgba(179, 146, 116, 0.06);
        }

        .step-icon-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 0.25rem;
        }

        .step-icon-box {
          width: 38px;
          height: 38px;
          border-radius: var(--radius-sm);
          background: rgba(179, 146, 116, 0.08);
          border: 1px solid var(--color-bronze-border);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--color-bronze-light);
        }

        .step-number {
          font-family: var(--font-headline);
          font-size: 0.88rem;
          font-weight: 800;
          color: var(--color-bronze);
          letter-spacing: 0.06em;
        }

        .step-title {
          font-family: var(--font-headline);
          font-size: 1.05rem;
          font-weight: 800;
          color: #ffffff;
        }

        .step-description {
          font-family: var(--font-body);
          font-size: 0.85rem;
          color: var(--text-secondary);
          line-height: 1.55;
        }

        .aftercare-warning-strip {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.25rem 1.75rem;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--color-bronze-border);
          border-radius: var(--radius-pill);
          flex-wrap: wrap;
          gap: 1rem;
        }

        .warning-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-family: var(--font-headline);
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--text-secondary);
        }

        .warn-cross {
          color: var(--color-bronze-light);
          font-weight: 800;
        }

        @media (max-width: 900px) {
          .aftercare-steps-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 1.25rem;
          }
        }

        @media (max-width: 580px) {
          .aftercare-steps-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
          }
          .aftercare-warning-strip {
            border-radius: var(--radius-md);
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `}</style>
    </section>
  );
}
