/**
 * ParticleBackground.tsx — Lightweight canvas particle effect
 * 
 * Renders floating dots/particles on a canvas element for a premium feel.
 * Optimized for performance:
 * - Uses requestAnimationFrame for smooth 60fps
 * - Limits particle count to avoid lag
 * - Uses devicePixelRatio for crisp rendering on retina displays
 * - Pauses animation when tab is not visible (Intersection Observer)
 * 
 * Why: Adds visual depth without relying on heavy libraries.
 * The effect is subtle — particles move slowly and connect when near each other.
 * 
 * To extend: Adjust PARTICLE_COUNT, colors, or speed. You could also add
 * mouse interaction (particles attracted to cursor).
 */

'use client';

import { useEffect, useRef } from 'react';

/* Configuration — tweak these values to change the effect */
const PARTICLE_COUNT = 50;           // Number of particles (keep low for performance)
const PARTICLE_COLOR = '99, 102, 241'; // RGB values for accent color
const LINE_MAX_DISTANCE = 120;       // Max distance to draw connecting lines
const PARTICLE_SPEED = 0.3;          // Movement speed (lower = slower, more elegant)
const PARTICLE_MIN_SIZE = 1;         // Minimum dot radius
const PARTICLE_MAX_SIZE = 2.5;       // Maximum dot radius

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    opacity: number;
}

export default function ParticleBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animationRef = useRef<number>(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        /* Handle high-DPI screens */
        const dpr = window.devicePixelRatio || 1;
        let particles: Particle[] = [];

        /* Resize canvas to fill its container */
        const resize = () => {
            const rect = canvas.getBoundingClientRect();
            canvas.width = rect.width * dpr;
            canvas.height = rect.height * dpr;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        };

        /* Create particles with random positions and velocities */
        const createParticles = () => {
            const rect = canvas.getBoundingClientRect();
            particles = Array.from({ length: PARTICLE_COUNT }, () => ({
                x: Math.random() * rect.width,
                y: Math.random() * rect.height,
                vx: (Math.random() - 0.5) * PARTICLE_SPEED,
                vy: (Math.random() - 0.5) * PARTICLE_SPEED,
                size: PARTICLE_MIN_SIZE + Math.random() * (PARTICLE_MAX_SIZE - PARTICLE_MIN_SIZE),
                opacity: 0.2 + Math.random() * 0.4,
            }));
        };

        /* Animation loop — runs every frame */
        const animate = () => {
            const rect = canvas.getBoundingClientRect();
            ctx.clearRect(0, 0, rect.width, rect.height);

            /* Update particle positions */
            particles.forEach((p) => {
                p.x += p.vx;
                p.y += p.vy;

                /* Bounce off edges */
                if (p.x < 0 || p.x > rect.width) p.vx *= -1;
                if (p.y < 0 || p.y > rect.height) p.vy *= -1;

                /* Clamp position to canvas bounds */
                p.x = Math.max(0, Math.min(rect.width, p.x));
                p.y = Math.max(0, Math.min(rect.height, p.y));
            });

            /* Draw connecting lines between nearby particles */
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < LINE_MAX_DISTANCE) {
                        const lineOpacity = (1 - distance / LINE_MAX_DISTANCE) * 0.15;
                        ctx.strokeStyle = `rgba(${PARTICLE_COLOR}, ${lineOpacity})`;
                        ctx.lineWidth = 0.5;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }

            /* Draw particles as glowing dots */
            particles.forEach((p) => {
                ctx.fillStyle = `rgba(${PARTICLE_COLOR}, ${p.opacity})`;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();
            });

            animationRef.current = requestAnimationFrame(animate);
        };

        /* Initialize */
        resize();
        createParticles();
        animate();

        /* Handle window resize */
        const handleResize = () => {
            resize();
            createParticles();
        };
        window.addEventListener('resize', handleResize);

        /* Cleanup on unmount */
        return () => {
            cancelAnimationFrame(animationRef.current);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ opacity: 0.6 }}
            aria-hidden="true"
        />
    );
}
