/* eslint-disable camelcase */
import "./DashboardPage.css";
import { NavLink, useLoaderData } from "react-router-dom";

export default function DashboardPage() {
  const data = useLoaderData();

  const { firstname, lastname, pseudo, image_profile, email } = data.user[0];
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
        <div className="container-infos">
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

            <NavLink to="/mesinfos/:id" className="button-modify">
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
              <div className="day-column">
                <div className="day-name">Lundi</div>

                <div className="img-menu-container">
                  <img
                    src={dailyMenus.Lundi.recipe_image}
                    className="img-menu"
                    alt={dailyMenus.Lundi.recipe_name}
                  />
                </div>
                <h3>{dailyMenus.Lundi.recipe_name}</h3>
              </div>

              <div className="day-column">
                <div className="day-name">Mardi</div>

                <div className="img-menu-container">
                  <img
                    src={dailyMenus.Mardi.recipe_image}
                    className="img-menu"
                    alt={dailyMenus.Mardi.recipe_name}
                  />
                </div>
                <h3>{dailyMenus.Mardi.recipe_name}</h3>
              </div>

              <div className="day-column">
                <div className="day-name">Mercredi</div>

                <div className="img-menu-container">
                  <img
                    src={dailyMenus.Mercredi.recipe_image}
                    className="img-menu"
                    alt={dailyMenus.Mercredi.recipe_name}
                  />
                </div>
                <h3>{dailyMenus.Mercredi.recipe_name}</h3>
              </div>

              <div className="day-column">
                <div className="day-name">Jeudi</div>

                <div className="img-menu-container">
                  <img
                    src={dailyMenus.Jeudi.recipe_image}
                    className="img-menu"
                    alt={dailyMenus.Jeudi.recipe_name}
                  />
                </div>
                <h3>{dailyMenus.Jeudi.recipe_name}</h3>
              </div>

              <div className="day-column">
                <div className="day-name">Vendredi</div>

                <div className="img-menu-container">
                  <img
                    src={dailyMenus.Vendredi.recipe_image}
                    className="img-menu"
                    alt={dailyMenus.Vendredi.recipe_name}
                  />
                </div>
                <h3>{dailyMenus.Vendredi.recipe_name}</h3>
              </div>

              <div className="day-column">
                <div className="day-name">Samedi</div>

                <div className="img-menu-container">
                  <img
                    src={dailyMenus.Samedi.recipe_image}
                    className="img-menu"
                    alt={dailyMenus.Samedi.recipe_name}
                  />
                </div>
                <h3>{dailyMenus.Samedi.recipe_name}</h3>
              </div>
              <div className="day-column">
                <div className="day-name">Dimanche</div>

                <div className="img-menu-container">
                  <img
                    src={dailyMenus.Dimanche.recipe_image}
                    className="img-menu"
                    alt={dailyMenus.Dimanche.recipe_name}
                  />
                </div>
                <h3>{dailyMenus.Dimanche.recipe_name}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
