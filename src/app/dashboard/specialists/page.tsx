'use client';

import React from 'react';
import DashboardLayout from '@/components/DashboardLayout/DashboardLayout';
import { Stethoscope } from 'lucide-react';
import styles from '../overview.module.css';

export default function SpecialistsPage() {
  return (
    <DashboardLayout>
      <div className={styles.container}>
        <div className={styles.header}>
          <div>
            <h2>ESPECIALISTAS</h2>
            <p>Módulo aguardando integração com o banco de dados.</p>
          </div>
        </div>

        <div className={styles.card} style={{ height: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '20px', color: 'var(--text-muted)' }}>
          <Stethoscope size={48} opacity={0.3} />
          <h3>Gestão de Doutores</h3>
          <p>Esta tela carregará os dentistas associados do Supabase no futuro.</p>
        </div>
      </div>
    </DashboardLayout>
  );
}
