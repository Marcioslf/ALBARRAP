import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa6';
import { FAQ_ITEMS, ARTIST_INFO } from '../data/tattoosData';

export default function TattooFaq() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFaq = (idx) => {
    setOpenIndex(openIndex === idx ? -1 : idx);
  };

  const openWhatsAppHelp = () => {
    const text = encodeURIComponent("Olá! Tenho uma dúvida sobre agendamento no WM Tattoo Studio (Goiânia-GO).");
    window.open(`https://wa.me/${ARTIST_INFO.whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <section id="faq" className="mono-faq-section">
      <div className="studio-container">
        {/* Section Header */}
        <motion.div 
          className="section-header-minimal"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="section-num">06 // DÚVIDAS</span>
          <h2 className="section-heading-text">PERGUNTAS FREQUENTES</h2>
        </motion.div>

        {/* Minimalist FAQ Accordion */}
        <div className="faq-minimal-list">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`faq-minimal-item ${isOpen ? 'open' : ''}`}
                onClick={() => toggleFaq(idx)}
              >
                <div className="faq-head-row">
                  <span className="faq-question-title">{item.question}</span>
                  <motion.div 
                    className="faq-icon-arrow"
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <FiChevronDown size={18} />
                  </motion.div>
                </div>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div 
                      className="faq-content-body"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <p>{item.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Fast WhatsApp Help Line */}
        <div className="faq-minimal-cta">
          <span className="faq-cta-text">Dúvida sobre seu projeto personalizado?</span>
          <button onClick={openWhatsAppHelp} className="btn-rounded-primary">
            <FaWhatsapp size={17} />
            <span>Falar no WhatsApp</span>
          </button>
        </div>
      </div>

      <style>{`
        .mono-faq-section {
          padding: 5.5rem 0 4.5rem;
          background: #000000;
          border-top: 1px solid var(--border-subtle);
          position: relative;
        }

        .faq-minimal-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          max-width: 780px;
          margin: 2.5rem auto 2.5rem auto;
        }

        .faq-minimal-item {
          padding: 1.35rem 1.5rem;
          cursor: pointer;
          background: #09090b;
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          transition: all 0.2s ease;
        }

        .faq-minimal-item:hover {
          border-color: rgba(255, 255, 255, 0.25);
        }

        .faq-minimal-item.open {
          border-color: rgba(255, 255, 255, 0.35);
          background: #0d0d10;
        }

        .faq-head-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
        }

        .faq-question-title {
          font-family: var(--font-headline);
          font-size: 0.98rem;
          font-weight: 700;
          color: #ffffff;
        }

        .faq-icon-arrow {
          color: var(--text-secondary);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .faq-content-body {
          overflow: hidden;
          padding-top: 0.85rem;
          margin-top: 0.85rem;
          border-top: 1px solid var(--border-subtle);
        }

        .faq-content-body p {
          font-family: var(--font-body);
          font-size: 0.88rem;
          color: var(--text-secondary);
          line-height: 1.6;
        }

        .faq-minimal-cta {
          max-width: 780px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.5rem 2rem;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-pill);
          flex-wrap: wrap;
          gap: 1rem;
        }

        .faq-cta-text {
          font-family: var(--font-headline);
          font-size: 0.9rem;
          font-weight: 600;
          color: #ffffff;
        }

        @media (max-width: 640px) {
          .faq-minimal-cta {
            border-radius: var(--radius-md);
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `}</style>
    </section>
  );
}
