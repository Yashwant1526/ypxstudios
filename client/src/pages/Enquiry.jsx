import { useLocation } from "react-router-dom";
import EnquiryForm from "../components/EnquiryForm.jsx";
import SectionHeader from "../components/SectionHeader.jsx";

export default function Enquiry() {
  const { state } = useLocation();

  return (
    <section className="page-shell">
      <div className="container narrow">
        <SectionHeader
          eyebrow="Start a project"
          title="Tell us what you need"
          description="Share a few details and we will reach out with the right direction for your brief."
        />

        <div className="panel form-panel">
          <EnquiryForm initialService={state?.service} />
        </div>
      </div>
    </section>
  );
}
