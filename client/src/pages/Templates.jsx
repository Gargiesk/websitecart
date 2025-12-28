import { useEffect, useState } from "react";
import axios from "axios";
import TemplateCard from "../components/TemplateCard";
import FilterBar from "../components/FilterBar";

export default function Templates() {
  const [templates, setTemplates] = useState([]); // ALWAYS array
  const [filters, setFilters] = useState({
    type: "",
    style: "",
    minPrice: "",
    maxPrice: ""
  });

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  const fetchTemplates = async () => {
    try {
      const res = await axios.get("https://websitecart-backend.onrender.com/templates", {
        params: {
          ...filters,
          search,
          page,
          limit: 6
        }
      });

      // 🔒 SAFE STATE SETTING
      setTemplates(res.data.templates || []);
      setPages(res.data.pages || 1);

      console.log("API response OK:", res.data);
    } catch (err) {
      console.error("Error fetching templates:", err);
      setTemplates([]);
    }
  };

  useEffect(() => {
    fetchTemplates();
  }, [filters, search, page]);

  return (
    <div className="container py-5">
     <div className="templates-canvas">
      <h2 className="mb-4" style={{ fontWeight: 700 }}>
             Browse Website Templates
     </h2>
     
    

      {/* SEARCH */}
      <input
        className="form-control mb-3"
        placeholder="Search templates..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1);
        }}
      />

      {/* FILTERS */}
      <FilterBar filters={filters} setFilters={setFilters} />

      {/* CARDS */}
      {templates.length === 0 && (
        <p>No templates found.</p>
      )}

      <div className="row g-4">
        {templates.map((t) => (
          <TemplateCard key={t._id} data={t} />
        ))}
      </div>

      {/* PAGINATION */}
      <div className="d-flex justify-content-center mt-4 gap-2">
        {Array.from({ length: pages }, (_, i) => (
          <button
            key={i}
            className={`btn btn-sm ${
              page === i + 1 ? "btn-dark" : "btn-outline-dark"
            }`}
            onClick={() => setPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  </div>
  );
}
