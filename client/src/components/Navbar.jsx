export default function Navbar() {
  return (
    <nav className="navbar py-3">
  <div className="container">
    <a className="navbar-brand fw-bold fs-4" href="/">
      WebSiteCart
    </a>

    <div className="d-flex gap-4">
      <a className="nav-link" href="/templates">Templates</a>
      <a className="nav-link" href="/request">Custom Request</a>
    </div>
  </div>
</nav>


    // <nav className="navbar navbar-expand-lg px-4 py-3" style={{background:"#2D2A32"}}>
    //   <a className="navbar-brand text-light fw-bold fs-4" href="/">WebSiteCart</a>
      


    //   <div className="ms-auto d-flex gap-4">
    //     <a className="text-light nav-link" href="/">Home</a>
    //     <a className="text-light nav-link" href="/templates">Templates</a>
    //     <a className="text-light nav-link" href="/contact">Contact</a>
    //   </div>
    // </nav>
  );
}
// to login in admin http://localhost:5173/login