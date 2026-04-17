'use client';

import React from 'react';
import Link from 'next/link';
import { CheckCircle2, ArrowRight, Play, Sparkles, Activity, MessageSquare, Zap } from 'lucide-react';
import styles from './landing.module.css';

export default function LandingPage() {
  const handlePlanSelection = async (planSlug: string) => {
    try {
      const response = await fetch('/api/pagbank/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          plan_slug: planSlug,
          clinic_name: 'Minha Clínica', 
          email: 'contato@clinica.com',
          phone: '11999999999'
        })
      });
      
      const data = await response.json();
      if (data.payment_url) {
        window.location.href = data.payment_url;
      } else {
        alert('Erro ao processar pagamento. Verifique as configurações do PagBank.');
      }
    } catch (error) {
      console.error('Erro no checkout:', error);
      alert('Erro de conexão com o servidor.');
    }
  };

  return (
    <div className={styles.container}>
      {/* Navbar */}
      <nav className={styles.navbar}>
        <div className={styles.inner}>
          <div className={styles.logo}>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-teal-500 rounded-lg flex items-center justify-center text-white">
                <Zap size={24} />
              </div>
              <span className="text-xl font-bold tracking-tighter">ODONTO<span className="text-teal-500">CONNECT</span></span>
            </div>
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
        </div>
      </nav>

      {/* Hero Section */}
      <header className={styles.hero}>
        <div className={styles.inner}>
          <div className={styles.heroContent}>
            <div className={styles.badge}>
              <Sparkles size={14} />
              <span>INTELIGÊNCIA ARTIFICIAL PARA ODONTOLOGIA</span>
            </div>
            <h1>A Inteligência Artificial que recupera pacientes para sua <span>clínica odontológica</span>.</h1>
            <p>O Odonto Connect identifica automaticamente pacientes odontológicos ausentes e inicia campanhas inteligentes de retorno, otimizando a agenda e o faturamento do seu consultório.</p>
            
            <ul className={styles.featureList}>
              <li><CheckCircle2 size={18} /> Identificação de risco com IA</li>
              <li><CheckCircle2 size={18} /> Campanhas Odonto Connect via WhatsApp</li>
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
            <div className="relative w-full h-[400px] bg-slate-100 rounded-[32px] overflow-hidden flex items-center justify-center border border-slate-200 shadow-inner">
              <Activity size={120} className="text-teal-500 opacity-20" />
              <div className="absolute inset-0 bg-gradient-to-tr from-teal-500/10 to-transparent"></div>
            </div>
            <div className={styles.floatingStat}>
              <div className={styles.statIcon}><Activity size={20} /></div>
              <div>
                <strong>+28%</strong>
                <p>RECUPERAÇÃO</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Section 2: Showcase */}
      <section className={styles.showcase} id="solucao">
        <div className={styles.inner}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionBadge}>DEMONSTRAÇÃO</div>
            <h2>Gestão inteligente com Odonto Connect.</h2>
            <p>Tudo o que sua clínica odontológica precisa para automatizar o relacionamento com o padrão Odonto Connect.</p>
          </div>

          <div className={styles.showcaseGrid}>
            <div className={styles.showcaseCard}>
              <img src="/showcase-1.png" alt="Painel Odonto Connect" />
              <div className={styles.cardInfo}>
                <h3>Painel de Recuperação</h3>
                <p>Visualize todos os pacientes prioritários com o score de risco exclusivo Odonto Connect.</p>
              </div>
            </div>
            
            <div className={styles.showcaseCard}>
              <img src="/showcase-1.png" alt="Campanhas Inteligentes" />
              <div className={styles.cardInfo}>
                <h3>Campanhas Automáticas</h3>
                <p>Execute campanhas sugeridas pela IA with disparos diretos via WhatsApp em poucos cliques.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Pricing */}
      <section className={styles.pricing} id="precos">
        <div className={styles.inner}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionBadge}>PREÇOS</div>
            <h2>Escolha o plano ideal para sua clínica.</h2>
          </div>

          <div className={styles.pricingGrid}>
            {[
              { name: '2 ESPECIALISTAS', slug: 'plan-2-especialistas', price: '147', features: ['Até 2 Especialistas', 'Odonto Connect IA', 'Otimização de Agenda', 'Suporte WhatsApp'], color: 'blue' },
              { name: '3 A 5 ESPECIALISTAS', slug: 'plan-3-5-especialistas', price: '257', features: ['Até 5 Especialistas', 'Odonto Connect Pro', 'WhatsApp Odonto Ilimitado', 'Suporte Prioritário'], hot: true, color: 'teal' },
              { name: '5 A 8 ESPECIALISTAS', slug: 'plan-5-8-especialistas', price: '367', features: ['Até 8 Especialistas', 'Odonto Connect Elite', 'Gestor de Contas', 'Integração Customizada'], color: 'charcoal' }
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
                <button 
                  className={styles.planBtn}
                  onClick={() => handlePlanSelection(plan.slug)}
                >
                  ASSINAR PLANO
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: Testimonials */}
      <section className={styles.testimonials} id="resultados">
        <div className={styles.inner}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionBadge}>DEPOIMENTOS</div>
            <h2>O que dizem os donos de clínicas.</h2>
          </div>
          <div className={styles.testimonialsGrid}>
            {[
              { name: 'Dr. Roberto Silva', role: 'Clínica Sorriso Real', text: 'O Odonto Connect recuperou mais de 40 pacientes no primeiro mês. O ROI foi imediato.' },
              { name: 'Dra. Ana Paula', role: 'Odonto Clean', text: 'O processo de automação via WhatsApp do Odonto Connect é impecável. Economizamos horas.' },
              { name: 'Dr. Carlos Lima', role: 'Lima Odontologia', text: 'A interface do Odonto Connect é muito intuitiva. Meus assistentes adoram.' }
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
        </div>
      </section>

      {/* Section 5: FAQ */}
      <section className={styles.faq} id="faq">
        <div className={styles.inner}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionBadge}>FAQ</div>
            <h2>Dúvidas frequentes.</h2>
          </div>
          <div className={styles.faqGrid}>
            {[
              { name: 'Como o Odonto Connect identifica os pacientes?', a: 'O Odonto Connect analisa o histórico de consultas para identificar quem não retornou para a revisão.' },
              { name: 'Preciso de um número de WhatsApp novo?', a: 'Não, você pode conectar o número oficial do seu consultório diretamente no Odonto Connect.' },
              { name: 'É difícil de configurar?', a: 'Em menos de 10 minutos o Odonto Connect já está pronto para recuperar seus pacientes.' }
            ].map((item, i) => (
              <div key={i} className={styles.faqItem}>
                <h4>{item.name}</h4>
                <p>{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.inner}>
          <div className={styles.footerGrid}>
            <div className={styles.footerBrand}>
              <span className="text-xl font-bold tracking-tighter">ODONTO<span className="text-teal-500">CONNECT</span></span>
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
            <p>© 2026 Odonto Connect. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
