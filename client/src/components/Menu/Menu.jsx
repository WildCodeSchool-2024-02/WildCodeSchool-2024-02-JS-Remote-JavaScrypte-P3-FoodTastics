import PropTypes from "prop-types";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Menu.css";
import axios from "axios";

function Menu({ currentUser, setCurrentUser }) {
  const [showLinks, setShowLinks] = useState(false);
  const handleShowLinks = () => {
    setShowLinks(!showLinks);
  };
  const handleLogout = async () => {
    try {
      await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/logout`, {
        withCredentials: true,
      });

      setShowLinks(false);

      setCurrentUser(null);
    } catch (e) {
      console.error(e);
    }
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
            to={currentUser ? `/dashboard/${currentUser.id}` : "/"}
            className="navbarLink"
            onClick={handleShowLinks}
          >
            Mon compte
          </NavLink>
        </li>
        <li className="navbarItem">
          <NavLink to="/about" className="navbarLink" onClick={handleShowLinks}>
            À propos
          </NavLink>
        </li>

        <li className="navbarItem">
          {currentUser ? (
            <button type="button" className="navbarLink" onClick={handleLogout}>
              Déconnexion
            </button>
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

Menu.propTypes = {
  currentUser: PropTypes.shape({
    id: PropTypes.number.isRequired,
    username: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }),
  setCurrentUser: PropTypes.func,
};

Menu.defaultProps = {
  currentUser: null,
  setCurrentUser: () => {},
};

export default Menu;
