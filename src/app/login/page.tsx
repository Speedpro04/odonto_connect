'use client';

import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, ShieldCheck, Sparkles } from 'lucide-react';
import styles from './login.module.css';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.loginCard}>
        {/* Logo Section */}
        <div className={styles.logoContainer}>
          <div className={styles.logoIcon}>
            <div className={styles.sun}></div>
            <div className={styles.waves}>
              <div className={styles.wave}></div>
              <div className={styles.wave}></div>
            </div>
          </div>
          <div className={styles.logoText}>
            <h1>ASSISTENTE <span>SOLARA</span></h1>
            <p>IA DE RECUPERAÇÃO</p>
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
        </form>

        <div className={styles.footer}>
          <ShieldCheck size={14} />
          <span>CRIPTOGRAFIA MILITAR ATIVA</span>
        </div>
      </div>
    </div>
  );
}
