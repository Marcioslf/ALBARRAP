import React from 'react';
import { X, CheckCircle, ArrowRight, TrendingUp, Sparkles, Shield } from 'lucide-react';

export default function CaseModal({ caseItem, onClose, onOpenLeadModal }) {
  if (!caseItem) return null;

  return (
    <div className="case-modal-backdrop" onClick={onClose}>
      <div className="glass-card case-modal-container" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="modal-header">
          <div className="modal-header-left">
            <span className="modal-cat-tag">{caseItem.categoryLabel}</span>
            <h3 className="modal-client-title">{caseItem.client}</h3>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Fechar modal">
            <X size={22} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="modal-body">
          <h4 className="case-headline">{caseItem.title}</h4>
          <p className="case-desc">{caseItem.summary}</p>

          {/* Metric Highlights */}
          <div className="modal-metrics-grid">
            {caseItem.metrics.map((m, i) => (
              <div key={i} className="modal-metric-card">
                <span className="m-val gradient-text">{m.value}</span>
                <span className="m-label">{m.label}</span>
              </div>
            ))}
          </div>

          {/* Solution & Implementation Breakdown */}
          <div className="modal-section-box">
            <h5 className="sub-title">
              <Sparkles size={16} className="text-indigo" />
              O Que Desenvolvemos
            </h5>
            <div className="deliverables-list">
              <div className="deliverable-item">
                <CheckCircle size={16} className="text-emerald" />
                <span>Auditoria e Redesenho de Arquitetura de Conversão & UX</span>
              </div>
              <div className="deliverable-item">
                <CheckCircle size={16} className="text-emerald" />
                <span>Implementação de Funil de Aquisição de Alta Performance</span>
              </div>
              <div className="deliverable-item">
                <CheckCircle size={16} className="text-emerald" />
                <span>Automação de Qualificação de Leads em Tempo Real com IA</span>
              </div>
            </div>
          </div>

          {/* Client Quote */}
          <div className="modal-quote-box">
            <p className="quote-text">"{caseItem.testimonial}"</p>
            <span className="quote-author">— {caseItem.author}</span>
          </div>

          {/* Tech Tags */}
          <div className="modal-tags-row">
            {caseItem.tags.map((t, idx) => (
              <span key={idx} className="tech-badge">#{t}</span>
            ))}
          </div>
        </div>

        {/* Modal Footer / CTA */}
        <div className="modal-footer">
          <button 
            onClick={() => {
              onClose();
              onOpenLeadModal(`Quero resultados como o case: ${caseItem.client}`);
            }}
            className="btn btn-primary btn-glow"
            style={{ width: '100%' }}
          >
            <span>Quero Resultados Semelhantes Para Meu Negócio</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </div>

      <style>{`
        .case-modal-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(3, 5, 10, 0.85);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          z-index: 3000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
          animation: modalFadeIn 0.25s ease-out;
        }

        @keyframes modalFadeIn {
          from { opacity: 0; transform: scale(0.96); }
          to { opacity: 1; transform: scale(1); }
        }

        .case-modal-container {
          width: 100%;
          max-width: 680px;
          max-height: 90vh;
          overflow-y: auto;
          background: #0f1420;
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: var(--radius-lg);
          padding: 2rem;
          display: flex;
          flex-direction: column;
          box-shadow: 0 25px 60px rgba(0, 0, 0, 0.8), 0 0 35px rgba(99, 102, 241, 0.2);
        }

        .modal-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          padding-bottom: 1.25rem;
          border-bottom: 1px solid var(--border-subtle);
          margin-bottom: 1.5rem;
        }

        .modal-cat-tag {
          font-family: var(--font-mono);
          font-size: 0.72rem;
          color: var(--cyan-light);
          text-transform: uppercase;
          letter-spacing: 0.08em;
          display: block;
          margin-bottom: 0.35rem;
        }

        .modal-client-title {
          font-size: 1.5rem;
          font-weight: 800;
          color: #ffffff;
        }

        .modal-close-btn {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--border-subtle);
          color: var(--text-muted);
          width: 38px;
          height: 38px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .modal-close-btn:hover {
          background: rgba(255, 255, 255, 0.15);
          color: #ffffff;
        }

        .case-headline {
          font-size: 1.25rem;
          font-weight: 700;
          color: #e2e8f0;
          line-height: 1.4;
          margin-bottom: 0.85rem;
        }

        .case-desc {
          font-size: 0.95rem;
          line-height: 1.6;
          color: var(--text-muted);
          margin-bottom: 1.75rem;
        }

        .modal-metrics-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
          margin-bottom: 1.75rem;
        }

        .modal-metric-card {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          padding: 1rem;
          text-align: center;
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .m-val {
          font-size: 1.35rem;
          font-weight: 800;
          font-family: var(--font-heading);
        }

        .m-label {
          font-size: 0.72rem;
          color: var(--text-dark);
        }

        .modal-section-box {
          background: rgba(99, 102, 241, 0.06);
          border: 1px solid rgba(99, 102, 241, 0.2);
          border-radius: var(--radius-md);
          padding: 1.25rem;
          margin-bottom: 1.5rem;
        }

        .sub-title {
          font-size: 0.92rem;
          font-weight: 700;
          color: #ffffff;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 0.85rem;
        }

        .deliverables-list {
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }

        .deliverable-item {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          font-size: 0.88rem;
          color: #cbd5e1;
        }

        .modal-quote-box {
          border-left: 3px solid var(--primary);
          padding-left: 1.25rem;
          margin-bottom: 1.5rem;
        }

        .quote-text {
          font-style: italic;
          font-size: 0.95rem;
          color: #e2e8f0;
          margin-bottom: 0.35rem;
        }

        .quote-author {
          font-size: 0.82rem;
          font-weight: 600;
          color: var(--primary-light);
        }

        .modal-tags-row {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-bottom: 1.75rem;
        }

        .tech-badge {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          background: rgba(255, 255, 255, 0.05);
          color: var(--text-muted);
          padding: 0.25rem 0.65rem;
          border-radius: var(--radius-sm);
        }

        .modal-footer {
          margin-top: auto;
          padding-top: 1.25rem;
          border-top: 1px solid var(--border-subtle);
        }

        @media (max-width: 600px) {
          .modal-metrics-grid {
            grid-template-columns: 1fr;
          }
          .case-modal-container {
            padding: 1.25rem;
          }
        }
      `}</style>
    </div>
  );
}
