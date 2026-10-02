import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiZoomIn, FiArrowRight } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa6';
import { TATTOO_WORKS, TATTOO_CATEGORIES, ARTIST_INFO } from '../data/tattoosData';

function TiltTattooCard({ tattoo, onSelect, onQuickWhatsApp, index }) {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0, isHovered: false });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const normX = (x / rect.width) * 2 - 1;
    const normY = (y / rect.height) * 2 - 1;

    setTilt({
      x: -normY * 6,
      y: normX * 6,
      isHovered: true
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0, isHovered: false });
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="gallery-card-wrapper"
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => onSelect(tattoo)}
    >
      <div 
        className={`gallery-card ${tilt.isHovered ? 'hovered' : ''}`}
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: tilt.isHovered ? 'transform 0.1s ease-out' : 'transform 0.4s ease',
        }}
      >
        {/* Image Container */}
        <div className="card-img-container">
          <img 
            src={tattoo.image} 
            alt={tattoo.title} 
            className="card-tattoo-img"
            loading="lazy" 
          />

          <div className="card-zoom-indicator">
            <FiZoomIn size={15} />
            <span>Ver Detalhes</span>
          </div>

          <div className="card-badge-tag">
            {tattoo.categoryLabel}
          </div>
        </div>

        {/* Minimalist Card Bottom */}
        <div className="card-info-pane">
          <div className="card-title-row">
            <h3 className="card-tattoo-title">{tattoo.title}</h3>
            <span className="card-tattoo-loc">{tattoo.location}</span>
          </div>

          <p className="card-tattoo-sub">{tattoo.technique}</p>

          <div className="card-actions-row">
            <button 
              onClick={(e) => { e.stopPropagation(); onSelect(tattoo); }}
              className="btn-card-details"
            >
              Raio-X Técnico
            </button>

            <button 
              onClick={(e) => onQuickWhatsApp(e, tattoo)}
              className="btn-card-wa"
              title="Orçar com esta referência"
            >
              <FaWhatsapp size={14} />
              <span>Orçar</span>
              <FiArrowRight size={13} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function TattooGallery({ onSelectTattoo }) {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredWorks = selectedCategory === 'all'
    ? TATTOO_WORKS
    : TATTOO_WORKS.filter((work) => {
        if (selectedCategory === 'blackandgrey') {
          return work.category === 'blackandgrey' || work.category === 'samurai';
        }
        return work.category === selectedCategory;
      });

  const handleQuickWhatsApp = (e, tattoo) => {
    e.stopPropagation();
    const text = encodeURIComponent(`Olá! Vi o trabalho "${tattoo.title}" no WM Tattoo Studio e gostaria de solicitar um orçamento.`);
    window.open(`https://wa.me/${ARTIST_INFO.whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <section id="gallery" className="mono-gallery-section">
      <div className="studio-container">
        {/* Minimalist Section Header */}
        <motion.div 
          className="section-header-minimal"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="section-num">02 // PORTFÓLIO</span>
          <h2 className="section-heading-text">TRABALHOS REAIS</h2>

          {/* Rounded Minimal Filter Pills */}
          <div className="gallery-filter-tabs">
            {TATTOO_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`filter-pill-btn ${selectedCategory === cat.id ? 'active' : ''}`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Gallery Grid */}
        <motion.div layout className="gallery-items-grid">
          <AnimatePresence mode="popLayout">
            {filteredWorks.map((tattoo, index) => (
              <TiltTattooCard 
                key={tattoo.id}
                tattoo={tattoo}
                index={index}
                onSelect={onSelectTattoo}
                onQuickWhatsApp={handleQuickWhatsApp}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <style>{`
        .mono-gallery-section {
          padding: clamp(3.5rem, 8vw, 5.5rem) 0 clamp(2.5rem, 6vw, 5rem);
          background-color: var(--bg-void);
          border-top: 1px solid var(--border-subtle);
          position: relative;
        }

        .gallery-filter-tabs {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-top: 1.75rem;
          overflow-x: auto;
          scrollbar-width: none;
          -ms-overflow-style: none;
          -webkit-overflow-scrolling: touch;
          padding-bottom: 4px;
        }

        .gallery-filter-tabs::-webkit-scrollbar {
          display: none;
        }

        .filter-pill-btn {
          padding: 0.45rem 1.1rem;
          font-family: var(--font-headline);
          font-size: 0.76rem;
          font-weight: 700;
          letter-spacing: 0.04em;
          border-radius: var(--radius-pill);
          border: 1px solid var(--border-subtle);
          background: rgba(255, 255, 255, 0.03);
          color: var(--text-secondary);
          cursor: pointer;
          transition: all 0.2s ease;
          white-space: nowrap;
          flex-shrink: 0;
          min-height: 38px;
        }

        .filter-pill-btn:hover {
          border-color: rgba(255, 255, 255, 0.4);
          color: #ffffff;
        }

        .filter-pill-btn.active {
          background: #ffffff;
          color: #000000;
          border-color: #ffffff;
        }

        .gallery-items-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(min(100%, 300px), 1fr));
          gap: clamp(1.25rem, 3vw, 2rem);
          margin-top: 2rem;
        }

        .gallery-card-wrapper {
          height: 100%;
          perspective: 1000px;
        }

        .gallery-card {
          position: relative;
          display: flex;
          flex-direction: column;
          border-radius: var(--radius-lg);
          overflow: hidden;
          background: #09090b;
          border: 1px solid var(--border-subtle);
          cursor: pointer;
          height: 100%;
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
        }

        .gallery-card.hovered {
          border-color: rgba(255, 255, 255, 0.35);
          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.85);
        }

        .card-img-container {
          position: relative;
          width: 100%;
          aspect-ratio: 4 / 4.8;
          overflow: hidden;
          background-color: #030304;
        }

        .card-tattoo-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center 20%;
          filter: contrast(1.12) brightness(1.02);
          transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .gallery-card:hover .card-tattoo-img {
          transform: scale(1.05);
        }

        .card-zoom-indicator {
          position: absolute;
          bottom: 1rem;
          right: 1rem;
          display: flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.4rem 0.85rem;
          background: rgba(0, 0, 0, 0.8);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: var(--radius-pill);
          color: #ffffff;
          font-family: var(--font-headline);
          font-size: 0.7rem;
          font-weight: 700;
          opacity: 0;
          transition: opacity 0.2s ease;
        }

        .gallery-card:hover .card-zoom-indicator {
          opacity: 1;
        }

        .card-badge-tag {
          position: absolute;
          top: 1rem;
          left: 1rem;
          padding: 0.25rem 0.75rem;
          background: rgba(0, 0, 0, 0.8);
          backdrop-filter: blur(6px);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-pill);
          font-family: var(--font-headline);
          font-size: 0.68rem;
          font-weight: 700;
          color: #ffffff;
        }

        .card-info-pane {
          padding: 1.35rem 1.5rem;
          display: flex;
          flex-direction: column;
          flex: 1;
          background: #09090b;
        }

        .card-title-row {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          gap: 0.5rem;
          margin-bottom: 0.25rem;
        }

        .card-tattoo-title {
          font-family: var(--font-headline);
          font-size: 1.2rem;
          font-weight: 800;
          color: #ffffff;
        }

        .card-tattoo-loc {
          font-family: var(--font-headline);
          font-size: 0.72rem;
          color: var(--text-muted);
          font-weight: 600;
        }

        .card-tattoo-sub {
          font-family: var(--font-body);
          font-size: 0.82rem;
          color: var(--text-secondary);
          margin-bottom: 1.25rem;
        }

        .card-actions-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.5rem;
          margin-top: auto;
          padding-top: 0.85rem;
          border-top: 1px solid var(--border-subtle);
        }

        .btn-card-details {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 42px;
          padding: 0.55rem;
          font-family: var(--font-headline);
          font-size: 0.72rem;
          font-weight: 700;
          border-radius: var(--radius-pill);
          background: transparent;
          border: 1px solid var(--border-subtle);
          color: var(--text-secondary);
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .btn-card-details:hover {
          border-color: #ffffff;
          color: #ffffff;
          background: rgba(255, 255, 255, 0.05);
        }

        .btn-card-wa {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.4rem;
          min-height: 42px;
          padding: 0.55rem;
          font-family: var(--font-headline);
          font-size: 0.72rem;
          font-weight: 800;
          border-radius: var(--radius-pill);
          background: #ffffff;
          border: 1px solid #ffffff;
          color: #000000;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .btn-card-wa:hover {
          background: #e4e4e7;
        }

        @media (hover: none) {
          .gallery-card {
            transform: none !important;
          }
          .card-zoom-indicator {
            opacity: 0.9;
          }
        }

        @media (max-width: 640px) {
          .gallery-items-grid {
            grid-template-columns: 1fr;
            gap: 1.25rem;
          }
          .card-info-pane {
            padding: 1.15rem 1.25rem;
          }
        }
      `}</style>
    </section>
  );
}
