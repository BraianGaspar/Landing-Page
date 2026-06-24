import type { Handler, HandlerEvent } from '@netlify/functions';
import nodemailer from 'nodemailer';

interface ContactPayload {
  email: string;
  message: string;
  subject?: string;
}

const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN ?? '';

const corsHeaders = (origin: string) => ({
  'Access-Control-Allow-Origin': ALLOWED_ORIGIN || origin,
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
});

const handler: Handler = async (event: HandlerEvent) => {
  const origin = event.headers['origin'] ?? '';

  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204,
      headers: corsHeaders(origin),
      body: '',
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: corsHeaders(origin),
      body: JSON.stringify({ error: 'Método não permitido.' }),
    };
  }

  let payload: ContactPayload;
  try {
    payload = JSON.parse(event.body ?? '{}');
  } catch {
    return {
      statusCode: 400,
      headers: corsHeaders(origin),
      body: JSON.stringify({ error: 'Body inválido.' }),
    };
  }

  const { email, message, subject } = payload;

  if (!email?.trim() || !message?.trim()) {
    return {
      statusCode: 422,
      headers: corsHeaders(origin),
      body: JSON.stringify({ error: 'Campos obrigatórios: email, message.' }),
    };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return {
      statusCode: 422,
      headers: corsHeaders(origin),
      body: JSON.stringify({ error: 'E-mail inválido.' }),
    };
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  try {
    const mailOptions = {
      from: `"EcoTech" <${process.env.SMTP_USER}>`,
      replyTo: email,
      to: process.env.CONTACT_EMAIL,
      subject: subject ? `[EcoTech] ${subject}` : '[EcoTech] Nova mensagem da Landing Page',
      text: `E-mail: ${email}\n\nMensagem:\n${message}`,
      html: `
        <h2>Nova mensagem de contato</h2>
        <p><strong>E-mail:</strong> ${email}</p>
        <p><strong>Mensagem:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    };

    const info = await transporter.sendMail(mailOptions);

    return {
      statusCode: 200,
      headers: corsHeaders(origin),
      body: JSON.stringify({
        success: true,
        message: 'E-mail enviado com sucesso!',
        messageId: info.messageId,
      }),
    };
  } catch (error) {
    // Verificar se é erro de autenticação
    if (error instanceof Error) {
      if (error.message.includes('Invalid login') || error.message.includes('535')) {
        return {
          statusCode: 401,
          headers: corsHeaders(origin),
          body: JSON.stringify({
            error: 'Falha na autenticação. Verifique sua senha de app do Gmail.',
          }),
        };
      }
    }

    return {
      statusCode: 500,
      headers: corsHeaders(origin),
      body: JSON.stringify({
        error: 'Falha ao enviar o e-mail. Tente novamente mais tarde.',
        details: error instanceof Error ? error.message : 'Erro desconhecido',
      }),
    };
  }
};

export { handler };
