import React from 'react';
import { motion } from 'framer-motion';
import { Search, Compass, Rocket, Repeat, ArrowRight, ShieldCheck, Orbit } from 'lucide-react';

export default function Methodology({ onOpenLeadModal }) {
  const steps = [
    {
      num: "01",
      icon: Search,
      title: "Diagnóstico 360° & Auditoria de Gargalos",
      desc: "Mapeamos exatamente onde sua empresa está perdendo dinheiro. Analisamos taxa de conversão atual, velocidade de carregamento, canais de aquisição e posicionamento perante concorrentes.",
      deliverable: "Relatório de Oportunidades & Gargalos de Receita"
    },
    {
      num: "02",
      icon: Compass,
      title: "Engenharia de Estratégia & Design System",
      desc: "Desenhamos a arquitetura ideal de conversão: copywriting persuasivo focado em objeções, UI/UX de nível internacional e automações de fluxo para qualificação imediata.",
      deliverable: "Protótipo Interativo & Blueprint Estratégico"
    },
    {
      num: "03",
      icon: Rocket,
      title: "Execução Ágil com Sprints de 14 Dias",
      desc: "Implementação em código limpo e moderno, sem lentidão ou templates genéricos. Integração completa com CRM, inteligência artificial e tags de rastreamento de alta precisão.",
      deliverable: "Go-Live em Produção & Teste de Carga"
    },
    {
      num: "04",
      icon: Repeat,
      title: "Otimização Contínua, Testes A/B & Escala",
      desc: "Não abandonamos o projeto após o lançamento. Rodamos testes contínuos de hipóteses, otimização de campanhas e novos recursos para reduzir CAC e maximizar o LTV.",
      deliverable: "Dashboard Executivo & Relatórios Semanais"
    }
  ];

  return (
    <section id="metodologia" className="section methodology-section">
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
            <span>Processo Orbital Validado</span>
          </div>
          <h2 className="section-title">
            Metodologia em <span className="gradient-text">4 Etapas Previsíveis</span>
          </h2>
          <p className="section-subtitle">
            Eliminamos o achismo com rigor de engenharia espacial: cada sprint entrega avanço mensurável no faturamento.
          </p>
        </motion.div>

        {/* Timeline Grid */}
        <div className="methodology-grid">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div 
                key={idx} 
                className="glass-card step-card"
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.12 }}
                whileHover={{ y: -6, borderColor: 'rgba(6, 182, 212, 0.45)' }}
              >
                <div className="step-card-header">
                  <div className="step-number-tag">{step.num}</div>
                  <div className="step-icon-wrap">
                    <Icon size={22} />
                  </div>
                </div>

                <h3 className="step-title">{step.title}</h3>
                <p className="step-desc">{step.desc}</p>

                <div className="step-deliverable-box">
                  <span className="deliv-label">Entregável Chave:</span>
                  <span className="deliv-val">{step.deliverable}</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div 
          className="methodology-footer"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.button 
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => onOpenLeadModal("Metodologia - Agendar Diagnóstico 360°")}
            className="btn btn-primary btn-lg btn-glow"
          >
            <span>Agendar Meu Diagnóstico 360° Gratuito</span>
            <ArrowRight size={18} />
          </motion.button>
        </motion.div>
      </div>

      <style>{`
        .methodology-section {
          position: relative;
        }

        .methodology-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1.5rem;
          margin-bottom: 3.5rem;
        }

        .step-card {
          padding: 2.25rem 1.75rem;
          display: flex;
          flex-direction: column;
          border: 1px solid var(--border-cosmic-subtle);
          background: rgba(11, 16, 26, 0.75);
          position: relative;
        }

        .step-card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.5rem;
        }

        .step-number-tag {
          font-family: var(--font-heading);
          font-size: 1.6rem;
          font-weight: 900;
          color: rgba(255, 255, 255, 0.15);
          letter-spacing: -0.05em;
        }

        .step-icon-wrap {
          width: 44px;
          height: 44px;
          border-radius: var(--radius-sm);
          background: rgba(6, 182, 212, 0.12);
          border: 1px solid rgba(6, 182, 212, 0.3);
          color: var(--cosmic-cyan);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .step-title {
          font-size: 1.2rem;
          font-weight: 800;
          color: #ffffff;
          line-height: 1.3;
          margin-bottom: 0.85rem;
        }

        .step-desc {
          font-size: 0.9rem;
          line-height: 1.6;
          color: var(--text-muted);
          margin-bottom: 1.75rem;
        }

        .step-deliverable-box {
          margin-top: auto;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--border-cosmic-subtle);
          padding: 0.75rem 1rem;
          border-radius: var(--radius-sm);
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
        }

        .deliv-label {
          font-family: var(--font-mono);
          font-size: 0.68rem;
          color: var(--text-dark);
          text-transform: uppercase;
        }

        .deliv-val {
          font-size: 0.82rem;
          font-weight: 600;
          color: var(--cosmic-neon-blue);
        }

        .methodology-footer {
          text-align: center;
        }

        @media (max-width: 1024px) {
          .methodology-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 640px) {
          .methodology-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
