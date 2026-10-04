import { Link } from "react-router-dom";
import ServiceCard from "../components/ServiceCard.jsx";
import SectionHeader from "../components/SectionHeader.jsx";
import { SERVICES } from "../data.js";

export default function Services() {
  return (
    <section className="page-shell">
      <div className="container">
        <SectionHeader
          eyebrow="Services"
          title="Digital services built for real business needs"
          description="Choose the support you need or tell us what you want to build."
        />

        <div className="service-grid">
          {SERVICES.map((service) => (
            <ServiceCard key={service.title} service={service} />
          ))}
        </div>

        <div className="cta-band panel">
          <div>
            <span className="eyebrow">Need something custom?</span>
            <h3>Tell us about the work and we will map out the best fit.</h3>
          </div>
          <Link className="button button-primary" to="/enquiry">
            Request a quote
          </Link>
        </div>
      </div>
    </section>
  );
}
