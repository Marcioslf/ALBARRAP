import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaPlay, 
  FaPause, 
  FaVolumeHigh, 
  FaVolumeXmark, 
  FaExpand, 
  FaWhatsapp, 
  FaInstagram, 
  FaXmark, 
  FaArrowRight, 
  FaShieldHalved,
  FaCircleDot
} from 'react-icons/fa6';
import { ARTIST_INFO } from '../data/tattoosData';

const STUDIO_VIDEOS = [
  {
    id: 'video-fineline',
    title: 'Fine Line em Ação',
    category: 'Processo & Técnica',
    badge: '03RL MICRO-TRAÇO',
    duration: '0:24',
    poster: '/images/video-thumb-fineline.jpg',
    frames: [
      '/images/video-thumb-fineline.jpg',
      '/images/video-frames/fineline-frame.jpg'
    ],
    videoSrc: '/videos/fineline-action.mp4',
    description: 'Depósito preciso de pigmento preto na derme com agulha 03RL. Traço contínuo, sem oscilações, projetado para cicatrização nítida e duradoura.',
    stats: 'Tinta Dynamic Black • 100% Descartável',
    isFeatured: false,
    tags: ['Fine Line', 'Traço Preciso', 'Pigmentação']
  },
  {
    id: 'video-presentation',
    title: 'Apresentação Oficial',
    artist: 'Nicolas Gabriel | AR062',
    category: 'O Artista & O Estúdio',
    badge: '⭐ EM DESTAQUE • APRESENTAÇÃO',
    duration: '0:45',
    poster: '/images/video-frames/artist-frame-1.png',
    frames: [
      '/images/video-frames/artist-frame-1.png',
      '/images/video-frames/artist-frame-2.png',
      '/images/video-frames/artist-frame-3.png',
      '/images/video-frames/artist-frame-4.png'
    ],
    videoSrc: '/videos/artist-presentation.mp4',
    description: 'Conheça Nicolas Gabriel, tatuador e body piercer no Santa Fé Tattoo (Garavelo – GO). Entenda a dedicação ao traço autêntico, a evolução constante e o compromisso com cada cliente.',
    stats: '2 Anos de Trajetória • Santa Fé Tattoo',
    isFeatured: true,
    quote: '“Cada linha carrega técnica, respeito pela sua ideia e dedicação total à arte na pele.”',
    tags: ['Apresentação', 'Santa Fé Tattoo', 'Garavelo - GO']
  },
  {
    id: 'video-piercing',
    title: 'Piercing & Assepsia',
    category: 'Biossegurança Cirúrgica',
    badge: 'TITÂNIO F-136 • ASSEPSIA',
    duration: '0:19',
    poster: '/images/video-thumb-piercing.jpg',
    frames: [
      '/images/video-thumb-piercing.jpg',
      '/images/video-frames/piercing-frame.jpg'
    ],
    videoSrc: '/videos/piercing-procedure.mp4',
    description: 'Perfuração asséptica com agulha americana descartável, joalheria biocompatível em Titânio Grau Implante (ASTM F-136) e protocolo hospitalar completo.',
    stats: 'Autoclave Hospitalar • Titânio F-136',
    isFeatured: false,
    tags: ['Body Piercing', 'Titânio F-136', 'Biossegurança']
  }
];

