import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';
import { ArrowUpRight, Trophy, Sparkles, Orbit } from 'lucide-react';
import CaseModal from './CaseModal';

export default function Portfolio({ onOpenLeadModal }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedCase, setSelectedCase] = useState(null);

  const categories = [
    { id: 'all', label: 'Todos os Cases' },
    { id: 'tech', label: 'SaaS & Tech' },
    { id: 'ecommerce', label: 'E-Commerce' },
    { id: 'b2b', label: 'B2B Corporativo' }
  ];

  const filteredCases = activeCategory === 'all' 
    ? portfolioData 
    : portfolioData.filter(c => c.category === activeCategory);

  return (
    <section id="cases" className="section portfolio-section">
      <div className="container">
        {/* Section Header */}
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="section-tag">
            <Trophy size={14} />
            <span>Constelação de Cases de Sucesso</span>
          </div>
          <h2 className="section-title">
            Resultados Tangíveis que Falam Mais Alto que <span className="gradient-text">Promessas</span>
          </h2>
          <p className="section-subtitle">
            Veja como colocamos marcas de ponta em trajetória de liderança através da nossa engenharia de crescimento.
          </p>

          {/* Category Filter Pills */}
          <div className="portfolio-filter-row">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`filter-btn ${activeCategory === cat.id ? 'active' : ''}`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Cases Grid with Framer Motion AnimatePresence */}
        <motion.div layout className="grid-2 portfolio-grid">
          <AnimatePresence>
            {filteredCases.map(caseItem => (
              <motion.div 
                layout
                key={caseItem.id} 
                className="glass-card portfolio-card"
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.4 }}
                onClick={() => setSelectedCase(caseItem)}
                whileHover={{ y: -6, borderColor: 'rgba(6, 182, 212, 0.5)' }}
              >
                {/* Banner Preview */}
                <div className="portfolio-banner" style={{ background: caseItem.imageBg }}>
                  <div className="banner-pattern-overlay"></div>
                  <div className="banner-badge-box">
                    <span className="banner-badge">{caseItem.categoryLabel}</span>
                    <div className="expand-trigger">
                      <span>Ver Case Completo</span>
                      <ArrowUpRight size={16} />
                    </div>
                  </div>
                  <div className="banner-metrics-highlight">
                    <span className="banner-big-metric">{caseItem.metrics[0].value}</span>
                    <span className="banner-metric-label">{caseItem.metrics[0].label}</span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="portfolio-content">
                  <span className="client-name">{caseItem.client}</span>
                  <h3 className="portfolio-case-title">{caseItem.title}</h3>
                  <p className="portfolio-case-desc">{caseItem.summary}</p>

                  {/* Metrics Pills */}
                  <div className="case-metrics-row">
                    {caseItem.metrics.map((m, idx) => (
                      <div key={idx} className="metric-chip">
                        <span className="chip-val">{m.value}</span>
                        <span className="chip-lbl">{m.label}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tech Tags */}
                  <div className="portfolio-tags">
                    {caseItem.tags.map((tag, idx) => (
                      <span key={idx} className="tag-pill">{tag}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Global CTA under portfolio */}
        <motion.div 
          className="portfolio-cta-banner glass-card"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="cta-banner-text">
            <h3>Sua empresa pronta para ser nosso próximo case estelar?</h3>
            <p>Analisamos seu ecossistema atual e montamos um plano de aceleração sob medida.</p>
          </div>
          <motion.button 
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => onOpenLeadModal("Portfolio Banner - Quero ser o próximo case")}
            className="btn btn-primary btn-glow"
          >
            <span>Solicitar Análise de Mercado</span>
            <ArrowUpRight size={18} />
          </motion.button>
        </motion.div>
      </div>

      {/* Case Details Modal */}
      {selectedCase && (
        <CaseModal 
          caseItem={selectedCase} 
          onClose={() => setSelectedCase(null)} 
          onOpenLeadModal={onOpenLeadModal}
        />
      )}

      <style>{`
        .portfolio-section {
          position: relative;
        }

        .portfolio-filter-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          flex-wrap: wrap;
          margin-top: 2rem;
        }

        .filter-btn {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--border-cosmic-subtle);
          color: var(--text-muted);
          padding: 0.55rem 1.25rem;
          border-radius: var(--radius-full);
          font-size: 0.88rem;
          font-weight: 600;
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .filter-btn:hover {
          background: rgba(255, 255, 255, 0.08);
          color: #ffffff;
        }

        .filter-btn.active {
          background: linear-gradient(135deg, #6366f1 0%, #06b6d4 100%);
          border-color: transparent;
          color: #ffffff;
          box-shadow: 0 4px 18px rgba(6, 182, 212, 0.4);
        }

        .portfolio-grid {
          gap: 2rem;
          margin-bottom: 3.5rem;
        }

        .portfolio-card {
          cursor: pointer;
          border: 1px solid var(--border-cosmic-subtle);
          display: flex;
          flex-direction: column;
          background: rgba(11, 16, 26, 0.75);
        }

        .portfolio-banner {
          position: relative;
          height: 220px;
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          border-bottom: 1px solid var(--border-cosmic-subtle);
          overflow: hidden;
        }

        .banner-pattern-overlay {
          position: absolute;
          inset: 0;
          background-image: radial-gradient(rgba(255, 255, 255, 0.12) 1px, transparent 1px);
          background-size: 16px 16px;
          opacity: 0.5;
        }

        .banner-badge-box {
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: relative;
          z-index: 1;
        }

        .banner-badge {
          font-family: var(--font-mono);
          font-size: 0.72rem;
          background: rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(8px);
          color: #ffffff;
          padding: 0.25rem 0.65rem;
          border-radius: var(--radius-full);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .expand-trigger {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.8rem;
          font-weight: 600;
          color: #ffffff;
          background: rgba(0, 0, 0, 0.5);
          padding: 0.3rem 0.75rem;
          border-radius: var(--radius-full);
          opacity: 0;
          transform: translateY(5px);
          transition: all var(--transition-smooth);
        }

        .portfolio-card:hover .expand-trigger {
          opacity: 1;
          transform: translateY(0);
        }

        .banner-metrics-highlight {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
        }

        .banner-big-metric {
          font-size: 2.8rem;
          font-weight: 900;
          color: #ffffff;
          line-height: 1;
          font-family: var(--font-heading);
          text-shadow: 0 4px 20px rgba(0, 0, 0, 0.6);
        }

        .banner-metric-label {
          font-size: 0.82rem;
          color: rgba(255, 255, 255, 0.9);
          font-weight: 500;
        }

        .portfolio-content {
          padding: 2rem;
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .client-name {
          font-family: var(--font-mono);
          font-size: 0.78rem;
          color: var(--cosmic-neon-blue);
          text-transform: uppercase;
          letter-spacing: 0.08em;
          margin-bottom: 0.5rem;
        }

        .portfolio-case-title {
          font-size: 1.3rem;
          font-weight: 800;
          color: #ffffff;
          line-height: 1.35;
          margin-bottom: 0.85rem;
        }

        .portfolio-case-desc {
          font-size: 0.92rem;
          color: var(--text-muted);
          line-height: 1.6;
          margin-bottom: 1.5rem;
        }

        .case-metrics-row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0.75rem;
          margin-bottom: 1.5rem;
          padding: 1rem 0;
          border-top: 1px solid var(--border-cosmic-subtle);
          border-bottom: 1px solid var(--border-cosmic-subtle);
        }

        .metric-chip {
          display: flex;
          flex-direction: column;
        }

        .chip-val {
          font-weight: 800;
          font-size: 1.1rem;
          color: #ffffff;
        }

        .chip-lbl {
          font-size: 0.7rem;
          color: var(--text-dark);
          line-height: 1.2;
        }

        .portfolio-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
          margin-top: auto;
        }

        .tag-pill {
          font-size: 0.72rem;
          color: var(--text-muted);
          background: rgba(255, 255, 255, 0.04);
          padding: 0.2rem 0.55rem;
          border-radius: 4px;
        }

        .portfolio-cta-banner {
          padding: 2.5rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: linear-gradient(135deg, rgba(13, 18, 28, 0.95), rgba(6, 182, 212, 0.1));
          border: 1px solid rgba(6, 182, 212, 0.3);
        }

        .cta-banner-text h3 {
          font-size: 1.4rem;
          font-weight: 800;
          margin-bottom: 0.35rem;
        }

        .cta-banner-text p {
          font-size: 0.95rem;
          margin: 0;
        }

        @media (max-width: 992px) {
          .portfolio-cta-banner {
            flex-direction: column;
            text-align: center;
            gap: 1.5rem;
          }
          .case-metrics-row {
            grid-template-columns: 1fr;
            gap: 0.5rem;
          }
        }
      `}</style>
    </section>
  );
}
