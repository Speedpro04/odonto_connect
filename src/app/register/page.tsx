'use client';

import React, { useState } from 'react';
import { Mail, Lock, User, Phone, ShieldCheck, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import styles from './register.module.css';

export default function RegisterPage() {
  const router = useRouter();
  const [clinicName, setClinicName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            clinic_name: clinicName,
            phone: phone,
          },
        },
      });

      if (signUpError) {
        setError(signUpError.message);
        setLoading(false);
        return;
      }

      if (data.user) {
        setSuccess(true);
        setLoading(false);
      }
    } catch (err) {
      setError('Ocorreu um erro ao tentar criar sua conta.');
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className={styles.container}>
        <div className={styles.loginCard}>
          <div className={styles.headerText}>
            <h2>CADASTRO REALIZADO!</h2>
            <p>VERIFIQUE SEU E-MAIL PARA CONFIRMAR O ACESSO.</p>
          </div>
          <Link href="/login" className={styles.submitButton} style={{ textAlign: 'center', textDecoration: 'none' }}>
            VOLTAR AO LOGIN
          </Link>
        </div>
      </div>
    );
  }

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

        <form className={styles.form} onSubmit={handleSubmit}>
          {error && <div className={styles.errorDiv}>{error}</div>}
          
          <div className={styles.inputGroup}>
            <label>NOME DA CLÍNICA</label>
            <div className={styles.inputWrapper}>
              <User size={18} className={styles.inputIcon} />
              <input 
                type="text" 
                placeholder="Ex: Clínica Sorriso Real" 
                value={clinicName}
                onChange={(e) => setClinicName(e.target.value)}
                required
              />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label>E-MAIL ADMINISTRATIVO</label>
            <div className={styles.inputWrapper}>
              <Mail size={18} className={styles.inputIcon} />
              <input 
                type="email" 
                placeholder="contato@clinica.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label>WHATSAPP (NÚMERO OFICIAL)</label>
            <div className={styles.inputWrapper}>
              <Phone size={18} className={styles.inputIcon} />
              <input 
                type="tel" 
                placeholder="(11) 99999-9999" 
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label>SENHA DE ACESSO</label>
            <div className={styles.inputWrapper}>
              <Lock size={18} className={styles.inputIcon} />
              <input 
                type="password" 
                placeholder="••••••••" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button type="submit" className={styles.submitButton} disabled={loading}>
            {loading ? 'PROCESSANDO...' : 'FINALIZAR CADASTRO'}
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

