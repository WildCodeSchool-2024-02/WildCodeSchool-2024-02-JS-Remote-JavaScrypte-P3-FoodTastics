import "./HomePage.css";
import RecipeTabs from "../../components/RecipeTabs/RecipeTabs";

function HomePage() {
  return (
    <div className="homepage">
      <div className="content-wrapper">
        <div className="imgcontainer">
          <img
            src="./images/Accueil.jpeg"
            alt="plat cuisiné"
            className="image"
          />
        </div>
      </div>

      <div className="container">
        <h1 className="title">Eating Nam Nam</h1>
        <p className="text">
          La plateforme leader du partage de recettes "zéro-déchet"
        </p>
        <button className="button" type="button">
          Découvrir
        </button>
      </div>

      <div className="recipe">
        <h1>Les dernières recettes</h1>
        <RecipeTabs />
      </div>
    </div>
  );
}

export default HomePage;
