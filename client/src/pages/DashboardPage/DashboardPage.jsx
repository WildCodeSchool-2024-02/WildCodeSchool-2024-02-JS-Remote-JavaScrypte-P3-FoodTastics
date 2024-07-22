/* eslint-disable camelcase */

import axios from "axios";
import { useEffect } from "react";
import {
  NavLink,
  useLoaderData,
  useOutletContext,
  useNavigate,
} from "react-router-dom";
import BackButton from "../../components/BackButton/BackButton";
import "./DashboardPage.css";

export default function DashboardPage() {
  const data = useLoaderData();
  const navigate = useNavigate();

  const { firstname, lastname, pseudo, image_profile, email, role, user_id } =
    data.user[0];
  const menus = data.menu.slice(0, 7);

  const dailyMenus = {
    Lundi: menus[0],
    Mardi: menus[1],
    Mercredi: menus[2],
    Jeudi: menus[3],
    Vendredi: menus[4],
    Samedi: menus[5],
    Dimanche: menus[6],
  };

  const { currentUser } = useOutletContext();

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
        navigate("/connexion");
      }
    };

    checkAuth();
  }, [currentUser, navigate]);

  if (!currentUser) {
    return navigate("/connexion");
  }
  // Affichage pour role = user :

  if (role !== "admin") {
    return (
      <>
        <BackButton />
        <ul className="list-dashboard">
          <li>
            <NavLink
              to="."
              className={({ isActive }) =>
                isActive ? "links-dashboard-active" : "links-dashboard"
              }
            >
              Mon profil
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/recipes"
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
        <div className="body-dashboard">
          <div
            className={
              role === "user" ? "container-infos" : "container-infos-admin"
            }
          >
            <img className="img-profile" src={image_profile} alt="avatar" />
            <div className="infos">
              <div className="pseudo">
                <h2>{pseudo}</h2>
              </div>
              <div className="cle">
                <h2>
                  {firstname} {lastname}
                </h2>
              </div>
              <div className="cle">
                <h2>{email}</h2>
              </div>

              <NavLink
                to={`/admin/users/modif/${user_id}`}
                className="button-modify"
              >
                Modifier mon profil
              </NavLink>
            </div>
          </div>
          <div className="container-badges-planning">
            <div className="container-badges">
              <h1>Mes badges</h1>
              {data.user.map((u) => (
                <img
                  key={u.id}
                  src={u.badge_image}
                  alt={u.badge_description}
                  title={`${u.badge_name} - ${u.badge_description}`}
                  className="img-badge"
                />
              ))}
            </div>
            <div className="container-planning">
              <h1 className="title-planning">Mon planning </h1>
              <div className="days">
                {Object.keys(dailyMenus).map((day) => (
                  <div key={day} className="day-column">
                    <div className="day-name">{day}</div>
                    <div className="img-menu-container">
                      <img
                        src={dailyMenus[day].recipe_image}
                        className="img-menu"
                        alt={dailyMenus[day].recipe_name}
                      />
                    </div>
                    <h3>{dailyMenus[day].recipe_name}</h3>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
  // Affichage pour role = admin :
  return (
    <>
      <BackButton />
      <ul className="list-dashboard">
        <li>
          <NavLink
            to="."
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
      <div className="body-dashboard">
        <div className="container-infos-admin">
          <img className="image-profile" src={image_profile} alt="avatar" />
          <div className="infos">
            <div className="pseudo">
              <h2>{pseudo}</h2>
            </div>
            <div className="cle">
              <h2>
                {firstname} {lastname}
              </h2>
            </div>
            <div className="cle">
              <h2>{email}</h2>
            </div>

            <NavLink
              to={`/admin/users/modif/${user_id}`}
              className={
                role === "user" ? "button-modify" : "button-modify-admin"
              }
            >
              Modifier mon profil
            </NavLink>
          </div>
        </div>
        <div className="container-dash-admin">
          <NavLink to="/admin/users" className="container-admin">
            <h1>Utilisateurs</h1>
          </NavLink>
          <div className="container-admin">
            <NavLink to="/admin/recipes" className="container-admin">
              <h1>Recettes</h1>
            </NavLink>
          </div>
          <div className="container-admin">
            <NavLink to="/admin/ingredients" className="container-admin">
              <h1>Ingredients</h1>
            </NavLink>
          </div>
          <div className="container-admin">
            <NavLink to="/admin/users" className="container-admin">
              <h1>Commentaires</h1>
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
}
