import { useState } from "react";
import SectionHeader from "../components/SectionHeader.jsx";
import { CATEGORIES, PROJECTS } from "../data.js";

export default function Portfolio() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProjects =
    selectedCategory === "All"
      ? PROJECTS
      : PROJECTS.filter((project) => project.category === selectedCategory);

  return (
    <section className="page-shell">
      <div className="container">
        <SectionHeader
          eyebrow="Portfolio"
          title="Selected work and creative direction"
          description="Placeholder examples to help you replace with your real case studies later."
        />

        <div className="chip-row">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              type="button"
              className={selectedCategory === category ? "chip active" : "chip"}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="service-grid">
          {filteredProjects.map((project) => (
            <article key={project.id} className="card project-card">
              <div className="project-thumb">{project.icon}</div>
              <small className="project-tag">{project.category}</small>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <a className="text-link" href={project.url}>
                View project
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
