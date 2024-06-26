import "./ConnectionPage.css";
import Connection from "../../components/Connection/Connexion";
import Sign from "../../components/SignUp/Sign";

export default function ConnectionPage() {
  return (
    <main className="forms">
      <Connection />
      <Sign />
    </main>
  );
}
