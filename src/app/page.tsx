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
          <img src="/solara-logo.png" alt="Solara Connect Logo" className={styles.customLogo} />
        </div>
        <div className={styles.navLinks}>
          <a href="#solucao">SOLUÇÃO</a>
          <a href="#precos">PLANOS</a>
          <a href="#resultados">RESULTADOS</a>
          <a href="#faq">FAQ</a>
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
          <h1>A Inteligência Artificial que recupera pacientes para sua <span>clínica odontológica</span>.</h1>
          <p>O Assistente Solara identifica automaticamente pacientes odontológicos ausentes e inicia campanhas inteligentes de retorno, otimizando a agenda e o faturamento do seu consultório.</p>
          
          <ul className={styles.featureList}>
            <li><CheckCircle2 size={18} /> Identificação de risco automática</li>
            <li><CheckCircle2 size={18} /> Campanhas de recuperação via WhatsApp</li>
            <li><CheckCircle2 size={18} /> Gestão centralizada de retornos</li>
          </ul>

          <div className={styles.heroActions}>
            <Link href="/login" className={styles.primaryBtn}>
              COMEÇAR AGORA
            </Link>
            <button className={styles.secondaryBtn}>
              VER DEMONSTRAÇÃO
            </button>
          </div>
        </div>
        
        <div className={styles.heroImage}>
          <img src="/hero-ai.png" alt="Solara IA Illustration" />
          <div className={styles.floatingStat}>
            <div className={styles.statIcon}><Activity size={20} /></div>
            <div>
              <strong>+28%</strong>
              <p>RECUPERAÇÃO</p>
            </div>
          </div>
        </div>
      </header>

      {/* Section 2: Showcase */}
      <section className={styles.showcase} id="solucao">
        <div className={styles.sectionHeader}>
          <div className={styles.sectionBadge}>DEMONSTRAÇÃO</div>
          <h2>Gestão inteligente para dentistas.</h2>
          <p>Tudo o que sua clínica odontológica precisa para automatizar o relacionamento e garantir que nenhum paciente fique sem retorno.</p>
        </div>

        <div className={styles.showcaseGrid}>
          <div className={styles.showcaseCard}>
            <img src="/showcase-1.png" alt="Painel de Recuperação" />
            <div className={styles.cardInfo}>
              <h3>Painel de Recuperação</h3>
              <p>Visualize todos os pacientes prioritários, score de risco da IA e sugestões automáticas.</p>
            </div>
          </div>
          
          <div className={styles.showcaseCard}>
            <img src="/showcase-1.png" alt="Campanhas Inteligentes" />
            <div className={styles.cardInfo}>
              <h3>Campanhas Automáticas</h3>
              <p>Execute campanhas sugeridas pela IA com disparos diretos via WhatsApp em poucos cliques.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Pricing */}
      <section className={styles.pricing} id="precos">
        <div className={styles.sectionHeader}>
          <div className={styles.sectionBadge}>PREÇOS</div>
          <h2>Escolha o plano ideal para sua clínica.</h2>
        </div>

        <div className={styles.pricingGrid}>
          {[
            { name: 'ESSENCIAL', price: '297', features: ['Até 500 pacientes', 'IA de Recuperação', 'Otimização de Agenda', 'Suporte e-mail'], color: 'blue' },
            { name: 'PROFISSIONAL', price: '497', features: ['Até 2.000 pacientes', 'Solara IA Avançada', 'WhatsApp Odonto Ilimitado', 'Suporte Prioritário'], hot: true, color: 'teal' },
            { name: 'ELITE', price: '997', features: ['Pacientes Ilimitados', 'Multiclínicas / Redes', 'Gestor de Contas', 'Integração Customizada'], color: 'charcoal' }
          ].map((plan, i) => (
            <div key={i} className={`${styles.pricingCard} ${plan.hot ? styles.hotPlan : ''}`}>
              {plan.hot && <span className={styles.hotBadge}>MAIS POPULAR</span>}
              <h3>{plan.name}</h3>
              <div className={styles.price}>
                <span>R$</span> <strong>{plan.price}</strong> <small>/mês</small>
              </div>
              <ul className={styles.planFeatures}>
                {plan.features.map((f, j) => <li key={j}><CheckCircle2 size={16} /> {f}</li>)}
              </ul>
              <button className={styles.planBtn}>ASSINAR PLANO</button>
            </div>
          ))}
        </div>
      </section>

      {/* Section 4: Testimonials */}
      <section className={styles.testimonials} id="resultados">
        <div className={styles.sectionHeader}>
          <div className={styles.sectionBadge}>DEPOIMENTOS</div>
          <h2>O que dizem os donos de clínicas.</h2>
        </div>
        <div className={styles.testimonialsGrid}>
          {[
            { name: 'Dr. Roberto Silva', role: 'Clínica Sorriso Real', text: 'A Solara recuperou mais de 40 pacientes no primeiro mês. O ROI foi imediato.' },
            { name: 'Dra. Ana Paula', role: 'Odonto Clean', text: 'O processo de automação via WhatsApp é impecável. Economizamos horas de recepção.' },
            { name: 'Dr. Carlos Lima', role: 'Lima Odontologia', text: 'A interface é muito intuitiva. Meus assistentes adoram usar o sistema.' }
          ].map((t, i) => (
            <div key={i} className={styles.testimonialCard}>
              <div className={styles.testimonialStars}>★★★★★</div>
              <p>"{t.text}"</p>
              <div className={styles.testimonialAuthor}>
                <strong>{t.name}</strong>
                <span>{t.role}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 5: FAQ */}
      <section className={styles.faq} id="faq">
        <div className={styles.sectionHeader}>
          <div className={styles.sectionBadge}>FAQ</div>
          <h2>Dúvidas frequentes.</h2>
        </div>
        <div className={styles.faqGrid}>
          {[
            { q: 'Como a Solara identifica os pacientes?', a: 'Nossa IA analisa o histórico de consultas e tratamentos para identificar quem não retornou para a revisão ou limpeza.' },
            { q: 'Preciso de um número de WhatsApp novo?', a: 'Não, você pode conectar o número oficial do seu consultório diretamente em nossa plataforma.' },
            { q: 'É difícil de configurar?', a: 'Em menos de 10 minutos sua clínica odontológica já está pronta para recuperar os primeiros pacientes.' }
          ].map((item, i) => (
            <div key={i} className={styles.faqItem}>
              <h4>{item.q}</h4>
              <p>{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerGrid}>
          <div className={styles.footerBrand}>
            <img src="/solara-logo.png" alt="Solara" />
            <p>Acelerando o crescimento de clínicas odontológicas através da inteligência artificial.</p>
          </div>
          <div className={styles.footerLinks}>
            <h4>PRODUTO</h4>
            <a href="#">Funcionalidades</a>
            <a href="#">Planos</a>
            <a href="#">Relatórios</a>
          </div>
          <div className={styles.footerLinks}>
            <h4>LEGAL</h4>
            <a href="/dashboard/privacy">Privacidade</a>
            <a href="#">Termos de Uso</a>
          </div>
        </div>
        <div className={styles.footerBottom}>
          <p>© 2026 Solara Connect. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
