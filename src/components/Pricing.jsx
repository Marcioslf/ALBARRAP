import React from 'react';
import { motion } from 'framer-motion';
import { pricingData } from '../data/faqData';
import { Check, Zap, Sparkles, ArrowRight, Shield } from 'lucide-react';

export default function Pricing({ onOpenLeadModal }) {
  return (
    <section id="planos" className="section pricing-section">
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
            <Zap size={14} />
            <span>Engenharia de Parceria</span>
          </div>
          <h2 className="section-title">
            Modelos Transparentes de <span className="gradient-text">Aceleração Contínua</span>
          </h2>
          <p className="section-subtitle">
            Sem amarras contratuais abusivas: alinhe nossos incentivos aos resultados reais da sua empresa.
          </p>
        </motion.div>

        {/* Pricing Cards Grid */}
        <div className="grid-3 pricing-grid">
          {pricingData.map((plan, idx) => (
            <motion.div 
              key={plan.id} 
              className={`glass-card pricing-card ${plan.featured ? 'featured-pricing-card' : ''}`}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              whileHover={{ y: plan.featured ? -12 : -6 }}
            >
              {plan.featured && (
                <div className="featured-top-badge">
                  <Sparkles size={14} />
                  <span>{plan.badge}</span>
                </div>
              )}

              <div className="pricing-card-header">
                {!plan.featured && (
                  <span className="regular-badge">{plan.badge}</span>
                )}
                <h3 className="plan-name">{plan.name}</h3>
                <p className="plan-tagline">{plan.tagline}</p>
              </div>

              {/* Price Tag */}
              <div className="price-tag-wrapper">
                <span className="plan-price">{plan.price}</span>
                <span className="plan-period">{plan.period}</span>
              </div>

              {/* Benefits */}
              <div className="plan-benefits-list">
                <span className="benefits-title">O que está incluído:</span>
                {plan.benefits.map((benefit, bIdx) => (
                  <div key={bIdx} className="plan-benefit-item">
                    <div className="benefit-check-circle">
                      <Check size={14} />
                    </div>
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>

              {/* Card Footer Button */}
              <div className="pricing-card-footer">
                <motion.button 
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => onOpenLeadModal(`Plano selecionado: ${plan.name} (${plan.price})`)}
                  className={`btn ${plan.ctaVariant} ${plan.featured ? 'btn-glow' : ''}`}
                  style={{ width: '100%' }}
                >
                  <span>{plan.ctaText}</span>
                  <ArrowRight size={16} />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="pricing-assurances-banner"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="assurance-box">
            <Shield size={20} className="text-cyan" />
            <span>Todos os planos contam com SLA de atendimento corporativo e reuniões estratégicas com diretores sêniores.</span>
          </div>
        </motion.div>
      </div>

      <style>{`
        .pricing-section {
          position: relative;
        }

        .pricing-grid {
          gap: 2rem;
          align-items: stretch;
          margin-bottom: 2.5rem;
        }

        .pricing-card {
          padding: 2.5rem 2rem;
          display: flex;
          flex-direction: column;
          border: 1px solid var(--border-cosmic-subtle);
          background: rgba(11, 16, 26, 0.8);
          position: relative;
        }

        .featured-pricing-card {
          border-color: rgba(6, 182, 212, 0.6);
          background: linear-gradient(180deg, rgba(16, 24, 40, 0.95) 0%, rgba(9, 13, 22, 0.95) 100%);
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.7), 0 0 35px rgba(6, 182, 212, 0.25);
        }

        .featured-top-badge {
          position: absolute;
          top: -14px;
          left: 50%;
          transform: translateX(-50%);
          background: linear-gradient(135deg, #6366f1 0%, #06b6d4 100%);
          color: #ffffff;
          padding: 0.35rem 1rem;
          border-radius: var(--radius-full);
          font-size: 0.75rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 0.4rem;
          box-shadow: 0 4px 18px rgba(6, 182, 212, 0.5);
          white-space: nowrap;
        }

        .regular-badge {
          font-family: var(--font-mono);
          font-size: 0.72rem;
          color: var(--text-dark);
          text-transform: uppercase;
          margin-bottom: 0.5rem;
          display: inline-block;
        }

        .plan-name {
          font-size: 1.4rem;
          font-weight: 800;
          color: #ffffff;
          margin-bottom: 0.5rem;
        }

        .plan-tagline {
          font-size: 0.88rem;
          color: var(--text-muted);
          line-height: 1.5;
          min-height: 48px;
        }

        .price-tag-wrapper {
          margin: 1.75rem 0;
          padding: 1.25rem 0;
          border-top: 1px solid var(--border-cosmic-subtle);
          border-bottom: 1px solid var(--border-cosmic-subtle);
          display: flex;
          flex-direction: column;
        }

        .plan-price {
          font-size: 2.2rem;
          font-weight: 900;
          font-family: var(--font-heading);
          color: #ffffff;
          line-height: 1;
        }

        .plan-period {
          font-size: 0.78rem;
          color: var(--text-dark);
          margin-top: 0.35rem;
        }

        .plan-benefits-list {
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
          margin-bottom: 2.25rem;
          flex: 1;
        }

        .benefits-title {
          font-family: var(--font-mono);
          font-size: 0.75rem;
          color: var(--text-dark);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 0.25rem;
        }

        .plan-benefit-item {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          font-size: 0.9rem;
          color: #cbd5e1;
          line-height: 1.4;
        }

        .benefit-check-circle {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: rgba(16, 185, 129, 0.15);
          color: #34d399;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          margin-top: 1px;
        }

        .pricing-card-footer {
          margin-top: auto;
        }

        .pricing-assurances-banner {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--border-cosmic-subtle);
          border-radius: var(--radius-md);
          padding: 1.25rem;
          text-align: center;
        }

        .assurance-box {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          font-size: 0.9rem;
          color: var(--text-muted);
        }

        @media (max-width: 992px) {
          .featured-pricing-card {
            transform: none;
          }
        }
      `}</style>
    </section>
  );
}
