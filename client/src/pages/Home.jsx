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
            <span className="eyebrow">Creative • Technology • Digital Solutions</span>
            <h1>
              {CONFIG.tagline}
            </h1>
            <p className="lead">
              YPX Studios helps founders, businesses, and creators turn their ideas into digital experiences that feel premium,
              clear, and ready to convert.
            </p>

            <div className="cta-row">
              <Link className="button button-primary" to="/enquiry">
                Start a project
              </Link>
              <Link className="button button-secondary" to="/portfolio">
                View portfolio
              </Link>
              <a className="button button-success" href={waLink()} target="_blank" rel="noreferrer noopener">
                WhatsApp us
              </a>
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
              <span>Brand pipeline</span>
            </div>

            <div className="pipeline-list">
              <div className="pipeline-row">
                <span>Strategy</span>
                <strong>Discovery</strong>
              </div>
              <div className="pipeline-row">
                <span>Design</span>
                <strong>Brand + UX</strong>
              </div>
              <div className="pipeline-row">
                <span>Launch</span>
                <strong>Web + Reels</strong>
              </div>
            </div>

            <div className="tech-badges">
              <span>Brand films</span>
              <span>Web experiences</span>
              <span>Creative systems</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeader
            eyebrow="What we do"
            title="Creative support designed for growth"
            description="Web presence, motion content, branding, and digital assets built around business goals."
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
            title="Simple process, clear communication"
            description="Every engagement is structured for momentum, clarity, and realistic business outcomes."
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
            title="People remember the experience"
            description="We aim for clear strategy, premium design, and long-term value."
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
