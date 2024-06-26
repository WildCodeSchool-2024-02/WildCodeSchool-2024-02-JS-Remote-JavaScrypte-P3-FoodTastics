import { useNavigate } from "react-router-dom";
import Menu from "../Menu/Menu";
import "./Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();

  const redirectionToHome = () => {
    navigate("/");
  };

  return (
    <div className="Navbar">
      <button className="Logo" type="button" onClick={redirectionToHome}>
        <img
          className="logoImage"
          src="../../../public/images/Logo_foodtastics.png"
          alt="logo del sitio"
        />
      </button>
      <Menu />
    </div>
  );
}
