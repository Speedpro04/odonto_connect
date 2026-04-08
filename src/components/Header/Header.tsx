'use client';

import React from 'react';
import { Sparkles, Bell, Search, Settings } from 'lucide-react';
import styles from './header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <div className={styles.titleSection}>
          <h1>Solara Connect</h1>
          <p>CLÍNICAS MÉDICAS CONECTADAS EM TEMPO REAL</p>
        </div>
      </div>

      <div className={styles.middle}>
        <div className={styles.badge}>
          <div className={styles.dot}></div>
          <span>SOLARA ATENDENDO</span>
        </div>
        <div className={styles.timer}>01:36:52</div>
      </div>

      <div className={styles.right}>
        <div className={styles.searchBox}>
          <Search size={16} />
          <input type="text" placeholder="BUSCAR..." />
        </div>
        
        <button className={styles.solaraBtn}>
          <Sparkles size={16} />
          <span>SOLARA AI</span>
        </button>

        <div className={styles.userBadge}>
          <span>H</span>
        </div>
      </div>
    </header>
  );
}
