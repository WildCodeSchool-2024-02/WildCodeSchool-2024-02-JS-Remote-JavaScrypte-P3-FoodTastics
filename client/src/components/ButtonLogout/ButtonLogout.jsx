import "./ButtonLogout.css";
import axios from "axios";
import PropTypes from "prop-types";

export default function ButtonLogout({ setCurrentUser }) {
  const handleLogout = async () => {
    try {
      await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/logout`, {
        withCredentials: true,
      });

      setCurrentUser(null);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <button type="button" className="logoutNavButton" onClick={handleLogout}>
      Déconnexion
    </button>
  );
}

ButtonLogout.defaultProps = {
  currentUser: null,
  setCurrentUser: null,
};

ButtonLogout.propTypes = {
  currentUser: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }),
  setCurrentUser: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }),
};
