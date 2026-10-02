import React from 'react';
import { Award, Shield, CheckCircle, Flame, Star, Cpu } from 'lucide-react';

export default function BrandMarquee() {
  const brands = [
    { name: "Vortx Financial", tag: "FINTECH CLOUD", icon: Shield },
    { name: "NovaMind AI", tag: "PLATAFORMA IA", icon: Cpu },
    { name: "Aurora D2C", tag: "E-COMMERCE", icon: Flame },
    { name: "Kronos Logistics", tag: "ENTERPRISE B2B", icon: Award },
    { name: "Lumina Health", tag: "SAÚDE & TECH", icon: CheckCircle },
    { name: "Apex Capital", tag: "INVESTIMENTOS", icon: Star },
    { name: "Velocity Labs", tag: "SAAS GLOBAL", icon: Cpu },
    { name: "Astra Media", tag: "GROWTH MEDIA", icon: Flame }
  ];

  return (
    <section className="marquee-section">
      <div className="container">
        <p className="marquee-heading">
          CONFIADO POR LÍDERES DE MERCADO, STARTUPS EM HIPERCRESCIMENTO E ENTERPRISES
        </p>
      </div>

      <div className="marquee-wrapper">
        <div className="marquee-track">
          {brands.concat(brands).map((brand, idx) => {
            const IconComponent = brand.icon;
            return (
              <div key={idx} className="brand-chip">
                <div className="chip-icon-box">
                  <IconComponent size={16} />
                </div>
                <div className="chip-text">
                  <span className="brand-name">{brand.name}</span>
                  <span className="brand-tag">{brand.tag}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .marquee-section {
          padding: 2.5rem 0 3.5rem;
          position: relative;
          overflow: hidden;
          background: rgba(12, 16, 23, 0.5);
          border-top: 1px solid var(--border-subtle);
          border-bottom: 1px solid var(--border-subtle);
        }

        .marquee-heading {
          text-align: center;
          font-family: var(--font-mono);
          font-size: 0.78rem;
          font-weight: 600;
          letter-spacing: 0.15em;
          color: var(--text-dark);
          margin-bottom: 1.75rem;
        }

        .marquee-wrapper {
          width: 100%;
          overflow: hidden;
          display: flex;
          position: relative;
          mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
        }

        .marquee-track {
          display: flex;
          gap: 1.5rem;
          width: max-content;
          animation: marquee 28s linear infinite;
        }

        .marquee-wrapper:hover .marquee-track {
          animation-play-state: paused;
        }

        .brand-chip {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--border-subtle);
          padding: 0.65rem 1.25rem;
          border-radius: var(--radius-full);
          transition: all var(--transition-fast);
          cursor: default;
        }

        .brand-chip:hover {
          background: rgba(255, 255, 255, 0.06);
          border-color: rgba(99, 102, 241, 0.4);
          transform: translateY(-2px);
        }

        .chip-icon-box {
          color: var(--primary-light);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .chip-text {
          display: flex;
          flex-direction: column;
        }

        .brand-name {
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 0.92rem;
          color: #e2e8f0;
          letter-spacing: -0.01em;
          white-space: nowrap;
        }

        .brand-tag {
          font-family: var(--font-mono);
          font-size: 0.65rem;
          color: var(--text-dark);
          letter-spacing: 0.06em;
          white-space: nowrap;
        }
      `}</style>
    </section>
  );
}
