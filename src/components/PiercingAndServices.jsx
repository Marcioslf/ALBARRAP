import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCheck, FiArrowRight, FiShield, FiLayers } from 'react-icons/fi';
import { IoDiamondOutline } from 'react-icons/io5';
import { FaWhatsapp } from 'react-icons/fa6';
import { PIERCING_SERVICES, ARTIST_INFO } from '../data/tattoosData';

export default function PiercingAndServices() {
  const [activeTab, setActiveTab] = useState('tattoo');

  const openWhatsAppService = (serviceName) => {
    const text = encodeURIComponent(`Olá Nicolas! Gostaria de informações e agendamento para o serviço: ${serviceName} no Santa Fé Tattoo.`);
    window.open(`https://wa.me/${ARTIST_INFO.whatsappNumber}?text=${text}`, '_blank');
  };

  const tattooServices = [
    {
      title: "Fine Line & Micro Tattoo",
      tagline: "Traços Finos, Precisão Milimétrica",
      desc: "Linhas limpas e calibradas com agulhas 03RL e 05RL. Perfeito para botânica, borboletas, frases, numerais romanos e artes delicadas com alta durabilidade sem estourar o traço.",
      points: ["Pigmentação na profundidade exata da derme", "Cura uniforme e linhas nítidas", "Adaptação anatômica ao formato do corpo"],
      highlight: "Principal Foco"
    },
    {
      title: "Geek, Animes & Cartoon",
      tagline: "Cultura Pop, Mangás e Séries",
      desc: "Tatuagens fiéis ao estilo e traço original de animações (Hora de Aventura, Studio Ghibli, animes clássicos e games retrô) com contraste sólido.",
      points: ["Fidelidade ao design original", "Linhas expressivas e sólidas", "Criação de flashs autorais"],
      highlight: "Cultura Pop"
    },
    {
      title: "Dark, Gótico & Lettering",
      tagline: "Tipografia Blackletter e Sombras",
      desc: "Composições com estética gótica, texturas de renda, cruzes estilizadas, tipografia Old English e sombreados sutis em degradê.",
      points: ["Tipografia com impacto e presença", "Sombreamento suave e textura rica", "Design de atitude e durabilidade"],
      highlight: "Estilo Marcante"
    },
    {
      title: "Reformas & Flash Days",
      tagline: "Revitalização e Desenhos Prontos",
      desc: "Retoque de tatuagens antigas, revitalização de pigmentos desbotados e catálogo de flashs exclusivos prontos para tatuar.",
      points: ["Recuperação precisa de traços", "Flashs com valores acessíveis", "Projetos exclusivos"],
      highlight: "Sob Consulta"
    }
  ];

  return (
    <section id="services" className="mono-services-section">
      <div className="studio-container">
        {/* Section Header */}
        <motion.div 
          className="section-header-minimal"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="section-num">03 / ESPECIALIDADES & PROCEDIMENTOS</span>
          <h2 className="section-heading-text">TATUAGEM & BODY PIERCING</h2>
          <p className="section-desc-text">
            Do traço fino na derme às perfurações corporais com joalheria em Titânio Grau Implante (ASTM F136).
          </p>

          {/* Minimalist Switcher */}
          <div className="mono-tab-toggle">
            <motion.button 
              onClick={() => setActiveTab('tattoo')} 
              className={`toggle-tab-btn ${activeTab === 'tattoo' ? 'active' : ''}`}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <FiLayers size={16} />
              <span>Estilos de Tatuagem</span>
            </motion.button>
            <motion.button 
              onClick={() => setActiveTab('piercing')} 
              className={`toggle-tab-btn ${activeTab === 'piercing' ? 'active' : ''}`}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <IoDiamondOutline size={16} />
              <span>Body Piercing & Joias</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Tab Content with AnimatePresence */}
        <AnimatePresence mode="wait">
          {/* Tab 1: Tattoo Services */}
          {activeTab === 'tattoo' && (
            <motion.div 
              key="tab-tattoo"
              className="mono-services-grid"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              {tattooServices.map((srv, idx) => (
                <motion.div 
                  key={idx} 
                  className="mono-service-card minimal-card"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  whileHover={{ y: -6, transition: { duration: 0.2 } }}
                >
                  <div className="mono-service-badge">{srv.highlight}</div>
                  <h3 className="mono-service-title title-display">{srv.title}</h3>
                  <span className="mono-service-tagline">{srv.tagline}</span>
                  <p className="mono-service-desc">{srv.desc}</p>

                  <div className="mono-points-list">
                    {srv.points.map((p, pIdx) => (
                      <div key={pIdx} className="point-item">
                        <FiCheck size={16} className="point-icon" />
                        <span>{p}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mono-service-footer">
                    <motion.button 
                      onClick={() => openWhatsAppService(srv.title)}
                      className="btn-card-action btn-inspect w-full"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span>Orçar este Estilo</span>
                      <FiArrowRight size={14} />
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Tab 2: Piercing Services */}
          {activeTab === 'piercing' && (
            <motion.div 
              key="tab-piercing"
              className="mono-piercing-container"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              {/* Top Banner on Biosafety */}
              <div className="piercing-safety-banner minimal-card">
                <div className="banner-icon-box">
                  <FiShield size={32} />
                </div>
                <div className="banner-text">
                  <h4 className="banner-title title-display">PADRÃO HOSPITALAR & JOALHERIA BIOCOMPATÍVEL</h4>
                  <p className="banner-desc">
                    Trabalho exclusivamente com <strong>Titânio Grau Implante F136</strong> (polido espelhado, livre de níquel) e <strong>Aço Cirúrgico 316L</strong>. Perfuração realizada com cateteres americanos descartáveis abertos na sua frente.
                  </p>
                </div>
              </div>

              {/* Piercing Grid */}
              <div className="piercing-cards-grid">
                {PIERCING_SERVICES.map((p, pIdx) => (
                  <motion.div 
                    key={p.id} 
                    className="piercing-item-card minimal-card"
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: pIdx * 0.05 }}
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  >
                    <div className="piercing-card-header">
                      <span className="piercing-type-pill">{p.type}</span>
                      <span className="piercing-healing-tag">Cura: {p.healing}</span>
                    </div>

                    <h3 className="piercing-title title-display">{p.name}</h3>
                    <p className="piercing-desc">{p.description}</p>

                    <div className="piercing-details">
                      <div className="detail-row">
                        <span className="d-label">Joia Inicial:</span>
                        <span className="d-value">{p.jewelry}</span>
                      </div>
                      <div className="detail-row">
                        <span className="d-label">Desconforto:</span>
                        <span className="d-value">{p.pain}</span>
                      </div>
                    </div>

                    <div className="piercing-card-action">
                      <motion.button 
                        onClick={() => openWhatsAppService(`Aplicação Piercing ${p.name}`)}
                        className="btn-card-action btn-budget-direct w-full"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <FaWhatsapp size={14} />
                        <span>Agendar Perfuração</span>
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style>{`
        .mono-services-section {
          padding: 7rem 0 6rem;
          background-color: var(--bg-dark-void);
          border-top: 1px solid var(--border-subtle);
          position: relative;
        }

        .mono-tab-toggle {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.4rem;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-full);
          margin-top: 2rem;
        }

        .toggle-tab-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.65rem 1.4rem;
          border-radius: var(--radius-full);
          font-family: var(--font-mono);
          font-size: 0.78rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          background: transparent;
          border: none;
          color: var(--text-secondary);
          cursor: pointer;
          transition: all var(--trans-fast);
        }

        .toggle-tab-btn:hover {
          color: #ffffff;
        }

        .toggle-tab-btn.active {
          background: #ffffff;
          color: #000000;
          font-weight: 700;
          box-shadow: 0 0 16px rgba(255, 255, 255, 0.25);
        }

        /* Services Grid */
        .mono-services-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 2rem;
          margin-top: 3.5rem;
        }

        .mono-service-card {
          padding: 2.25rem 1.75rem 1.75rem 1.75rem;
          display: flex;
          flex-direction: column;
          position: relative;
        }

        .mono-service-badge {
          position: absolute;
          top: 1.25rem;
          right: 1.25rem;
          font-family: var(--font-mono);
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          padding: 0.25rem 0.6rem;
          border-radius: var(--radius-full);
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: var(--text-secondary);
        }

        .mono-service-title {
          font-size: 1.35rem;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 0.25rem;
        }

        .mono-service-tagline {
          font-family: var(--font-mono);
          font-size: 0.72rem;
          color: var(--text-dim);
          text-transform: uppercase;
          margin-bottom: 1rem;
        }

        .mono-service-desc {
          font-size: 0.88rem;
          color: var(--text-secondary);
          line-height: 1.6;
          margin-bottom: 1.5rem;
        }

        .mono-points-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          margin-bottom: 2rem;
        }

        .point-item {
          display: flex;
          align-items: flex-start;
          gap: 0.65rem;
          font-size: 0.82rem;
          color: var(--text-secondary);
          line-height: 1.4;
        }

        .point-icon {
          color: #ffffff;
          flex-shrink: 0;
          margin-top: 0.15rem;
        }

        .mono-service-footer {
          margin-top: auto;
        }

        .w-full {
          width: 100%;
        }

        /* Piercing Tab */
        .mono-piercing-container {
          margin-top: 3.5rem;
          display: flex;
          flex-direction: column;
          gap: 2.5rem;
        }

        .piercing-safety-banner {
          display: flex;
          align-items: center;
          gap: 2rem;
          padding: 2.25rem;
          background: linear-gradient(90deg, rgba(20,20,20,0.8) 0%, rgba(10,10,10,0.9) 100%);
          border-left: 3px solid #ffffff;
        }

        .banner-icon-box {
          width: 64px;
          height: 64px;
          border-radius: var(--radius-sm);
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--border-subtle);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ffffff;
          flex-shrink: 0;
        }

        .banner-title {
          font-size: 1.15rem;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 0.5rem;
        }

        .banner-desc {
          font-size: 0.9rem;
          color: var(--text-secondary);
          line-height: 1.6;
        }

        .banner-desc strong {
          color: #ffffff;
        }

        .piercing-cards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 1.75rem;
        }

        .piercing-item-card {
          padding: 1.75rem;
          display: flex;
          flex-direction: column;
        }

        .piercing-card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 0.75rem;
        }

        .piercing-type-pill {
          font-family: var(--font-mono);
          font-size: 0.65rem;
          font-weight: 700;
          text-transform: uppercase;
          color: #ffffff;
          padding: 0.2rem 0.55rem;
          background: rgba(255, 255, 255, 0.08);
          border-radius: 4px;
        }

        .piercing-healing-tag {
          font-family: var(--font-mono);
          font-size: 0.68rem;
          color: var(--text-dim);
        }

        .piercing-title {
          font-size: 1.25rem;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 0.5rem;
        }

        .piercing-desc {
          font-size: 0.82rem;
          color: var(--text-secondary);
          line-height: 1.5;
          margin-bottom: 1.25rem;
        }

        .piercing-details {
          display: flex;
          flex-direction: column;
          gap: 0.45rem;
          padding: 0.85rem;
          background: rgba(255, 255, 255, 0.02);
          border-radius: var(--radius-sm);
          border: 1px solid var(--border-subtle);
          margin-bottom: 1.5rem;
        }

        .detail-row {
          display: flex;
          justify-content: space-between;
          font-size: 0.75rem;
        }

        .d-label {
          color: var(--text-dim);
          font-family: var(--font-mono);
        }

        .d-value {
          color: #ffffff;
          font-weight: 600;
        }

        .piercing-card-action {
          margin-top: auto;
        }

        @media (max-width: 768px) {
          .piercing-safety-banner {
            flex-direction: column;
            align-items: flex-start;
            gap: 1.25rem;
            padding: 1.5rem;
          }
          .mono-services-grid {
            grid-template-columns: 1fr;
          }
          .piercing-cards-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
