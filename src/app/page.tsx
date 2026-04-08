'use client';

import React from 'react';
import Link from 'next/link';
import { CheckCircle2, ArrowRight, Play, Sparkles, Activity, MessageSquare, Zap } from 'lucide-react';
import styles from './landing.module.css';

export default function LandingPage() {
  return (
    <div className={styles.container}>
      {/* Navbar */}
      <nav className={styles.navbar}>
        <div className={styles.logo}>
          <div className={styles.logoIcon}></div>
          <div className={styles.logoText}>
            <h1>ASSISTENTE <span>SOLARA</span></h1>
            <p>IA DE RECUPERAÇÃO</p>
          </div>
        </div>
        <div className={styles.navLinks}>
          <a href="#problema">O PROBLEMA</a>
          <a href="#solucao">SOLUÇÃO</a>
          <a href="#como-funciona">COMO FUNCIONA</a>
          <a href="#resultados">RESULTADOS</a>
        </div>
        <Link href="/login" className={styles.navBtn}>
          ACESSAR O SISTEMA
        </Link>
      </nav>

      {/* Hero Section */}
      <header className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.badge}>
            <Sparkles size={14} />
            <span>INTELIGÊNCIA ARTIFICIAL PARA ODONTOLOGIA</span>
          </div>
          <h1>Recupere pacientes que <span>abandonaram tratamentos</span> com inteligência artificial.</h1>
          <p>O Assistente Solara identifica automaticamente pacientes que não retornaram à clínica e inicia campanhas inteligentes para trazer esses pacientes de volta.</p>
          
          <ul className={styles.featureList}>
            <li><CheckCircle2 size={18} /> Identificação automática de pacientes em risco</li>
            <li><CheckCircle2 size={18} /> Campanhas inteligentes de recuperação</li>
            <li><CheckCircle2 size={18} /> Convites automáticos via WhatsApp</li>
            <li><CheckCircle2 size={18} /> Mais pacientes retornando para a clínica</li>
          </ul>

          <div className={styles.heroActions}>
            <Link href="/login" className={styles.primaryBtn}>
              ACESSAR O SISTEMA
            </Link>
            <button className={styles.secondaryBtn}>
              VER COMO FUNCIONA —
            </button>
          </div>
        </div>
        
        <div className={styles.heroImage}>
          <img src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=2070&auto=format&fit=crop" alt="Dentista trabalhando" />
          <div className={styles.floatingStat}>
            <div className={styles.statIcon}><Activity size={20} /></div>
            <div>
              <strong>+28%</strong>
              <p>TAXA DE RECUPERAÇÃO</p>
            </div>
          </div>
        </div>
      </header>

      {/* Section 2: Showcase */}
      <section className={styles.showcase} id="solucao">
        <div className={styles.sectionHeader}>
          <div className={styles.sectionBadge}>DEMONSTRAÇÃO</div>
          <h2>Veja o Assistente Solara em ação.</h2>
          <p>Interface limpa e intuitiva com tudo o que sua clínica precisa para recuperar pacientes automaticamente.</p>
        </div>

        <div className={styles.showcaseGrid}>
          <div className={styles.showcaseCard}>
            <img src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" alt="Painel de Recuperação" />
            <div className={styles.cardInfo}>
              <h3>Painel de Recuperação</h3>
              <p>Visualize todos os pacientes prioritários, score de risco da IA, histórico de contatos e sugestões automáticas.</p>
            </div>
          </div>
          
          <div className={styles.showcaseCard}>
            <img src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" alt="Campanhas Inteligentes" />
            <div className={styles.cardInfo}>
              <h3>Campanhas Inteligentes</h3>
              <p>Execute campanhas sugeridas pela IA em poucos cliques. Acompanhe o progresso e os resultados em tempo real.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Feature Detail */}
      <section className={styles.featureDetail}>
        <div className={styles.detailText}>
          <div className={styles.sectionBadge}>INTELIGÊNCIA IA</div>
          <h2>Uma IA especializada em recuperação de pacientes.</h2>
          <p>O sistema utiliza inteligência artificial para identificar padrões de abandono de tratamento e sugerir ações que aumentam significativamente a chance de retorno dos pacientes. Resultados claros, em tempo real.</p>
          
          <ul className={styles.detailList}>
            <li><div className={styles.dot}></div> Taxa de abandono monitorada automaticamente</li>
            <li><div className={styles.dot}></div> Pacientes em risco identificados por IA</li>
            <li><div className={styles.dot}></div> Convites enviados e rastreados em tempo real</li>
            <li><div className={styles.dot}></div> Pacientes recuperados contabilizados</li>
            <li><div className={styles.dot}></div> Faturamento recuperado calculado automaticamente</li>
          </ul>
        </div>

        <div className={styles.detailImage}>
          <img src="https://images.unsplash.com/photo-1576091160550-217359f49f4c?q=80&w=2070&auto=format&fit=crop" alt="IA em Odontologia" />
        </div>
      </section>
    </div>
  );
}
