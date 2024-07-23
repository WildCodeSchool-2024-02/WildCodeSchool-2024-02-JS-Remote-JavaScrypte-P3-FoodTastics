import { useEffect } from "react";
import axios from "axios";
import {
  useLoaderData,
  useOutletContext,
  useNavigate,
  NavLink,
} from "react-router-dom";
import "./AdminIngredientsPage.css";
import BackButton from "../../../components/BackButton/BackButton";

export default function AdminIngredientsPage() {
  const navigate = useNavigate();
  const { currentUser } = useOutletContext();
  const ingredients = useLoaderData();

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
    <div className="ingredients-body">
      <BackButton />
      <NavLink to="/ingredient" className="btn-add-ingredient">
        Ajouter un nouvel ingrédient
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

      <div className="ingredients-container-ad">
        {ingredients.map((i) => (
          <div className="ingredient-card-ad" key={i.id}>
            <h3>{i.name}</h3>
            <div className="img-ingredient-cont">
              <img className="img-ingre-ad" src={i.image} alt={i.name} />
            </div>

            <div className="ingredient-infos">
              <div className="emoji-info">
                {" "}
                <p className="emoji">🍱 </p> <p>Catégory : {i.category}</p>
              </div>
              <div className="emoji-info">
                <p className="emoji-calories">🔋</p>{" "}
                <p>Calories : {i.calories}</p>
              </div>
              <div className="emoji-info">
                <p className="emoji"> 👨‍🍳</p>{" "}
                <p>Postée par (id): {i.user_id} </p>
              </div>
            </div>
            <NavLink to={`/admin/ingredient/modif/${i.id}`}>
              <button type="button" className="buttonDetails-ingredientcard">
                Plus de détails
              </button>
            </NavLink>
          </div>
        ))}
      </div>
    </div>
  );
}
