'use client';

import React, { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout/DashboardLayout';
import { Zap, MessageSquare, Users, TrendingUp, Clock, CheckCircle2, Play, Pause, Settings, Plus, Send, Target, Calendar } from 'lucide-react';
import styles from './campaign.module.css';

export default function AutoCampaignPage() {
  const [activeTab, setActiveTab] = useState('active');
  const [selectedCampaign, setSelectedCampaign] = useState<number | null>(1);

  const activeCampaigns = [
    {
      id: 1,
      name: 'Retorno Pós-Tratamento',
      status: 'ATIVA',
      canal: 'WhatsApp',
      patients: 34,
      sent: 28,
      returned: 9,
      rate: '32%',
      start: '01/04/2026',
      message: 'Olá, {nome}! Passando para avisar que já faz um tempo desde sua última visita. Que tal agendar uma revisão? 😊',
      steps: [
        { day: 'Dia 1', action: 'WhatsApp inicial enviado', done: true },
        { day: 'Dia 3', action: 'Lembrete automático', done: true },
        { day: 'Dia 7', action: 'Oferta de horário especial', done: false },
        { day: 'Dia 14', action: 'Contato final', done: false },
      ],
    },
    {
      id: 2,
      name: 'Limpeza Semestral',
      status: 'ATIVA',
      canal: 'SMS + WhatsApp',
      patients: 51,
      sent: 51,
      returned: 14,
      rate: '27%',
      start: '28/03/2026',
      message: 'Oi {nome}, sua limpeza semestral está em atraso! Temos horários disponíveis essa semana. Vamos agendar?',
      steps: [
        { day: 'Dia 1', action: 'SMS inicial enviado', done: true },
        { day: 'Dia 2', action: 'WhatsApp follow-up', done: true },
        { day: 'Dia 5', action: 'Lembrete com oferta', done: true },
        { day: 'Dia 10', action: 'Contato final', done: false },
      ],
    },
  ];

  const templates = [
    { id: 1, name: 'Volta após abandono', icon: <Target size={18} />, patients: '15 pacientes', desc: 'Para quem não retornou há mais de 6 meses' },
    { id: 2, name: 'Revisão periódica', icon: <Calendar size={18} />, patients: '23 pacientes', desc: 'Para quem está com revisão em atraso' },
    { id: 3, name: 'Clareamento / Estética', icon: <Zap size={18} />, patients: '11 pacientes', desc: 'Para interessados em procedimentos estéticos' },
  ];

  const current = activeCampaigns.find(c => c.id === selectedCampaign);

  return (
    <DashboardLayout>
      <div className={styles.container}>
        <div className={styles.titleRow}>
          <div>
            <h2>CAMPANHA AUTOMÁTICA</h2>
            <p>SOLARA GERENCIA CADA CAMPANHA E DISPARA MENSAGENS AUTOMATICAMENTE</p>
          </div>
          <button className={styles.newBtn}>
            <Plus size={18} /> NOVA CAMPANHA
          </button>
        </div>

        {/* KPI Row */}
        <div className={styles.kpiRow}>
          {[
            { label: 'CAMPANHAS ATIVAS', value: '2', icon: <Zap size={16} />, color: 'teal' },
            { label: 'MENSAGENS ENVIADAS', value: '79', icon: <Send size={16} />, color: 'blue' },
            { label: 'PACIENTES ATINGIDOS', value: '85', icon: <Users size={16} />, color: 'green' },
            { label: 'RETORNO TOTAL', value: '23', icon: <TrendingUp size={16} />, color: 'coral' },
          ].map((kpi, i) => (
            <div key={i} className={styles.kpiCard}>
              <div className={styles.kpiIcon} data-color={kpi.color}>{kpi.icon}</div>
              <div>
                <p>{kpi.label}</p>
                <h3>{kpi.value}</h3>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className={styles.tabs}>
          {['active', 'templates', 'history'].map(tab => (
            <button
              key={tab}
              className={`${styles.tab} ${activeTab === tab ? styles.activeTab : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab === 'active' ? 'CAMPANHAS ATIVAS' : tab === 'templates' ? 'MODELOS DE IA' : 'HISTÓRICO'}
            </button>
          ))}
        </div>

        {activeTab === 'active' && (
          <div className={styles.mainGrid}>
            {/* Left: Campaign List */}
            <div className={styles.campaignList}>
              {activeCampaigns.map(camp => (
                <div
                  key={camp.id}
                  className={`${styles.campaignItem} ${selectedCampaign === camp.id ? styles.selected : ''}`}
                  onClick={() => setSelectedCampaign(camp.id)}
                >
                  <div className={styles.campaignItemTop}>
                    <h4>{camp.name}</h4>
                    <span className={styles.statusPill} data-status="active">{camp.status}</span>
                  </div>
                  <div className={styles.campaignItemMeta}>
                    <MessageSquare size={12} /> {camp.canal}
                    <span> · </span>
                    <Users size={12} /> {camp.patients} pacientes
                  </div>
                  <div className={styles.progressBar}>
                    <div
                      className={styles.progressFill}
                      style={{ width: camp.rate }}
                    ></div>
                  </div>
                  <div className={styles.progressLabel}>
                    <span>{camp.returned} retornos</span>
                    <span>{camp.rate} taxa</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Right: Campaign Detail */}
            {current && (
              <div className={styles.campaignDetail}>
                <div className={styles.detailHeader}>
                  <div>
                    <h3>{current.name}</h3>
                    <p>Iniciada em {current.start} · {current.canal}</p>
                  </div>
                  <div className={styles.detailActions}>
                    <button className={styles.pauseBtn}><Pause size={16} /> PAUSAR</button>
                    <button className={styles.settingsBtn}><Settings size={16} /></button>
                  </div>
                </div>

                {/* Stats */}
                <div className={styles.detailStats}>
                  {[
                    { label: 'TOTAL PACIENTES', value: current.patients },
                    { label: 'ENVIADOS', value: current.sent },
                    { label: 'RETORNARAM', value: current.returned },
                    { label: 'TAXA', value: current.rate },
                  ].map((s, i) => (
                    <div key={i} className={styles.detailStat}>
                      <p>{s.label}</p>
                      <h4>{s.value}</h4>
                    </div>
                  ))}
                </div>

                {/* Message Preview */}
                <div className={styles.messagePreview}>
                  <label>MENSAGEM AUTOMÁTICA</label>
                  <div className={styles.messageBubble}>
                    <div className={styles.msgAvatar}></div>
                    <p>{current.message}</p>
                  </div>
                </div>

                {/* Timeline */}
                <div className={styles.timeline}>
                  <label>SEQUÊNCIA DE AÇÕES</label>
                  {current.steps.map((step, i) => (
                    <div key={i} className={`${styles.timelineStep} ${step.done ? styles.done : ''}`}>
                      <div className={styles.stepIcon}>
                        {step.done ? <CheckCircle2 size={16} /> : <Clock size={16} />}
                      </div>
                      <div className={styles.stepInfo}>
                        <strong>{step.day}</strong>
                        <p>{step.action}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'templates' && (
          <div className={styles.templatesGrid}>
            <div className={styles.iaNote}>
              <Zap size={16} color="#ff7675" />
              <p>A SOLARA IA ANALISOU 450 PACIENTES E RECOMENDA CRIAR ESSAS CAMPANHAS</p>
            </div>
            {templates.map(tpl => (
              <div key={tpl.id} className={styles.templateCard}>
                <div className={styles.tplIcon}>{tpl.icon}</div>
                <div className={styles.tplInfo}>
                  <h4>{tpl.name}</h4>
                  <p>{tpl.desc}</p>
                  <span>{tpl.patients}</span>
                </div>
                <button className={styles.tplBtn}>
                  <Play size={14} /> INICIAR
                </button>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'history' && (
          <div className={styles.historyWrapper}>
            <p className={styles.emptyMsg}>Nenhuma campanha encerrada ainda.</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
