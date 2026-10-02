import React, { useEffect, useRef } from 'react';

export default function CosmicBackground({ isWarpSpeed = false }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Mouse Parallax
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const handleMouseMove = (e) => {
      targetMouseX = (e.clientX - width / 2) * 0.05;
      targetMouseY = (e.clientY - height / 2) * 0.05;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Starfield 3D Setup
    const numStars = 650;
    const stars = [];
    const colors = ['#ffffff', '#93c5fd', '#a5b4fc', '#67e8f9', '#fef08a', '#c084fc'];

    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: (Math.random() - 0.5) * width * 2,
        y: (Math.random() - 0.5) * height * 2,
        z: Math.random() * width,
        size: Math.random() * 1.8 + 0.4,
        color: colors[Math.floor(Math.random() * colors.length)],
        twinkleSpeed: Math.random() * 0.03 + 0.01,
        twinklePhase: Math.random() * Math.PI * 2
      });
    }

    // Shooting Stars (Meteors)
    const meteors = [];
    const createMeteor = () => {
      meteors.push({
        x: Math.random() * width * 1.2,
        y: Math.random() * height * 0.4,
        length: Math.random() * 80 + 50,
        speed: Math.random() * 12 + 10,
        angle: (Math.PI / 4) + (Math.random() * 0.2 - 0.1),
        opacity: 1,
        color: Math.random() > 0.5 ? '#38bdf8' : '#818cf8'
      });
    };

    let meteorTimer = 0;

    // Render Loop
    const render = () => {
      // Clear with deep space fade
      ctx.fillStyle = '#030407';
      ctx.fillRect(0, 0, width, height);

      // Smooth mouse interpolation
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      // Draw Atmospheric Nebulae
      const nebula1 = ctx.createRadialGradient(
        width * 0.2 + mouseX * 0.5,
        height * 0.3 + mouseY * 0.5,
        10,
        width * 0.2,
        height * 0.3,
        width * 0.45
      );
      nebula1.addColorStop(0, 'rgba(99, 102, 241, 0.12)');
      nebula1.addColorStop(0.5, 'rgba(168, 85, 247, 0.06)');
      nebula1.addColorStop(1, 'transparent');
      ctx.fillStyle = nebula1;
      ctx.fillRect(0, 0, width, height);

      const nebula2 = ctx.createRadialGradient(
        width * 0.8 - mouseX * 0.4,
        height * 0.6 - mouseY * 0.4,
        20,
        width * 0.8,
        height * 0.6,
        width * 0.4
      );
      nebula2.addColorStop(0, 'rgba(6, 182, 212, 0.1)');
      nebula2.addColorStop(0.6, 'rgba(56, 189, 248, 0.04)');
      nebula2.addColorStop(1, 'transparent');
      ctx.fillStyle = nebula2;
      ctx.fillRect(0, 0, width, height);

      // Draw and Update 3D Stars
      const starSpeed = isWarpSpeed ? 28 : 0.8;

      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        star.z -= starSpeed;
        star.twinklePhase += star.twinkleSpeed;

        if (star.z <= 0) {
          star.z = width;
          star.x = (Math.random() - 0.5) * width * 2;
          star.y = (Math.random() - 0.5) * height * 2;
        }

        const k = 250 / star.z;
        const px = (star.x + mouseX * 1.5) * k + width / 2;
        const py = (star.y + mouseY * 1.5) * k + height / 2;

        if (px >= 0 && px <= width && py >= 0 && py <= height) {
          const brightness = Math.sin(star.twinklePhase) * 0.3 + 0.7;
          const radius = Math.max(0.5, (1 - star.z / width) * star.size * (isWarpSpeed ? 2 : 1.2));

          if (isWarpSpeed) {
            // Warp streak
            const prevK = 250 / (star.z + starSpeed * 3);
            const prevPx = (star.x + mouseX * 1.5) * prevK + width / 2;
            const prevPy = (star.y + mouseY * 1.5) * prevK + height / 2;

            ctx.beginPath();
            ctx.moveTo(px, py);
            ctx.lineTo(prevPx, prevPy);
            ctx.strokeStyle = star.color;
            ctx.lineWidth = radius;
            ctx.globalAlpha = 0.8;
            ctx.stroke();
            ctx.globalAlpha = 1;
          } else {
            ctx.beginPath();
            ctx.arc(px, py, radius, 0, Math.PI * 2);
            ctx.fillStyle = star.color;
            ctx.globalAlpha = brightness * (1 - star.z / width);
            ctx.fill();
            ctx.globalAlpha = 1;

            // Extra glow for closer large stars
            if (star.z < width * 0.35 && radius > 1.2) {
              ctx.beginPath();
              ctx.arc(px, py, radius * 2.2, 0, Math.PI * 2);
              ctx.fillStyle = star.color;
              ctx.globalAlpha = 0.15;
              ctx.fill();
              ctx.globalAlpha = 1;
            }
          }
        }
      }

      // Handle Meteors
      meteorTimer++;
      if (meteorTimer % 180 === 0 && Math.random() > 0.3) {
        createMeteor();
      }

      for (let i = meteors.length - 1; i >= 0; i--) {
        const m = meteors[i];
        m.x += Math.cos(m.angle) * m.speed;
        m.y += Math.sin(m.angle) * m.speed;
        m.opacity -= 0.015;

        if (m.opacity <= 0) {
          meteors.splice(i, 1);
          continue;
        }

        const tailX = m.x - Math.cos(m.angle) * m.length;
        const tailY = m.y - Math.sin(m.angle) * m.length;

        const grad = ctx.createLinearGradient(m.x, m.y, tailX, tailY);
        grad.addColorStop(0, '#ffffff');
        grad.addColorStop(0.3, m.color);
        grad.addColorStop(1, 'transparent');

        ctx.beginPath();
        ctx.moveTo(m.x, m.y);
        ctx.lineTo(tailX, tailY);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.8;
        ctx.globalAlpha = m.opacity;
        ctx.stroke();
        ctx.globalAlpha = 1;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isWarpSpeed]);

  return (
    <canvas 
      ref={canvasRef} 
      className="cosmic-canvas-background" 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 0
      }}
    />
  );
}
