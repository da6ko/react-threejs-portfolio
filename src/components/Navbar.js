import { Outlet, Link } from "react-router-dom";
import "../css/navbar.css";

const Layout = () => {
  return (
    <header className="header">
      <div className="logo">
        <span className="logo-text"></span>
        <span className="logo-text">Kaloyan Marchev</span>
      </div>
      <nav>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li><Link to="/technologies">Technologies</Link></li>
        </ul>
      </nav>
      <Outlet />
    </header>
  );
};

export default Layout;
