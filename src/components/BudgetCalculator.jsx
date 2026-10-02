import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiSend, FiCheckCircle } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa6';
import { ARTIST_INFO } from '../data/tattoosData';

export default function BudgetCalculator() {
  const [sectorType, setSectorType] = useState('Preto e Cinza (Pr e Br)');
  const [tattooSize, setTattooSize] = useState(12);
  const [placement, setPlacement] = useState('Antebraço');
  const [hasReference, setHasReference] = useState('Sim, tenho foto');

  const generateWhatsAppMessage = () => {
    let msg = `Olá! Gostaria de um orçamento no *WM Tattoo Studio* (Goiânia-GO):\n\n`;
    msg += `⚜ *Estilo:* ${sectorType}\n`;
    msg += `📏 *Tamanho Estimado:* ~${tattooSize} cm\n`;
    msg += `📍 *Local:* ${placement}\n`;
    msg += `🖼️ *Referência:* ${hasReference}\n\n`;
    msg += `Quais os valores e próximas datas disponíveis?`;
    return encodeURIComponent(msg);
  };

  const handleSendWhatsApp = (e) => {
    e.preventDefault();
    const encoded = generateWhatsAppMessage();
    window.open(`https://wa.me/${ARTIST_INFO.whatsappNumber}?text=${encoded}`, '_blank');
  };

  const sectorsList = [
    'Preto e Cinza (Pr e Br)',
    'Tatuagem Feminina',
    'Cobertura (Cover-up)',
    'Projeto Autoral'
  ];

  const placementsList = [
    'Antebraço',
    'Braço / Bíceps',
    'Ombro',
    'Costas',
    'Perna / Canela',
    'Coxa / Panturrilha',
    'Peito / Costela',
    'Outro'
  ];

  return (
    <section id="budget" className="mono-budget-section">
      <div className="studio-container">
        <motion.div 
          className="budget-minimal-box"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Header */}
          <div className="section-header-minimal">
            <span className="section-num">04 // ORÇAMENTO</span>
            <h2 className="section-heading-text">SIMULE SEU PROJETO</h2>
          </div>

          <form onSubmit={handleSendWhatsApp} className="budget-clean-form">
            {/* 1. Estilo */}
            <div className="form-group-minimal">
              <label className="group-label">1. Escolha o Estilo:</label>
              <div className="pills-grid">
                {sectorsList.map((st) => (
                  <button
                    key={st}
                    type="button"
                    onClick={() => setSectorType(st)}
                    className={`budget-pill ${sectorType === st ? 'active' : ''}`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Tamanho Slider */}
            <div className="form-group-minimal">
              <div className="slider-row">
                <label className="group-label">2. Tamanho Estimado:</label>
                <span className="size-badge">{tattooSize} cm</span>
              </div>
              <input
                type="range"
                min="4"
                max="40"
                step="1"
                value={tattooSize}
                onChange={(e) => setTattooSize(Number(e.target.value))}
                className="minimal-slider"
              />
            </div>

            {/* 3. Local do Corpo */}
            <div className="form-group-minimal">
              <label className="group-label">3. Local do Corpo:</label>
              <div className="pills-grid">
                {placementsList.map((loc) => (
                  <button
                    key={loc}
                    type="button"
                    onClick={() => setPlacement(loc)}
                    className={`budget-pill ${placement === loc ? 'active' : ''}`}
                  >
                    {loc}
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Referência */}
            <div className="form-group-minimal">
              <label className="group-label">4. Possui Referência?</label>
              <div className="pills-grid">
                {['Sim, tenho foto', 'Tenho apenas a ideia', 'Quero criação autoral'].map((refOpt) => (
                  <button
                    key={refOpt}
                    type="button"
                    onClick={() => setHasReference(refOpt)}
                    className={`budget-pill ${hasReference === refOpt ? 'active' : ''}`}
                  >
                    {refOpt}
                  </button>
                ))}
              </div>
            </div>

            {/* Submit Action */}
            <div className="budget-submit-wrapper">
              <motion.button 
                type="submit" 
                className="btn-rounded-primary w-full"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <FaWhatsapp size={19} />
                <span>Enviar Orçamento no WhatsApp</span>
                <FiSend size={15} />
              </motion.button>
            </div>
          </form>
        </motion.div>
      </div>

      <style>{`
        .mono-budget-section {
          padding: clamp(3.5rem, 8vw, 5.5rem) 0 clamp(2.5rem, 6vw, 5rem);
          background: #000000;
          border-top: 1px solid var(--border-subtle);
          position: relative;
        }

        .budget-minimal-box {
          max-width: 780px;
          margin: 0 auto;
          padding: clamp(1.5rem, 5vw, 3rem);
          background: #09090b;
          border: 1px solid var(--color-bronze-border);
          border-radius: var(--radius-lg);
          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.85), 0 0 25px rgba(179, 146, 116, 0.05);
        }

        .budget-clean-form {
          display: flex;
          flex-direction: column;
          gap: 1.75rem;
          margin-top: 1.5rem;
        }

        .form-group-minimal {
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
        }

        .group-label {
          font-family: var(--font-headline);
          font-size: 0.78rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: #ffffff;
        }

        .pills-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .budget-pill {
          padding: 0.55rem 1.1rem;
          min-height: 40px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-pill);
          color: var(--text-secondary);
          font-family: var(--font-headline);
          font-size: 0.78rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .budget-pill:hover {
          border-color: var(--color-bronze);
          color: var(--color-bronze-light);
        }

        .budget-pill.active {
          background: var(--gradient-bronze);
          color: #000000;
          border-color: var(--color-bronze-light);
          font-weight: 800;
          box-shadow: 0 0 12px var(--color-bronze-glow);
        }

        .slider-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .size-badge {
          font-family: var(--font-headline);
          font-size: 0.82rem;
          font-weight: 800;
          padding: 0.2rem 0.75rem;
          background: var(--gradient-bronze);
          color: #000000;
          border: 1px solid var(--color-bronze-light);
          border-radius: var(--radius-pill);
          box-shadow: 0 2px 8px var(--color-bronze-glow);
        }

        .minimal-slider {
          -webkit-appearance: none;
          width: 100%;
          height: 6px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 3px;
          outline: none;
          margin-top: 0.5rem;
        }

        .minimal-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: var(--color-bronze-light);
          border: 2px solid #000000;
          cursor: pointer;
          box-shadow: 0 0 12px var(--color-bronze-glow);
        }

        .budget-submit-wrapper {
          margin-top: 0.5rem;
        }

        .btn-rounded-primary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.65rem;
          background: var(--gradient-bronze);
          color: #000000;
          font-family: var(--font-headline);
          font-size: 0.85rem;
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
          box-shadow: 0 8px 30px rgba(255, 255, 255, 0.35);
        }

        .w-full {
          width: 100%;
          min-height: 50px;
          padding: 0.95rem;
        }

        @media (max-width: 640px) {
          .budget-minimal-box {
            padding: 1.75rem 1.25rem;
          }
        }
      `}</style>
    </section>
  );
}
