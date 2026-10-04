import { Link } from "react-router-dom";
import { CONFIG, waLink } from "../config.js";
import SectionHeader from "../components/SectionHeader.jsx";

export default function Contact() {
  return (
    <section className="page-shell">
      <div className="container narrow">
        <SectionHeader
          eyebrow="Contact"
          title="Let’s build your next digital move"
          description="Reach out for branding, websites, marketing creatives, or production support."
        />

        <div className="panel contact-panel">
          <ul className="contact-list">
            <li>
              <strong>Email</strong>
              <a href={`mailto:${CONFIG.email}`}>{CONFIG.email}</a>
            </li>
            <li>
              <strong>Location</strong>
              <span>{CONFIG.location}</span>
            </li>
            <li>
              <strong>Instagram</strong>
              <a href={CONFIG.instagram} target="_blank" rel="noreferrer noopener">
                @ypx.studios
              </a>
            </li>
            <li>
              <strong>WhatsApp</strong>
              <a href={waLink()} target="_blank" rel="noreferrer noopener">
                Message YPX Studios
              </a>
            </li>
          </ul>

          <div className="contact-cta">
            <Link className="button button-primary" to="/enquiry">
              Start your enquiry
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
