import PropTypes from "prop-types";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Menu.css";

function Menu({ currentUser }) {
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
          {currentUser ? (
            <NavLink
              to={`/dashboard/${currentUser.id}`}
              className="navbarLink"
              onClick={handleShowLinks}
            >
              Mon compte
            </NavLink>
          ) : (
            <NavLink
              to="/connexion"
              className="navbarLink"
              onClick={handleShowLinks}
            >
              Connexion
            </NavLink>
          )}
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

Menu.defaultProps = {
  currentUser: null,
};

Menu.propTypes = {
  currentUser: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }),
};

export default Menu;
