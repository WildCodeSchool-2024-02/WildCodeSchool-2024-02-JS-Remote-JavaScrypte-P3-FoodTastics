import "./HomePage.css";

function HomePage() {
  return (
    <div className="homepage">
      <div className="imgcontainer">
        <img
          src="./src/assets/images/Accueil.jpeg"
          alt="plat cuisiné"
          className="image"
        />
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
    </div>
  );
}

export default HomePage;
