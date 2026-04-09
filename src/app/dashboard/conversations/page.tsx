'use client';

import React from 'react';
import DashboardLayout from '@/components/DashboardLayout/DashboardLayout';
import { MessageSquare } from 'lucide-react';
import styles from '../overview.module.css';

export default function ConversationsPage() {
  return (
    <DashboardLayout>
      <div className={styles.container}>
        <div className={styles.header}>
          <div>
            <h2>CONVERSAS (WHATSAPP)</h2>
            <p>Módulo aguardando integração com o backend.</p>
          </div>
        </div>

        <div className={styles.card} style={{ height: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '20px', color: 'var(--text-muted)' }}>
          <MessageSquare size={48} opacity={0.3} />
          <h3>Integração com WhatsApp</h3>
          <p>Esta tela centralizará todas as conversas via Evolution API no futuro.</p>
        </div>
      </div>
    </DashboardLayout>
  );
}
