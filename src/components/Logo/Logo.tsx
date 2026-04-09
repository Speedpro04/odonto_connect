'use client';

import React from 'react';
import styles from './logo.module.css';

interface LogoProps {
  collapsed?: boolean;
}

export default function Logo({ collapsed }: LogoProps) {
  return (
    <div className={`${styles.logo} ${collapsed ? styles.collapsed : ''}`}>
      <img
        src="/solara-logo.png"
        alt="Solara Connect Logo"
        className={styles.customLogo}
      />
    </div>
  );
}
