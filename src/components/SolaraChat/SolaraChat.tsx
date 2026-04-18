'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Trash2, X, Send, Sparkles } from 'lucide-react';
import { PowerSun } from '../Logo/Logo';
import styles from './chat.module.css';

interface Message {
  role: 'user' | 'model';
  text: string;
}

interface SolaraChatProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SolaraChat({ isOpen, onClose }: SolaraChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: 'Olá, sou Solara, sua gestora inteligente. Como posso ajudar com a gestão da clínica hoje?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage })
      });

      const data = await response.json();
      setMessages(prev => [...prev, { role: 'model', text: data.response }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: 'Desculpe, tive um erro de conexão.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.aiChatContainer}>
      <div className={styles.chatHeader}>
        <div className={styles.chatHeaderInfo}>
          <PowerSun size={32} />
        </div>
        <div className={styles.chatActions}>
          <button className={styles.actionBtn} title="Limpar" onClick={() => setMessages([{ role: 'model', text: 'Olá, sou Solara, como posso ajudar?' }])}><Trash2 size={14} /></button>
          <button className={styles.actionBtn} title="Fechar" onClick={onClose}><X size={14} /></button>
        </div>
      </div>
      
      <div className={styles.chatBody} ref={scrollRef}>
        {messages.map((msg, index) => (
          <div key={index} className={`${styles.messageWrapper} ${msg.role === 'user' ? styles.userMsg : styles.aiMsg}`}>
            <p>{msg.text}</p>
          </div>
        ))}
        {isLoading && (
          <div className={styles.aiMsg}>
            <p className={styles.typing}>Digitando...</p>
          </div>
        )}
      </div>

      <div className={styles.chatInput}>
        <input 
          type="text" 
          placeholder="Digite sua dúvida..." 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        />
        <button className={styles.sendIcon} onClick={handleSend} disabled={isLoading}>
          {isLoading ? <Sparkles className={styles.spin} size={16} /> : <Send size={16} />}
        </button>
      </div>
    </div>
  );
}
