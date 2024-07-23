import { useEffect } from "react";
import axios from "axios";
import {
  useLoaderData,
  useOutletContext,
  useNavigate,
  NavLink,
} from "react-router-dom";
import "./AdminRecipesPage.css";
import BackButton from "../../../components/BackButton/BackButton";

export default function AdminRecipesPage() {
  const navigate = useNavigate();
  const { currentUser } = useOutletContext();
  const recipes = useLoaderData();

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
    <div className="recipes-body">
      <BackButton />
      <NavLink to="/ajout-recette" className="btn-add-recipe">
        Ajouter une nouvelle recette
      </NavLink>
      <ul className="list-dashboard">
        <li>
          <NavLink
            to={`/dashboard/${currentUser.id}`}
            className={({ isActive }) =>
              isActive ? "links-dashboard-active" : "links-dashboard"
            }
          >
            Mon profil
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/users"
            className={({ isActive }) =>
              isActive ? "links-dashboard-active" : "links-dashboard"
            }
          >
            Utilisateurs
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/recipes"
            className={({ isActive }) =>
              isActive ? "links-dashboard-active" : "links-dashboard"
            }
          >
            Recettes
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/ingredients"
            className={({ isActive }) =>
              isActive ? "links-dashboard-active" : "links-dashboard"
            }
          >
            Ingredients
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/commentaires"
            className={({ isActive }) =>
              isActive ? "links-dashboard-active" : "links-dashboard"
            }
          >
            Commentaires
          </NavLink>
        </li>
      </ul>

      <div className="recipes-container-ad">
        {recipes.map((r) => (
          <div className="recipe-card-ad" key={r.id}>
            <h3>{r.name}</h3>
            <div className="img-recipe-container">
              <img className="img-recipe-ad" src={r.image} alt={r.name} />
            </div>

            <div className="recipe-infos">
              <p> 😋 Recette pour {r.number_of_people} personnes </p>
              <p>👨‍🍳 Postée par (id): {r.user_id} </p>
              <div className="validation">
                {r.is_validated ? "✔️ validée" : " ❌ En attente de validation"}
              </div>
            </div>
            <NavLink to={`/admin/recipes/modif/${r.id}`}>
              <button type="button" className="buttonDetails-recipecard">
                Plus de détails
              </button>
            </NavLink>
          </div>
        ))}
      </div>
    </div>
  );
}
