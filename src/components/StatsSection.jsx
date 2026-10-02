import React from 'react';
import { DollarSign, Rocket, Target, Award, ArrowUpRight } from 'lucide-react';

export default function StatsSection() {
  const stats = [
    {
      icon: DollarSign,
      number: "+R$ 48M",
      label: "Faturamento Gerado",
      desc: "Volume transacionado e gerado diretamente para nossos clientes através de funis e LPs."
    },
    {
      icon: Rocket,
      number: "180+",
      label: "Projetos Entregues",
      desc: "LPs, aplicativos, e-commerces e plataformas com padrão global de acabamento."
    },
    {
      icon: Target,
      number: "3.8x",
      label: "ROI Médio de Campanha",
      desc: "Retorno consistente sobre cada real investido em mídia paga e tecnologia de conversão."
    },
    {
      icon: Award,
      number: "99.4%",
      label: "Satisfação & Retenção",
      desc: "Índice de aprovação contratual e parcerias ativas de longo prazo."
    }
  ];

  return (
    <section className="stats-section">
      <div className="container">
        <div className="stats-grid">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={idx} className="glass-card stat-card">
                <div className="stat-card-header">
                  <div className="stat-icon-wrapper">
                    <Icon size={22} />
                  </div>
                  <span className="stat-badge">Validado</span>
                </div>
                <div className="stat-number">{stat.number}</div>
                <h3 className="stat-title">{stat.label}</h3>
                <p className="stat-desc">{stat.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .stats-section {
          padding: 3rem 0 5rem;
          position: relative;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
        }

        .stat-card {
          padding: 2rem 1.5rem;
          border: 1px solid var(--border-subtle);
          display: flex;
          flex-direction: column;
        }

        .stat-card:hover {
          border-color: rgba(99, 102, 241, 0.4);
        }

        .stat-card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.5rem;
        }

        .stat-icon-wrapper {
          width: 44px;
          height: 44px;
          border-radius: var(--radius-sm);
          background: rgba(99, 102, 241, 0.12);
          border: 1px solid rgba(99, 102, 241, 0.25);
          color: var(--primary-light);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .stat-badge {
          font-size: 0.7rem;
          font-family: var(--font-mono);
          color: var(--cyan-light);
          background: rgba(6, 182, 212, 0.1);
          padding: 0.2rem 0.55rem;
          border-radius: var(--radius-full);
          border: 1px solid rgba(6, 182, 212, 0.2);
        }

        .stat-number {
          font-size: 2.3rem;
          font-weight: 800;
          font-family: var(--font-heading);
          letter-spacing: -0.02em;
          color: #ffffff;
          margin-bottom: 0.4rem;
          background: var(--grad-text);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .stat-title {
          font-size: 1.05rem;
          font-weight: 700;
          color: #e2e8f0;
          margin-bottom: 0.65rem;
        }

        .stat-desc {
          font-size: 0.88rem;
          line-height: 1.5;
          color: var(--text-muted);
          margin: 0;
        }

        @media (max-width: 1024px) {
          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 640px) {
          .stats-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
