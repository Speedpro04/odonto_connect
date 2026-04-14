'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, Lock, Eye, EyeOff, ShieldCheck, Sparkles } from 'lucide-react';
import styles from './login.module.css';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.loginCard}>
        {/* Logo Section */}
        <div className={styles.logoContainer}>
          <div className="logoWrapper">
            <img src="/solara-logo.png" alt="Solara Odonto Logo" className={styles.customLogo} />
            <span className="signatureText" style={{ color: '#006266' }}>Solara Odonto</span>
          </div>
        </div>

        <div className={styles.headerText}>
          <h2>ASSISTENTE SOLARA</h2>
          <p>GESTÃO INTELIGENTE PARA CLÍNICAS</p>
        </div>

        <form className={styles.form}>
          <div className={styles.inputGroup}>
            <label>USUÁRIO</label>
            <div className={styles.inputWrapper}>
              <Mail size={18} className={styles.inputIcon} />
              <input type="text" placeholder="kd3online@gmail.com" />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label>SENHA</label>
            <div className={styles.inputWrapper}>
              <Lock size={18} className={styles.inputIcon} />
              <input type={showPassword ? 'text' : 'password'} placeholder="••••••••" />
              <button 
                type="button" 
                className={styles.passwordToggle}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button type="submit" className={styles.submitButton}>
            ENTRAR NO SISTEMA
          </button>

          <div className={styles.extraLinks}>
            <Link href="/forgot-password" className={styles.link}>
              Esqueci minha senha
            </Link>
            <div className={styles.divider}></div>
            <Link href="/register" className={styles.link}>
              Criar nova conta
            </Link>
          </div>
        </form>

        <div className={styles.footer}>
          <ShieldCheck size={14} />
          <span>CRIPTOGRAFIA MILITAR ATIVA</span>
        </div>
      </div>
    </div>
  );
}
