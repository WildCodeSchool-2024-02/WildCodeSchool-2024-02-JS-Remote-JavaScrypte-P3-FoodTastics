import { useNavigate } from "react-router-dom";
import Menu from "../Menu/Menu";
import ButtonConnection from "../ButtonConnection/ButtonConnection";
import "./Navbar.css";

export default function Navbar() {
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
        <Menu />
      </div>
      <ButtonConnection />
    </div>
  );
}
