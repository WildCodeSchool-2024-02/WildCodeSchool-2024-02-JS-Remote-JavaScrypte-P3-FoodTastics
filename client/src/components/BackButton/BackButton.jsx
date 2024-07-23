import { useNavigate } from "react-router-dom";
import "./BackButton.css";

function BackButton() {
  const navigate = useNavigate();

  function handleBack() {
    navigate(-1);
  }

  return (
    <button type="button" onClick={handleBack} className="backButton">
      Retour
    </button>
  );
}

export default BackButton;
