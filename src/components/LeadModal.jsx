import React, { useState } from 'react';
import { X, CheckCircle2, Shield, ArrowRight, MessageCircle, Sparkles } from 'lucide-react';

export default function LeadModal({ isOpen, onClose, initialContext }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    revenue: '30k-100k'
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1000);
  };

  return (
    <div className="lead-modal-backdrop" onClick={onClose}>
      <div className="glass-card lead-modal-box" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button className="lead-modal-close" onClick={onClose} aria-label="Fechar">
          <X size={20} />
        </button>

        {isSubmitted ? (
          <div className="lead-modal-success">
            <div className="success-icon-badge">
              <CheckCircle2 size={44} color="#10b981" />
            </div>
            <h3 className="modal-title">Diagnóstico Agendado!</h3>
            <p className="modal-desc">
              Perfeito, <strong>{formData.name}</strong>! Recebemos sua solicitação referente a: <br />
              <span className="context-highlight">"{initialContext || 'Diagnóstico Estratégico'}"</span>.
            </p>
            <p className="modal-subtext">
              Nossa equipe já foi notificada e entrará em contato pelo WhatsApp fornecido em até 2 horas.
            </p>
            <a 
              href={`https://wa.me/5511999999999?text=Ol%C3%A1,%20gostaria%20de%20confirmar%20meu%20diagn%C3%B3stico%20(${encodeURIComponent(initialContext || 'Geral')})`}
              target="_blank"
              rel="noreferrer"
              className="btn btn-primary btn-glow"
              style={{ width: '100%', marginTop: '1.25rem' }}
            >
              <MessageCircle size={18} />
              <span>Agilizar Atendimento no WhatsApp</span>
            </a>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="lead-modal-form">
            <div className="lead-modal-header">
              <div className="modal-sparkle-tag">
                <Sparkles size={14} />
                <span>Atendimento Prioritário</span>
              </div>
              <h3 className="modal-title">Solicitar Proposta & Diagnóstico</h3>
              {initialContext && (
                <div className="context-chip">
                  <span>Contexto:</span> <strong>{initialContext}</strong>
                </div>
              )}
            </div>

            <div className="modal-inputs-grid">
              <div className="form-field">
                <label className="field-label">Seu Nome *</label>
                <input 
                  type="text" 
                  required
                  placeholder="Ex: Carlos Silva"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="form-input"
                />
              </div>

              <div className="form-field">
                <label className="field-label">E-mail Profissional *</label>
                <input 
                  type="email" 
                  required
                  placeholder="carlos@empresa.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="form-input"
                />
              </div>

              <div className="form-field">
                <label className="field-label">WhatsApp com DDD *</label>
                <input 
                  type="tel" 
                  required
                  placeholder="(11) 98888-7777"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="form-input"
                />
              </div>

              <div className="form-field">
                <label className="field-label">Empresa / Site</label>
                <input 
                  type="text" 
                  placeholder="Ex: Empresa.com.br"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-field" style={{ marginTop: '1rem' }}>
              <label className="field-label">Faturamento Mensal Estimado</label>
              <select 
                value={formData.revenue}
                onChange={(e) => setFormData({ ...formData, revenue: e.target.value })}
                className="form-select"
              >
                <option value="ate-30k">Até R$ 30.000 / mês</option>
                <option value="30k-100k">De R$ 30.000 a R$ 100.000 / mês</option>
                <option value="100k-500k">De R$ 100.000 a R$ 500.000 / mês</option>
                <option value="acima-500k">Acima de R$ 500.000 / mês (Enterprise)</option>
              </select>
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting}
              className="btn btn-primary btn-lg btn-glow"
              style={{ width: '100%', marginTop: '1.25rem' }}
            >
              {isSubmitting ? (
                <span>Enviando dados...</span>
              ) : (
                <>
                  <span>Receber Diagnóstico & Proposta</span>
                  <ArrowRight size={18} />
                </>
              )}
            </button>

            <span className="modal-security-tag">
              <Shield size={13} /> Dados 100% protegidos com sigilo e confidencialidade.
            </span>
          </form>
        )}
      </div>

      <style>{`
        .lead-modal-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(4, 6, 11, 0.85);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          z-index: 4000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
          animation: modalPop 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes modalPop {
          from { opacity: 0; transform: scale(0.94); }
          to { opacity: 1; transform: scale(1); }
        }

        .lead-modal-box {
          width: 100%;
          max-width: 540px;
          background: #0d121c;
          border: 1px solid rgba(255, 255, 255, 0.16);
          border-radius: var(--radius-lg);
          padding: 2.25rem;
          position: relative;
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.8), 0 0 35px rgba(99, 102, 241, 0.25);
        }

        .lead-modal-close {
          position: absolute;
          top: 1.25rem;
          right: 1.25rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--border-subtle);
          color: var(--text-muted);
          width: 34px;
          height: 34px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }

        .lead-modal-close:hover {
          background: rgba(255, 255, 255, 0.15);
          color: #ffffff;
        }

        .modal-sparkle-tag {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-family: var(--font-mono);
          font-size: 0.72rem;
          color: var(--cyan-light);
          background: rgba(6, 182, 212, 0.12);
          border: 1px solid rgba(6, 182, 212, 0.25);
          padding: 0.2rem 0.65rem;
          border-radius: var(--radius-full);
          margin-bottom: 0.85rem;
        }

        .modal-title {
          font-size: 1.4rem;
          font-weight: 800;
          color: #ffffff;
          margin-bottom: 0.5rem;
        }

        .context-chip {
          font-size: 0.78rem;
          color: var(--text-muted);
          background: rgba(99, 102, 241, 0.1);
          border: 1px solid rgba(99, 102, 241, 0.2);
          padding: 0.3rem 0.65rem;
          border-radius: var(--radius-sm);
          margin-bottom: 1.25rem;
        }

        .context-chip strong {
          color: var(--primary-light);
        }

        .modal-inputs-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.85rem;
        }

        .modal-security-tag {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.35rem;
          font-size: 0.75rem;
          color: var(--text-dark);
          text-align: center;
          margin-top: 1rem;
        }

        /* Success inside modal */
        .lead-modal-success {
          text-align: center;
          padding: 1.5rem 0;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .success-icon-badge {
          margin-bottom: 1.25rem;
        }

        .modal-desc {
          font-size: 0.95rem;
          color: var(--text-muted);
          margin-bottom: 0.85rem;
        }

        .context-highlight {
          color: var(--cyan-light);
          font-weight: 600;
        }

        .modal-subtext {
          font-size: 0.85rem;
          color: var(--text-dark);
        }

        @media (max-width: 600px) {
          .modal-inputs-grid {
            grid-template-columns: 1fr;
          }
          .lead-modal-box {
            padding: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
}
