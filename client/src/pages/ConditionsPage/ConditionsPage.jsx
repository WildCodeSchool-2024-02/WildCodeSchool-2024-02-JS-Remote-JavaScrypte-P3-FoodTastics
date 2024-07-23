import "./ConditionsPage.css";
import BackButton from "../../components/BackButton/BackButton";

function ConditionsPage() {
  return (
    <>
      <BackButton />
      <div className="conditions-container">
        <h1 className="conditions-title">Conditions Générales d'Utilisation</h1>
        <div className="conditions-content">
          <h2>Comment utiliser les recettes diffusées sur ce site ?</h2>
          <p>
            Toutes les recettes diffusées sur le site peuvent être utilisées
            dans le cadre des trois hypothèses décrites ci-dessous selon votre
            statut. Dans tous les cas, vous ne pouvez pas les reproduire pour en
            faire un usage commercial. Les recettes diffusées sur le site sont
            incorporées dans une base de données appartenant à la société Eating
            Nam Mam, vous ne pouvez ni reproduire cette base de données, ni
            extraire des données contenues dans cette base autrement que pour
            votre usage privé.
          </p>
          <h2>Vous êtes un particulier :</h2>
          <p>
            Vous pouvez utiliser toutes les recettes diffusées sur le site pour
            votre usage privé : repas entre amis ou en famille.
          </p>
          <h2>Vous êtes un professionnel : cuisinier, restaurateur</h2>
          <p>
            Vous pouvez utiliser les recettes sans droit de publier la recette
            elle-même sous 2 conditions : retour d'expérience : dans les
            commentaires pouvant être associés à chaque recette ; visibilité de
            la source de la recette sur votre menu : "Cette recette vient du
            site www.eatingnammam.fr".
          </p>
          <h2>
            Vous êtes une Ecole de formation de cuisine, un élève cuisinier ou
            une association culinaire
          </h2>
          <p>
            Vous n'avez pas l'autorisation d'utiliser les recettes sauf accord
            préalable de Eating Nam Mam. Contactez-nous pour connaître les
            possibilités de partenariats : contact@eatingnammam.fr.
          </p>
          <h2>Vous avez des recettes, faites-les partager</h2>
          <p>
            Allez dans la rubrique "Mes recettes" et remplissez le formulaire.
            En remplissant le formulaire vous garantissez que :
          </p>
          <p>
            À votre connaissance, cette recette ne vient pas d'un ouvrage ou
            d'un recueil de recettes ;
          </p>
          <p>
            Vous autorisez Eating Nam Mam à diffuser cette recette sur son site
            et à l'intégrer dans sa base de données gratuitement ;
          </p>
          <p>
            Vous autorisez Eating Nam Mam à la diffuser, la publier et la
            reproduire sur le site www.eatingnammam.fr ou sur tout autre
            support.
          </p>
        </div>
      </div>
    </>
  );
}

export default ConditionsPage;
