import { useEffect, useState } from "react";
import axios from "axios";

const API = "https://websitecart-backend.onrender.com";

export default function Admin() {
  /* ================= AUTH ================= */
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  /* ================= STATE ================= */
  const [templates, setTemplates] = useState([]);
  const [requests, setRequests] = useState([]);

  const [editId, setEditId] = useState(null);
  const [image, setImage] = useState(null);

  const [form, setForm] = useState({
    name: "",
    type: "",
    style: "",
    price: "",
    demoUrl: "",
  });

  /* ================= LOAD DATA ================= */
  const loadTemplates = async () => {
    try {
      const res = await axios.get(`${API}/templates`);
      setTemplates(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Failed to load templates", err);
      setTemplates([]);
    }
  };

  const loadRequests = async () => {
    try {
      const res = await axios.get(`${API}/requests`);
      setRequests(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Failed to load requests", err);
      setRequests([]);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await loadTemplates();
      await loadRequests();
    };
    fetchData();
  }, []);

  /* ================= STATS (SAFE) ================= */
  const totalTemplates = templates.length;
  const totalRequests = requests.length;

  const averagePrice =
    templates.length > 0
      ? Math.round(
          templates.reduce(
            (sum, t) => sum + Number(t.price || 0),
            0
          ) / templates.length
        )
      : 0;

  /* ================= FORM ================= */
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

    try {
      if (editId) {
        await axios.put(`${API}/templates/${editId}`, formData);
        alert("Template updated successfully");
      } else {
        await axios.post(`${API}/templates`, formData);
        alert("Template added successfully");
      }

      setForm({ name: "", type: "", style: "", price: "", demoUrl: "" });
      setImage(null);
      setEditId(null);
      loadTemplates();
    } catch (err) {
      console.error("Template save failed", err);
      alert("Failed to save template");
    }
  };

  /* ================= EDIT / DELETE ================= */
  const editTemplate = (t) => {
    setEditId(t._id);
    setForm({
      name: t.name,
      type: t.type,
      style: t.style,
      price: t.price,
      demoUrl: t.demoUrl,
    });
  };

  const deleteTemplate = async (id) => {
    if (!window.confirm("Delete this template?")) return;

    try {
      await axios.delete(`${API}/templates/${id}`);
      loadTemplates();
    } catch (err) {
      console.error("Delete failed", err);
      alert("Failed to delete template");
    }
  };

  /* ================= UI ================= */
  return (
    <div className="container py-5">
      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Admin Dashboard</h2>
        <button className="btn btn-outline-danger btn-sm" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {/* STATS */}
      <div className="row mb-5">
        <div className="col-md-4">
          <div className="card p-3 shadow-sm">
            <h6 className="text-muted">Total Templates</h6>
            <h2>{totalTemplates}</h2>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card p-3 shadow-sm">
            <h6 className="text-muted">Client Requests</h6>
            <h2>{totalRequests}</h2>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card p-3 shadow-sm">
            <h6 className="text-muted">Avg Template Price</h6>
            <h2>₹{averagePrice}</h2>
          </div>
        </div>
      </div>

      {/* TEMPLATE FORM */}
      <div className="card p-4 mb-5 shadow-sm">
        <h5>{editId ? "Edit Template" : "Add New Template"}</h5>

        <form onSubmit={handleSubmit}>
          <input className="form-control mb-2" name="name" placeholder="Template Name" value={form.name} onChange={handleChange} required />
          <input className="form-control mb-2" name="type" placeholder="Business Type" value={form.type} onChange={handleChange} required />
          <input className="form-control mb-2" name="style" placeholder="Style" value={form.style} onChange={handleChange} required />
          <input className="form-control mb-2" name="price" type="number" placeholder="Price" value={form.price} onChange={handleChange} required />
          <input className="form-control mb-2" name="demoUrl" placeholder="Demo URL" value={form.demoUrl} onChange={handleChange} required />
          <input className="form-control mb-3" type="file" onChange={(e) => setImage(e.target.files[0])} />

          <button className="btn btn-dark">
            {editId ? "Update Template" : "Add Template"}
          </button>
        </form>
      </div>

      {/* TEMPLATE LIST */}
      <h4>Website Templates</h4>
      <table className="table table-bordered">
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
                <button className="btn btn-warning btn-sm me-2" onClick={() => editTemplate(t)}>Edit</button>
                <button className="btn btn-danger btn-sm" onClick={() => deleteTemplate(t._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* REQUESTS */}
      <h4 className="mt-5">Client Requests</h4>
      <table className="table table-bordered">
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
              <td>₹{r.budget}</td>
              <td>{r.message}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
