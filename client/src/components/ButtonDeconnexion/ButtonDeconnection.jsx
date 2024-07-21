import { NavLink } from "react-router-dom";
import axios from "axios";

import "./ButtonDeconnection.css";

export default function ButtonDeconnection() {
  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:3310/api/auth/logout", {
        withCredentials: true,
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="btn-dec">
      <NavLink to="/" className="button-deconnexion" onClick={handleLogout}>
        Déconnexion
      </NavLink>
    </div>
  );
}
