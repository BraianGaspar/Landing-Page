import { useState, useEffect } from "react";

// Assets
import Logo from "../assets/logo.png";
import Menu from "../assets/hamburguer.svg";
import Close from "../assets/close.svg";
import Leaf from "../assets/leaf.svg";

// Components
import Button from "../components/Button";
import Card from "../components/Card";
import TestimonialCard from "../components/TestimonialCard";
import PricingCard from "../components/PricingCard";

// Styles
import "../styles/header.css";
import "../styles/hero.css";
import "../styles/solution.css";
import "../styles/testimonials.css";
import "../styles/pricing.css";
import "../styles/contact.css";
import "../styles/footer.css";
import "../styles/utility.css";

// Mock images for testimonials
import ProfileImageOne from "../assets/images/profile1.svg";
import ProfileImageTwo from "../assets/images/profile2.svg";
import ProfileImageThree from "../assets/images/profile3.svg";

export default function Home() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [subject, setSubject] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [sendStatus, setSendStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({
    type: null,
    message: "",
  });

  useEffect(() => {
    const html = document.querySelector("html");
    if (html) {
      html.style.overflow = showMobileMenu ? "hidden" : "auto";
    }
  }, [showMobileMenu]);

  const handleMobileMenuClose = () => {
    setShowMobileMenu(false);
  };

  const handleSendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    setSendStatus({ type: null, message: "" });

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          message,
          subject: subject || "Contato via Landing Page",
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erro ao enviar mensagem.");
      }

      setSendStatus({
        type: "success",
        message:
          "Mensagem enviada com sucesso! Entraremos em contato em breve.",
      });
      setEmail("");
      setMessage("");
      setSubject("");
    } catch (error) {
      setSendStatus({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "Erro ao enviar mensagem. Tente novamente.",
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <>
      {/* Header */}
      <header className="container py-sm">
        <nav className="flex items-center justify-between">
          <img
            src={Logo}
            alt="Logo EcoTech"
            style={{ height: "60px", width: "auto" }}
          />

          <div className="desktop-only">
            <ul className="flex gap-1">
              <li>
                <a href="#">Home</a>
              </li>
              <li>
                <a href="#solution">Soluções</a>
              </li>
              <li>
                <a href="#testimonials">Depoimentos</a>
              </li>
              <li>
                <a href="#pricing">Planos</a>
              </li>
              <li>
                <a href="#contact">Contato</a>
              </li>
            </ul>
          </div>

          <div className="desktop-only">
            <div className="flex items-center">
              <a className="reverse-color ml-lg" href="#contact">
                Login
              </a>
              <Button text="Cadastre-se" />
            </div>
          </div>

          <div className="mobile-menu">
            {showMobileMenu ? (
              <div className="mobile-menu-content">
                <div className="container flex">
                  <ul>
                    <li>
                      <a
                        onClick={() => {
                          handleMobileMenuClose();
                        }}
                        href="#"
                      >
                        Home
                      </a>
                    </li>
                    <li>
                      <a
                        onClick={() => {
                          handleMobileMenuClose();
                        }}
                        href="#solution"
                      >
                        Soluções
                      </a>
                    </li>
                    <li>
                      <a
                        onClick={() => {
                          handleMobileMenuClose();
                        }}
                        href="#testimonials"
                      >
                        Depoimentos
                      </a>
                    </li>
                    <li>
                      <a
                        onClick={() => {
                          handleMobileMenuClose();
                        }}
                        href="#pricing"
                      >
                        Planos
                      </a>
                    </li>
                    <li>
                      <a
                        onClick={() => {
                          handleMobileMenuClose();
                        }}
                        href="#contact"
                      >
                        Contato
                      </a>
                    </li>
                    <li>
                      <a
                        className="reverse-color"
                        onClick={() => {
                          handleMobileMenuClose();
                        }}
                        href="#contact"
                      >
                        Login
                      </a>
                    </li>
                  </ul>
                  <span
                    onClick={() => setShowMobileMenu(!showMobileMenu)}
                    className="btn-wrapper"
                  >
                    <img
                      src={Close}
                      alt="ícone fechar menu"
                      width={24}
                      height={24}
                    />
                  </span>
                </div>
              </div>
            ) : (
              <span
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="btn-wrapper"
              >
                <img src={Menu} alt="ícone menu" width={24} height={24} />
              </span>
            )}
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section id="hero">
        <div className="container content">
          <p className="desktop-only">🌱 Tecnologia para um futuro melhor</p>
          <h1>
            Soluções sustentáveis{" "}
            <span style={{ color: "var(--primary-color)" }}>
              para um planeta
            </span>{" "}
            mais verde
          </h1>
          <p>
            A EcoTech desenvolve tecnologias inovadoras que conectam pessoas à
            natureza, reduzindo o impacto ambiental e promovendo um futuro mais
            sustentável para todos.
          </p>
          <div className="flex gap-1">
            <span>
              <Button text="Comece agora" />
            </span>
            <span className="desktop-only">
              <Button text="Saiba mais" secondary />
            </span>
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section className="container" id="solution">
        <header>
          <span>
            <h2>Nossas Soluções</h2>
            <span className="desktop-only">
              <h2>Inovação com propósito</h2>
            </span>
          </span>
          <p>
            Na EcoTech, acreditamos que tecnologia e sustentabilidade andam
            juntas. Nossas soluções são projetadas para gerar impacto positivo
            no meio ambiente e nos negócios dos nossos clientes.
          </p>
        </header>

        <section className="even-columns">
          <Card
            icon={Leaf}
            title="Energia Renovável"
            description="Soluções completas em energia solar e eólica para empresas e residências, com monitoramento inteligente e redução de até 70% na conta de luz."
            alt="Ícone de folha"
          />
          <Card
            icon={Leaf}
            title="Gestão de Resíduos"
            description="Plataforma inteligente para gestão de resíduos, com rastreamento em tempo real e otimização da cadeia de reciclagem e compostagem."
            alt="Ícone de gestão"
          />
          <Card
            icon={Leaf}
            title="Mobilidade Verde"
            description="Soluções para mobilidade urbana sustentável, incluindo aplicativos de carona compartilhada, bicicletas elétricas e integração com transporte público."
            alt="Ícone de mobilidade"
          />
        </section>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials">
        <header>
          <span>
            <p className="desktop-only">O que nossos clientes dizem</p>
            <h2>Quem já transformou seu negócio</h2>
          </span>
          <p>
            Conheça as histórias de empresas e pessoas que já estão fazendo a
            diferença com as soluções sustentáveis da EcoTech.
          </p>
        </header>

        <section className="carousel">
          <div className="carousel-content">
            <TestimonialCard
              image={ProfileImageOne}
              name="Ana Oliveira"
              role="CEO, GreenEnergy"
              testimony="Com a EcoTech, reduzimos nossa pegada de carbono em 60% no primeiro ano. A tecnologia é incrível e o suporte da equipe é excepcional!"
              rating={5}
              alt="Perfil cliente"
            />
            <TestimonialCard
              image={ProfileImageTwo}
              name="Carlos Santos"
              role="Diretor, ReciclaTech"
              testimony="A plataforma de gestão de resíduos revolucionou nossa operação. Conseguimos aumentar a reciclagem em 200% e reduzir custos significativamente."
              rating={5}
              alt="Perfil cliente"
            />
            <TestimonialCard
              image={ProfileImageThree}
              name="Mariana Costa"
              role="Fundadora, EcoVida"
              testimony="A EcoTech nos ajudou a implementar soluções de mobilidade verde que transformaram a forma como nossos funcionários se deslocam. Incrível!"
              rating={5}
              alt="Perfil cliente"
            />
            <TestimonialCard
              image={ProfileImageOne}
              name="Ana Oliveira"
              role="CEO, GreenEnergy"
              testimony="Com a EcoTech, reduzimos nossa pegada de carbono em 60% no primeiro ano. A tecnologia é incrível e o suporte da equipe é excepcional!"
              rating={5}
              alt="Perfil cliente"
            />
          </div>
        </section>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="container">
        <header>
          <p className="desktop-only">Planos e preços</p>
          <h2>Invista no futuro do planeta</h2>
        </header>

        <section className="even-columns gap-1.5">
          <PricingCard
            name="Eco Start"
            description="Ideal para pequenas empresas que querem começar sua jornada sustentável."
            price="R$ 97"
            priceUnit="/mês"
            features={[
              "Auditoria energética",
              "Relatórios mensais",
              "Suporte por e-mail",
              "Até 50 funcionários",
            ]}
            buttonText="Começar"
            buttonSecondary={true}
          />

          <PricingCard
            name="Eco Pro"
            description="Para empresas que buscam impacto real e soluções completas."
            price="R$ 297"
            priceUnit="/mês"
            features={[
              "Instalação solar",
              "Gestão de resíduos",
              "Mobilidade verde",
              "Até 500 funcionários",
              "Suporte 24/7",
            ]}
            isPremium={true}
            bonus="ECONOMIZE 20% NO PLANO ANUAL"
            buttonText="Assinar agora"
          />

          <PricingCard
            name="Eco Enterprise"
            description="Solução personalizada para grandes corporações e governos."
            price="Sob consulta"
            features={[
              "Projetos personalizados",
              "Consultoria especializada",
              "Monitoramento em tempo real",
              "Usuários ilimitados",
              "Integração com sistemas",
              "Treinamento dedicado",
            ]}
            buttonText="Fale conosco"
            buttonSecondary={true}
          />
        </section>
      </section>

      {/* Contact Section */}
      <section id="contact">
        <div className="container">
          <header>
            <h2>Fale com a EcoTech</h2>
            <p>
              Quer saber como podemos ajudar sua empresa a ser mais sustentável?
              Preencha o formulário abaixo e nossa equipe especializada entrará
              em contato.
            </p>
          </header>

          <form className="contact-form" onSubmit={handleSendEmail}>
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

            <Button
              text={isSending ? "Enviando..." : "Enviar mensagem"}
              type="submit"
            />

            {sendStatus.type && (
              <div className={`status-message ${sendStatus.type}`}>
                {sendStatus.message}
              </div>
            )}
          </form>
        </div>
      </section>

      {/* Footer - VERSÃO CORRIGIDA */}
      <footer id="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              {/* Logo com fundo branco e filtro para inverter cores */}
              <div
                style={{
                  backgroundColor: "white",
                  padding: "8px 14px",
                  borderRadius: "8px",
                  display: "inline-block",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                }}
              >
                <img
                  src={Logo}
                  alt="Logo EcoTech"
                  style={{
                    height: "50px",
                    width: "auto",
                    display: "block",
                    filter: "brightness(1) saturate(1)",
                  }}
                />
              </div>
              <p
                style={{
                  color: "rgba(255,255,255,0.7)",
                  maxWidth: "300px",
                  marginTop: "1rem",
                }}
              >
                Tecnologia para um futuro mais verde e sustentável.
              </p>
              <div className="social-links">
                <a href="#" aria-label="Facebook">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                <a href="#" aria-label="Instagram">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                  </svg>
                </a>
                <a href="#" aria-label="LinkedIn">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
              </div>
            </div>

            <div className="footer-column">
              <h4>Empresa</h4>
              <ul>
                <li>
                  <a href="#">Sobre nós</a>
                </li>
                <li>
                  <a href="#">Carreiras</a>
                </li>
                <li>
                  <a href="#">Blog</a>
                </li>
              </ul>
            </div>

            <div className="footer-column">
              <h4>Soluções</h4>
              <ul>
                <li>
                  <a href="#">Energia Solar</a>
                </li>
                <li>
                  <a href="#">Gestão de Resíduos</a>
                </li>
                <li>
                  <a href="#">Mobilidade Verde</a>
                </li>
              </ul>
            </div>

            <div className="footer-column">
              <h4>Recursos</h4>
              <ul>
                <li>
                  <a href="#">Documentação</a>
                </li>
                <li>
                  <a href="#">API</a>
                </li>
                <li>
                  <a href="#">Comunidade</a>
                </li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <p>Feito com Braian Gaspar</p>
            <p>©2026 EcoTech - Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
