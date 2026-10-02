import React from 'react';
import { FaWhatsapp, FaInstagram } from 'react-icons/fa6';
import { FiMapPin, FiClock, FiShield, FiArrowUp, FiAward } from 'react-icons/fi';
import { ARTIST_INFO } from '../data/tattoosData';

export default function TattooFooter({ onScrollTo }) {
  const openWhatsApp = () => {
    const text = encodeURIComponent("Olá! Gostaria de agendar uma sessão ou solicitar orçamento no WM Tattoo Studio (Goiânia-GO).");
    window.open(`https://wa.me/${ARTIST_INFO.whatsappNumber}?text=${text}`, '_blank');
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="mono-footer">
      <div className="studio-container">
        {/* Minimalist CTA Banner */}
        <div className="footer-cta-card">
          <div className="cta-text-group">
            <h3 className="cta-headline">PRONTO PARA SUA PRÓXIMA TATUAGEM?</h3>
            <p className="cta-tagline">
              Atendimento exclusivo com hora marcada e técnica premiada em Goiânia – GO.
            </p>
          </div>
          <button onClick={openWhatsApp} className="btn-rounded-primary">
            <FaWhatsapp size={18} />
            <span>Chamar no WhatsApp</span>
          </button>
        </div>

        {/* Minimal Footer Row */}
        <div className="footer-main-row">
          <div className="footer-brand-side">
            <div className="footer-logo-brand-row">
              <img 
                src="/images/wm-logo.png" 
                alt="WM Tattoo Studio" 
                className="footer-logo-img" 
              />
              <h4 className="footer-brand-title">WM TATTOO STUDIO</h4>
            </div>
            <p className="footer-brand-desc">
              Especialista em Preto e Cinza (Pr e Br), Tatuagem Feminina e Coberturas. Tatuador Premiado 🏆 em Goiânia – GO.
            </p>
            <div className="footer-insta-wrap">
              <a 
                href={ARTIST_INFO.instagramUrl} 
                target="_blank" 
                rel="noreferrer" 
                className="btn-rounded-secondary"
                aria-label="Instagram @wm_tattoo_studio"
              >
                <FaInstagram size={16} />
                <span>@wm_tattoo_studio</span>
              </a>
            </div>
          </div>

          <div className="footer-links-side">
            <div className="footer-info-item">
              <FiMapPin size={16} className="text-bronze" />
              <span>Goiânia – GO • Atendimento Exclusivo</span>
            </div>
            <div className="footer-info-item">
              <FiClock size={16} className="text-bronze" />
              <span>Hora Marcada</span>
            </div>
            <div className="footer-info-item">
              <FiShield size={16} className="text-bronze" />
              <span>100% Descartáveis & Registro Anvisa</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar with Henko Estudio Rights */}
        <div className="footer-bottom-bar">
          <div className="footer-credits-group">
            <p className="copyright-text">
              © {new Date().getFullYear()} WM Tattoo Studio (@wm_tattoo_studio) • Goiânia – GO.
            </p>
            <p className="rights-henko-text">
              Todos os direitos reservados para{' '}
              <a 
                href="https://www.instagram.com/henko.psd/" 
                target="_blank" 
                rel="noreferrer" 
                className="henko-link"
              >
                Henko Estúdio <strong>@henko.psd</strong>
              </a>
            </p>
          </div>
          <button onClick={scrollToTop} className="btn-back-top">
            <span>Topo</span>
            <FiArrowUp size={13} />
          </button>
        </div>
      </div>

      <style>{`
        .mono-footer {
          padding: clamp(3.5rem, 7vw, 4.5rem) 0 2rem;
          background: #000000;
          border-top: 1px solid var(--border-subtle);
          position: relative;
        }

        .footer-cta-card {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: clamp(1.75rem, 4vw, 2.25rem) clamp(1.5rem, 4vw, 2.5rem);
          background: #09090b;
          border: 1px solid var(--color-bronze-border);
          border-radius: var(--radius-xl);
          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.85), 0 0 25px rgba(179, 146, 116, 0.05);
          margin-bottom: 3.5rem;
          flex-wrap: wrap;
          gap: 1.5rem;
        }

        .cta-text-group {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }

        .cta-headline {
          font-family: var(--font-headline);
          font-size: clamp(1.15rem, 3vw, 1.35rem);
          font-weight: 800;
          color: #ffffff;
        }

        .cta-tagline {
          font-family: var(--font-body);
          font-size: 0.9rem;
          color: var(--text-secondary);
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

        .btn-rounded-secondary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.65rem;
          padding: 0.8rem 1.5rem;
          background: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(10px);
          color: #ffffff;
          font-family: var(--font-headline);
          font-size: 0.8rem;
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

        .footer-main-row {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 3rem;
          padding-bottom: 2.5rem;
          border-bottom: 1px solid var(--border-subtle);
        }

        .footer-brand-side {
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
        }

        .footer-logo-brand-row {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .footer-logo-img {
          width: 36px;
          height: 36px;
          object-fit: contain;
          filter: drop-shadow(0 0 6px rgba(179, 146, 116, 0.4));
        }

        .footer-brand-title {
          font-family: var(--font-headline);
          font-size: 1.25rem;
          font-weight: 800;
          color: #ffffff;
          letter-spacing: 0.04em;
        }

        .footer-brand-desc {
          font-family: var(--font-body);
          font-size: 0.86rem;
          color: var(--text-muted);
          line-height: 1.6;
          max-width: 420px;
        }

        .footer-insta-wrap {
          margin-top: 0.25rem;
        }

        .footer-links-side {
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
          justify-content: center;
        }

        .footer-info-item {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          font-family: var(--font-headline);
          font-size: 0.82rem;
          font-weight: 600;
          color: var(--text-secondary);
        }

        .text-bronze {
          color: var(--color-bronze-light);
        }

        .footer-bottom-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 1.75rem;
          font-family: var(--font-headline);
          font-size: 0.74rem;
          color: var(--text-muted);
          flex-wrap: wrap;
          gap: 1.25rem;
        }

        .footer-credits-group {
          display: flex;
          flex-direction: column;
          gap: 0.3rem;
        }

        .copyright-text {
          color: var(--text-secondary);
          font-size: 0.76rem;
        }

        .rights-henko-text {
          color: var(--text-muted);
          font-size: 0.72rem;
          letter-spacing: 0.02em;
        }

        .henko-link {
          color: var(--color-bronze-light);
          text-decoration: none;
          font-weight: 600;
          transition: all 0.2s ease;
        }

        .henko-link strong {
          color: var(--color-bronze);
          text-decoration: underline;
          text-underline-offset: 2px;
        }

        .henko-link:hover {
          color: #ffffff;
        }

        .btn-back-top {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          padding: 0.35rem 0.85rem;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-pill);
          color: var(--text-secondary);
          font-family: var(--font-headline);
          font-size: 0.72rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .btn-back-top:hover {
          background: var(--gradient-bronze);
          color: #000000;
          border-color: var(--color-bronze-light);
        }

        @media (max-width: 768px) {
          .footer-cta-card {
            flex-direction: column;
            align-items: stretch;
            padding: 1.75rem 1.25rem;
          }
          .footer-cta-card .btn-rounded-primary {
            width: 100%;
            min-height: 48px;
          }
          .footer-main-row {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
          .footer-bottom-bar {
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `}</style>
    </footer>
  );
}
