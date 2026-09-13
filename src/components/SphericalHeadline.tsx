import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion } from 'motion/react';
import { RotateCw, Play, Pause, Sparkles, Move3d, Sun, Moon, Gauge } from 'lucide-react';

interface SphericalHeadlineProps {
  className?: string;
}

interface SphereNode {
  text: string;
  theta: number; // longitude [0, 2pi]
  phi: number;   // latitude [-pi/2, pi/2]
  isCorePhrase?: boolean;
  isHighlight?: boolean;
  baseSize: number;
}

interface Particle {
  x: number;
  y: number;
  z: number;
  radius: number;
  speed: number;
  opacity: number;
}

export const SphericalHeadline: React.FC<SphericalHeadlineProps> = ({ className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  
  const [isRotating, setIsRotating] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [themeMode, setThemeMode] = useState<'luxeDark' | 'crystalLight'>('luxeDark');
  const [speedLevel, setSpeedLevel] = useState<number>(1); // 0.5, 1, 1.8
  const [viewMode, setViewMode] = useState<'sphere' | 'text'>('sphere');
  const [hoveredNodeText, setHoveredNodeText] = useState<string | null>(null);

  // Rotational coordinates & momentum
  const rotRef = useRef({
    rx: 0.15, // tilt angle on X
    ry: 0.0,  // rotation angle around Y
    vx: 0,
    vy: 0.0055, // angular velocity
    lastMouseX: 0,
    lastMouseY: 0,
    orbitAngle: 0,
  });

  // Background floating stars / dust particles
  const particlesRef = useRef<Particle[]>([]);
  useEffect(() => {
    const list: Particle[] = [];
    for (let i = 0; i < 45; i++) {
      list.push({
        x: (Math.random() - 0.5) * 500,
        y: (Math.random() - 0.5) * 400,
        z: (Math.random() - 0.5) * 300,
        radius: Math.random() * 1.6 + 0.6,
        speed: Math.random() * 0.002 + 0.001,
        opacity: Math.random() * 0.6 + 0.2,
      });
    }
    particlesRef.current = list;
  }, []);

  // Carefully balanced nodes forming the sphere with high readability
  const nodesRef = useRef<SphereNode[]>([
    // Equator (Latitude 0) - The main phrase in majestic golden sequence
    { text: "DES MÉTIERS SPÉCIALISÉS", theta: 0, phi: 0, isCorePhrase: true, isHighlight: true, baseSize: 17 },
    { text: "POUR SÉCURISER", theta: Math.PI * 0.5, phi: 0, isCorePhrase: true, isHighlight: true, baseSize: 17 },
    { text: "CHAQUE ÉTAPE", theta: Math.PI * 1.0, phi: 0, isCorePhrase: true, isHighlight: true, baseSize: 17 },
    { text: "DE VOS OUVRAGES", theta: Math.PI * 1.5, phi: 0, isCorePhrase: true, isHighlight: true, baseSize: 17 },

    // Upper Tropic (+30 deg)
    { text: "SÉCURITÉ DES SOLS", theta: 0.4, phi: 0.52, isCorePhrase: false, isHighlight: true, baseSize: 14 },
    { text: "CONTRÔLE BÉTONS CCTP", theta: 1.9, phi: 0.52, isCorePhrase: false, isHighlight: false, baseSize: 13 },
    { text: "AUSCULTATION CHAUSSÉES", theta: 3.5, phi: 0.52, isCorePhrase: false, isHighlight: false, baseSize: 13 },
    { text: "INGÉNIERIE DE PRÉCISION", theta: 5.1, phi: 0.52, isCorePhrase: false, isHighlight: true, baseSize: 13 },

    // Lower Tropic (-30 deg)
    { text: "PÉRENNITÉ DES OUVRAGES", theta: 0.9, phi: -0.52, isCorePhrase: false, isHighlight: true, baseSize: 14 },
    { text: "LABORATOIRE AGRÉÉ DAKAR", theta: 2.5, phi: -0.52, isCorePhrase: false, isHighlight: false, baseSize: 13 },
    { text: "SONDAGES & FORAGES G2", theta: 4.1, phi: -0.52, isCorePhrase: false, isHighlight: false, baseSize: 13 },
    { text: "NORMES NF & EUROCODES", theta: 5.7, phi: -0.52, isCorePhrase: false, isHighlight: true, baseSize: 13 },

    // North Polar Ring (+62 deg)
    { text: "✦ SENELABO BTP ✦", theta: 0.2, phi: 1.08, isCorePhrase: false, isHighlight: true, baseSize: 13 },
    { text: "EXPERTISE GÉOTECHNIQUE", theta: Math.PI, phi: 1.08, isCorePhrase: false, isHighlight: false, baseSize: 11 },

    // South Polar Ring (-62 deg)
    { text: "✦ SÉNÉGAL & AFRIQUE ✦", theta: 1.1, phi: -1.08, isCorePhrase: false, isHighlight: true, baseSize: 13 },
    { text: "CONFORMITÉ GARANTIE", theta: Math.PI + 1.1, phi: -1.08, isCorePhrase: false, isHighlight: false, baseSize: 11 },
  ]);

  // Pointer interaction
  const handlePointerDown = (clientX: number, clientY: number) => {
    setIsDragging(true);
    rotRef.current.lastMouseX = clientX;
    rotRef.current.lastMouseY = clientY;
    rotRef.current.vx = 0;
    rotRef.current.vy = 0;
  };

  const handlePointerMove = (clientX: number, clientY: number) => {
    if (!isDragging) return;
    const dx = clientX - rotRef.current.lastMouseX;
    const dy = clientY - rotRef.current.lastMouseY;

    rotRef.current.ry += dx * 0.006;
    rotRef.current.rx -= dy * 0.006;

    // Gentle vertical limits
    rotRef.current.rx = Math.max(-0.75, Math.min(0.75, rotRef.current.rx));

    rotRef.current.vy = dx * 0.0025;
    rotRef.current.vx = -dy * 0.0025;

    rotRef.current.lastMouseX = clientX;
    rotRef.current.lastMouseY = clientY;
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  // Main Canvas Rendering Engine
  useEffect(() => {
    if (viewMode !== 'sphere') return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    const render = () => {
      const container = containerRef.current;
      if (!container) return;

      const dpr = window.devicePixelRatio || 1;
      const width = container.clientWidth;
      const height = Math.min(450, Math.max(340, width * 0.52));

      if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
        canvas.width = width * dpr;
        canvas.height = height * dpr;
      }

      ctx.save();
      ctx.scale(dpr, dpr);

      const isDark = themeMode === 'luxeDark';
      const cx = width / 2;
      const cy = height / 2;
      const radius = Math.min(width * 0.31, height * 0.40, 185);
      const fov = 500;

      // Update sphere rotation
      const baseVel = 0.0045 * speedLevel;
      if (isRotating && !isDragging) {
        rotRef.current.ry += rotRef.current.vy;
        rotRef.current.vy = rotRef.current.vy * 0.98 + baseVel * 0.02;
        rotRef.current.vx *= 0.95;
        rotRef.current.rx += rotRef.current.vx;
      }
      rotRef.current.orbitAngle += 0.012 * speedLevel;

      ctx.clearRect(0, 0, width, height);

      // --- 1. LUXURIOUS BACKGROUND ---
      if (isDark) {
        // Deep Obsidian Nebula with warm amber atmospheric bloom
        const bgGrad = ctx.createRadialGradient(cx, cy, radius * 0.2, cx, cy, Math.max(width, height) * 0.7);
        bgGrad.addColorStop(0, '#111827');
        bgGrad.addColorStop(0.45, '#0a0f1d');
        bgGrad.addColorStop(1, '#030712');
        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, width, height);

        // Radiant Golden Solar Flare Glow behind sphere
        const sunGlow = ctx.createRadialGradient(cx, cy, radius * 0.2, cx, cy, radius * 1.45);
        sunGlow.addColorStop(0, 'rgba(245, 158, 11, 0.28)');
        sunGlow.addColorStop(0.35, 'rgba(217, 119, 6, 0.12)');
        sunGlow.addColorStop(0.7, 'rgba(245, 158, 11, 0.04)');
        sunGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = sunGlow;
        ctx.beginPath();
        ctx.arc(cx, cy, radius * 1.45, 0, Math.PI * 2);
        ctx.fill();
      } else {
        // Pure Crystal Radiant Pearl Background
        const bgGrad = ctx.createRadialGradient(cx, cy, radius * 0.2, cx, cy, Math.max(width, height) * 0.7);
        bgGrad.addColorStop(0, '#ffffff');
        bgGrad.addColorStop(0.5, '#f8fafc');
        bgGrad.addColorStop(1, '#f1f5f9');
        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, width, height);

        // Subtle amber-gold halo
        const halo = ctx.createRadialGradient(cx, cy, radius * 0.2, cx, cy, radius * 1.35);
        halo.addColorStop(0, 'rgba(245, 158, 11, 0.16)');
        halo.addColorStop(0.5, 'rgba(245, 158, 11, 0.05)');
        halo.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.fillStyle = halo;
        ctx.beginPath();
        ctx.arc(cx, cy, radius * 1.35, 0, Math.PI * 2);
        ctx.fill();
      }

      // --- 2. FLOATING CELESTIAL PARTICLES ---
      ctx.save();
      particlesRef.current.forEach((p) => {
        p.x += Math.sin(p.z) * 0.15;
        p.y -= p.speed * 12;
        if (p.y < -height / 2) p.y = height / 2;

        const pScale = fov / (fov + p.z);
        const px = cx + p.x * pScale;
        const py = cy + p.y * pScale;

        ctx.beginPath();
        ctx.arc(px, py, p.radius * pScale, 0, Math.PI * 2);
        ctx.fillStyle = isDark
          ? `rgba(251, 191, 36, ${p.opacity * 0.75})`
          : `rgba(217, 119, 6, ${p.opacity * 0.4})`;
        ctx.fill();
      });
      ctx.restore();

      // --- 3. 3D SPHERE SILHOUETTE & SPECULAR HIGHLIGHT ---
      ctx.save();
      // Spherical body shading
      const sphereShade = ctx.createRadialGradient(
        cx - radius * 0.35,
        cy - radius * 0.35,
        radius * 0.05,
        cx,
        cy,
        radius
      );
      if (isDark) {
        sphereShade.addColorStop(0, 'rgba(30, 41, 59, 0.95)');
        sphereShade.addColorStop(0.4, 'rgba(15, 23, 42, 0.92)');
        sphereShade.addColorStop(0.85, 'rgba(10, 15, 29, 0.98)');
        sphereShade.addColorStop(1, 'rgba(245, 158, 11, 0.25)'); // Golden rim
      } else {
        sphereShade.addColorStop(0, 'rgba(255, 255, 255, 0.98)');
        sphereShade.addColorStop(0.5, 'rgba(248, 250, 252, 0.92)');
        sphereShade.addColorStop(0.9, 'rgba(241, 245, 249, 0.85)');
        sphereShade.addColorStop(1, 'rgba(245, 158, 11, 0.35)'); // Golden rim
      }
      ctx.fillStyle = sphereShade;
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.fill();

      // Exterior Glowing Rim Ring
      ctx.strokeStyle = isDark ? 'rgba(245, 158, 11, 0.45)' : 'rgba(217, 119, 6, 0.4)';
      ctx.lineWidth = 2;
      ctx.shadowColor = isDark ? 'rgba(245, 158, 11, 0.6)' : 'rgba(245, 158, 11, 0.3)';
      ctx.shadowBlur = 12;
      ctx.stroke();
      ctx.restore();

      // --- 4. 3D LATITUDE & LONGITUDE GEODESIC MERIDIANS ---
      ctx.save();
      const rx = rotRef.current.rx;
      const ry = rotRef.current.ry;

      const parallels = [-0.62, -0.31, 0, 0.31, 0.62];
      parallels.forEach((lat) => {
        const ringY = Math.sin(lat) * radius;
        const ringR = Math.cos(lat) * radius;

        const ringCenterY = cy - ringY * Math.cos(rx);
        const ringHeight = ringR * Math.sin(rx);

        ctx.beginPath();
        ctx.ellipse(cx, ringCenterY, ringR, Math.abs(ringHeight) || 1, 0, 0, Math.PI * 2);

        if (lat === 0) {
          // Equator is distinguished and glowing
          ctx.strokeStyle = isDark ? 'rgba(251, 191, 36, 0.75)' : 'rgba(217, 119, 6, 0.65)';
          ctx.lineWidth = 1.8;
          ctx.setLineDash([6, 4]);
        } else {
          ctx.strokeStyle = isDark ? 'rgba(148, 163, 184, 0.22)' : 'rgba(148, 163, 184, 0.35)';
          ctx.lineWidth = 1.0;
          ctx.setLineDash([3, 5]);
        }
        ctx.stroke();
      });

      // Orbiting Equatorial Satellite Ring (Tilted at 23.5 deg)
      const orbitTilt = 0.38; // ~22 degrees
      const orbitRadius = radius * 1.22;
      ctx.beginPath();
      ctx.ellipse(cx, cy, orbitRadius, orbitRadius * Math.sin(orbitTilt), -0.2, 0, Math.PI * 2);
      ctx.strokeStyle = isDark ? 'rgba(245, 158, 11, 0.25)' : 'rgba(217, 119, 6, 0.2)';
      ctx.lineWidth = 1.2;
      ctx.setLineDash([4, 6]);
      ctx.stroke();

      // Orbiting Golden Sparkle bead
      const satAngle = rotRef.current.orbitAngle;
      const satX = cx + Math.cos(satAngle) * orbitRadius;
      const satY = cy + Math.sin(satAngle) * (orbitRadius * Math.sin(orbitTilt));
      ctx.beginPath();
      ctx.arc(satX, satY, 4, 0, Math.PI * 2);
      ctx.fillStyle = '#fbbf24';
      ctx.shadowColor = '#f59e0b';
      ctx.shadowBlur = 10;
      ctx.fill();
      ctx.restore();

      // --- 5. 3D PROJECTION OF TEXT NODES ---
      interface ProjectedNode {
        node: SphereNode;
        screenX: number;
        screenY: number;
        scale: number;
        z: number;
        alpha: number;
      }

      const projected: ProjectedNode[] = [];

      nodesRef.current.forEach((node) => {
        // Spherical coordinates to 3D Cartesian (r, phi, theta)
        const x0 = radius * Math.cos(node.phi) * Math.sin(node.theta + ry);
        const y0 = radius * Math.sin(node.phi);
        const z0 = radius * Math.cos(node.phi) * Math.cos(node.theta + ry);

        // Rotation around X axis (tilt rx)
        const y1 = y0 * Math.cos(rx) - z0 * Math.sin(rx);
        const z1 = y0 * Math.sin(rx) + z0 * Math.cos(rx);
        const x1 = x0;

        // Perspective camera projection
        const scale = fov / (fov + z1);
        const screenX = cx + x1 * scale;
        const screenY = cy - y1 * scale;

        // Depth opacity: front items (z > 0) are 100% crystal-clear, back items are soft
        const normZ = z1 / radius; // range [-1, 1]
        const alpha = Math.max(0.2, Math.min(1.0, 0.62 + normZ * 0.42));

        projected.push({
          node,
          screenX,
          screenY,
          scale,
          z: z1,
          alpha,
        });
      });

      // Z-sorting: Background drawn first, foreground drawn last
      projected.sort((a, b) => a.z - b.z);

      // --- 6. RENDER EACH TEXT NODE WITH PRISTINE CLARITY ---
      projected.forEach((item) => {
        const { node, screenX, screenY, scale, alpha, z } = item;
        const fontSize = Math.max(9.5, Math.round(node.baseSize * scale));
        const isFront = z > 0;
        const isCenterFront = z > radius * 0.25;

        ctx.save();
        ctx.font = node.isCorePhrase
          ? `900 ${fontSize}px "Cabinet Grotesk", "Plus Jakarta Sans", sans-serif`
          : `700 ${fontSize}px "Plus Jakarta Sans", sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        const textMetrics = ctx.measureText(node.text);
        const textWidth = textMetrics.width;

        // Foreground pills: give crisp frosted background for flawless readability!
        if (isFront && (node.isCorePhrase || node.isHighlight || isCenterFront)) {
          const padX = (node.isCorePhrase ? 18 : 12) * scale;
          const padY = (node.isCorePhrase ? 10 : 7) * scale;
          const pillW = textWidth + padX * 2;
          const pillH = fontSize + padY * 2;

          ctx.save();
          if (isDark) {
            // Dark luxury frosted glass pill with golden rim
            ctx.fillStyle = node.isCorePhrase
              ? 'rgba(15, 23, 42, 0.94)'
              : 'rgba(17, 24, 39, 0.88)';
            ctx.strokeStyle = node.isCorePhrase
              ? 'rgba(251, 191, 36, 0.8)'
              : 'rgba(245, 158, 11, 0.4)';
            ctx.lineWidth = node.isCorePhrase ? 1.8 : 1.2;
            ctx.shadowColor = node.isCorePhrase ? 'rgba(245, 158, 11, 0.5)' : 'rgba(0, 0, 0, 0.4)';
            ctx.shadowBlur = node.isCorePhrase ? 14 * scale : 6 * scale;
          } else {
            // Light crystal frosted pill with golden border
            ctx.fillStyle = 'rgba(255, 255, 255, 0.96)';
            ctx.strokeStyle = node.isCorePhrase
              ? 'rgba(217, 119, 6, 0.85)'
              : 'rgba(245, 158, 11, 0.5)';
            ctx.lineWidth = node.isCorePhrase ? 1.8 : 1.2;
            ctx.shadowColor = 'rgba(245, 158, 11, 0.35)';
            ctx.shadowBlur = 8 * scale;
          }

          ctx.beginPath();
          ctx.roundRect(screenX - pillW / 2, screenY - pillH / 2, pillW, pillH, pillH / 2);
          ctx.fill();
          ctx.stroke();
          ctx.restore();
        }

        // Color & Shadow for Text
        if (node.isCorePhrase) {
          if (isDark) {
            // Radiant Golden Holographic Font
            ctx.shadowColor = 'rgba(251, 191, 36, 0.85)';
            ctx.shadowBlur = isFront ? 14 * scale : 4;
            ctx.fillStyle = isFront
              ? '#fef08a' // Brilliant light gold
              : `rgba(245, 158, 11, ${alpha * 0.7})`;
          } else {
            // High-contrast Deep Amber/Gold
            ctx.shadowColor = 'rgba(217, 119, 6, 0.45)';
            ctx.shadowBlur = isFront ? 6 * scale : 0;
            ctx.fillStyle = isFront
              ? '#b45309' // Rich dark amber
              : `rgba(180, 83, 9, ${alpha * 0.8})`;
          }
        } else if (node.isHighlight) {
          if (isDark) {
            ctx.fillStyle = isFront ? '#fcd34d' : `rgba(251, 191, 36, ${alpha * 0.55})`;
            ctx.shadowColor = 'rgba(245, 158, 11, 0.4)';
            ctx.shadowBlur = isFront ? 8 : 0;
          } else {
            ctx.fillStyle = isFront ? '#d97706' : `rgba(217, 119, 6, ${alpha * 0.6})`;
          }
        } else {
          if (isDark) {
            ctx.fillStyle = isFront ? '#f8fafc' : `rgba(148, 163, 184, ${alpha * 0.65})`;
            ctx.shadowColor = 'rgba(255, 255, 255, 0.2)';
            ctx.shadowBlur = isFront ? 4 : 0;
          } else {
            ctx.fillStyle = isFront ? '#0f172a' : `rgba(100, 116, 139, ${alpha * 0.6})`;
          }
        }

        ctx.fillText(node.text, screenX, screenY);
        ctx.restore();
      });

      // --- 7. POLISHED CRYSTAL SPECULAR SHEEN (Top-left 3D gloss) ---
      ctx.save();
      const sheenGrad = ctx.createRadialGradient(
        cx - radius * 0.4,
        cy - radius * 0.42,
        2,
        cx - radius * 0.35,
        cy - radius * 0.35,
        radius * 0.65
      );
      sheenGrad.addColorStop(0, isDark ? 'rgba(255, 255, 255, 0.45)' : 'rgba(255, 255, 255, 0.8)');
      sheenGrad.addColorStop(0.3, isDark ? 'rgba(251, 191, 36, 0.15)' : 'rgba(255, 255, 255, 0.35)');
      sheenGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = sheenGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      ctx.restore();
      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [viewMode, isRotating, isDragging, themeMode, speedLevel]);

  const resetOrientation = useCallback(() => {
    rotRef.current.rx = 0.15;
    rotRef.current.ry = 0;
    rotRef.current.vx = 0;
    rotRef.current.vy = 0.0055 * speedLevel;
  }, [speedLevel]);

  return (
    <div className={`w-full max-w-4xl mx-auto select-none ${className}`}>
      {/* Top Control Bar with Luxurious Badges */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-3 px-1">
        {/* Interactive guidance badge */}
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-slate-700 bg-white/90 backdrop-blur-md border border-amber-300/80 shadow-xs px-3.5 py-1.5 rounded-full">
          <Move3d className="w-4 h-4 text-amber-500 animate-spin" style={{ animationDuration: '8s' }} />
          <span className="font-bold text-slate-900">Sphère 3D Interactive :</span>
          <span className="text-slate-600 hidden sm:inline">Touchez ou faites glisser pour explorer</span>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5 ml-auto flex-wrap">
          {/* Speed Selector */}
          <div className="inline-flex items-center bg-white border border-slate-200 rounded-lg p-0.5 shadow-2xs">
            <button
              type="button"
              onClick={() => setSpeedLevel(0.6)}
              className={`px-2 py-1 text-[10px] font-bold rounded-md transition-colors ${
                speedLevel === 0.6 ? 'bg-amber-500 text-slate-950 shadow-xs' : 'text-slate-600 hover:text-slate-950'
              }`}
              title="Vitesse douce"
            >
              Douce
            </button>
            <button
              type="button"
              onClick={() => setSpeedLevel(1)}
              className={`px-2 py-1 text-[10px] font-bold rounded-md transition-colors ${
                speedLevel === 1 ? 'bg-amber-500 text-slate-950 shadow-xs' : 'text-slate-600 hover:text-slate-950'
              }`}
              title="Vitesse standard"
            >
              1x
            </button>
            <button
              type="button"
              onClick={() => setSpeedLevel(1.8)}
              className={`px-2 py-1 text-[10px] font-bold rounded-md transition-colors ${
                speedLevel === 1.8 ? 'bg-amber-500 text-slate-950 shadow-xs' : 'text-slate-600 hover:text-slate-950'
              }`}
              title="Vitesse dynamique"
            >
              Rapide
            </button>
          </div>

          {/* Theme Toggle: Or Solaire vs Cristal Pur */}
          <button
            type="button"
            onClick={() => setThemeMode((m) => (m === 'luxeDark' ? 'crystalLight' : 'luxeDark'))}
            className="px-2.5 py-1.5 rounded-lg bg-white hover:bg-slate-100 border border-slate-200 text-slate-800 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
            title="Changer le style de la sphère"
          >
            {themeMode === 'luxeDark' ? (
              <>
                <Sun className="w-3.5 h-3.5 text-amber-500" />
                <span className="text-[11px] hidden md:inline">Cristal Pur</span>
              </>
            ) : (
              <>
                <Moon className="w-3.5 h-3.5 text-indigo-500" />
                <span className="text-[11px] hidden md:inline">Or Solaire</span>
              </>
            )}
          </button>

          {/* Pause / Play */}
          <button
            type="button"
            onClick={() => setIsRotating((prev) => !prev)}
            className="p-1.5 rounded-lg bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs flex items-center gap-1 transition-colors cursor-pointer shadow-2xs"
            title={isRotating ? "Mettre en pause" : "Faire tourner"}
          >
            {isRotating ? <Pause className="w-3.5 h-3.5 text-amber-600" /> : <Play className="w-3.5 h-3.5 text-emerald-600" />}
          </button>

          {/* Reset */}
          <button
            type="button"
            onClick={resetOrientation}
            className="p-1.5 rounded-lg bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs flex items-center gap-1 transition-colors cursor-pointer shadow-2xs"
            title="Recentrer l'axe"
          >
            <RotateCw className="w-3.5 h-3.5 text-slate-500" />
          </button>

          {/* Switch 3D Sphere / Standard Text */}
          <button
            type="button"
            onClick={() => setViewMode((m) => (m === 'sphere' ? 'text' : 'sphere'))}
            className="px-3 py-1.5 rounded-lg bg-slate-950 hover:bg-slate-800 text-amber-400 font-bold text-[11px] flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm border border-slate-800"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{viewMode === 'sphere' ? 'Mode Texte' : 'Sphère 3D'}</span>
          </button>
        </div>
      </div>

      {/* Main Display Area */}
      {viewMode === 'sphere' ? (
        <div
          ref={containerRef}
          onMouseDown={(e) => handlePointerDown(e.clientX, e.clientY)}
          onMouseMove={(e) => handlePointerMove(e.clientX, e.clientY)}
          onMouseUp={handlePointerUp}
          onMouseLeave={handlePointerUp}
          onTouchStart={(e) => {
            if (e.touches.length === 1) {
              handlePointerDown(e.touches[0].clientX, e.touches[0].clientY);
            }
          }}
          onTouchMove={(e) => {
            if (e.touches.length === 1) {
              handlePointerMove(e.touches[0].clientX, e.touches[0].clientY);
            }
          }}
          onTouchEnd={handlePointerUp}
          className={`relative w-full h-[360px] sm:h-[410px] lg:h-[440px] flex items-center justify-center cursor-grab active:cursor-grabbing overflow-hidden rounded-3xl transition-all duration-500 ${
            themeMode === 'luxeDark'
              ? 'bg-slate-950 border-2 border-amber-500/40 shadow-[0_20px_50px_rgba(0,0,0,0.5),0_0_30px_rgba(245,158,11,0.2)]'
              : 'bg-white border-2 border-slate-200/80 shadow-[0_20px_40px_rgba(0,0,0,0.06)]'
          }`}
        >
          {/* Canvas for 60fps true 3D spherical rendering */}
          <canvas
            ref={canvasRef}
            className="relative z-10 w-full h-full block"
            style={{ touchAction: 'none' }}
          />

          {/* Prominent High-Contrast Floating Title Badge */}
          <div className="absolute bottom-3 inset-x-3 sm:inset-x-6 flex justify-center pointer-events-none z-20">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className={`px-4 sm:px-6 py-2.5 sm:py-3 rounded-2xl text-center max-w-2xl border backdrop-blur-lg shadow-xl transition-all duration-300 ${
                themeMode === 'luxeDark'
                  ? 'bg-slate-900/90 border-amber-400/50 shadow-amber-500/10 text-white'
                  : 'bg-white/95 border-amber-300/80 shadow-slate-900/10 text-slate-900'
              }`}
            >
              <h2 className="text-xs sm:text-sm md:text-base font-black tracking-tight leading-snug">
                « Des métiers spécialisés pour{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 underline decoration-amber-400 decoration-2 underline-offset-4">
                  sécuriser chaque étape
                </span>{' '}
                de vos ouvrages »
              </h2>
            </motion.div>
          </div>
        </div>
      ) : (
        /* Clean Flat Text View */
        <div className="p-8 sm:p-12 bg-white rounded-3xl border-2 border-slate-200 shadow-md text-center space-y-4">
          <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-900 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <span>Présentation Standard</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black font-display text-slate-950 tracking-tight leading-tight">
            Des métiers spécialisés pour{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-amber-600 to-amber-500 underline decoration-amber-400">
              sécuriser chaque étape
            </span>{' '}
            de vos ouvrages
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-lg mx-auto">
            (Pour revenir à l'animation de la sphère 3D, cliquez sur le bouton « Sphère 3D » ci-dessus)
          </p>
        </div>
      )}
    </div>
  );
};