export default function StudioVideos() {
  const [playingStates, setPlayingStates] = useState({
    'video-fineline': true,
    'video-presentation': true,
    'video-piercing': true,
  });
  
  const [frameIndices, setFrameIndices] = useState({
    'video-fineline': 0,
    'video-presentation': 0,
    'video-piercing': 0,
  });

  const [isMuted, setIsMuted] = useState(true);
  const [showMuteToast, setShowMuteToast] = useState(false);
  const [activeModalVideo, setActiveModalVideo] = useState(null);
  
  const [progresses, setProgresses] = useState({
    'video-fineline': 35,
    'video-presentation': 15,
    'video-piercing': 22,
  });

  // Dynamic progress scrubber
  useEffect(() => {
    const interval = setInterval(() => {
      setProgresses(prev => {
        const next = { ...prev };
        Object.keys(playingStates).forEach(id => {
          if (playingStates[id]) {
            next[id] = (prev[id] + 0.9) % 100;
          }
        });
        return next;
      });
    }, 150);

    return () => clearInterval(interval);
  }, [playingStates]);

  // Smooth perpetual video frames sequence loop (always running in background)
  useEffect(() => {
    const frameInterval = setInterval(() => {
      setFrameIndices(prev => {
        const next = { ...prev };
        Object.keys(playingStates).forEach(id => {
          if (playingStates[id]) {
            const video = STUDIO_VIDEOS.find(v => v.id === id);
            if (video && video.frames && video.frames.length > 1) {
              next[id] = (prev[id] + 1) % video.frames.length;
            }
          }
        });
        return next;
      });
    }, 550);

    return () => clearInterval(frameInterval);
  }, [playingStates]);

  // Hover / cursor pass trigger: immediately start playback as soon as cursor enters
  const handleCardHover = (id) => {
    if (!playingStates[id]) {
      setPlayingStates(prev => ({ ...prev, [id]: true }));
    }
  };

  const togglePlay = (id, e) => {
    e.stopPropagation();
    setPlayingStates(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleMute = (e) => {
    e.stopPropagation();
    setIsMuted(prev => !prev);
    setShowMuteToast(true);
    setTimeout(() => setShowMuteToast(false), 2000);
  };

  const openWhatsAppForVideo = (videoTitle) => {
    const text = encodeURIComponent(`Olá Nicolas! Vi o vídeo de "${videoTitle}" no site e gostaria de saber mais sobre orçamento e horários.`);
    window.open(`https://wa.me/${ARTIST_INFO.whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <section id="videos" className="studio-videos-section" aria-label="Vídeos do Estúdio em Destaque">
      <div className="studio-videos-container">
        {/* Section Header with Motion Reveal */}
        <motion.div 
          className="studio-videos-header"
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="sv-badge-wrapper">
            <span className="sv-live-pulse" />
            <span className="sv-badge-label">VÍDEOS EM TEMPO REAL // BASTIDORES</span>
          </div>

          <h2 className="sv-title">
            O TRABALHO EM <span className="sv-highlight">MOVIMENTO</span>.
          </h2>

          <p className="sv-subtitle">
            Acompanhe a precisão do traço na pele, os procedimentos de biossegurança e conheça Nicolas Gabriel em sua apresentação profissional no Santa Fé Tattoo.
          </p>
        </motion.div>

        {/* 3 Videos Side-by-Side Grid with Staggered Entrance */}
        <div className="sv-grid">
          {STUDIO_VIDEOS.map((video, idx) => {
            const isPlaying = playingStates[video.id];
            const currentFrameIdx = frameIndices[video.id] || 0;
            const progress = progresses[video.id] || 0;

            return (
              <motion.div 
                key={video.id} 
                className={`sv-card ${video.isFeatured ? 'is-featured-spotlight' : ''}`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.7, delay: idx * 0.12, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -8, transition: { duration: 0.25 } }}
                onMouseEnter={() => handleCardHover(video.id)}
                onMouseMove={() => handleCardHover(video.id)}
                onClick={() => setActiveModalVideo(video)}
              >
                {/* Visual Media Container (9:16 Aspect Ratio) */}
                <div className="sv-media-frame">
                  {/* Multi-Frame Animated Video Stream */}
                  <div className="sv-frames-viewport">
                    {video.frames.map((frameSrc, fIdx) => {
                      const isCurrent = fIdx === currentFrameIdx;
                      return (
                        <motion.img 
                          key={frameSrc}
                          src={frameSrc} 
                          alt={`${video.title} - cena ${fIdx + 1}`} 
                          className={`sv-poster-img ${isPlaying ? 'is-playing-motion' : 'is-paused'}`}
                          initial={false}
                          animate={{ 
                            opacity: isCurrent ? 1 : 0,
                            scale: isCurrent && isPlaying ? [1.02, 1.05, 1.03] : 1
                          }}
                          transition={{ 
                            opacity: { duration: 0.25, ease: "easeInOut" },
                            scale: { duration: 2.8, repeat: Infinity, ease: "easeInOut" }
                          }}
                        />
                      );
                    })}
                  </div>

                  {/* Dark Vignette Overlay */}
                  <div className="sv-gradient-overlay" />

                  {/* Top Status Bar & Badges */}
                  <div className="sv-card-topbar">
                    <span className={`sv-card-pill ${video.isFeatured ? 'featured-pill' : ''}`}>
                      {video.badge}
                    </span>

                    <div className="sv-card-quick-actions" onClick={e => e.stopPropagation()}>
                      <button 
                        className="sv-ctrl-btn" 
                        onClick={toggleMute}
                        title={isMuted ? 'Ativar som' : 'Silenciar som'}
                        aria-label="Controle de Áudio"
                      >
                        {isMuted ? <FaVolumeXmark size={12} /> : <FaVolumeHigh size={12} />}
                      </button>

                      <button 
                        className="sv-ctrl-btn" 
                        onClick={() => setActiveModalVideo(video)}
                        title="Expandir vídeo"
                        aria-label="Expandir vídeo"
                      >
                        <FaExpand size={11} />
                      </button>
                    </div>
                  </div>

                  {/* Center Play/Pause Indicator Bubble */}
                  <div className="sv-center-play-overlay">
                    <motion.button 
                      className={`sv-play-bubble ${isPlaying ? 'playing' : 'paused'}`}
                      onClick={(e) => togglePlay(video.id, e)}
                      whileHover={{ scale: 1.15 }}
                      whileTap={{ scale: 0.9 }}
                      title={isPlaying ? 'Pausar vídeo' : 'Reproduzir vídeo'}
                      aria-label="Reproduzir ou Pausar"
                    >
                      {isPlaying ? <FaPause size={14} /> : <FaPlay size={14} style={{ marginLeft: 2 }} />}
                    </motion.button>
                  </div>

                  {/* Equalizer Wave (Shows active live video playback) */}
                  <div className="sv-audio-equalizer">
                    <span className={`eq-bar bar-1 ${isPlaying ? 'animating' : ''}`} />
                    <span className={`eq-bar bar-2 ${isPlaying ? 'animating' : ''}`} />
                    <span className={`eq-bar bar-3 ${isPlaying ? 'animating' : ''}`} />
                    <span className={`eq-bar bar-4 ${isPlaying ? 'animating' : ''}`} />
                    <span className="eq-label">{isPlaying ? 'AO VIVO' : 'PAUSADO'}</span>
                  </div>

                  {/* Bottom Content Area */}
                  <div className="sv-bottom-content">
                    {video.isFeatured && (
                      <div className="sv-artist-tag">
                        <span className="sv-verified-dot" />
                        <span className="sv-artist-name">Nicolas Gabriel • AR062</span>
                      </div>
                    )}

                    <span className="sv-category-tag">{video.category}</span>
                    <h3 className="sv-card-title">{video.title}</h3>
                    
                    <p className="sv-card-desc">{video.description}</p>

                    {/* Meta stats */}
                    <div className="sv-meta-stats">
                      <FaShieldHalved size={11} className="sv-meta-icon" />
                      <span>{video.stats}</span>
                    </div>

                    {/* Interactive CTA */}
                    <div className="sv-cta-row">
                      <motion.button 
                        className="sv-watch-full-btn"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveModalVideo(video);
                        }}
                      >
                        <span>Assistir Detalhes</span>
                        <FaArrowRight size={10} />
                      </motion.button>

                      <motion.button 
                        className="sv-budget-btn"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          openWhatsAppForVideo(video.title);
                        }}
                        title="Tirar dúvida no WhatsApp"
                      >
                        <FaWhatsapp size={13} />
                        <span>Orçar</span>
                      </motion.button>
                    </div>
                  </div>

                  {/* Looping Time Scrubber Progress Bar */}
                  <div className="sv-progress-bar-wrap">
                    <div 
                      className="sv-progress-fill" 
                      style={{ width: `${isPlaying ? progress : 0}%` }}
                    />
                  </div>
                </div>

                {/* Spotlight Ambient Aura for Center Card */}
                {video.isFeatured && <div className="sv-spotlight-aura" />}
              </motion.div>
            );
          })}
        </div>

        {/* Micro Guarantee Note */}
        <motion.div 
          className="sv-footer-note"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <FaShieldHalved size={14} />
          <span>Todos os procedimentos gravados seguem normas estritas da Vigilância Sanitária e Anvisa no Santa Fé Tattoo (Garavelo – GO).</span>
        </motion.div>
      </div>

      {/* Toast Feedback for Mute Toggle */}
      <AnimatePresence>
        {showMuteToast && (
          <motion.div 
            className="sv-toast-feedback"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            {isMuted ? '🔇 Áudio Silenciado' : '🔊 Áudio Ativado (Demonstração)'}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Expanded Reel Modal with Smooth Framer Motion AnimatePresence */}
      <AnimatePresence>
        {activeModalVideo && (
          <motion.div 
            className="sv-modal-backdrop" 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveModalVideo(null)}
          >
            <motion.div 
              className="sv-modal-box" 
              initial={{ scale: 0.92, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              onClick={e => e.stopPropagation()}
            >
              <button 
                className="sv-modal-close" 
                onClick={() => setActiveModalVideo(null)}
                aria-label="Fechar"
              >
                <FaXmark size={18} />
              </button>

              <div className="sv-modal-grid">
                {/* Vertical Video Viewport */}
                <div className="sv-modal-video-side">
                  <div className="sv-modal-frames-wrap">
                    {activeModalVideo.frames.map((frameSrc, fIdx) => {
                      const isCurrent = fIdx === (frameIndices[activeModalVideo.id] || 0);
                      return (
                        <motion.img 
                          key={frameSrc}
                          src={frameSrc} 
                          alt={activeModalVideo.title} 
                          className="sv-modal-img"
                          initial={false}
                          animate={{ opacity: isCurrent ? 1 : 0 }}
                          transition={{ duration: 0.25, ease: "easeInOut" }}
                        />
                      );
                    })}
                  </div>
                  
                  <div className="sv-modal-video-overlay" />

                  <div className="sv-modal-video-badge">
                    <span>{activeModalVideo.badge}</span>
                  </div>

                  <div className="sv-modal-audio-bars">
                    <span className="eq-bar bar-1 animating" />
                    <span className="eq-bar bar-2 animating" />
                    <span className="eq-bar bar-3 animating" />
                    <span className="eq-bar bar-4 animating" />
                    <span className="eq-label">REPRODUZINDO</span>
                  </div>
                </div>

                {/* Information Side */}
                <div className="sv-modal-info-side">
                  <div className="sv-modal-category">{activeModalVideo.category}</div>
                  <h3 className="sv-modal-title">{activeModalVideo.title}</h3>
                  
                  {activeModalVideo.artist && (
                    <div className="sv-modal-author">
                      <div className="author-avatar">AR</div>
                      <div className="author-details">
                        <strong>{activeModalVideo.artist}</strong>
                        <span>Santa Fé Tattoo • Garavelo – GO</span>
                      </div>
                    </div>
                  )}

                  {activeModalVideo.quote && (
                    <blockquote className="sv-modal-quote">
                      {activeModalVideo.quote}
                    </blockquote>
                  )}

                  <p className="sv-modal-desc">{activeModalVideo.description}</p>

                  <div className="sv-modal-tags">
                    {activeModalVideo.tags.map(tag => (
                      <span key={tag} className="sv-modal-tag">#{tag}</span>
                    ))}
                  </div>

                  <div className="sv-modal-specs">
                    <div className="spec-item">
                      <span className="spec-label">Garantia Técnica</span>
                      <span className="spec-value">{activeModalVideo.stats}</span>
                    </div>
                    <div className="spec-item">
                      <span className="spec-label">Localização</span>
                      <span className="spec-value">{ARTIST_INFO.location}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="sv-modal-actions">
                    <motion.button 
                      className="sv-modal-cta-whatsapp"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => openWhatsAppForVideo(activeModalVideo.title)}
                    >
                      <FaWhatsapp size={16} />
                      <span>Orçar este Trabalho via WhatsApp</span>
                    </motion.button>

                    <a 
                      href={ARTIST_INFO.instagramUrl} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="sv-modal-cta-instagram"
                    >
                      <FaInstagram size={16} />
                      <span>Ver no Instagram Oficial</span>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .studio-videos-section {
          position: relative;
          padding: 7rem 1.5rem;
          background: linear-gradient(180deg, rgba(8,8,8,0.95) 0%, rgba(5,5,5,1) 50%, rgba(8,8,8,0.95) 100%);
          border-top: 1px solid rgba(255, 255, 255, 0.06);
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
          overflow: hidden;
        }

        .studio-videos-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        /* Header */
        .studio-videos-header {
          text-align: center;
          max-width: 720px;
          margin: 0 auto 3.5rem auto;
        }

        .sv-badge-wrapper {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.35rem 0.85rem;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 9999px;
          margin-bottom: 1.25rem;
        }

        .sv-live-pulse {
          width: 7px;
          height: 7px;
          background: #ffffff;
          border-radius: 50%;
          box-shadow: 0 0 8px rgba(255, 255, 255, 0.9);
          animation: pulseDot 2s infinite ease-in-out;
        }

        @keyframes pulseDot {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.5); opacity: 0.4; }
        }

        .sv-badge-label {
          font-family: 'Space Grotesk', monospace;
          font-size: 0.68rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.8);
          font-weight: 600;
        }

        .sv-title {
          font-family: 'Cinzel', 'Syne', serif;
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 700;
          letter-spacing: 0.02em;
          color: #ffffff;
          margin-bottom: 1rem;
          line-height: 1.15;
        }

        .sv-highlight {
          color: #ffffff;
          text-decoration: underline;
          text-decoration-thickness: 1px;
          text-underline-offset: 6px;
        }

        .sv-subtitle {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 0.95rem;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.65);
        }

        /* 3 Side-by-Side Cards Grid */
        .sv-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.75rem;
          align-items: center;
          margin-bottom: 2.5rem;
        }

        @media (max-width: 980px) {
          .sv-grid {
            grid-template-columns: 1fr;
            max-width: 440px;
            margin: 0 auto 2.5rem auto;
            gap: 2rem;
          }
        }

        /* Individual Card */
        .sv-card {
          position: relative;
          background: #0a0a0a;
          border-radius: 20px;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.1);
          cursor: pointer;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.6);
          transition: border-color 0.3s ease;
        }

        .sv-card:hover {
          border-color: rgba(255, 255, 255, 0.4);
        }

        /* Center Card Highlight (EM DESTAQUE) */
        .sv-card.is-featured-spotlight {
          border: 1.5px solid rgba(255, 255, 255, 0.65);
          box-shadow: 0 0 35px rgba(255, 255, 255, 0.08), 0 20px 45px rgba(0, 0, 0, 0.85);
          z-index: 2;
        }

        /* Media Frame (Aspect Ratio 9:16) */
        .sv-media-frame {
          position: relative;
          width: 100%;
          aspect-ratio: 9 / 15.5;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .sv-frames-viewport {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }

        .sv-poster-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center top;
          filter: grayscale(100%) contrast(110%);
        }

        .sv-gradient-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            180deg,
            rgba(0, 0, 0, 0.65) 0%,
            rgba(0, 0, 0, 0.1) 35%,
            rgba(0, 0, 0, 0.5) 65%,
            rgba(0, 0, 0, 0.95) 95%
          );
          pointer-events: none;
          z-index: 1;
        }

        /* Top Bar */
        .sv-card-topbar {
          position: relative;
          z-index: 2;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem 1rem 0.5rem 1rem;
        }

        .sv-card-pill {
          font-family: 'Space Grotesk', monospace;
          font-size: 0.62rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          padding: 0.28rem 0.65rem;
          background: rgba(0, 0, 0, 0.7);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 9999px;
          color: #ffffff;
        }

        .sv-card-pill.featured-pill {
          background: #ffffff;
          color: #000000;
          border-color: #ffffff;
          font-weight: 800;
          box-shadow: 0 0 12px rgba(255, 255, 255, 0.5);
        }

        .sv-card-quick-actions {
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }

        .sv-ctrl-btn {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: rgba(0, 0, 0, 0.65);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .sv-ctrl-btn:hover {
          background: #ffffff;
          color: #000000;
          border-color: #ffffff;
        }

        /* Center Play Bubble */
        .sv-center-play-overlay {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2;
          pointer-events: none;
        }

        .sv-play-bubble {
          pointer-events: auto;
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.5);
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          opacity: 0;
          transform: scale(0.85);
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .sv-card:hover .sv-play-bubble,
        .sv-play-bubble.paused {
          opacity: 1;
          transform: scale(1);
        }

        .sv-play-bubble:hover {
          background: #ffffff;
          color: #000000;
          border-color: #ffffff;
          box-shadow: 0 0 20px rgba(255, 255, 255, 0.6);
        }

        /* Audio Equalizer */
        .sv-audio-equalizer {
          position: absolute;
          top: 3.5rem;
          left: 1rem;
          z-index: 2;
          display: flex;
          align-items: flex-end;
          gap: 3px;
          padding: 0.25rem 0.5rem;
          background: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(6px);
          border-radius: 6px;
          border: 1px solid rgba(255, 255, 255, 0.15);
        }

        .eq-bar {
          width: 2.5px;
          background: #ffffff;
          border-radius: 1px;
          height: 4px;
        }

        .eq-bar.animating.bar-1 { animation: eqJump 1.1s infinite ease-in-out; }
        .eq-bar.animating.bar-2 { animation: eqJump 0.7s infinite 0.15s ease-in-out; }
        .eq-bar.animating.bar-3 { animation: eqJump 1.3s infinite 0.35s ease-in-out; }
        .eq-bar.animating.bar-4 { animation: eqJump 0.85s infinite 0.1s ease-in-out; }

        @keyframes eqJump {
          0%, 100% { height: 4px; }
          50% { height: 14px; }
        }

        .eq-label {
          font-family: 'Space Grotesk', monospace;
          font-size: 0.55rem;
          letter-spacing: 0.06em;
          color: rgba(255, 255, 255, 0.85);
          margin-left: 4px;
          font-weight: 700;
        }

        /* Bottom Content */
        .sv-bottom-content {
          position: relative;
          z-index: 2;
          padding: 1rem 1.15rem 1.15rem 1.15rem;
        }

        .sv-artist-tag {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          margin-bottom: 0.35rem;
        }

        .sv-verified-dot {
          width: 6px;
          height: 6px;
          background: #ffffff;
          border-radius: 50%;
          box-shadow: 0 0 6px rgba(255, 255, 255, 0.8);
        }

        .sv-artist-name {
          font-family: 'Space Grotesk', monospace;
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          color: #ffffff;
          text-transform: uppercase;
        }

        .sv-category-tag {
          display: block;
          font-family: 'Space Grotesk', monospace;
          font-size: 0.65rem;
          color: rgba(255, 255, 255, 0.5);
          letter-spacing: 0.06em;
          text-transform: uppercase;
          margin-bottom: 0.25rem;
        }

        .sv-card-title {
          font-family: 'Syne', 'Cinzel', sans-serif;
          font-size: 1.15rem;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 0.45rem;
          line-height: 1.25;
        }

        .sv-card-desc {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 0.78rem;
          line-height: 1.45;
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 0.75rem;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .sv-meta-stats {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-family: 'Space Grotesk', monospace;
          font-size: 0.66rem;
          color: rgba(255, 255, 255, 0.6);
          margin-bottom: 0.9rem;
        }

        .sv-meta-icon {
          color: rgba(255, 255, 255, 0.8);
        }

        /* CTA Row */
        .sv-cta-row {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 0.5rem;
          align-items: center;
        }

        .sv-watch-full-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.4rem;
          padding: 0.45rem 0.75rem;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 8px;
          color: #ffffff;
          font-family: 'Space Grotesk', sans-serif;
          font-size: 0.72rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .sv-watch-full-btn:hover {
          background: #ffffff;
          color: #000000;
          border-color: #ffffff;
        }

        .sv-budget-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.35rem;
          padding: 0.45rem 0.75rem;
          background: #ffffff;
          color: #000000;
          border: 1px solid #ffffff;
          border-radius: 8px;
          font-family: 'Space Grotesk', sans-serif;
          font-size: 0.72rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .sv-budget-btn:hover {
          background: #cccccc;
          border-color: #cccccc;
        }

        /* Progress Bar */
        .sv-progress-bar-wrap {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: rgba(255, 255, 255, 0.1);
          z-index: 3;
        }

        .sv-progress-fill {
          height: 100%;
          background: #ffffff;
          box-shadow: 0 0 6px rgba(255, 255, 255, 0.8);
          transition: width 0.15s linear;
        }

        /* Toast Feedback */
        .sv-toast-feedback {
          position: fixed;
          bottom: 2rem;
          right: 2rem;
          background: #ffffff;
          color: #000000;
          font-family: 'Space Grotesk', monospace;
          font-size: 0.78rem;
          font-weight: 700;
          padding: 0.65rem 1.25rem;
          border-radius: 9999px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.8);
          z-index: 99999;
          pointer-events: none;
        }

        /* Footer Note */
        .sv-footer-note {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.6rem;
          padding: 1rem;
          background: rgba(255, 255, 255, 0.02);
          border: 1px dashed rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 0.78rem;
          color: rgba(255, 255, 255, 0.5);
          text-align: center;
        }

        /* Expanded Modal */
        .sv-modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.88);
          backdrop-filter: blur(16px);
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
        }

        .sv-modal-box {
          position: relative;
          width: 100%;
          max-width: 860px;
          background: #0d0d0d;
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 25px 60px rgba(0, 0, 0, 0.9);
        }

        .sv-modal-close {
          position: absolute;
          top: 1rem;
          right: 1rem;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: rgba(0, 0, 0, 0.7);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 10;
          transition: all 0.2s ease;
        }

        .sv-modal-close:hover {
          background: #ffffff;
          color: #000000;
        }

        .sv-modal-grid {
          display: grid;
          grid-template-columns: 360px 1fr;
        }

        @media (max-width: 768px) {
          .sv-modal-grid {
            grid-template-columns: 1fr;
            max-height: 85vh;
            overflow-y: auto;
          }
        }

        .sv-modal-video-side {
          position: relative;
          aspect-ratio: 9 / 16;
          background: #000000;
          overflow: hidden;
        }

        .sv-modal-frames-wrap {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
        }

        .sv-modal-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: grayscale(100%) contrast(110%);
        }

        .sv-modal-video-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(0,0,0,0.4) 0%, transparent 40%, rgba(0,0,0,0.8) 100%);
        }

        .sv-modal-video-badge {
          position: absolute;
          top: 1rem;
          left: 1rem;
          z-index: 2;
          font-family: 'Space Grotesk', monospace;
          font-size: 0.65rem;
          font-weight: 700;
          padding: 0.3rem 0.65rem;
          background: #ffffff;
          color: #000000;
          border-radius: 9999px;
        }

        .sv-modal-audio-bars {
          position: absolute;
          bottom: 1rem;
          left: 1rem;
          display: flex;
          align-items: flex-end;
          gap: 3px;
          z-index: 2;
          background: rgba(0, 0, 0, 0.5);
          padding: 0.3rem 0.6rem;
          border-radius: 6px;
          border: 1px solid rgba(255, 255, 255, 0.15);
        }

        .sv-modal-info-side {
          padding: 2.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        @media (max-width: 768px) {
          .sv-modal-info-side {
            padding: 1.5rem;
          }
        }

        .sv-modal-category {
          font-family: 'Space Grotesk', monospace;
          font-size: 0.7rem;
          color: rgba(255, 255, 255, 0.5);
          letter-spacing: 0.1em;
          text-transform: uppercase;
          margin-bottom: 0.35rem;
        }

        .sv-modal-title {
          font-family: 'Cinzel', 'Syne', serif;
          font-size: 1.65rem;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 1rem;
        }

        .sv-modal-author {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.65rem 0.85rem;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 10px;
          margin-bottom: 1.25rem;
        }

        .author-avatar {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          background: #ffffff;
          color: #000000;
          font-family: 'Space Grotesk', monospace;
          font-weight: 800;
          font-size: 0.75rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .author-details strong {
          display: block;
          font-size: 0.85rem;
          color: #ffffff;
        }

        .author-details span {
          display: block;
          font-size: 0.7rem;
          color: rgba(255, 255, 255, 0.5);
        }

        .sv-modal-quote {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-style: italic;
          font-size: 0.88rem;
          line-height: 1.5;
          color: rgba(255, 255, 255, 0.9);
          border-left: 2px solid #ffffff;
          padding-left: 0.85rem;
          margin: 0 0 1.25rem 0;
        }

        .sv-modal-desc {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 0.88rem;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 1.25rem;
        }

        .sv-modal-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
          margin-bottom: 1.5rem;
        }

        .sv-modal-tag {
          font-family: 'Space Grotesk', monospace;
          font-size: 0.7rem;
          padding: 0.2rem 0.55rem;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 6px;
          color: rgba(255, 255, 255, 0.8);
        }

        .sv-modal-specs {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.75rem;
          padding: 0.85rem;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 10px;
          margin-bottom: 1.75rem;
        }

        .spec-label {
          display: block;
          font-size: 0.65rem;
          font-family: 'Space Grotesk', monospace;
          color: rgba(255, 255, 255, 0.45);
          text-transform: uppercase;
        }

        .spec-value {
          display: block;
          font-size: 0.8rem;
          color: #ffffff;
          font-weight: 600;
        }

        .sv-modal-actions {
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
        }

        .sv-modal-cta-whatsapp {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.6rem;
          padding: 0.85rem 1.25rem;
          background: #ffffff;
          color: #000000;
          border: 1px solid #ffffff;
          border-radius: 10px;
          font-family: 'Space Grotesk', sans-serif;
          font-size: 0.85rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .sv-modal-cta-whatsapp:hover {
          background: #d4d4d4;
          border-color: #d4d4d4;
        }

        .sv-modal-cta-instagram {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.6rem;
          padding: 0.75rem 1.25rem;
          background: transparent;
          color: #ffffff;
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 10px;
          font-family: 'Space Grotesk', sans-serif;
          font-size: 0.82rem;
          text-decoration: none;
          transition: all 0.2s ease;
        }

        .sv-modal-cta-instagram:hover {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 255, 255, 0.4);
        }
      `}</style>
    </section>
  );
}
