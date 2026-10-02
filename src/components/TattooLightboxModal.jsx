import React, { useEffect } from 'react';
import { FiX, FiClock, FiMapPin, FiShield, FiActivity, FiAward } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa6';
import { ARTIST_INFO } from '../data/tattoosData';

export default function TattooLightboxModal({ tattoo, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [onClose]);

  if (!tattoo) return null;

  const handleWhatsAppBooking = () => {
    const text = encodeURIComponent(`Olá! Gostaria de fazer um orçamento no WM Tattoo Studio com base na arte "${tattoo.title}".`);
    window.open(`https://wa.me/${ARTIST_INFO.whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <div className="mono-modal-backdrop" onClick={onClose}>
      <div className="mono-modal-dialog" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button className="mono-modal-close-btn" onClick={onClose} aria-label="Fechar">
          <FiX size={18} />
        </button>

        <div className="mono-modal-grid">
          {/* Left Column: High Res Tattoo Image */}
          <div className="mono-modal-image-col">
            <div className="mono-modal-img-wrapper">
              <img src={tattoo.image} alt={tattoo.title} />
              <div className="mono-artist-stamp">
                <img src="/images/wm-logo.png" alt="WM" className="modal-stamp-logo" />
                <span>WM TATTOO STUDIO • GOIÂNIA</span>
              </div>
            </div>
          </div>

          {/* Right Column: Technical Breakdown */}
          <div className="mono-modal-details-col">
            <div className="mono-modal-header">
              <span className="mono-category-chip">{tattoo.categoryLabel}</span>
              <h2 className="mono-modal-title">{tattoo.title}</h2>
              <div className="mono-location-tag">
                <FiMapPin size={14} className="text-bronze" />
                <span>Anatomia: {tattoo.location}</span>
              </div>
            </div>

            <p className="mono-modal-description">{tattoo.description}</p>

            {/* Technical Specs Grid */}
            <div className="mono-specs-grid">
              <div className="mono-spec-box">
                <div className="spec-label">
                  <FiClock size={14} className="text-bronze" />
                  <span>Duração</span>
                </div>
                <div className="spec-val">{tattoo.duration}</div>
              </div>

              <div className="mono-spec-box">
                <div className="spec-label">
                  <FiActivity size={14} className="text-bronze" />
                  <span>Sensibilidade</span>
                </div>
                <div className="spec-val">{tattoo.painLevel}</div>
              </div>
            </div>

            {/* Technique Details */}
            <div className="mono-technique-box">
              <h4 className="tech-box-heading">TÉCNICA APLICADA:</h4>
              <p className="tech-box-desc">{tattoo.technique}</p>
            </div>

            {/* Hygiene Assurance */}
            <div className="mono-biosafety-bar">
              <FiShield size={16} className="text-bronze" />
              <span>100% Descartáveis & Registro Anvisa.</span>
            </div>

            {/* Action CTA */}
            <div className="mono-modal-cta">
              <button onClick={handleWhatsAppBooking} className="btn-rounded-primary w-full">
                <FaWhatsapp size={18} />
                <span>Orçar esta Arte no WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .mono-modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.94);
          backdrop-filter: blur(14px);
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
          animation: fadeIn 0.2s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .mono-modal-dialog {
          position: relative;
          width: 100%;
          max-width: 920px;
          max-height: 90vh;
          background: #08080a;
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: var(--radius-xl);
          overflow-y: auto;
          box-shadow: 0 25px 70px rgba(0, 0, 0, 0.95);
        }

        .mono-modal-close-btn {
          position: absolute;
          top: 1.25rem;
          right: 1.25rem;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid var(--border-subtle);
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
          z-index: 10;
        }

        .mono-modal-close-btn:hover {
          background: #ffffff;
          color: #000000;
        }

        .mono-modal-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          align-items: stretch;
        }

        .mono-modal-image-col {
          background: #020203;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.75rem;
          border-right: 1px solid var(--border-subtle);
        }

        .mono-modal-img-wrapper {
          position: relative;
          width: 100%;
          height: 100%;
          min-height: 420px;
          max-height: 540px;
          background: #040405;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: var(--radius-lg);
          overflow: hidden;
        }

        .mono-modal-img-wrapper img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          filter: contrast(1.1);
        }

        .mono-artist-stamp {
          position: absolute;
          bottom: 12px;
          left: 12px;
          background: rgba(0, 0, 0, 0.88);
          backdrop-filter: blur(8px);
          border: 1px solid var(--color-bronze-border);
          color: #ffffff;
          font-family: var(--font-headline);
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          padding: 0.35rem 0.75rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          border-radius: var(--radius-pill);
        }

        .modal-stamp-logo {
          width: 16px;
          height: 16px;
          object-fit: contain;
        }

        .mono-modal-details-col {
          padding: 2.25rem;
          display: flex;
          flex-direction: column;
          gap: 1.15rem;
          overflow-y: auto;
        }

        .mono-modal-header {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }

        .mono-category-chip {
          align-self: flex-start;
          font-family: var(--font-headline);
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          color: var(--color-bronze-light);
          background: rgba(179, 146, 116, 0.08);
          border: 1px solid var(--color-bronze-border);
          padding: 0.25rem 0.65rem;
          border-radius: var(--radius-pill);
          text-transform: uppercase;
        }

        .mono-modal-title {
          font-family: var(--font-headline);
          font-size: 1.5rem;
          font-weight: 800;
          line-height: 1.2;
          color: #ffffff;
        }

        .mono-location-tag {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-family: var(--font-headline);
          font-size: 0.78rem;
          color: var(--text-secondary);
          font-weight: 600;
        }

        .mono-modal-description {
          font-family: var(--font-body);
          font-size: 0.9rem;
          color: var(--text-secondary);
          line-height: 1.6;
        }

        .mono-specs-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.75rem;
        }

        .mono-spec-box {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-sm);
          padding: 0.85rem;
          display: flex;
          flex-direction: column;
          gap: 0.3rem;
        }

        .spec-label {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-family: var(--font-headline);
          font-size: 0.7rem;
          font-weight: 700;
          color: var(--text-muted);
          text-transform: uppercase;
        }

        .spec-val {
          font-family: var(--font-headline);
          font-size: 0.95rem;
          font-weight: 800;
          color: #ffffff;
        }

        .mono-technique-box {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-sm);
          padding: 0.85rem 1rem;
        }

        .tech-box-heading {
          font-family: var(--font-headline);
          font-size: 0.7rem;
          font-weight: 700;
          color: var(--text-muted);
          letter-spacing: 0.08em;
          text-transform: uppercase;
          margin-bottom: 0.25rem;
        }

        .tech-box-desc {
          font-family: var(--font-body);
          font-size: 0.85rem;
          color: var(--text-primary);
          line-height: 1.5;
        }

        .mono-biosafety-bar {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          font-family: var(--font-body);
          font-size: 0.8rem;
          color: var(--text-secondary);
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-sm);
          padding: 0.65rem 0.85rem;
        }

        .text-bronze {
          color: var(--color-bronze-light);
        }

        .mono-modal-cta {
          margin-top: 0.5rem;
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
          box-shadow: 0 8px 30px rgba(255, 255, 255, 0.35);
        }

        .w-full {
          width: 100%;
        }

        @media (max-width: 768px) {
          .mono-modal-grid {
            grid-template-columns: 1fr;
          }
          .mono-modal-image-col {
            border-right: none;
            border-bottom: 1px solid var(--border-subtle);
            padding: 1.25rem;
          }
          .mono-modal-img-wrapper {
            min-height: 280px;
            max-height: 360px;
          }
          .mono-modal-details-col {
            padding: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
}
