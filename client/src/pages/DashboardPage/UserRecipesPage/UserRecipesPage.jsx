import { useEffect } from "react";
import "./UserRecipePage.css";
import axios from "axios";
import {
  NavLink,
  useLoaderData,
  useNavigate,
  useOutletContext,
} from "react-router-dom";
import BackButton from "../../../components/BackButton/BackButton";

export default function UserRecipesPage() {
  const navigate = useNavigate();
  const { currentUser } = useOutletContext();
  const data = useLoaderData();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/auth/checkauth`,
          {
            withCredentials: true,
          }
        );
        const authenticatedUser = response.data.user;
        if (!authenticatedUser || authenticatedUser.id !== currentUser.id) {
          navigate("/connexion");
        }
      } catch (e) {
        console.error(e);
        navigate("connexion");
      }
    };

    checkAuth();
  }, [currentUser, navigate]);

  if (!currentUser) {
    return navigate("/connexion");
  }

  return (
    <div className="recipes-body-user">
      <BackButton />
      <NavLink to="/ajout-recette" className="btn-add-recipe">
        Ajouter une nouvelle recette
      </NavLink>
      <ul className="list-dashboard">
        <li>
          <NavLink
            to="/dashboard/5"
            className={({ isActive }) =>
              isActive ? "links-dashboard-active" : "links-dashboard"
            }
          >
            Mon profil
          </NavLink>
        </li>
        <li>
          <NavLink
            to={`/user/recipes/${currentUser.id}`}
            className={({ isActive }) =>
              isActive ? "links-dashboard-active" : "links-dashboard"
            }
          >
            Mes recettes
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/favourites"
            className={({ isActive }) =>
              isActive ? "links-dashboard-active" : "links-dashboard"
            }
          >
            Mes favoris
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/notifications"
            className={({ isActive }) =>
              isActive ? "links-dashboard-active" : "links-dashboard"
            }
          >
            Mes notifications
          </NavLink>
        </li>
      </ul>
      <div className="recipes-container-user">
        {data.recipes.map((r) => (
          <div className="recipe-card-user" key={r.id}>
            <h3>{r.recipe_name}</h3>
            <div className="img-recipe-container-user">
              <img className="img-recipe-user" src={r.image} alt={r.name} />
            </div>

            <div className="recipe-infos-user">
              <p>😋 Recette pour {r.number_of_people} personnes </p>
              <p>⏰ Temps de prép. : {r.set_up_time}´</p>
              {r.is_validated ? "✔️ Validée" : " ❌ En attente de validation"}
              <p>📝{r.description.split(" ").slice(0, 8).join(" ")} ... </p>
            </div>
            <NavLink to={`/admin/recipes/modif/${r.id}`}>
              <button type="button" className="buttonDetails-recipecard-user">
                Modifier
              </button>
            </NavLink>
          </div>
        ))}
      </div>
    </div>
  );
}
