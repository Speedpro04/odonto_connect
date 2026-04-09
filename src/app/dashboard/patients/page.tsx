'use client';

import React from 'react';
import DashboardLayout from '@/components/DashboardLayout/DashboardLayout';
import { Users, Search } from 'lucide-react';
import styles from '../overview.module.css';

export default function PatientsPage() {
  return (
    <DashboardLayout>
      <div className={styles.container}>
        <div className={styles.header}>
          <div>
            <h2>BASE DE PACIENTES</h2>
            <p>Este módulo será integrado ao Banco de Dados / Supabase em breve.</p>
          </div>
          <button className={styles.addBtn}>
            <Users size={18} /> IMPORTAR DADOS
          </button>
        </div>

        <div className={styles.card} style={{ height: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '20px', color: 'var(--text-muted)' }}>
          <Search size={48} opacity={0.3} />
          <h3>Nenhum paciente integrado ainda</h3>
          <p>Assim que o backend (Supabase) estiver pronto, a listagem completa aparecerá aqui.</p>
        </div>
      </div>
    </DashboardLayout>
  );
}
