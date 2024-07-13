/* eslint-disable camelcase */
import "./DashboardPage.css";
import { NavLink, useLoaderData } from "react-router-dom";

export default function DashboardPage() {


  const data = useLoaderData();

  const { firstname, lastname, pseudo, image_profile, email, role } =
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

  return (
    <>
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
            {role === "user" ? "Mes recettes" : "Utilisateurs"}
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/favourites"
            className={({ isActive }) =>
              isActive ? "links-dashboard-active" : "links-dashboard"
            }
          >
            {role === "user" ? "Mes favoris" : "Recettes"}
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/notifications"
            className={({ isActive }) =>
              isActive ? "links-dashboard-active" : "links-dashboard"
            }
          >
            {role === "user" ? "Mes notifications" : "Commentaires"}
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
              to="/mesinfos/:id"
              className={
                role === "user" ? "button-modify" : "button-modify-admin"
              }
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
