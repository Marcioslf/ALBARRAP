import React, { useState } from 'react';
import { faqData } from '../data/faqData';
import { HelpCircle, ChevronDown, MessageCircle } from 'lucide-react';

export default function Faq({ onOpenLeadModal }) {
  const [openIdx, setOpenIdx] = useState(0);

  const toggleAccordion = (idx) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faq" className="section faq-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag">
            <HelpCircle size={14} />
            <span>Tire Suas Dúvidas</span>
          </div>
          <h2 className="section-title">
            Perguntas <span className="gradient-text">Frequentes</span>
          </h2>
          <p className="section-subtitle">
            Transparência radical em todas as etapas de contratação, escopo e entrega.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="faq-accordion-wrapper">
          {faqData.map((item, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div 
                key={idx} 
                className={`glass-card faq-item ${isOpen ? 'faq-item-open' : ''}`}
                onClick={() => toggleAccordion(idx)}
              >
                <div className="faq-question-row">
                  <h3 className="faq-question-text">{item.question}</h3>
                  <div className={`faq-chevron ${isOpen ? 'chevron-rotated' : ''}`}>
                    <ChevronDown size={20} />
                  </div>
                </div>

                {isOpen && (
                  <div className="faq-answer-box">
                    <p className="faq-answer-text">{item.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Help Line */}
        <div className="faq-helpline">
          <p>Ainda tem alguma dúvida específica para o seu modelo de negócio?</p>
          <button 
            onClick={() => onOpenLeadModal("Dúvida Específica - FAQ")}
            className="btn btn-secondary btn-sm"
          >
            <MessageCircle size={16} />
            <span>Falar com um Consultor Estratégico</span>
          </button>
        </div>
      </div>

      <style>{`
        .faq-section {
          position: relative;
        }

        .faq-accordion-wrapper {
          max-width: 860px;
          margin: 0 auto 3rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .faq-item {
          padding: 1.5rem 1.75rem;
          border: 1px solid var(--border-subtle);
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .faq-item:hover {
          border-color: rgba(99, 102, 241, 0.35);
        }

        .faq-item-open {
          border-color: rgba(99, 102, 241, 0.5);
          background: rgba(18, 25, 40, 0.85);
        }

        .faq-question-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1.25rem;
        }

        .faq-question-text {
          font-size: 1.1rem;
          font-weight: 700;
          color: #ffffff;
          line-height: 1.35;
          margin: 0;
        }

        .faq-chevron {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.04);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-muted);
          flex-shrink: 0;
          transition: transform var(--transition-smooth);
        }

        .chevron-rotated {
          transform: rotate(180deg);
          color: var(--cyan-light);
          background: rgba(6, 182, 212, 0.15);
        }

        .faq-answer-box {
          margin-top: 1.25rem;
          padding-top: 1.25rem;
          border-top: 1px solid var(--border-subtle);
          animation: accordionSlideDown 0.25s ease-out;
        }

        @keyframes accordionSlideDown {
          from { opacity: 0; transform: translateY(-6px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .faq-answer-text {
          font-size: 0.96rem;
          line-height: 1.7;
          color: var(--text-muted);
          margin: 0;
        }

        .faq-helpline {
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
        }

        .faq-helpline p {
          font-size: 0.95rem;
          margin: 0;
        }
      `}</style>
    </section>
  );
}
