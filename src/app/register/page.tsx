'use client';

import React, { useState } from 'react';
import { Mail, Lock, User, Phone, Users, ShieldCheck, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import styles from './register.module.css';

export default function RegisterPage() {
  const [step, setStep] = useState(1);

  return (
    <div className={styles.container}>
      <div className={styles.loginCard}>
        <Link href="/login" className={styles.backButton}>
          <ArrowLeft size={16} />
          Voltar ao Login
        </Link>

        {/* Logo Section */}
        <div className={styles.logoContainer}>
          <div className="logoWrapper">
            <img src="/solara-logo.png" alt="Solara Odonto Logo" className={styles.customLogo} />
            <span className="signatureText" style={{ color: '#006266' }}>Solara Odonto</span>
          </div>
        </div>

        <div className={styles.headerText}>
          <h2>CRIAR CONTA</h2>
          <p>INICIE SUA JORNADA SOLARA AGORA</p>
        </div>

        <form className={styles.form}>
          <div className={styles.inputGroup}>
            <label>NOME DA CLÍNICA</label>
            <div className={styles.inputWrapper}>
              <User size={18} className={styles.inputIcon} />
              <input type="text" placeholder="Ex: Clínica Sorriso Real" />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label>E-MAIL ADMINISTRATIVO</label>
            <div className={styles.inputWrapper}>
              <Mail size={18} className={styles.inputIcon} />
              <input type="email" placeholder="contato@clinica.com" />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label>WHATSAPP (NÚMERO OFICIAL)</label>
            <div className={styles.inputWrapper}>
              <Phone size={18} className={styles.inputIcon} />
              <input type="tel" placeholder="(11) 99999-9999" />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label>SENHA DE ACESSO</label>
            <div className={styles.inputWrapper}>
              <Lock size={18} className={styles.inputIcon} />
              <input type="password" placeholder="••••••••" />
            </div>
          </div>

          <button type="submit" className={styles.submitButton}>
            FINALIZAR CADASTRO
          </button>
        </form>

        <div className={styles.footer}>
          <ShieldCheck size={14} />
          <span>DADOS PROTEGIDOS CLOUD SEGURA</span>
        </div>
      </div>
    </div>
  );
}
