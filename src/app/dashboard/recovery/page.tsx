'use client';

import React from 'react';
import DashboardLayout from '@/components/DashboardLayout/DashboardLayout';
import { MessageSquare, User, TrendingUp, TrendingDown, Clock, Search, Send, Calendar } from 'lucide-react';
import styles from './recovery.module.css';

export default function RecoveryPage() {
  const patients = [
    { id: 1, name: 'Marcos Vinícius', attempts: '2 TENTATIVAS', lastVisit: '15/07/2024', reason: 'FALTOU', score: 'CRÍTICO', lastContact: '13/03', canal: 'WhatsApp', suggestion: 'Enviar convite urgente para revisão' },
    { id: 2, name: 'Helena Costa', attempts: '1 TENTATIVA', lastVisit: '10/08/2024', reason: 'SEM AGENDAMENTO', score: 'ALTO', lastContact: '10/03', canal: 'SMS', suggestion: 'Campanha de limpeza preventiva' },
    { id: 3, name: 'Sérgio Ramos', attempts: '3 TENTATIVAS', lastVisit: '22/06/2024', reason: 'REVISÃO PENDENTE', score: 'CRÍTICO', lastContact: '05/03', canal: 'WhatsApp', suggestion: 'Oferecer horário prioritário' },
    { id: 4, name: 'Larissa Manoela', attempts: '1 TENTATIVA', lastVisit: '05/09/2024', reason: 'DESMARCOU', score: 'BAIXO', lastContact: '-', canal: '-', suggestion: 'Primeiro contato via WhatsApp' },
  ];

  const stats = [
    { label: 'TAXA DE ABANDONO', value: '18.4%', icon: <TrendingDown size={14} />, color: 'orange' },
    { label: 'CONVITES ENVIADOS', value: '142', icon: <MessageSquare size={14} />, color: 'blue' },
    { label: 'PACIENTES RECUPERADOS', value: '24', icon: <TrendingUp size={14} />, color: 'green' },
    { label: 'FATURAMENTO RECUPERADO', value: 'R$ 12.480', icon: <Clock size={14} />, color: 'purple' },
  ];

  return (
    <DashboardLayout>
      <div className={styles.container}>
        <div className={styles.titleInfo}>
          <h2>RECUPERAÇÃO DE PACIENTES</h2>
          <p>REATIVE PACIENTES AUSENTES COM AUXÍLIO DA IA</p>
        </div>

        {/* Mini Stats Bar */}
        <div className={styles.statsGrid}>
          {stats.map((stat, i) => (
            <div key={i} className={styles.statCard}>
              <div className={styles.statIcon} data-color={stat.color}>{stat.icon}</div>
              <div className={styles.statInfo}>
                <p>{stat.label}</p>
                <h3>{stat.value}</h3>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.tableCard}>
          <div className={styles.tableHeader}>
            <div className={styles.headerTitle}>
              <h3>PACIENTES PRIORITÁRIOS PARA RECUPERAÇÃO</h3>
              <p>SOLARA IDENTIFICA URGÊNCIA AUTOMATICAMENTE</p>
            </div>
            <button className={styles.viewAllBtn}>VER TODOS OS PACIENTES</button>
          </div>

          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>PACIENTE</th>
                  <th>ÚLTIMA VISITA</th>
                  <th>MOTIVO</th>
                  <th>SCORE IA</th>
                  <th>ÚLTIMO CONTATO</th>
                  <th>CANAL</th>
                  <th>SUGESTÃO IA</th>
                  <th>AÇÕES</th>
                </tr>
              </thead>
              <tbody>
                {patients.map((p) => (
                  <tr key={p.id}>
                    <td>
                      <div className={styles.patientCell}>
                        <strong>{p.name}</strong>
                        <span>{p.attempts}</span>
                      </div>
                    </td>
                    <td className={styles.mutedText}>{p.lastVisit}</td>
                    <td className={styles.italicText}>{p.reason}</td>
                    <td>
                      <div className={styles.scoreBadge} data-score={p.score.toLowerCase()}>
                        {p.score}
                      </div>
                    </td>
                    <td className={styles.mutedText}>{p.lastContact}</td>
                    <td>
                      <div className={styles.canalIcon}>
                        {p.canal === 'WhatsApp' ? <MessageSquare size={14} /> : p.canal === 'SMS' ? <Send size={14} /> : null}
                        <span>{p.canal}</span>
                      </div>
                    </td>
                    <td>
                      <div className={styles.suggestionCell}>
                        <AlertCircleIcon />
                        <span>{p.suggestion}</span>
                      </div>
                    </td>
                    <td>
                      <div className={styles.actions}>
                        <button className={styles.sendBtn}><Send size={14} /></button>
                        <button className={styles.profileBtn}><User size={14} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

function AlertCircleIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{color: '#ff7675'}}>
      <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
    </svg>
  );
}
