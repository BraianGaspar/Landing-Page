import { useState, useRef, FormEvent, useEffect } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import Button from './Button';

interface ContactFormProps {
  onSendEmail: (
    email: string,
    message: string,
    subject: string,
    recaptchaToken?: string
  ) => Promise<void>;
}

// LER DO .env COM FALLBACK
const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

export default function ContactForm({ onSendEmail }: ContactFormProps) {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [subject, setSubject] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [sendStatus, setSendStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({
    type: null,
    message: '',
  });
  const [isCaptchaValid, setIsCaptchaValid] = useState(false);
  const [captchaLoaded, setCaptchaLoaded] = useState(false);
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  // Verificar se o reCAPTCHA foi carregado
  useEffect(() => {
    // Forçar o carregamento do reCAPTCHA
    const script = document.createElement('script');
    script.src = 'https://www.google.com/recaptcha/api.js?render=explicit';
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    setCaptchaLoaded(true);
  }, []);

  const handleCaptchaChange = (token: string | null) => {
    console.log('✅ Token do reCAPTCHA recebido:', token);
    setIsCaptchaValid(!!token);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!isCaptchaValid) {
      setSendStatus({
        type: 'error',
        message: 'Por favor, complete o reCAPTCHA para confirmar que você não é um robô.',
      });
      return;
    }

    setIsSending(true);
    setSendStatus({ type: null, message: '' });

    try {
      const token = recaptchaRef.current?.getValue() || undefined;

      await onSendEmail(email, message, subject, token);

      setSendStatus({
        type: 'success',
        message: 'Mensagem enviada com sucesso! Entraremos em contato em breve.',
      });
      setEmail('');
      setMessage('');
      setSubject('');
      recaptchaRef.current?.reset();
      setIsCaptchaValid(false);
    } catch (error) {
      setSendStatus({
        type: 'error',
        message:
          error instanceof Error ? error.message : 'Erro ao enviar mensagem. Tente novamente.',
      });
    } finally {
      setIsSending(false);
    }
  };

  console.log('🔑 Site Key:', RECAPTCHA_SITE_KEY);

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="email">Seu melhor e-mail</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="seu@email.com"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="subject">Assunto</label>
        <input
          type="text"
          id="subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Ex: Quero saber mais sobre energia solar"
        />
      </div>

      <div className="form-group">
        <label htmlFor="message">Mensagem</label>
        <textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Conte-nos sobre seu projeto sustentável..."
          rows={5}
          required
        />
      </div>

      {/* reCAPTCHA - COM FALLBACK */}
      <div
        style={{ display: 'flex', justifyContent: 'center', margin: '1rem 0', minHeight: '78px' }}
      >
        {RECAPTCHA_SITE_KEY ? (
          <ReCAPTCHA
            ref={recaptchaRef}
            sitekey={RECAPTCHA_SITE_KEY}
            onChange={handleCaptchaChange}
            theme="light"
            size="normal"
            asyncScriptOnLoad={() => console.log('✅ reCAPTCHA carregado!')}
          />
        ) : (
          <p style={{ color: 'red' }}>⚠️ Chave do reCAPTCHA não configurada</p>
        )}
      </div>

      <Button
        text={isSending ? 'Enviando...' : 'Enviar mensagem'}
        type="submit"
        disabled={isSending || !isCaptchaValid}
      />

      {sendStatus.type && (
        <div className={`status-message ${sendStatus.type}`}>{sendStatus.message}</div>
      )}
    </form>
  );
}
