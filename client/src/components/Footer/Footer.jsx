import { NavLink } from "react-router-dom";

import("./Footer.css");

export default function Footer() {
  return (
    <div className="footer-container">
      <NavLink to="/about" className="footer-link">
        À propos
      </NavLink>
      <NavLink to="#" className="footer-link">
        Nous contacter
      </NavLink>
      <NavLink to="/conditionsgenerales" className="footer-link">
        Conditions Générales
      </NavLink>
    </div>
  );
}
