'use client';

import React from 'react';
import Sidebar from '../Sidebar/Sidebar';
import Header from '../Header/Header';
import styles from './layout.module.css';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.wrapper}>
        <Header />
        <main className={styles.content}>
          <div className="animate-fade-in custom-scrollbar">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
