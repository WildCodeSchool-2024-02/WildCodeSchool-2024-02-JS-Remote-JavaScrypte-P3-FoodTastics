import "./ConnectionPage.css";
import Connection from "../../components/Connection/Connection";
import Sign from "../../components/SignUp/Sign";
import BackButton from "../../components/BackButton/BackButton";

export default function ConnectionPage() {
  return (
    <main>
      <BackButton />
      <div className="forms">
        <Connection />
        <Sign />
      </div>
    </main>
  );
}
