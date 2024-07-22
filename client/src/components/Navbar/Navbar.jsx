import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import Menu from "../Menu/Menu";
import ButtonConnection from "../ButtonConnection/ButtonConnection";
import "./Navbar.css";
import Searchbar from "../Searchbar/Searchbar";

export default function Navbar({ currentUser, setCurrentUser }) {
  const navigate = useNavigate();

  const redirectionToHome = () => {
    navigate("/");
  };

  return (
    <div className="Navbar">
      <div className="menu-logo">
        <button className="Logo" type="button" onClick={redirectionToHome}>
          <img
            className="logoImage"
            src="/images/Logo_foodtastics.png"
            alt="logo del sitio"
          />
        </button>
        <Menu currentUser={currentUser} setCurrentUser={setCurrentUser} />
      </div>
      <Searchbar />
      <ButtonConnection />
    </div>
  );
}
Navbar.defaultProps = {
  currentUser: null,
  setCurrentUser: null,
};

Navbar.propTypes = {
  currentUser: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }),
  setCurrentUser: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }),
};
