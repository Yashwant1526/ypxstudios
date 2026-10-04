import { Link } from "react-router-dom";
import SectionHeader from "../components/SectionHeader.jsx";
import ServiceCard from "../components/ServiceCard.jsx";
import { CONFIG, waLink } from "../config.js";
import { PROCESS_STEPS, SERVICES, STATS, TESTIMONIALS } from "../data.js";

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <span className="eyebrow">Video Editing • Graphic Design • Websites • Apps</span>
            <h1>{CONFIG.tagline}</h1>
            <p className="lead">
              YPX Studios helps businesses in Hubli and beyond stand out with clear messaging, modern visuals, and digital experiences built to look professional and convert attention into action.
            </p>

            <div className="cta-row">
              <Link className="button button-primary" to="/enquiry">
                Book a discovery call
              </Link>
              <Link className="button button-secondary" to="/portfolio">
                See our work
              </Link>
              <a className="button button-success" href={waLink()} target="_blank" rel="noreferrer noopener">
                WhatsApp us
              </a>
            </div>

            <div className="pricing-strip" aria-label="Service pricing overview">
              <div className="pricing-row">
                <div className="price-item">
                  <span>Video Editing</span>
                  <strong>₹2,000+</strong>
                </div>
                <div className="price-item">
                  <span>Graphic Design</span>
                  <strong>₹3,000+</strong>
                </div>
                <div className="price-item">
                  <span>Website</span>
                  <strong>₹4,000+</strong>
                </div>
                <div className="price-item">
                  <span>App Design</span>
                  <strong>₹5,000+</strong>
                </div>
              </div>
            </div>

            <div className="stat-grid">
              {STATS.map((stat) => (
                <div key={stat.label} className="stat-card">
                  <span>{stat.label}</span>
                  <strong>{stat.value}</strong>
                </div>
              ))}
            </div>
          </div>

          <div className="hero-panel panel">
            <div className="mini-header">
              <span className="dot green" />
              <span>YPX workflow</span>
            </div>

            <div className="pipeline-list">
              <div className="pipeline-row">
                <span>01</span>
                <strong>Strategy</strong>
              </div>
              <div className="pipeline-row">
                <span>02</span>
                <strong>Brand + UX</strong>
              </div>
              <div className="pipeline-row">
                <span>03</span>
                <strong>Launch + Growth</strong>
              </div>
            </div>

            <div className="tech-badges">
              <span>Brand identity</span>
              <span>Web presence</span>
              <span>Marketing assets</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container studio-grid">
          <div className="studio-spotlight panel">
            <span className="small-label">Founded by</span>
            <h3>Yashwant M V</h3>
            <p>
              A business-minded creative helping brands and founders build a stronger digital presence with practical,
              affordable, and modern visual work.
            </p>
          </div>

          <div className="studio-trust-grid">
            <article className="trust-card panel">
              <strong>Fast turnarounds</strong>
              <p>Clear delivery timelines for businesses that need work done without delays.</p>
            </article>
            <article className="trust-card panel">
              <strong>Business-first approach</strong>
              <p>Every design and build decision is shaped around real customer value and clarity.</p>
            </article>
            <article className="trust-card panel">
              <strong>Professional quality</strong>
              <p>Modern layouts, stronger visuals, and polished outcomes that feel ready for the market.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeader
            eyebrow="What we do"
            title="Creative systems built for real business growth"
            description="From video content and design to websites and app interfaces, we create digital experiences that help businesses look sharper, feel more credible, and connect better with customers."
            align="center"
          />

          <div className="service-grid">
            {SERVICES.map((service) => (
              <ServiceCard key={service.title} service={service} />
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <SectionHeader
            eyebrow="How we work"
            title="A practical process built for momentum"
            description="Every project is shaped around business goals, audience clarity, and investment-friendly execution."
          />

          <div className="process-grid">
            {PROCESS_STEPS.map((item, index) => (
              <article key={item.title} className="panel process-card">
                <span className="step-number">0{index + 1}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeader
            eyebrow="Client feedback"
            title="Work that feels credible and gets remembered"
            description="Our focus is simple: practical strategy, premium execution, and digital experiences that help people trust your business."
            align="center"
          />

          <div className="testimonial-grid">
            {TESTIMONIALS.map((item) => (
              <blockquote key={item.client} className="panel quote-card">
                “{item.quote}”
                <footer>{item.client}</footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
