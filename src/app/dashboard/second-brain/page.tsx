'use client';

import React, { useState, useEffect, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { 
  Plus, 
  Search, 
  FileText, 
  Share2, 
  Clock, 
  Settings, 
  BrainCircuit,
  Database,
  Link as LinkIcon,
  Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import KnowledgeGraph from '@/components/KnowledgeBase/KnowledgeGraph';
import styles from './second-brain.module.css';

// Import dinâmico do editor para evitar problemas com SSR
const SimpleMDE = dynamic(() => import('react-simplemde-editor'), { ssr: false });
import "easymde/dist/easymde.min.css";

// Mock de Notas
const MOCK_NOTES = [
  { id: '1', title: 'Script: Primeira Consulta', content: '# Script de Boas-Vindas\n\nOlá [[Nome do Paciente]], seja muito bem-vindo à Odonto Connect...\n\n- [ ] Confirmar horário\n- [ ] Explicar procedimentos\n- [ ] Oferecer café', updated: '10 min ago', size: '2kb' },
  { id: '2', title: 'Preços Estética 2024', content: '# Tabela de Preços\n\n- Harmonização: R$ 1.500,00\n- Clareamento: R$ 800,00', updated: '2h ago', size: '1kb' },
  { id: '3', title: 'Análise Polars: Leads Março', content: '# Insights de Conversão\n\nGerado automaticamente pelo motor **Polars** em 0.02ms.\n\n- Leads ativos: 154\n- Taxa de conversão: 12%\n- Melhor canal: Instagram', updated: 'Ontem', size: '5kb' },
];

export default function SecondBrainPage() {
  const [activeNoteId, setActiveNoteId] = useState('1');
  const [isGraphVisible, setIsGraphVisible] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const activeNote = useMemo(() => 
    MOCK_NOTES.find(n => n.id === activeNoteId) || MOCK_NOTES[0],
  [activeNoteId]);

  return (
    <div className={styles.container}>
      {/* Sidebar de Notas */}
      <aside className={styles.sidebar}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: '800', color: '#006266' }}>SECOND BRAIN</h2>
          <button style={{ background: '#006266', color: 'white', padding: '5px', borderRadius: '8px' }}>
            <Plus size={18} />
          </button>
        </div>

        <div style={{ position: 'relative' }}>
          <Search size={16} style={{ position: 'absolute', left: '10px', top: '10px', color: '#94a3b8' }} />
          <input 
            type="text" 
            placeholder="Buscar no cérebro..." 
            style={{ 
              width: '100%', 
              padding: '8px 10px 8px 35px', 
              borderRadius: '10px',
              border: '1px solid #e2e8f0',
              fontSize: '14px',
              outline: 'none'
            }}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div style={{ marginTop: '10px', overflowY: 'auto' }}>
          {MOCK_NOTES.map(note => (
            <motion.div 
              key={note.id}
              whileHover={{ x: 5 }}
              className={`${styles.noteItem} ${activeNoteId === note.id ? styles.activeNote : ''}`}
              onClick={() => setActiveNoteId(note.id)}
            >
              <FileText size={16} />
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600 }}>{note.title}</div>
                <div style={{ fontSize: '11px', opacity: 0.6 }}>{note.updated}</div>
              </div>
            </motion.div>
          ))}
        </div>

        <div style={{ marginTop: 'auto', paddingTop: '20px', borderTop: '1px solid #f1f5f9' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#64748b' }}>
            <BrainCircuit size={16} />
            <span>256 Conexões ativas</span>
          </div>
        </div>
      </aside>

      {/* Editor Principal */}
      <main className={styles.mainContent}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <input 
            className={styles.editorTitle}
            value={activeNote.title}
            onChange={() => {}} // TODO: Implement note renaming
          />
          <div style={{ display: 'flex', gap: '8px' }}>
            <span className={`${styles.badge} ${styles.badgePolars}`}>
              <Database size={10} style={{ marginRight: '4px' }} />
              Polars Sync
            </span>
            <span className={`${styles.badge} ${styles.badgeObsidian}`}>
              V1.2
            </span>
          </div>
        </div>

        <SimpleMDE 
          value={activeNote.content}
          onChange={() => {}}
          options={{
            spellChecker: false,
            autosave: {
              enabled: true,
              uniqueId: `note-${activeNoteId}`,
              delay: 1000,
            },
            status: false,
            renderingConfig: {
              singleLineBreaks: false,
              codeSyntaxHighlighting: true,
            },
          }}
        />
      </main>

      {/* Painel Lateral de Conexões (Graph) */}
      <aside className={styles.graphContainer}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#1e293b', fontWeight: 600 }}>
          <LinkIcon size={18} />
          CONEXÕES
        </div>

        <div className={styles.graphPlaceholder} style={{ border: 'none' }}>
           <KnowledgeGraph />
        </div>

        <div style={{ marginTop: '20px' }}>
          <h4 style={{ fontSize: '12px', fontWeight: 700, color: '#94a3b8', marginBottom: '10px' }}>BACKLINKS</h4>
          <div style={{ fontSize: '13px', color: '#64748b', fontStyle: 'italic' }}>
            Nenhuma nota menciona esta página ainda.
          </div>
        </div>

        <div style={{ marginTop: 'auto', background: '#0f172a', borderRadius: '12px', padding: '15px', color: 'white' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <Zap size={16} style={{ color: '#fbbf24' }} />
            <span style={{ fontSize: '13px', fontWeight: 600 }}>IA Suggestion</span>
          </div>
          <p style={{ fontSize: '12px', opacity: 0.8, lineHeight: '1.4' }}>
            O Polars detectou que esta nota se relaciona com a "Tabela de CRM". Deseja criar o link?
          </p>
          <button style={{ marginTop: '10px', width: '100%', padding: '6px', background: '#334155', borderRadius: '6px', fontSize: '11px' }}>
            CONECTAR AGORA
          </button>
        </div>
      </aside>
    </div>
  );
}
