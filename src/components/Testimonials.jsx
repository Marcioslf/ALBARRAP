import React from 'react';
import { testimonialsData } from '../data/testimonialsData';
import { Star, MessageSquare, Quote, BadgeCheck } from 'lucide-react';

export default function Testimonials() {
  return (
    <section className="section testimonials-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag">
            <MessageSquare size={14} />
            <span>Voz de Quem Confia</span>
          </div>
          <h2 className="section-title">
            O Que Dizem os <span className="gradient-text">Fundadores & Executivos</span>
          </h2>
          <p className="section-subtitle">
            Relatos espontâneos de quem acelerou crescimento, modernizou seus produtos e multiplicou receita com nossa equipe.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid-2 testimonials-grid">
          {testimonialsData.map((item) => (
            <div key={item.id} className="glass-card testimonial-card">
              <div className="testimonial-card-top">
                <div className="stars-box">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} size={16} fill="#f59e0b" color="#f59e0b" />
                  ))}
                </div>
                <div className="result-tag">
                  <BadgeCheck size={14} />
                  <span>{item.result}</span>
                </div>
              </div>

              <p className="testimonial-text">
                "{item.text}"
              </p>

              <div className="testimonial-author-row">
                <img src={item.avatar} alt={item.name} className="author-avatar" />
                <div className="author-info">
                  <h4 className="author-name">{item.name}</h4>
                  <span className="author-role">{item.role} • <strong className="author-company">{item.company}</strong></span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .testimonials-section {
          background: radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.04) 0%, transparent 70%);
        }

        .testimonials-grid {
          gap: 2rem;
        }

        .testimonial-card {
          padding: 2.25rem;
          display: flex;
          flex-direction: column;
          border: 1px solid var(--border-subtle);
        }

        .testimonial-card:hover {
          border-color: rgba(99, 102, 241, 0.4);
        }

        .testimonial-card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.5rem;
        }

        .stars-box {
          display: flex;
          gap: 3px;
        }

        .result-tag {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          background: rgba(16, 185, 129, 0.12);
          border: 1px solid rgba(16, 185, 129, 0.25);
          color: #34d399;
          font-size: 0.75rem;
          font-weight: 700;
          padding: 0.25rem 0.65rem;
          border-radius: var(--radius-full);
        }

        .testimonial-text {
          font-size: 1.02rem;
          line-height: 1.7;
          color: #cbd5e1;
          margin-bottom: 2rem;
          font-style: italic;
        }

        .testimonial-author-row {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-top: auto;
          padding-top: 1.25rem;
          border-top: 1px solid var(--border-subtle);
        }

        .author-avatar {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          border: 2px solid rgba(99, 102, 241, 0.4);
          object-fit: cover;
        }

        .author-info {
          display: flex;
          flex-direction: column;
        }

        .author-name {
          font-size: 1rem;
          font-weight: 700;
          color: #ffffff;
        }

        .author-role {
          font-size: 0.8rem;
          color: var(--text-dark);
        }

        .author-company {
          color: var(--primary-light);
          font-weight: 600;
        }
      `}</style>
    </section>
  );
}
