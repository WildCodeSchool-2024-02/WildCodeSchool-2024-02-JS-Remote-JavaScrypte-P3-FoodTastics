import "./ButtonConnection.css";
import { NavLink } from "react-router-dom";

export default function ButtonConnection() {
  return (
    <div className="btn">
      <NavLink to="/connexion" className="button-connexion">
        Connexion
      </NavLink>
    </div>
  );
}
