import { Link } from "react-router-dom";

export default function ServiceCard({ service }) {
  return (
    <article className="card service-card">
      <div className="service-icon">{service.icon}</div>
      <h3>{service.title}</h3>
      <p>{service.summary}</p>

      <ul className="feature-list">
        {service.features.map((feature) => (
          <li key={feature}>{feature}</li>
        ))}
      </ul>

      <div className="service-meta">
        <strong>{service.price}</strong>
      </div>

      <div className="card-actions">
        <Link className="button button-primary small" to="/enquiry" state={{ service: service.title }}>
          Enquire now
        </Link>
        <Link className="text-link" to="/services">
          Learn more
        </Link>
      </div>
    </article>
  );
}
