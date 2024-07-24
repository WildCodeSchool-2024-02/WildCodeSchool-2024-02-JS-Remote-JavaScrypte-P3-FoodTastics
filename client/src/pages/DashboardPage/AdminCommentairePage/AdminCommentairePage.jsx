import "./AdminCommentairePage.css";
import BackButton from "../../../components/BackButton/BackButton";

function ConditionsPage() {
  return (
    <div className="commentaire">
      <BackButton />
      <div className="commentaire-container">
        <h1 className="commentaire-title">
          Il n'y a pas encore de commentaire
        </h1>
      </div>
    </div>
  );
}

export default ConditionsPage;
