import React from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { TrendingUp, Zap, Cpu, Orbit, Sparkles, Radio, Shield } from 'lucide-react';

export default function CosmicHeroVisual3D() {
  // 3D Mouse Parallax Effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 120 };
  const rotateX = useSpring(useTransform(mouseY, [-200, 200], [15, -15]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-200, 200], [-15, 15]), springConfig);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div 
      className="cosmic-3d-stage"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div 
        className="cosmic-3d-container"
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      >
        {/* Core Glowing Nebula Aura */}
        <div className="cosmic-core-glow"></div>

        {/* 3D Celestial Orbital Rings */}
        <div className="orbital-ring ring-1"></div>
        <div className="orbital-ring ring-2"></div>
        <div className="orbital-ring ring-3"></div>

        {/* Central Holographic Sphere / Planet Core */}
        <div className="planet-core-wrapper">
          <div className="planet-core">
            <div className="planet-atmosphere"></div>
            <div className="planet-grid-mesh"></div>
            <div className="planet-center-badge">
              <Sparkles size={28} className="planet-icon text-cyan" />
              <span className="core-hud-label">NEXUS CORE</span>
            </div>
          </div>
        </div>

        {/* Orbiting Satellite Module 1 (Top Right) */}
        <motion.div 
          className="satellite-card sat-top-right glass-card"
          initial={{ y: 0 }}
          animate={{ y: [-8, 8, -8] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="sat-icon-wrap bg-cyan">
            <TrendingUp size={20} color="#38bdf8" />
          </div>
          <div className="sat-text">
            <div className="sat-header">
              <span className="sat-label">ROI Médio</span>
              <span className="sat-badge-emerald">+380%</span>
            </div>
            <span className="sat-value">Retorno em 90 dias</span>
          </div>
        </motion.div>

        {/* Orbiting Satellite Module 2 (Bottom Left) */}
        <motion.div 
          className="satellite-card sat-bottom-left glass-card"
          initial={{ y: 0 }}
          animate={{ y: [8, -8, 8] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        >
          <div className="sat-icon-wrap bg-purple">
            <Cpu size={20} color="#c084fc" />
          </div>
          <div className="sat-text">
            <div className="sat-header">
              <span className="sat-label">IA & Automação</span>
              <span className="live-status-dot"></span>
            </div>
            <span className="sat-value text-indigo">Agentes 24/7 Ativos</span>
          </div>
        </motion.div>

        {/* Orbiting Satellite Module 3 (Bottom Right) */}
        <motion.div 
          className="satellite-card sat-bottom-right glass-card"
          initial={{ y: 0 }}
          animate={{ y: [-6, 6, -6] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        >
          <div className="sat-icon-wrap bg-emerald">
            <Zap size={20} color="#34d399" />
          </div>
          <div className="sat-text">
            <div className="sat-header">
              <span className="sat-label">Taxa de Conversão</span>
              <span className="sat-badge-cyan">Top 1%</span>
            </div>
            <span className="sat-value text-emerald">14.8% Média em LPs</span>
          </div>
        </motion.div>

        {/* Central HUD Floating Data Ticker */}
        <div className="core-telemetry-panel glass-card">
          <div className="telemetry-row">
            <div className="telemetry-item">
              <span className="tel-label">STATUS</span>
              <span className="tel-val text-emerald">ONLINE (99.9%)</span>
            </div>
            <div className="tel-divider"></div>
            <div className="telemetry-item">
              <span className="tel-label">CLUSTER</span>
              <span className="tel-val text-cyan">ALPHA-Q3</span>
            </div>
            <div className="tel-divider"></div>
            <div className="telemetry-item">
              <span className="tel-label">LATÊNCIA</span>
              <span className="tel-val text-indigo">&lt; 38ms</span>
            </div>
          </div>
        </div>
      </motion.div>

      <style>{`
        .cosmic-3d-stage {
          position: relative;
          width: 100%;
          min-height: 480px;
          display: flex;
          align-items: center;
          justify-content: center;
          perspective: 1200px;
        }

        .cosmic-3d-container {
          position: relative;
          width: 100%;
          max-width: 480px;
          height: 480px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .cosmic-core-glow {
          position: absolute;
          width: 320px;
          height: 320px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(6, 182, 212, 0.35) 0%, rgba(99, 102, 241, 0.25) 45%, transparent 70%);
          filter: blur(50px);
          animation: cosmic-pulse 4s infinite ease-in-out;
          pointer-events: none;
        }

        /* 3D Rings */
        .orbital-ring {
          position: absolute;
          border-radius: 50%;
          border: 1px solid rgba(255, 255, 255, 0.12);
          pointer-events: none;
        }

        .ring-1 {
          width: 360px;
          height: 360px;
          border-color: rgba(6, 182, 212, 0.35);
          border-top-color: transparent;
          border-bottom-color: transparent;
          transform: rotateX(65deg) rotateY(15deg);
          animation: orbit-spin 20s linear infinite;
        }

        .ring-2 {
          width: 420px;
          height: 420px;
          border-color: rgba(99, 102, 241, 0.3);
          border-left-color: transparent;
          border-right-color: transparent;
          transform: rotateX(55deg) rotateY(-25deg);
          animation: orbit-spin-reverse 26s linear infinite;
        }

        .ring-3 {
          width: 460px;
          height: 460px;
          border: 1px dashed rgba(168, 85, 247, 0.25);
          transform: rotateX(75deg);
          animation: orbit-spin 35s linear infinite;
        }

        /* Planet Core */
        .planet-core-wrapper {
          position: relative;
          z-index: 2;
          width: 200px;
          height: 200px;
          border-radius: 50%;
          padding: 6px;
          background: linear-gradient(135deg, rgba(6, 182, 212, 0.4), rgba(99, 102, 241, 0.4));
          box-shadow: 0 0 50px rgba(6, 182, 212, 0.35), inset 0 0 30px rgba(99, 102, 241, 0.5);
        }

        .planet-core {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background: radial-gradient(circle at 35% 35%, #1e293b 0%, #0c101d 60%, #030407 100%);
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .planet-atmosphere {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          background: radial-gradient(circle at 75% 75%, transparent 50%, rgba(6, 182, 212, 0.35) 100%);
        }

        .planet-grid-mesh {
          position: absolute;
          inset: 0;
          background-image: 
            radial-gradient(rgba(255, 255, 255, 0.15) 1px, transparent 1px);
          background-size: 14px 14px;
          opacity: 0.6;
        }

        .planet-center-badge {
          position: relative;
          z-index: 3;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.35rem;
        }

        .planet-icon {
          animation: orbit-spin 10s linear infinite;
        }

        .core-hud-label {
          font-family: var(--font-mono);
          font-size: 0.68rem;
          font-weight: 700;
          color: #ffffff;
          letter-spacing: 0.12em;
        }

        /* Satellites */
        .satellite-card {
          position: absolute;
          z-index: 4;
          padding: 0.75rem 1.15rem;
          display: flex;
          align-items: center;
          gap: 0.85rem;
          border-radius: var(--radius-md);
          background: rgba(10, 14, 24, 0.85);
          border: 1px solid rgba(255, 255, 255, 0.14);
          box-shadow: 0 14px 35px rgba(0, 0, 0, 0.7), 0 0 25px rgba(6, 182, 212, 0.2);
          backdrop-filter: blur(16px);
        }

        .sat-top-right {
          top: 15px;
          right: -25px;
        }

        .sat-bottom-left {
          bottom: 45px;
          left: -35px;
        }

        .sat-bottom-right {
          bottom: 25px;
          right: -20px;
        }

        .sat-icon-wrap {
          width: 38px;
          height: 38px;
          border-radius: var(--radius-sm);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .bg-cyan {
          background: rgba(6, 182, 212, 0.15);
          border: 1px solid rgba(6, 182, 212, 0.35);
        }

        .bg-purple {
          background: rgba(168, 85, 247, 0.15);
          border: 1px solid rgba(168, 85, 247, 0.35);
        }

        .bg-emerald {
          background: rgba(16, 185, 129, 0.15);
          border: 1px solid rgba(16, 185, 129, 0.35);
        }

        .sat-text {
          display: flex;
          flex-direction: column;
          gap: 0.1rem;
        }

        .sat-header {
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }

        .sat-label {
          font-size: 0.72rem;
          color: var(--text-dark);
          text-transform: uppercase;
        }

        .sat-badge-emerald {
          font-family: var(--font-mono);
          font-size: 0.68rem;
          font-weight: 700;
          color: #34d399;
          background: rgba(16, 185, 129, 0.15);
          padding: 0.1rem 0.35rem;
          border-radius: 4px;
        }

        .sat-badge-cyan {
          font-family: var(--font-mono);
          font-size: 0.68rem;
          font-weight: 700;
          color: #38bdf8;
          background: rgba(6, 182, 212, 0.15);
          padding: 0.1rem 0.35rem;
          border-radius: 4px;
        }

        .live-status-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #34d399;
          box-shadow: 0 0 6px #34d399;
        }

        .sat-value {
          font-size: 0.88rem;
          font-weight: 700;
          color: #ffffff;
          white-space: nowrap;
        }

        /* Bottom Telemetry Ticker */
        .core-telemetry-panel {
          position: absolute;
          bottom: -30px;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(8, 12, 20, 0.92);
          border: 1px solid rgba(255, 255, 255, 0.12);
          padding: 0.5rem 1.25rem;
          border-radius: var(--radius-full);
          white-space: nowrap;
          z-index: 5;
        }

        .telemetry-row {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .telemetry-item {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-family: var(--font-mono);
          font-size: 0.72rem;
        }

        .tel-label {
          color: var(--text-dark);
        }

        .tel-val {
          font-weight: 700;
        }

        .tel-divider {
          width: 1px;
          height: 14px;
          background: rgba(255, 255, 255, 0.12);
        }

        @media (max-width: 992px) {
          .cosmic-3d-stage {
            min-height: 420px;
          }
          .satellite-card {
            padding: 0.6rem 0.85rem;
          }
          .sat-top-right {
            right: 0;
            top: 0;
          }
          .sat-bottom-left {
            left: 0;
            bottom: 30px;
          }
          .sat-bottom-right {
            right: 0;
            bottom: 10px;
          }
        }
      `}</style>
    </div>
  );
}
