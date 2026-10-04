import { useState } from "react";
import { SERVICES } from "../data.js";
import { waLink } from "../config.js";
import { submitEnquiry } from "../services/api.js";

const emptyForm = {
  name: "",
  phone: "",
  email: "",
  budget: "",
  deadline: "",
  details: "",
  service: "",
};

export default function EnquiryForm({ initialService }) {
  const [form, setForm] = useState({
    ...emptyForm,
    service: initialService || SERVICES[0].title,
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const updateField = (field) => (event) => {
    const { value } = event.target;
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: "" }));
  };

  const validate = () => {
    const nextErrors = {};

    if (!form.name.trim()) nextErrors.name = "Please enter your name.";
    if (form.phone.replace(/\D/g, "").length < 10) {
      nextErrors.phone = "Enter a valid 10-digit mobile number.";
    }
    if (form.email && !/^\S+@\S+\.\S+$/.test(form.email)) {
      nextErrors.email = "Enter a valid email address.";
    }
    if (!form.details.trim()) nextErrors.details = "Tell us a little about your project.";

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    setLoading(true);
    setSubmitError("");

    try {
      const payload = {
        name: form.name.trim(),
        phone: form.phone.trim(),
        email: form.email.trim(),
        service: form.service,
        budget: form.budget.trim(),
        deadline: form.deadline.trim(),
        details: form.details.trim(),
      };

      await submitEnquiry(payload);

      const message = `Hello YPX Studios,\nI would like to enquire about ${payload.service}.\nName: ${payload.name}\nMobile: ${payload.phone}\nEmail: ${payload.email || "-"}\nBudget: ${payload.budget || "-"}\nDeadline: ${payload.deadline || "-"}\nProject details: ${payload.details}`;

      window.open(waLink(message), "_blank", "noopener");
    } catch (error) {
      setSubmitError(error.message || "Something went wrong while submitting your enquiry.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="form-grid" onSubmit={handleSubmit} noValidate>
      <label className="field-block">
        <span>Name</span>
        <input type="text" value={form.name} onChange={updateField("name")} />
        <small className="field-error">{errors.name || ""}</small>
      </label>

      <label className="field-block">
        <span>Mobile number</span>
        <input type="tel" value={form.phone} onChange={updateField("phone")} inputMode="tel" />
        <small className="field-error">{errors.phone || ""}</small>
      </label>

      <label className="field-block">
        <span>Email</span>
        <input type="email" value={form.email} onChange={updateField("email")} />
        <small className="field-error">{errors.email || ""}</small>
      </label>

      <label className="field-block">
        <span>Service</span>
        <select value={form.service} onChange={updateField("service")}>
          {SERVICES.map((service) => (
            <option key={service.title} value={service.title}>
              {service.title}
            </option>
          ))}
          <option value="Other">Other</option>
        </select>
      </label>

      <label className="field-block">
        <span>Budget</span>
        <input type="text" value={form.budget} onChange={updateField("budget")} placeholder="₹15,000" />
      </label>

      <label className="field-block">
        <span>Deadline</span>
        <input type="text" value={form.deadline} onChange={updateField("deadline")} placeholder="2-4 weeks" />
      </label>

      <label className="field-block full-span">
        <span>Project details</span>
        <textarea rows="5" value={form.details} onChange={updateField("details")} />
        <small className="field-error">{errors.details || ""}</small>
      </label>

      {submitError ? <div className="inline-error">{submitError}</div> : null}

      <button type="submit" className="button button-primary" disabled={loading}>
        {loading ? "Sending..." : "Send on WhatsApp"}
      </button>
    </form>
  );
}
