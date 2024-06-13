import Menu from "../Menu/Menu";
import "./Navbar.css";

export default function Navbar() {
  const redirectionToHome = () => {
    window.location.href = "/";
  };
  return (
    <div className="Navbar">
      <button className="Logo" type="button" onClick={redirectionToHome}>
        <img
          className="logoImage"
          src="src/assets/images/Logo_foodtastics.png"
          alt="logo du site"
        />
      </button>
      <Menu />
    </div>
  );
}
