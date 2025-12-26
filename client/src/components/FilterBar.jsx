export default function FilterBar({ filters, setFilters }) {
  return (
    <div className="row g-3 mb-4 align-items-end">

      <div className="col-md-3">
        <select
          className="form-select filter-input"
          value={filters.type}
          onChange={(e) =>
            setFilters({ ...filters, type: e.target.value })
          }
        >
          <option value="">All Business Types</option>
          <option value="Restaurant">Restaurant</option>
          <option value="Portfolio">Portfolio</option>
          <option value="Coaching">Coaching</option>
        </select>
      </div>

      <div className="col-md-3">
        <select
          className="form-select filter-input"
          value={filters.style}
          onChange={(e) =>
            setFilters({ ...filters, style: e.target.value })
          }
        >
          <option value="">All Styles</option>
          <option value="Minimal">Minimal</option>
          <option value="Luxury">Luxury</option>
          <option value="Vibrant">Vibrant</option>
        </select>
      </div>

      <div className="col-md-3">
        <input
          type="number"
          className="form-control filter-input"
          placeholder="Min Price"
          value={filters.minPrice}
          onChange={(e) =>
            setFilters({ ...filters, minPrice: e.target.value })
          }
        />
      </div>

      <div className="col-md-3">
        <input
          type="number"
          className="form-control filter-input"
          placeholder="Max Price"
          value={filters.maxPrice}
          onChange={(e) =>
            setFilters({ ...filters, maxPrice: e.target.value })
          }
        />
      </div>

    </div>
  );
}
