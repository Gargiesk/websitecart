import { useEffect, useState } from "react";
import axios from "axios";






export default function Admin() {
  // ================= AUTH =================
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  // ================= TEMPLATE STATES =================
  const [templates, setTemplates] = useState([]);
  const [editId, setEditId] = useState([]);

  const [form, setForm] = useState({
    name: "",
    type: "",
    style: "",
    price: "",
    demoUrl: ""
  });

  const [image, setImage] = useState([]);

  // ================= REQUEST STATES =================
  const [requests, setRequests] = useState([]);

  // ================= LOAD DATA =================
  const loadTemplates = async () => {
    const res = await axios.get("https://websitecart-backend.onrender.com");
    // supports both paginated and normal responses
    setTemplates(res.data.templates || res.data || []);
  };

  const loadRequests = async () => {
    const res = await axios.get("https://websitecart-backend.onrender.com/requests");
    setRequests(res.data || []);
  };

  useEffect(() => {
    loadTemplates();
    loadRequests();
  }, []);

  // ================= STATS =================
  const totalTemplates = templates.length;
  const totalRequests = Array.isArray(requests)
  ? requests.length
  : 0;

  const averagePrice =
    templates.length > 0
      ? Math.round(
          templates.reduce(
            (sum, t) => sum + Number(t.price || 0),
            0
          ) / templates.length
        )
      : 0;

  // ================= FORM HANDLERS =================
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("type", form.type);
    formData.append("style", form.style);
    formData.append("price", form.price);
    formData.append("demoUrl", form.demoUrl);
    if (image) formData.append("image", image);

    if (editId) {
      await axios.put(
        `https://websitecart-backend.onrender.com/templates/${editId}`,
        formData
      );
      alert("Template updated successfully");
    } else {
      await axios.post(
        "https://websitecart-backend.onrender.com/templates",
        formData
      );
      alert("Template added successfully");
    }

    setForm({ name: "", type: "", style: "", price: "", demoUrl: "" });
    setImage(null);
    setEditId(null);
    loadTemplates();
  };

  // ================= EDIT / DELETE =================
  const editTemplate = (t) => {
    setEditId(t._id);
    setForm({
      name: t.name,
      type: t.type,
      style: t.style,
      price: t.price,
      demoUrl: t.demoUrl
    });
  };

  const deleteTemplate = async (id) => {
    if (!window.confirm("Are you sure you want to delete this template?")) return;
    await axios.delete(`https://websitecart-backend.onrender.com//templates/${id}`);
    loadTemplates();
  };

  // ================= UI =================
  return (
    <div className="container py-5">

      {/* HEADER + LOGOUT */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Admin Dashboard</h2>
        <button
          className="btn btn-outline-danger btn-sm"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>

      {/* ================= DASHBOARD STATS ================= */}
      <div className="row mb-5">
        <div className="col-md-4">
          <div className="card shadow-sm border-0 p-3">
            <h6 className="text-muted">Total Templates</h6>
            <h2 className="fw-bold">{totalTemplates}</h2>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow-sm border-0 p-3">
            <h6 className="text-muted">Client Requests</h6>
            <h2 className="fw-bold">{totalRequests}</h2>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow-sm border-0 p-3">
            <h6 className="text-muted">Avg Template Price</h6>
            <h2 className="fw-bold">₹{averagePrice}</h2>
          </div>
        </div>
      </div>

      {/* ================= TEMPLATE FORM ================= */}
      <div className="card p-4 mb-5 shadow-sm">
        <h5 className="mb-3">
          {editId ? "Edit Template" : "Add New Template"}
        </h5>

        <form onSubmit={handleSubmit} encType="multipart/form-data">

          <input
            className="form-control mb-2"
            name="name"
            placeholder="Template Name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <input
            className="form-control mb-2"
            name="type"
            placeholder="Business Type (Restaurant, Portfolio...)"
            value={form.type}
            onChange={handleChange}
            required
          />

          <input
            className="form-control mb-2"
            name="style"
            placeholder="Style (Minimal, Luxury...)"
            value={form.style}
            onChange={handleChange}
            required
          />

          <input
            className="form-control mb-2"
            name="price"
            type="number"
            placeholder="Starting Price"
            value={form.price}
            onChange={handleChange}
            required
          />

          <input
            className="form-control mb-2"
            name="demoUrl"
            placeholder="Demo URL"
            value={form.demoUrl}
            onChange={handleChange}
            required
          />

          <input
            type="file"
            className="form-control mb-3"
            onChange={(e) => setImage(e.target.files[0])}
          />

          <button className="btn btn-dark">
            {editId ? "Update Template" : "Add Template"}
          </button>
        </form>
      </div>

      {/* ================= TEMPLATE LIST ================= */}
      <h4>Website Templates</h4>

      <table className="table table-bordered mt-3">
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Style</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {templates.map((t) => (
            <tr key={t._id}>
              <td>{t.name}</td>
              <td>{t.type}</td>
              <td>{t.style}</td>
              <td>₹{t.price}</td>
              <td>
                <button
                  className="btn btn-sm btn-warning me-2"
                  onClick={() => editTemplate(t)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => deleteTemplate(t._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ================= REQUESTS ================= */}
      <h4 className="mt-5">Client Customization Requests</h4>

      <table className="table table-bordered mt-3">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Template</th>
            <th>Budget</th>
            <th>Message</th>
          </tr>
        </thead>

        <tbody>
          {requests.map((r) => (
            <tr key={r._id}>
              <td>{r.name}</td>
              <td>{r.email}</td>
              <td>{r.templateInterested}</td>
              <td>{r.budget}</td>
              <td>{r.message}</td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}
