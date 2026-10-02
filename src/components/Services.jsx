import React from 'react';
import { motion } from 'framer-motion';
import { servicesData } from '../data/servicesData';
import { Layout, TrendingUp, Cpu, Sparkles, Check, ArrowRight, Orbit } from 'lucide-react';

const iconMap = {
  Layout: Layout,
  TrendingUp: TrendingUp,
  Cpu: Cpu,
  Sparkles: Sparkles
};

export default function Services({ onOpenLeadModal }) {
  const cardVariants = {
    hidden: { opacity: 0, y: 35 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: i * 0.15,
        ease: [0.16, 1, 0.3, 1]
      }
    })
  };

  return (
    <section id="solucoes" className="section services-section">
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
            <Orbit size={14} />
            <span>Matriz de Propulsão Digital</span>
          </div>
          <h2 className="section-title">
            Engenharia Completa para <span className="gradient-text">Dominar Seu Setor</span>
          </h2>
          <p className="section-subtitle">
            Arquitetamos um ecossistema integrado que combina design cinematográfico, aquisição de tráfego de alta precisão e agentes autônomos de IA.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid-2 services-grid">
          {servicesData.map((service, idx) => {
            const Icon = iconMap[service.icon] || Layout;
            return (
              <motion.div 
                key={service.id} 
                className="glass-card service-card"
                custom={idx}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                whileHover={{ y: -6, borderColor: 'rgba(6, 182, 212, 0.5)' }}
              >
                <div className="service-card-top">
                  <div className="service-icon-box">
                    <Icon size={24} />
                  </div>
                  <div className="service-badge-tag">{service.badge}</div>
                </div>

                <span className="service-category">{service.category}</span>
                <h3 className="service-title">{service.title}</h3>
                <p className="service-desc">{service.shortDesc}</p>

                {/* Features list */}
                <div className="service-features">
                  {service.features.map((feat, fIdx) => (
                    <div key={fIdx} className="feature-item">
                      <div className="feature-check">
                        <Check size={14} />
                      </div>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

                {/* Service Card Bottom */}
                <div className="service-card-bottom">
                  <div className="service-metric">
                    <span className="metric-val gradient-text">{service.metric}</span>
                    <span className="metric-desc">{service.metricLabel}</span>
                  </div>
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onOpenLeadModal(`Interesse em: ${service.title}`)}
                    className="btn btn-secondary btn-sm"
                  >
                    <span>Saber Mais</span>
                    <ArrowRight size={15} />
                  </motion.button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <style>{`
        .services-section {
          position: relative;
        }

        .services-grid {
          gap: 2rem;
        }

        .service-card {
          padding: 2.5rem;
          display: flex;
          flex-direction: column;
          border: 1px solid var(--border-cosmic-subtle);
          background: rgba(11, 16, 26, 0.75);
        }

        .service-card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.5rem;
        }

        .service-icon-box {
          width: 52px;
          height: 52px;
          border-radius: var(--radius-md);
          background: linear-gradient(135deg, rgba(6, 182, 212, 0.15), rgba(99, 102, 241, 0.2));
          border: 1px solid rgba(6, 182, 212, 0.35);
          color: var(--cosmic-cyan);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 0 20px rgba(6, 182, 212, 0.2);
        }

        .service-badge-tag {
          font-family: var(--font-mono);
          font-size: 0.72rem;
          font-weight: 600;
          color: var(--cosmic-neon-blue);
          background: rgba(6, 182, 212, 0.1);
          border: 1px solid rgba(6, 182, 212, 0.25);
          padding: 0.25rem 0.7rem;
          border-radius: var(--radius-full);
        }

        .service-category {
          font-family: var(--font-mono);
          font-size: 0.78rem;
          color: var(--text-dark);
          text-transform: uppercase;
          letter-spacing: 0.08em;
          margin-bottom: 0.5rem;
        }

        .service-title {
          font-size: 1.45rem;
          font-weight: 800;
          margin-bottom: 0.85rem;
          color: #ffffff;
        }

        .service-desc {
          font-size: 0.96rem;
          color: var(--text-muted);
          line-height: 1.6;
          margin-bottom: 1.75rem;
        }

        .service-features {
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
          margin-bottom: 2rem;
          padding-top: 1.25rem;
          border-top: 1px solid var(--border-cosmic-subtle);
        }

        .feature-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 0.92rem;
          color: #cbd5e1;
        }

        .feature-check {
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: rgba(16, 185, 129, 0.15);
          color: #34d399;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .service-card-bottom {
          margin-top: auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 1.5rem;
          border-top: 1px solid var(--border-cosmic-subtle);
        }

        .service-metric {
          display: flex;
          flex-direction: column;
        }

        .metric-val {
          font-size: 1.4rem;
          font-weight: 800;
          font-family: var(--font-heading);
          line-height: 1;
        }

        .metric-desc {
          font-size: 0.75rem;
          color: var(--text-dark);
        }

        @media (max-width: 768px) {
          .service-card {
            padding: 1.75rem;
          }
          .service-card-bottom {
            flex-direction: column;
            align-items: flex-start;
            gap: 1.25rem;
          }
          .service-card-bottom button {
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
}
