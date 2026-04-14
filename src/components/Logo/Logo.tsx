'use client';

import React from 'react';
import styles from './logo.module.css';

interface LogoProps {
  collapsed?: boolean;
}

export default function Logo({ collapsed }: LogoProps) {
  return (
    <div className={`${styles.logo} ${collapsed ? styles.collapsed : ''}`}>
        <div className={styles.logoContainer}>
          <div className="logoWrapper">
            <img src="/solara-logo.png" alt="Solara Odonto Logo" className={styles.customLogo} />
            <span className="signatureText" style={{ color: '#006266', marginTop: '5px' }}>Solara Odonto</span>
          </div>
        </div>
        {!collapsed && <span className="signatureText" style={{ color: 'white', marginTop: '-15px' }}>Solara Odonto</span>}
      </div>
  );
}
