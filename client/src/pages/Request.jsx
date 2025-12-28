import { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

const API_URL = "https://websitecart-backend.onrender.com";

export default function Request() {
  const [searchParams] = useSearchParams();
  const templateFromUrl = searchParams.get("template");

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    websiteType: "",
    budget: "",
    message: "",
    templateInterested: "",
  });

  // Auto-fill template name from URL
  useEffect(() => {
    if (templateFromUrl) {
      setForm((prev) => ({
        ...prev,
        templateInterested: templateFromUrl,
      }));
    }
  }, [templateFromUrl]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      await axios.post(`${API_URL}/requests`, {
        name: form.name,
        email: form.email,
        websiteType: form.websiteType,
        budget: Number(form.budget),
        message: form.message,
        templateInterested: form.templateInterested,
      });

      alert("✅ Your request has been submitted successfully!");

      setForm({
        name: "",
        email: "",
        websiteType: "",
        budget: "",
        message: "",
        templateInterested: templateFromUrl || "",
      });
    } catch (err) {
      console.error("Request submission failed:", err);
      alert("❌ Failed to submit request. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5 col-md-6">
      <h2 className="mb-4 text-center">Request Website Customization</h2>

      <form onSubmit={handleSubmit}>
        {/* Name */}
        <input
          className="form-control mb-3"
          name="name"
          placeholder="Your Name"
          value={form.name}
          onChange={handleChange}
          required
        />

        {/* Email */}
        <input
          className="form-control mb-3"
          name="email"
          type="email"
          placeholder="Your Email"
          value={form.email}
          onChange={handleChange}
          required
        />

        {/* Website Type (REQUIRED by backend) */}
        <input
          className="form-control mb-3"
          name="websiteType"
          placeholder="Website Type (e.g. Portfolio, Restaurant)"
          value={form.websiteType}
          onChange={handleChange}
          required
        />

        {/* Template Interested */}
        <input
          className="form-control mb-3"
          name="templateInterested"
          placeholder="Template Interested In"
          value={form.templateInterested}
          onChange={handleChange}
          readOnly={!!templateFromUrl}
        />

        {/* Budget */}
        <input
          className="form-control mb-3"
          name="budget"
          type="number"
          placeholder="Estimated Budget (₹)"
          value={form.budget}
          onChange={handleChange}
          required
        />

        {/* Message */}
        <textarea
          className="form-control mb-4"
          name="message"
          placeholder="Describe your requirements"
          rows="4"
          value={form.message}
          onChange={handleChange}
        />

        <button className="btn btn-dark w-100" disabled={loading}>
          {loading ? "Submitting..." : "Submit Request"}
        </button>
      </form>
    </div>
  );
}
