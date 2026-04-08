'use client';

import React from 'react';
import styles from './logo.module.css';

interface LogoProps {
  collapsed?: boolean;
}

export default function Logo({ collapsed }: LogoProps) {
  return (
    <div className={`${styles.logo} ${collapsed ? styles.collapsed : ''}`}>
      <div className={styles.icon}>
        <div className={styles.sun}></div>
        <div className={styles.waves}>
          <div className={styles.wave}></div>
          <div className={styles.wave}></div>
        </div>
      </div>
      {!collapsed && (
        <div className={styles.text}>
          <h1>SOLARA <span>CONNECT</span></h1>
          <p>IA DE RECUPERAÇÃO</p>
        </div>
      )}
    </div>
  );
}
