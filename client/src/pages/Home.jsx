export default function Home() {
  return (
    <div className="container py-5">
      <div className="row align-items-center">

        {/* LEFT TEXT */}
        <div className="col-md-6">
          <h1 className="hero-title">WebSiteCart</h1>

          <p className="hero-sub">
            A curated shop of premium websites.<br />
            Pick a design. Customize it. Launch fast.
          </p>

          <div className="mt-4 d-flex gap-3">
            <a href="/templates" className="btn btn-dark">
              Browse Designs
            </a>
            <a href="/request" className="btn btn-outline-dark">
              Custom Build
            </a>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="col-md-6 text-center">
          <div className="hero-image-wrapper">
            <img
              src="/hero.png"
              alt="Showcase"
              className="img-fluid rounded"
            />
            <span className="badge-floating">
              Hand-crafted designs
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}
