import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Play, CheckCircle2, TrendingUp, Zap, Shield, Star, Radio, Compass, Sparkles } from 'lucide-react';
import CosmicHeroVisual3D from './CosmicHeroVisual3D';

export default function Hero({ onOpenLeadModal }) {
  // Container stagger animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  return (
    <section className="hero-section">
      {/* Aurora Ambient Atmosphere */}
      <div className="aurora-glow-blob aurora-1"></div>
      <div className="aurora-glow-blob aurora-2"></div>
      
      <div className="container hero-container">
        {/* Left Column: Framer Motion Staggered Copy */}
        <motion.div 
          className="hero-content"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Mission Control Badge */}
          <motion.div variants={itemVariants} className="hero-cosmic-badge">
            <span className="cosmic-badge-icon">
              <Radio size={14} className="badge-radio-pulse" />
            </span>
            <span className="badge-text">ENGRENAGEM DE HIPERCRESCIMENTO DIGITAL</span>
            <span className="badge-pill">V4.2</span>
          </motion.div>

          {/* Cinematic Title */}
          <motion.h1 variants={itemVariants} className="hero-title">
            Impulsionamos Sua Marca Para a <span className="gradient-text">Vanguarda Cósmica</span> de Resultados.
          </motion.h1>

          {/* Subtitle */}
          <motion.p variants={itemVariants} className="hero-description">
            Fundimos <strong>UI/UX cinematográfico de nível global</strong>, <strong>agentes autônomos de IA</strong> e <strong>Growth Hacking de precisão quântica</strong> para transformar negócios em potências com tração exponencial e ROI inegável.
          </motion.p>

          {/* Trust Checkpoints */}
          <motion.div variants={itemVariants} className="hero-proof-points">
            <div className="proof-item">
              <CheckCircle2 size={18} className="proof-icon" />
              <span>Sprints de Alta Frequência (14 Dias)</span>
            </div>
            <div className="proof-item">
              <CheckCircle2 size={18} className="proof-icon" />
              <span>Engenharia de Conversão (LPs 99.8%)</span>
            </div>
            <div className="proof-item">
              <CheckCircle2 size={18} className="proof-icon" />
              <span>Squad Sênior Dedicado</span>
            </div>
          </motion.div>

          {/* Action CTAs */}
          <motion.div variants={itemVariants} className="hero-cta-group">
            <motion.button 
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onOpenLeadModal("Hero - Iniciar Missão de Escala")}
              className="btn btn-primary btn-lg btn-glow"
            >
              <span>Iniciar Missão de Escala</span>
              <ArrowRight size={20} />
            </motion.button>

            <motion.a 
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              href="#cases" 
              className="btn btn-secondary btn-lg"
            >
              <Play size={17} fill="currentColor" />
              <span>Explorar Universo de Cases</span>
            </motion.a>
          </motion.div>

          {/* Social Proof Rating */}
          <motion.div variants={itemVariants} className="hero-rating-box">
            <div className="avatar-group">
              <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=60&auto=format&fit=crop&q=80" alt="Cliente" className="avatar-mini" />
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&auto=format&fit=crop&q=80" alt="Cliente" className="avatar-mini" />
              <img src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=60&auto=format&fit=crop&q=80" alt="Cliente" className="avatar-mini" />
              <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=60&auto=format&fit=crop&q=80" alt="Cliente" className="avatar-mini" />
            </div>
            <div className="rating-info">
              <div className="stars-row">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={15} fill="#f59e0b" color="#f59e0b" />
                ))}
                <span className="rating-score">4.9 / 5.0</span>
              </div>
              <p className="rating-caption">+180 empresas em órbita de hipercrescimento</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Column: 3D Hologram & Orbital Satellites Visual */}
        <motion.div 
          className="hero-visual-3d"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <CosmicHeroVisual3D />
        </motion.div>
      </div>

      <style>{`
        .hero-section {
          padding-top: 10rem;
          padding-bottom: 5.5rem;
          position: relative;
          overflow: hidden;
          z-index: 2;
        }

        .aurora-glow-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(140px);
          pointer-events: none;
          z-index: 0;
        }

        .aurora-1 {
          width: 550px;
          height: 550px;
          background: rgba(6, 182, 212, 0.16);
          top: 0%;
          left: 5%;
        }

        .aurora-2 {
          width: 500px;
          height: 500px;
          background: rgba(168, 85, 247, 0.14);
          top: 20%;
          right: 0%;
        }

        .hero-container {
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          gap: 3.5rem;
          align-items: center;
          position: relative;
          z-index: 2;
        }

        .hero-content {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .hero-cosmic-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.65rem;
          background: rgba(6, 182, 212, 0.08);
          border: 1px solid rgba(6, 182, 212, 0.3);
          backdrop-filter: blur(12px);
          padding: 0.4rem 0.95rem;
          border-radius: var(--radius-full);
          font-family: var(--font-mono);
          font-size: 0.78rem;
          font-weight: 600;
          color: var(--cosmic-neon-blue);
          margin-bottom: 1.5rem;
          box-shadow: 0 0 20px rgba(6, 182, 212, 0.15);
        }

        .cosmic-badge-icon {
          display: flex;
          align-items: center;
          color: #38bdf8;
        }

        .badge-radio-pulse {
          animation: pulse-glow 1.8s infinite;
        }

        .badge-pill {
          background: var(--cosmic-indigo);
          color: #ffffff;
          padding: 0.15rem 0.5rem;
          border-radius: var(--radius-full);
          font-size: 0.68rem;
        }

        .hero-title {
          font-size: clamp(2.5rem, 4.4vw, 3.9rem);
          font-weight: 900;
          line-height: 1.08;
          letter-spacing: -0.03em;
          margin-bottom: 1.35rem;
        }

        .hero-description {
          font-size: 1.15rem;
          line-height: 1.75;
          color: var(--text-muted);
          margin-bottom: 2rem;
          max-width: 620px;
        }

        .hero-description strong {
          color: #ffffff;
          font-weight: 600;
        }

        .hero-proof-points {
          display: flex;
          flex-wrap: wrap;
          gap: 1.25rem;
          margin-bottom: 2.25rem;
        }

        .proof-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.88rem;
          color: #cbd5e1;
          font-weight: 500;
        }

        .proof-icon {
          color: var(--cosmic-emerald);
          flex-shrink: 0;
        }

        .hero-cta-group {
          display: flex;
          flex-wrap: wrap;
          gap: 1.25rem;
          margin-bottom: 2.5rem;
          width: 100%;
        }

        .hero-rating-box {
          display: flex;
          align-items: center;
          gap: 1.25rem;
          padding-top: 1.5rem;
          border-top: 1px solid var(--border-cosmic-subtle);
          width: 100%;
        }

        .avatar-group {
          display: flex;
          align-items: center;
        }

        .avatar-mini {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          border: 2px solid var(--bg-void);
          object-fit: cover;
          margin-left: -10px;
        }

        .avatar-mini:first-child {
          margin-left: 0;
        }

        .rating-info {
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
        }

        .stars-row {
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }

        .rating-score {
          font-weight: 700;
          font-size: 0.85rem;
          color: #ffffff;
          margin-left: 0.35rem;
        }

        .rating-caption {
          font-size: 0.82rem;
          color: var(--text-dark);
          margin: 0;
        }

        .hero-visual-3d {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        @media (max-width: 992px) {
          .hero-container {
            grid-template-columns: 1fr;
            gap: 3.5rem;
          }
          .hero-content {
            align-items: center;
            text-align: center;
          }
          .hero-proof-points {
            justify-content: center;
          }
          .hero-cta-group {
            justify-content: center;
          }
          .hero-rating-box {
            justify-content: center;
          }
        }
      `}</style>
    </section>
  );
}
