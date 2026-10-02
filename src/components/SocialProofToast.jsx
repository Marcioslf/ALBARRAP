import React, { useState, useEffect } from 'react';
import { Sparkles, X, TrendingUp, CheckCircle } from 'lucide-react';

export default function SocialProofToast() {
  const notifications = [
    {
      title: "Novo Diagnóstico Agendado",
      desc: "Diretor Comercial de São Paulo agendou sessão há 14 minutos",
      icon: TrendingUp,
      tag: "Ao Vivo"
    },
    {
      title: "Novo Case de Sucesso",
      desc: "+340% de aumento em leads para FinTech B2B",
      icon: Sparkles,
      tag: "Resultado"
    },
    {
      title: "Sprint de Transformação Iniciado",
      desc: "Empresa de E-commerce iniciou onboarding hoje",
      icon: CheckCircle,
      tag: "Novo Projeto"
    }
  ];

  const [currentIdx, setCurrentIdx] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    if (isDismissed) return;

    // Show after initial 4 seconds
    const initialTimer = setTimeout(() => {
      setIsVisible(true);
    }, 4000);

    // Cycle every 10 seconds
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentIdx((prev) => (prev + 1) % notifications.length);
        setIsVisible(true);
      }, 800);
    }, 11000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, [isDismissed]);

  if (isDismissed || !isVisible) return null;

  const currentItem = notifications[currentIdx];
  const Icon = currentItem.icon;

  return (
    <div className="social-toast-container animate-slide-up">
      <div className="glass-card social-toast-box">
        <div className="toast-icon-wrap">
          <Icon size={18} />
        </div>
        <div className="toast-text-group">
          <div className="toast-header-row">
            <span className="toast-title">{currentItem.title}</span>
            <span className="toast-tag">{currentItem.tag}</span>
          </div>
          <p className="toast-desc">{currentItem.desc}</p>
        </div>
        <button 
          onClick={() => setIsDismissed(true)} 
          className="toast-close"
          aria-label="Fechar notificação"
        >
          <X size={14} />
        </button>
      </div>

      <style>{`
        .social-toast-container {
          position: fixed;
          bottom: 24px;
          left: 24px;
          z-index: 2500;
          max-width: 380px;
          animation: slideUp 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .social-toast-box {
          background: rgba(14, 20, 32, 0.92);
          border: 1px solid rgba(99, 102, 241, 0.35);
          backdrop-filter: blur(16px);
          border-radius: var(--radius-md);
          padding: 0.85rem 1rem;
          display: flex;
          align-items: center;
          gap: 0.85rem;
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.6), 0 0 20px rgba(99, 102, 241, 0.15);
        }

        .toast-icon-wrap {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: rgba(99, 102, 241, 0.15);
          border: 1px solid rgba(99, 102, 241, 0.3);
          color: var(--cyan-light);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .toast-text-group {
          display: flex;
          flex-direction: column;
          gap: 0.15rem;
          flex: 1;
        }

        .toast-header-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.5rem;
        }

        .toast-title {
          font-size: 0.82rem;
          font-weight: 700;
          color: #ffffff;
        }

        .toast-tag {
          font-family: var(--font-mono);
          font-size: 0.65rem;
          color: var(--emerald);
          background: rgba(16, 185, 129, 0.15);
          padding: 0.1rem 0.4rem;
          border-radius: var(--radius-full);
        }

        .toast-desc {
          font-size: 0.75rem;
          color: var(--text-muted);
          line-height: 1.3;
          margin: 0;
        }

        .toast-close {
          background: transparent;
          border: none;
          color: var(--text-dark);
          cursor: pointer;
          padding: 0.2rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .toast-close:hover {
          color: #ffffff;
        }

        @media (max-width: 600px) {
          .social-toast-container {
            bottom: 80px;
            left: 16px;
            right: 16px;
            max-width: none;
          }
        }
      `}</style>
    </div>
  );
}
