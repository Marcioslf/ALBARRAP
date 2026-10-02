import React, { useState } from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Heart, Send, Check } from 'lucide-react';

export default function Footer({ onOpenLeadModal }) {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletter = (e) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setSubscribed(true);
  };

  return (
    <footer className="footer-section">
      <div className="container">
        {/* Top Footer Grid */}
        <div className="footer-top-grid">
          {/* Brand Info */}
          <div className="footer-brand-col">
            <a href="#" className="footer-logo">
              <div className="logo-icon-box">
                <Sparkles size={18} />
              </div>
              <div className="logo-text-group">
                <span className="logo-title">NEXUS<span className="logo-dot">.</span></span>
                <span className="logo-subtitle">STUDIO</span>
              </div>
            </a>
            <p className="footer-bio">
              Assessoria de Growth, Inteligência Artificial e Engenharia Web de alta performance para marcas que lideram mercados.
            </p>
            <div className="footer-status-tag">
              <span className="footer-pulse-dot"></span>
              <span>Sistemas & Squads 100% Operacionais</span>
            </div>
          </div>

          {/* Nav Column 1 */}
          <div className="footer-col">
            <h4 className="footer-col-title">Soluções</h4>
            <ul className="footer-links">
              <li><a href="#solucoes">Desenvolvimento Web & Apps</a></li>
              <li><a href="#solucoes">Growth Hacking & Tráfego</a></li>
              <li><a href="#solucoes">Automação & Agentes de IA</a></li>
              <li><a href="#solucoes">UI/UX & Branding Estratégico</a></li>
              <li><a href="#calculadora">Calculadora de ROI</a></li>
            </ul>
          </div>

          {/* Nav Column 2 */}
          <div className="footer-col">
            <h4 className="footer-col-title">Empresa</h4>
            <ul className="footer-links">
              <li><a href="#cases">Cases de Sucesso</a></li>
              <li><a href="#metodologia">Nossa Metodologia</a></li>
              <li><a href="#planos">Modelos de Parceria</a></li>
              <li><a href="#faq">Perguntas Frequentes</a></li>
              <li>
                <button 
                  onClick={() => onOpenLeadModal("Footer - Diagnóstico")}
                  className="footer-cta-link"
                >
                  Agendar Diagnóstico Gratuito
                </button>
              </li>
            </ul>
          </div>

          {/* Newsletter / Insights */}
          <div className="footer-col newsletter-col">
            <h4 className="footer-col-title">Nexus Growth Briefing</h4>
            <p className="newsletter-desc">
              Receba insights semanais sobre IA aplicada a negócios, hacks de conversão e tendências de tecnologia.
            </p>

            {subscribed ? (
              <div className="newsletter-success">
                <Check size={16} color="#10b981" />
                <span>Inscrito com sucesso! Verifique sua caixa de entrada.</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletter} className="newsletter-form">
                <input 
                  type="email" 
                  required
                  placeholder="Seu melhor e-mail"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="newsletter-input"
                />
                <button type="submit" className="newsletter-btn" aria-label="Inscrever">
                  <ArrowRight size={16} />
                </button>
              </form>
            )}
            <span className="newsletter-anti-spam">Zero spam. Cancele quando quiser com 1 clique.</span>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom-bar">
          <p className="copyright-text">
            © {new Date().getFullYear()} NEXUS STUDIO DIGITAL LTDA. CNPJ: 00.000.000/0001-00. Todos os direitos reservados.
          </p>
          <div className="legal-links">
            <a href="#">Termos de Uso</a>
            <span>•</span>
            <a href="#">Política de Privacidade & LGPD</a>
            <span>•</span>
            <a href="#">Segurança & Compliance</a>
          </div>
        </div>
      </div>

      <style>{`
        .footer-section {
          background: #04060a;
          border-top: 1px solid var(--border-subtle);
          padding: 5rem 0 2.5rem;
          position: relative;
        }

        .footer-top-grid {
          display: grid;
          grid-template-columns: 1.4fr 1fr 1fr 1.3fr;
          gap: 3rem;
          margin-bottom: 4rem;
        }

        .footer-logo {
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1.25rem;
        }

        .footer-bio {
          font-size: 0.9rem;
          color: var(--text-dark);
          line-height: 1.6;
          margin-bottom: 1.5rem;
          max-width: 320px;
        }

        .footer-status-tag {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-family: var(--font-mono);
          font-size: 0.72rem;
          color: #34d399;
          background: rgba(16, 185, 129, 0.08);
          border: 1px solid rgba(16, 185, 129, 0.2);
          padding: 0.25rem 0.65rem;
          border-radius: var(--radius-full);
        }

        .footer-pulse-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #10b981;
          box-shadow: 0 0 6px #10b981;
        }

        .footer-col-title {
          font-size: 1rem;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 1.25rem;
        }

        .footer-links {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .footer-links a, .footer-cta-link {
          font-size: 0.88rem;
          color: var(--text-muted);
          background: transparent;
          border: none;
          padding: 0;
          cursor: pointer;
          text-align: left;
          font-family: inherit;
          transition: color var(--transition-fast);
        }

        .footer-links a:hover, .footer-cta-link:hover {
          color: var(--primary-light);
        }

        .footer-cta-link {
          color: var(--cyan-light);
          font-weight: 600;
        }

        .newsletter-desc {
          font-size: 0.88rem;
          color: var(--text-dark);
          margin-bottom: 1rem;
          line-height: 1.5;
        }

        .newsletter-form {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 0.5rem;
        }

        .newsletter-input {
          flex: 1;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid var(--border-medium);
          border-radius: var(--radius-sm);
          padding: 0.65rem 0.85rem;
          color: #ffffff;
          font-size: 0.88rem;
          outline: none;
        }

        .newsletter-input:focus {
          border-color: var(--primary);
        }

        .newsletter-btn {
          background: var(--primary);
          border: none;
          color: #ffffff;
          padding: 0 1rem;
          border-radius: var(--radius-sm);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background var(--transition-fast);
        }

        .newsletter-btn:hover {
          background: var(--primary-dark);
        }

        .newsletter-anti-spam {
          font-size: 0.72rem;
          color: var(--text-dark);
          display: block;
        }

        .newsletter-success {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(16, 185, 129, 0.12);
          border: 1px solid rgba(16, 185, 129, 0.25);
          color: #34d399;
          font-size: 0.82rem;
          padding: 0.65rem 0.85rem;
          border-radius: var(--radius-sm);
        }

        .footer-bottom-bar {
          padding-top: 2rem;
          border-top: 1px solid var(--border-subtle);
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .copyright-text {
          font-size: 0.8rem;
          color: var(--text-dark);
          margin: 0;
        }

        .legal-links {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 0.8rem;
          color: var(--text-dark);
        }

        .legal-links a:hover {
          color: var(--text-muted);
        }

        @media (max-width: 1024px) {
          .footer-top-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 640px) {
          .footer-top-grid {
            grid-template-columns: 1fr;
          }
          .footer-bottom-bar {
            flex-direction: column;
            text-align: center;
          }
        }
      `}</style>
    </footer>
  );
}
