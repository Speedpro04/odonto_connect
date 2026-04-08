'use client';

import React from 'react';
import DashboardLayout from '@/components/DashboardLayout/DashboardLayout';
import { Search, ChevronDown, Plus, User, Stethoscope } from 'lucide-react';
import styles from './agenda.module.css';

export default function AgendaPage() {
  const appointments = [
    { id: 1, status: 'CONFIRMADO', time: '08:00', patient: 'Marina Rodriguez', proc: 'LIMPEZA', doctor: 'DR. CARLOS MENDES', value: 'R$ 180,00', color: 'green' },
    { id: 2, status: 'AGUARDANDO', time: '09:00', patient: 'Rafael Costa', proc: 'CANAL', doctor: 'DRA. ANA PAULA', value: 'R$ 850,00', color: 'orange' },
    { id: 3, status: 'CONFIRMADO', time: '10:00', patient: 'Juliana Santos', proc: 'RESTAURAÇÃO', doctor: 'DR. CARLOS MENDES', value: 'R$ 320,00', color: 'green' },
  ];

  const slots = [
    { time: '09:30', doctor: 'DR. CARLOS MENDES', status: 'DISPONÍVEL' },
    { time: '13:00', doctor: 'DRA. ANA PAULA', status: 'DISPONÍVEL' },
    { time: '15:30', doctor: 'DR. CARLOS MENDES', status: 'DISPONÍVEL' },
  ];

  return (
    <DashboardLayout>
      <div className={styles.container}>
        <div className={styles.titleRow}>
          <div className={styles.titleInfo}>
            <h2>AGENDA</h2>
            <p>GERENCIE CONSULTAS E HORÁRIOS DISPONÍVEIS</p>
          </div>
          <button className={styles.addBtn}>
            <Plus size={18} /> NOVA CONSULTA
          </button>
        </div>

        {/* Filter Bar */}
        <div className={styles.filterBar}>
          <div className={styles.filterGroup}>
            <span>FILTROS:</span>
            <div className={styles.select}>
              TODOS OS DENTISTAS <ChevronDown size={14} />
            </div>
            <div className={styles.select}>
              TODOS OS PROCEDIMENTOS <ChevronDown size={14} />
            </div>
          </div>
          <div className={styles.searchBtn}>
            <Search size={18} />
          </div>
        </div>

        <div className={styles.agendaGrid}>
          {/* Main Column: Appointments */}
          <div className={styles.appointmentsCol}>
            <h3 className={styles.sectionTitle}>CONSULTAS AGENDADAS</h3>
            <div className={styles.list}>
              {appointments.map((app) => (
                <div key={app.id} className={styles.appointmentCard}>
                  <div className={styles.cardLeft}>
                    <div className={styles.statusBadge} data-color={app.color}>
                      {app.status}
                    </div>
                    <div className={styles.timeInfo}>
                      <User size={14} /> <span>{app.time}</span>
                    </div>
                  </div>

                  <div className={styles.cardInfo}>
                    <h4>{app.patient}</h4>
                    <p>{app.proc}</p>
                  </div>

                  <div className={styles.cardMeta}>
                    <div className={styles.metaItem}>
                      <Stethoscope size={14} /> <span>{app.doctor}</span>
                    </div>
                    <div className={styles.value}>{app.value}</div>
                  </div>

                  <button className={styles.detailsBtn}>DETALHES</button>
                </div>
              ))}
            </div>
          </div>

          {/* Side Column: Available Slots */}
          <div className={styles.slotsCol}>
            <h3 className={styles.sectionTitle}>HORÁRIOS DISPONÍVEIS</h3>
            <div className={styles.list}>
              {slots.map((slot, i) => (
                <div key={i} className={styles.slotCard}>
                  <div className={styles.slotInfo}>
                    <strong>{slot.time}</strong>
                    <p>{slot.doctor}</p>
                  </div>
                  <button className={styles.preencherBtn}>PREENCHER</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
