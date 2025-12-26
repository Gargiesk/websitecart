export default function TemplateCard({ data }) {
  return (
    <div className="template-row">
      {/* LEFT INFO */}
      <div>
        <h5 className="template-title">{data.name}</h5>

        <p className="template-meta">
          {data.type} • {data.style}
        </p>

        <p className="template-price">
          Starts at ₹{data.price}
        </p>
      </div>

      {/* RIGHT ACTIONS */}
      <div className="template-actions">
        <a
          href={data.demoUrl}
          target="_blank"
          rel="noreferrer"
          className="btn btn-preview"
        >
          Preview
        </a>

        <a
          href={`/request?template=${encodeURIComponent(data.name)}`}
          className="btn btn-customize"
        >
          Customize
        </a>
      </div>
    </div>
  );
}
