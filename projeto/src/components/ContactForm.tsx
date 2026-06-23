import { useState, useRef, FormEvent, useEffect } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from './Button';

interface ContactFormProps {
  onSendEmail: (
    email: string,
    message: string,
    subject: string,
    recaptchaToken?: string
  ) => Promise<void>;
}

const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY || '';

export default function ContactForm({ onSendEmail }: ContactFormProps) {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [subject, setSubject] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isCaptchaValid, setIsCaptchaValid] = useState(false);
  const [captchaError, setCaptchaError] = useState(false);
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  // Resetar erro do captcha quando ele for validado
  useEffect(() => {
    if (isCaptchaValid) {
      setCaptchaError(false);
    }
  }, [isCaptchaValid]);

  const handleCaptchaChange = (token: string | null) => {
    setIsCaptchaValid(!!token);
    if (token) {
      setCaptchaError(false);
      toast.info('reCAPTCHA verificado!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!isCaptchaValid) {
      setCaptchaError(true);
      toast.warning('Por favor, complete o reCAPTCHA!', {
        position: 'top-right',
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      // Scroll para o reCAPTCHA
      const captchaElement = document.querySelector('.recaptcha-wrapper');
      if (captchaElement) {
        captchaElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    setIsSending(true);

    try {
      const token = recaptchaRef.current?.getValue() || undefined;

      await onSendEmail(email, message, subject, token);

      toast.success('Mensagem enviada com sucesso!', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      setEmail('');
      setMessage('');
      setSubject('');
      recaptchaRef.current?.reset();
      setIsCaptchaValid(false);
    } catch (error) {
      toast.error('Erro ao enviar mensagem. Tente novamente.', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      console.error('Erro:', error);
    } finally {
      setIsSending(false);
    }
  };

  // Texto do botão baseado no estado
  const getButtonText = () => {
    if (isSending) return 'Enviando...';
    if (!isCaptchaValid && !isSending) return 'Complete o reCAPTCHA para enviar';
    return 'Enviar mensagem';
  };

  if (!RECAPTCHA_SITE_KEY) {
    console.warn('⚠️ VITE_RECAPTCHA_SITE_KEY não configurada no .env');
  }

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

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

        {/* reCAPTCHA */}
        <div
          className={`recaptcha-wrapper ${captchaError ? 'captcha-error' : ''}`}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            margin: '1rem 0',
            padding: '0.5rem',
            borderRadius: '8px',
            border: captchaError ? '2px solid #ff4444' : '2px solid transparent',
            backgroundColor: captchaError ? 'rgba(255, 68, 68, 0.05)' : 'transparent',
            transition: 'all 0.3s ease',
          }}
        >
          <ReCAPTCHA
            ref={recaptchaRef}
            sitekey={RECAPTCHA_SITE_KEY}
            onChange={handleCaptchaChange}
            theme="light"
          />
          {captchaError && (
            <p
              style={{
                color: '#ff4444',
                fontSize: '0.85rem',
                marginTop: '0.5rem',
                fontWeight: 'bold',
              }}
            >
              Por favor, marque o reCAPTCHA para continuar
            </p>
          )}
        </div>

        <Button text={getButtonText()} type="submit" disabled={isSending || !isCaptchaValid} />
      </form>
    </>
  );
}
