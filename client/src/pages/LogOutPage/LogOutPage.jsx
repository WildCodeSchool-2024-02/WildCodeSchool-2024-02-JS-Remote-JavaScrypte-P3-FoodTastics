import axios from "axios";
import { useOutletContext } from "react-router-dom";

export default function LogOutPage() {
  const { setCurrentUser } = useOutletContext();

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:3310/api/auth/logout", {
        withCredentials: true,
      });

      setCurrentUser(null);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <button type="button" onClick={handleLogout}>
      Se déconnecter
    </button>
  );
}
