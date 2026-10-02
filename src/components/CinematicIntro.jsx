import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Compass, Radio, Rocket, Volume2, VolumeX, ShieldCheck } from 'lucide-react';

export default function CinematicIntro({ onComplete }) {
  const [stage, setStage] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Check if intro was already seen in current session
    const seen = sessionStorage.getItem('nexus_cosmic_intro_seen');
    if (seen) {
      onComplete();
      return;
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            sessionStorage.setItem('nexus_cosmic_intro_seen', 'true');
            onComplete();
          }, 600);
          return 100;
        }
        return prev + 2;
      });
    }, 35);

    const timer1 = setTimeout(() => setStage(1), 600);
    const timer2 = setTimeout(() => setStage(2), 1400);

    return () => {
      clearInterval(interval);
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [onComplete]);

  const handleSkip = () => {
    sessionStorage.setItem('nexus_cosmic_intro_seen', 'true');
    onComplete();
  };

  return (
    <motion.div 
      className="cinematic-intro-overlay"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="intro-stars-glow"></div>

      <div className="intro-container">
        {/* HUD Top Bar */}
        <div className="intro-hud-top">
          <div className="hud-badge">
            <Radio size={14} className="hud-pulse" />
            <span>NEXUS // QUANTUM MISSION CONTROL</span>
          </div>
          <span className="hud-coords">SECTOR: ALPHA-09 // LAT: 45.22 // LNG: -122.31</span>
        </div>

        {/* Central Staggered Content */}
        <div className="intro-main-content">
          <motion.div 
            className="intro-logo-box"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="intro-icon-ring">
              <Sparkles size={32} className="text-cyan" />
            </div>
          </motion.div>

          <motion.h1 
            className="intro-title"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            NEXUS<span className="text-cyan">.</span>STUDIO
          </motion.h1>

          <motion.p 
            className="intro-tagline"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            {stage === 0 && "Iniciando telemetria de alta performance..."}
            {stage === 1 && "Calibrando agentes de IA e arquitetura quântica..."}
            {stage >= 2 && "Entrando em órbita de hipercrescimento..."}
          </motion.p>

          {/* Progress Bar & Telemetry */}
          <div className="intro-progress-wrapper">
            <div className="progress-bar-track">
              <motion.div 
                className="progress-bar-fill"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="progress-labels">
              <span>WARP ENGINE READY</span>
              <span>{progress}%</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar with Skip Action */}
        <div className="intro-hud-bottom">
          <button onClick={handleSkip} className="skip-intro-btn">
            <span>Pular Sequência</span>
            <span className="skip-key">ESC</span>
          </button>
        </div>
      </div>

      <style>{`
        .cinematic-intro-overlay {
          position: fixed;
          inset: 0;
          background: #030407;
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .intro-stars-glow {
          position: absolute;
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(6, 182, 212, 0.18) 0%, rgba(99, 102, 241, 0.12) 40%, transparent 70%);
          filter: blur(80px);
          animation: cosmic-pulse 4s infinite ease-in-out;
        }

        .intro-container {
          width: 100%;
          max-width: 900px;
          height: 100%;
          padding: 2.5rem 1.5rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          position: relative;
          z-index: 2;
        }

        .intro-hud-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-family: var(--font-mono);
          font-size: 0.78rem;
          color: var(--text-dark);
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          padding-bottom: 1rem;
        }

        .hud-badge {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--cosmic-neon-blue);
        }

        .hud-pulse {
          animation: pulse-glow 1.5s infinite;
        }

        .intro-main-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          margin: auto 0;
        }

        .intro-logo-box {
          margin-bottom: 1.5rem;
        }

        .intro-icon-ring {
          width: 72px;
          height: 72px;
          border-radius: 50%;
          background: rgba(6, 182, 212, 0.1);
          border: 1px solid rgba(6, 182, 212, 0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 0 35px rgba(6, 182, 212, 0.4);
          animation: orbit-spin 12s linear infinite;
        }

        .intro-title {
          font-size: clamp(2.5rem, 5vw, 4.2rem);
          font-weight: 900;
          letter-spacing: 0.12em;
          color: #ffffff;
          margin-bottom: 0.75rem;
          font-family: var(--font-heading);
        }

        .intro-tagline {
          font-family: var(--font-mono);
          font-size: 0.95rem;
          color: var(--text-muted);
          min-height: 28px;
          letter-spacing: 0.05em;
          margin-bottom: 2.5rem;
        }

        .intro-progress-wrapper {
          width: 100%;
          max-width: 380px;
        }

        .progress-bar-track {
          width: 100%;
          height: 4px;
          background: rgba(255, 255, 255, 0.08);
          border-radius: 4px;
          overflow: hidden;
          margin-bottom: 0.75rem;
        }

        .progress-bar-fill {
          height: 100%;
          background: linear-gradient(90deg, #6366f1, #06b6d4, #a855f7);
          box-shadow: 0 0 15px rgba(6, 182, 212, 0.8);
          transition: width 0.1s linear;
        }

        .progress-labels {
          display: flex;
          justify-content: space-between;
          font-family: var(--font-mono);
          font-size: 0.72rem;
          color: var(--text-dark);
          letter-spacing: 0.08em;
        }

        .intro-hud-bottom {
          display: flex;
          justify-content: flex-end;
          padding-top: 1rem;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
        }

        .skip-intro-btn {
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: var(--text-muted);
          padding: 0.4rem 0.85rem;
          border-radius: var(--radius-full);
          font-family: var(--font-mono);
          font-size: 0.75rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          transition: all var(--transition-fast);
        }

        .skip-intro-btn:hover {
          background: rgba(255, 255, 255, 0.1);
          color: #ffffff;
        }

        .skip-key {
          background: rgba(255, 255, 255, 0.1);
          padding: 0.1rem 0.35rem;
          border-radius: 4px;
          font-size: 0.65rem;
        }
      `}</style>
    </motion.div>
  );
}
