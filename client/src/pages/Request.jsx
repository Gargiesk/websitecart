import { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

export default function Request() {
  const [searchParams] = useSearchParams();
  const templateFromUrl = searchParams.get("template");

  const [form, setForm] = useState({
    name: "",
    email: "",
    templateName: "",
    budget: "",
    message: ""
  });

  // Auto-fill template name
  useEffect(() => {
    if (templateFromUrl) {
      setForm((prev) => ({
        ...prev,
        templateName: templateFromUrl
      }));
    }
  }, [templateFromUrl]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.post("http://localhost:5000/requests", form);

    alert("Your request has been submitted. We will contact you soon.");

    setForm({
      name: "",
      email: "",
      templateName: "",
      budget: "",
      message: ""
    });
  };

  return (
    <div className="container py-5 col-md-6">
      <h2 className="mb-4">Request Website Customization</h2>

      <form onSubmit={handleSubmit}>
        <input
          className="form-control mb-3"
          name="name"
          placeholder="Your Name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          className="form-control mb-3"
          name="email"
          type="email"
          placeholder="Your Email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          className="form-control mb-3"
          name="templateName"
          placeholder="Template Interested In"
          value={form.templateName}
          onChange={handleChange}
         readOnly={!!templateFromUrl}
        />

        <input
          className="form-control mb-3"
          name="budget"
          placeholder="Estimated Budget (₹)"
          value={form.budget}
          onChange={handleChange}
        />

        <textarea
          className="form-control mb-4"
          name="message"
          placeholder="Describe your requirements"
          rows="4"
          value={form.message}
          onChange={handleChange}
        />

        <button className="btn btn-dark w-100">
          Submit Request
        </button>
      </form>
    </div>
  );
}
