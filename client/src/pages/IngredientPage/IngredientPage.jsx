import "./IngredientPage.css";

export default function Ingredientlabelage() {
  return (
    <div className="container-ingredient">
      <img className="img-ingredient" src="images/add_img.png" alt="Ajouter" />
      <form className="form-ingredient ">
        <label htmlFor="name" className="title-ingredient">
          Ecrivez le nom de votre ingrédient
        </label>
        <label className="catégorie" htmlFor="text">
          Catégorie
        </label>
        <label htmlFor="calories">Calories (pour 100 gr)</label>
        <label htmlFor="proteins">labelrotéines (pour 100 gr)</label>
        <label htmlFor="carbohydrates">Glucides (pour 100 gr)</label>
        <label htmlFor="sugar">Sucre (pour 100 gr)</label>
        <label htmlFor="lipids">Lipides (pour 100 gr)</label>
        <label htmlFor="salt">Sel(pour 100 gr)</label>
        <label htmlFor="fiber">Fibres(pour 100 gr)</label>
      </form>
      <button className="button-ingredient" type="submit">
        Enregistrer
      </button>
    </div>
  );
}
