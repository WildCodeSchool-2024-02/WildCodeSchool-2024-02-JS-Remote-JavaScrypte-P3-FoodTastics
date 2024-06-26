import { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Menu.css";

function Menu() {
  const [showLinks, setShowLinks] = useState(false);
  const handleShowLinks = () => {
    setShowLinks(!showLinks);
  };

  return (
    <div className={`menu ${showLinks ? "active" : "inactive"} `}>
      <ul className="navbarList">
        <li className="navbarItem">
          <NavLink to="/" className="navbarLink" onClick={handleShowLinks}>
            Accueil
          </NavLink>
        </li>
        <li className="navbarItem">
          <NavLink
            to="/contact"
            className="navbarLink"
            onClick={handleShowLinks}
          >
            Contact
          </NavLink>
        </li>
        <li className="navbarItem">
          <NavLink to="/about" className="navbarLink" onClick={handleShowLinks}>
            À propos
          </NavLink>
        </li>

        <li className="navbarItem">
          <NavLink
            to="/conection"
            className="navbarLink"
            onClick={handleShowLinks}
          >
            Connexion
          </NavLink>
        </li>
      </ul>
      <button
        className="burgerMenu"
        aria-label="burger"
        type="button"
        onClick={handleShowLinks}
      >
        <span className="burgerLine" />
      </button>
    </div>
  );
}
export default Menu;
