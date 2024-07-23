import { useNavigate } from "react-router-dom";
import "./BackButton.css";
import back from "../../assets/back.png";

function BackButton() {
  const navigate = useNavigate();

  function handleBack() {
    navigate(-1);
  }

  return (
    <button type="button" onClick={handleBack} className="backButton">
      <img src={back} alt="flèche" className="arrow" />
      Retour
    </button>
  );
}

export default BackButton;
