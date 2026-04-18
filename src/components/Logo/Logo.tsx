'use client';

import React from 'react';
import styles from './logo.module.css';

interface PowerSunProps {
  size?: number;
  className?: string;
}

export function PowerSun({ size = 61, className = '' }: PowerSunProps) {
  return (
    <div className={`${styles.iconWrapper} ${className}`} style={{ width: size, height: size }}>
      <svg viewBox="0 0 100 100" className={styles.powerSun} width="100%" height="100%">
        <defs>
          <linearGradient id="sunGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ff9f43" />
            <stop offset="100%" stopColor="#d35400" />
          </linearGradient>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        <path 
          d="M50 5 L55 35 L85 20 L65 45 L95 50 L65 55 L85 80 L55 65 L50 95 L45 65 L15 80 L35 55 L5 50 L35 45 L15 20 L45 35 Z" 
          fill="url(#sunGradient)"
          filter="url(#glow)"
        />
        <circle cx="50" cy="50" r="15" fill="white" />
      </svg>
      <div className={styles.glowEffect}></div>
    </div>
  );
}

interface LogoProps {
  collapsed?: boolean;
  className?: string;
  light?: boolean;
  centered?: boolean;
}

export default function Logo({ collapsed, className, light = true, centered = false }: LogoProps) {
  return (
    <div className={`${styles.logoContainer} ${centered ? styles.centered : ''} ${className || ''}`}>
      <PowerSun size={collapsed ? 36 : 60} />
      {!collapsed && (
        <div className={styles.textWrapper}>
          <span className={`${styles.brandName} ${light ? 'text-[#f1f2f6]' : 'text-[#2f3640]'}`}>
            SOLARA <span className={styles.accentText}>CONNECT</span>
          </span>
        </div>
      )}
    </div>
  );
}
