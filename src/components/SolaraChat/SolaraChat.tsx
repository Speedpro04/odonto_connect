'use client';

import React, { useState } from 'react';
import { Trash2, X, Zap } from 'lucide-react';
import styles from './chat.module.css';

interface SolaraChatProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SolaraChat({ isOpen, onClose }: SolaraChatProps) {
  const [chatMessages, setChatMessages] = useState([
    'Olá, sou Solara, sua assistente Inteligente. Como posso ajudar com a gestão da clínica hoje?'
  ]);

  if (!isOpen) return null;

  return (
    <div className={styles.aiChatContainer}>
      <div className={styles.chatHeader}>
        <div className={styles.chatHeaderInfo}>
          <img src="/solara-logo.png" alt="Solara" className={styles.chatLogoImage} />
          <div>
            <strong>SOLARA</strong>
            <span>INTELIGÊNCIA DE SUPORTE</span>
          </div>
        </div>
        <div className={styles.chatActions}>
          <button className={styles.actionBtn} title="Limpar Conversa" onClick={() => setChatMessages([])}><Trash2 size={14} /></button>
          <button className={styles.actionBtn} title="Fechar Mensagens" onClick={onClose}><X size={14} /></button>
        </div>
      </div>
      <div className={styles.chatBody}>
        {chatMessages.length > 0 ? (
          chatMessages.map((msg, index) => (
            <p key={index}>{msg}</p>
          ))
        ) : (
          <div style={{ textAlign: 'center', opacity: 0.5, marginTop: '20px', fontSize: '13px', fontWeight: 600 }}>Nenhuma mensagem.</div>
        )}
      </div>
      <div className={styles.chatInput}>
        <input type="text" placeholder="Aguardando comando..." />
        <div className={styles.sendIcon}><Zap size={14} /></div>
      </div>
    </div>
  );
}
