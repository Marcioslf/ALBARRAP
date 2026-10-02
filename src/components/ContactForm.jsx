import React, { useState } from 'react';
import { Send, CheckCircle2, Shield, Sparkles, MessageCircle, Clock, ArrowRight } from 'lucide-react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    revenue: '50k-100k',
    goal: 'Aumentar taxa de conversão e leads',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1200);
  };

  return (
    <section id="contato" className="section contact-section">
      <div className="container">
        <div className="glass-card contact-wrapper">
          {/* Left Column: Value proposition of the session */}
          <div className="contact-info-col">
            <div className="section-tag">
              <Sparkles size={14} />
              <span>Sessão Estratégica Gratuita</span>
            </div>

            <h2 className="contact-title">
              Pronto Para Destravar a <span className="gradient-text">Próxima Fase de Escala</span> da Sua Empresa?
            </h2>

            <p className="contact-desc">
              Agende uma sessão diagnóstica de 45 minutos com um de nossos diretores de estratégia. Analisaremos seus números, gargalos de conversão e apresentaremos um plano de ação prático.
            </p>

            <div className="contact-perks-list">
              <div className="perk-item">
                <div className="perk-icon-box">
                  <Clock size={18} />
                </div>
                <div>
                  <h4 className="perk-heading">Diagnóstico Direto ao Ponto</h4>
                  <p className="perk-sub">Sem enrolação: 45 min focados exclusivamente no seu funil e tecnologia.</p>
                </div>
              </div>

              <div className="perk-item">
                <div className="perk-icon-box">
                  <Shield size={18} />
                </div>
                <div>
                  <h4 className="perk-heading">NDA & Sigilo Absoluto</h4>
                  <p className="perk-sub">Todas as suas métricas e dados de faturamento são tratados com total confidencialidade.</p>
                </div>
              </div>

              <div className="perk-item">
                <div className="perk-icon-box">
                  <MessageCircle size={18} />
                </div>
                <div>
                  <h4 className="perk-heading">Retorno em até 2 Horas</h4>
                  <p className="perk-sub">Nosso time entrará em contato diretamente pelo WhatsApp para agendamento.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Form */}
          <div className="contact-form-col">
            {isSubmitted ? (
              <div className="form-success-box">
                <div className="success-icon-wrap">
                  <CheckCircle2 size={48} color="#10b981" />
                </div>
                <h3 className="success-title">Diagnóstico Solicitado com Sucesso!</h3>
                <p className="success-desc">
                  Recebemos suas informações, <strong>{formData.name}</strong>. Um de nossos consultores seniores entrará em contato via WhatsApp nas próximas horas para confirmar o horário da sua sessão.
                </p>
                <div className="success-action-box">
                  <a 
                    href={`https://wa.me/5511999999999?text=Ol%C3%A1,%20acabei%20de%20solicitar%20o%20diagn%C3%B3stico%20no%20site%20da%20Nexus%20para%20a%20empresa%20${encodeURIComponent(formData.company || 'minha empresa')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-primary btn-glow"
                    style={{ width: '100%' }}
                  >
                    <MessageCircle size={18} />
                    <span>Falar Imediatamente no WhatsApp</span>
                  </a>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="diagnostic-form">
                <h3 className="form-title">Preencha os Dados Para Iniciar</h3>

                <div className="form-group-row">
                  <div className="form-field">
                    <label className="field-label">Seu Nome Completo *</label>
                    <input 
                      type="text" 
                      required
                      placeholder="Ex: Carlos Mendes"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="form-input"
                    />
                  </div>

                  <div className="form-field">
                    <label className="field-label">E-mail Profissional *</label>
                    <input 
                      type="email" 
                      required
                      placeholder="carlos@empresa.com.br"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="form-group-row">
                  <div className="form-field">
                    <label className="field-label">WhatsApp com DDD *</label>
                    <input 
                      type="tel" 
                      required
                      placeholder="(11) 99999-9999"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="form-input"
                    />
                  </div>

                  <div className="form-field">
                    <label className="field-label">Nome da Empresa / Site</label>
                    <input 
                      type="text" 
                      placeholder="Ex: SuaEmpresa.com.br"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="form-field">
                  <label className="field-label">Faixa de Faturamento Mensal Atual</label>
                  <select 
                    value={formData.revenue}
                    onChange={(e) => setFormData({ ...formData, revenue: e.target.value })}
                    className="form-select"
                  >
                    <option value="ate-30k">Até R$ 30.000 / mês</option>
                    <option value="30k-100k">De R$ 30.000 a R$ 100.000 / mês</option>
                    <option value="100k-500k">De R$ 100.000 a R$ 500.000 / mês</option>
                    <option value="acima-500k">Acima de R$ 500.000 / mês (Enterprise)</option>
                  </select>
                </div>

                <div className="form-field">
                  <label className="field-label">Qual é o seu principal objetivo ou desafio atual?</label>
                  <select 
                    value={formData.goal}
                    onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
                    className="form-select"
                  >
                    <option value="conversao-lps">Aumentar taxa de conversão e gerar mais leads</option>
                    <option value="trafego-escala">Escalar tráfego pago reduzindo o CAC</option>
                    <option value="automacao-ia">Implementar automações e agentes de IA</option>
                    <option value="novo-produto-lp">Lançar novo produto ou reformular site/app</option>
                    <option value="rebranding-posicionamento">Rebranding e elevar ticket médio</option>
                  </select>
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="btn btn-primary btn-lg btn-glow submit-form-btn"
                >
                  {isSubmitting ? (
                    <span>Processando Diagnóstico...</span>
                  ) : (
                    <>
                      <span>Solicitar Diagnóstico Estratégico Gratuito</span>
                      <ArrowRight size={18} />
                    </>
                  )}
                </button>

                <span className="form-security-note">
                  <Shield size={14} /> Seus dados estão 100% seguros. Não enviamos spam.
                </span>
              </form>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .contact-section {
          position: relative;
        }

        .contact-wrapper {
          display: grid;
          grid-template-columns: 1fr 1.15fr;
          gap: 3.5rem;
          padding: 3.5rem;
          border: 1px solid rgba(99, 102, 241, 0.3);
          background: linear-gradient(135deg, rgba(16, 22, 34, 0.95), rgba(99, 102, 241, 0.08));
        }

        .contact-info-col {
          display: flex;
          flex-direction: column;
        }

        .contact-title {
          font-size: clamp(2rem, 3.2vw, 2.7rem);
          font-weight: 900;
          line-height: 1.15;
          margin-bottom: 1.25rem;
        }

        .contact-desc {
          font-size: 1.05rem;
          line-height: 1.7;
          color: var(--text-muted);
          margin-bottom: 2.25rem;
        }

        .contact-perks-list {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .perk-item {
          display: flex;
          gap: 1rem;
        }

        .perk-icon-box {
          width: 40px;
          height: 40px;
          border-radius: var(--radius-sm);
          background: rgba(99, 102, 241, 0.15);
          border: 1px solid rgba(99, 102, 241, 0.3);
          color: var(--cyan-light);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .perk-heading {
          font-size: 1rem;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 0.2rem;
        }

        .perk-sub {
          font-size: 0.85rem;
          color: var(--text-dark);
          margin: 0;
          line-height: 1.4;
        }

        /* Form */
        .diagnostic-form {
          background: rgba(10, 14, 22, 0.8);
          border: 1px solid var(--border-medium);
          border-radius: var(--radius-lg);
          padding: 2.25rem;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .form-title {
          font-size: 1.25rem;
          font-weight: 800;
          color: #ffffff;
          margin-bottom: 0.5rem;
        }

        .form-group-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }

        .form-field {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }

        .field-label {
          font-size: 0.82rem;
          font-weight: 600;
          color: #cbd5e1;
        }

        .form-input, .form-select {
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid var(--border-medium);
          border-radius: var(--radius-sm);
          padding: 0.75rem 1rem;
          color: #ffffff;
          font-size: 0.95rem;
          outline: none;
          transition: all var(--transition-fast);
        }

        .form-input:focus, .form-select:focus {
          border-color: var(--primary);
          box-shadow: 0 0 15px rgba(99, 102, 241, 0.35);
          background: rgba(255, 255, 255, 0.08);
        }

        .form-select option {
          background: #0f1420;
          color: #ffffff;
        }

        .submit-form-btn {
          width: 100%;
          margin-top: 0.5rem;
        }

        .form-security-note {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.4rem;
          font-size: 0.78rem;
          color: var(--text-dark);
          text-align: center;
        }

        /* Success State */
        .form-success-box {
          background: rgba(10, 14, 22, 0.8);
          border: 1px solid rgba(16, 185, 129, 0.4);
          border-radius: var(--radius-lg);
          padding: 3rem 2rem;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .success-icon-wrap {
          margin-bottom: 1.5rem;
        }

        .success-title {
          font-size: 1.6rem;
          font-weight: 800;
          color: #ffffff;
          margin-bottom: 0.85rem;
        }

        .success-desc {
          font-size: 1rem;
          color: var(--text-muted);
          line-height: 1.6;
          margin-bottom: 2rem;
          max-width: 440px;
        }

        .success-action-box {
          width: 100%;
        }

        @media (max-width: 992px) {
          .contact-wrapper {
            grid-template-columns: 1fr;
            padding: 2rem;
          }
          .form-group-row {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
