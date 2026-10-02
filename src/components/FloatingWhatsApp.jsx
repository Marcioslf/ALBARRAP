import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa6';
import { FiX } from 'react-icons/fi';
import { ARTIST_INFO } from '../data/tattoosData';

export default function FloatingWhatsApp() {
  const [showTooltip, setShowTooltip] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 120);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.div 
      className={`mono-floating-whatsapp ${isScrolled ? 'scrolled-down' : ''}`}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', damping: 20, stiffness: 300, delay: 0.8 }}
    >
      <AnimatePresence>
        {showTooltip && (
          <motion.div 
            className="mono-whatsapp-tooltip"
            initial={{ opacity: 0, x: 20, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <span>Orçamento rápido no WM Tattoo Studio</span>
            <button 
              className="tooltip-close" 
              onClick={(e) => {
                e.stopPropagation();
                setShowTooltip(false);
              }}
              aria-label="Fechar aviso"
            >
              <FiX size={14} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.a
        href={`https://wa.me/${ARTIST_INFO.whatsappNumber}?text=Ol%C3%A1!%20Vim%20pelo%20site%20do%20WM%20Tattoo%20Studio%20e%20gostaria%20de%20tirar%20uma%20d%C3%BAvida%20sobre%20or%C3%A7amento%20em%20Goi%C3%A2nia-GO.`}
        target="_blank"
        rel="noreferrer"
        className="mono-whatsapp-btn"
        aria-label="Falar pelo WhatsApp com WM Tattoo Studio"
        whileHover={{ scale: 1.1, rotate: [0, -6, 6, 0] }}
        whileTap={{ scale: 0.92 }}
      >
        <span className="live-status-dot"></span>
        <FaWhatsapp size={24} />
      </motion.a>

      <style>{`
        .mono-floating-whatsapp {
          position: fixed;
          bottom: 28px;
          right: 28px;
          z-index: 950;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          transition: all 0.3s ease;
        }

        .mono-whatsapp-tooltip {
          background: #000000;
          border: 1px solid var(--border-strong);
          color: #ffffff;
          padding: 0.55rem 0.9rem;
          border-radius: var(--radius-pill);
          font-family: var(--font-mono);
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.04em;
          display: flex;
          align-items: center;
          gap: 0.65rem;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.9);
          white-space: nowrap;
        }

        .tooltip-close {
          background: transparent;
          border: none;
          color: var(--text-dim);
          cursor: pointer;
          display: flex;
          align-items: center;
          padding: 0;
          transition: color 0.2s ease;
        }

        .tooltip-close:hover {
          color: #ffffff;
        }

        .mono-whatsapp-btn {
          width: 58px;
          height: 58px;
          border-radius: 50%;
          background: #ffffff;
          color: #000000;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          box-shadow: 0 0 25px rgba(255, 255, 255, 0.4), 0 12px 30px rgba(0, 0, 0, 0.8);
          border: 1px solid #ffffff;
          text-decoration: none;
          cursor: pointer;
        }

        .live-status-dot {
          position: absolute;
          top: 2px;
          right: 2px;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: #ffffff;
          border: 2px solid #000000;
          box-shadow: 0 0 8px rgba(255, 255, 255, 0.9);
        }

        @media (max-width: 768px) {
          .mono-floating-whatsapp {
            bottom: 20px;
            right: 20px;
          }
          .mono-floating-whatsapp.scrolled-down {
            bottom: 80px;
          }
          .mono-whatsapp-tooltip {
            display: none;
          }
        }
      `}</style>
    </motion.div>
  );
}
