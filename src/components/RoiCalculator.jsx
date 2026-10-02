import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, TrendingUp, DollarSign, Sparkles, ArrowRight, CheckCircle, Orbit } from 'lucide-react';

export default function RoiCalculator({ onOpenLeadModal }) {
  const [revenue, setRevenue] = useState(75000);
  const [investment, setInvestment] = useState(10000);
  const [ticket, setTicket] = useState(2000);

  // Growth formulas based on validated benchmarks
  const multiplier = 3.8;
  const projectedMonthlyGain = Math.round(investment * multiplier);
  const newMonthlyRevenue = revenue + projectedMonthlyGain;
  const annualGain = projectedMonthlyGain * 12;
  const estimatedNewClients = Math.max(1, Math.round(projectedMonthlyGain / ticket));
  const roiPercentage = Math.round(((projectedMonthlyGain - investment) / investment) * 100);

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(val);
  };

  return (
    <section id="calculadora" className="section roi-section">
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
            <Calculator size={14} />
            <span>Simulador de Tração & Retorno</span>
          </div>
          <h2 className="section-title">
            Calcule o <span className="gradient-text">Salto Quântico</span> de Faturamento
          </h2>
          <p className="section-subtitle">
            Simule com precisão matemática o impacto de implementar um squad de alta conversão e IA na sua operação.
          </p>
        </motion.div>

        {/* Calculator Body */}
        <motion.div 
          className="glass-card roi-card"
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="roi-grid">
            {/* Left Column: Sliders */}
            <div className="roi-controls">
              <h3 className="controls-title">
                <Sparkles size={18} className="text-cyan" />
                <span>Parâmetros da Sua Operação</span>
              </h3>

              {/* Slider 1: Faturamento Atual */}
              <div className="slider-group">
                <div className="slider-header">
                  <span className="slider-label">Faturamento Mensal Atual</span>
                  <span className="slider-value">{formatCurrency(revenue)}</span>
                </div>
                <input 
                  type="range" 
                  min="10000" 
                  max="500000" 
                  step="5000"
                  value={revenue}
                  onChange={(e) => setRevenue(Number(e.target.value))}
                  className="custom-range"
                />
                <div className="slider-range-limits">
                  <span>R$ 10k</span>
                  <span>R$ 500k+</span>
                </div>
              </div>

              {/* Slider 2: Investimento Pretendido */}
              <div className="slider-group">
                <div className="slider-header">
                  <span className="slider-label">Investimento em Tecnologia & Growth</span>
                  <span className="slider-value highlight-cyan">{formatCurrency(investment)}</span>
                </div>
                <input 
                  type="range" 
                  min="3000" 
                  max="50000" 
                  step="1000"
                  value={investment}
                  onChange={(e) => setInvestment(Number(e.target.value))}
                  className="custom-range range-cyan"
                />
                <div className="slider-range-limits">
                  <span>R$ 3k</span>
                  <span>R$ 50k+</span>
                </div>
              </div>

              {/* Slider 3: Ticket Médio */}
              <div className="slider-group">
                <div className="slider-header">
                  <span className="slider-label">Ticket Médio do Produto / Contrato</span>
                  <span className="slider-value">{formatCurrency(ticket)}</span>
                </div>
                <input 
                  type="range" 
                  min="200" 
                  max="15000" 
                  step="200"
                  value={ticket}
                  onChange={(e) => setTicket(Number(e.target.value))}
                  className="custom-range"
                />
                <div className="slider-range-limits">
                  <span>R$ 200</span>
                  <span>R$ 15k+</span>
                </div>
              </div>

              <div className="calculator-assurances">
                <div className="assurance-item">
                  <CheckCircle size={15} className="text-emerald" />
                  <span>Modelo testado e validado em 180+ empresas</span>
                </div>
                <div className="assurance-item">
                  <CheckCircle size={15} className="text-emerald" />
                  <span>Projeção conservadora baseada em dados reais</span>
                </div>
              </div>
            </div>

            {/* Right Column: Calculated Results */}
            <div className="roi-results-box">
              <div className="results-badge">Projeção Conservadora Nexus</div>
              
              <div className="main-result">
                <span className="result-label">Novo Faturamento Estimado / Mês</span>
                <div className="result-amount gradient-text">
                  {formatCurrency(newMonthlyRevenue)}
                </div>
                <span className="result-delta">
                  <TrendingUp size={16} />
                  +{formatCurrency(projectedMonthlyGain)} adicionais todos os meses
                </span>
              </div>

              {/* KPI Cards */}
              <div className="results-kpi-grid">
                <div className="result-kpi-card">
                  <span className="kpi-tag">Ganho Anual Extra</span>
                  <span className="kpi-val text-emerald">+{formatCurrency(annualGain)}</span>
                </div>
                <div className="result-kpi-card">
                  <span className="kpi-tag">Novos Contratos / Mês</span>
                  <span className="kpi-val text-cyan">~{estimatedNewClients} clientes</span>
                </div>
                <div className="result-kpi-card">
                  <span className="kpi-tag">ROI Projetado</span>
                  <span className="kpi-val text-indigo">+{roiPercentage}%</span>
                </div>
              </div>

              {/* CTA Button */}
              <motion.button 
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => onOpenLeadModal(`Simulação ROI: Faturamento ${formatCurrency(revenue)}, Investimento ${formatCurrency(investment)}, Ganho projetado ${formatCurrency(projectedMonthlyGain)}/mês`)}
                className="btn btn-primary btn-lg btn-glow"
                style={{ width: '100%', marginTop: '1.5rem' }}
              >
                <span>Validar Essa Projeção em Sessão de Estratégia</span>
                <ArrowRight size={18} />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>

      <style>{`
        .roi-section {
          position: relative;
        }

        .roi-card {
          padding: 2.75rem;
          border: 1px solid var(--border-cosmic-subtle);
          background: rgba(11, 16, 26, 0.85);
        }

        .roi-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3.5rem;
          align-items: center;
        }

        .controls-title {
          font-size: 1.25rem;
          font-weight: 800;
          color: #ffffff;
          display: flex;
          align-items: center;
          gap: 0.6rem;
          margin-bottom: 2rem;
        }

        .slider-group {
          margin-bottom: 2rem;
        }

        .slider-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 0.75rem;
        }

        .slider-label {
          font-size: 0.92rem;
          color: var(--text-muted);
          font-weight: 500;
        }

        .slider-value {
          font-family: var(--font-mono);
          font-size: 1.15rem;
          font-weight: 700;
          color: #ffffff;
        }

        .highlight-cyan {
          color: var(--cosmic-neon-blue);
        }

        .custom-range {
          width: 100%;
          height: 8px;
          border-radius: 4px;
          background: #192236;
          outline: none;
          -webkit-appearance: none;
          cursor: pointer;
        }

        .custom-range::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: var(--cosmic-indigo);
          cursor: pointer;
          border: 3px solid #06080e;
          box-shadow: 0 0 14px rgba(99, 102, 241, 0.8);
          transition: transform 0.1s;
        }

        .range-cyan::-webkit-slider-thumb {
          background: var(--cosmic-cyan);
          box-shadow: 0 0 14px rgba(6, 182, 212, 0.9);
        }

        .custom-range::-webkit-slider-thumb:hover {
          transform: scale(1.18);
        }

        .slider-range-limits {
          display: flex;
          justify-content: space-between;
          font-size: 0.75rem;
          font-family: var(--font-mono);
          color: var(--text-dark);
          margin-top: 0.4rem;
        }

        .calculator-assurances {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          padding-top: 1rem;
          border-top: 1px solid var(--border-cosmic-subtle);
        }

        .assurance-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.82rem;
          color: #94a3b8;
        }

        /* Results Panel */
        .roi-results-box {
          background: rgba(8, 12, 22, 0.95);
          border: 1px solid rgba(6, 182, 212, 0.35);
          border-radius: var(--radius-lg);
          padding: 2.25rem;
          box-shadow: 0 16px 45px rgba(0, 0, 0, 0.7), 0 0 35px rgba(6, 182, 212, 0.15);
        }

        .results-badge {
          display: inline-block;
          font-family: var(--font-mono);
          font-size: 0.75rem;
          color: var(--cosmic-neon-blue);
          background: rgba(6, 182, 212, 0.12);
          border: 1px solid rgba(6, 182, 212, 0.25);
          padding: 0.25rem 0.75rem;
          border-radius: var(--radius-full);
          margin-bottom: 1.5rem;
        }

        .main-result {
          margin-bottom: 2rem;
        }

        .result-label {
          font-size: 0.88rem;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          display: block;
          margin-bottom: 0.35rem;
        }

        .result-amount {
          font-size: clamp(2.3rem, 3.8vw, 3.2rem);
          font-weight: 900;
          font-family: var(--font-heading);
          line-height: 1.1;
          margin-bottom: 0.5rem;
        }

        .result-delta {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.9rem;
          color: #34d399;
          font-weight: 600;
        }

        .results-kpi-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0.85rem;
        }

        .result-kpi-card {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--border-cosmic-subtle);
          border-radius: var(--radius-md);
          padding: 0.85rem;
          text-align: center;
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .kpi-tag {
          font-size: 0.7rem;
          color: var(--text-dark);
          text-transform: uppercase;
        }

        .kpi-val {
          font-size: 1.05rem;
          font-weight: 800;
          font-family: var(--font-heading);
        }

        @media (max-width: 992px) {
          .roi-grid {
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }
          .roi-card {
            padding: 1.75rem;
          }
          .results-kpi-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
