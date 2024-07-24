import { useState, useEffect } from "react";
import "./Searchbar.css";
import { NavLink } from "react-router-dom";

export default function Searchbar() {
  const [datas, setDatas] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/recipe`)
      .then((res) => res.json())
      .then((data) => setDatas(data));
  }, []);

  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    e.preventDefault();
    setSearch(searchTerm);
  };

  const filteredDatas = datas.filter((d) =>
    d.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleLinkReset = () => {
    search("");
  };

  return (
    <div className="searchbar">
      <input
        type="search"
        name="searchbar"
        id="searchbar"
        placeholder="Recherchez une recette"
        onChange={handleSearch}
      />
      <div
        className={`resultsContainer ${search.length > 1 ? "hasResults" : ""}`}
      >
        {search.length > 1 && filteredDatas.length > 0
          ? filteredDatas.map((f) => (
              <NavLink
                to={`/details/${f.id}`}
                onClick={handleLinkReset}
                className="resultLink"
                key={f.id}
              >
                {f.name}
              </NavLink>
            ))
          : search.length > 1 && <div>Aucun résultat correspondant</div>}
      </div>
    </div>
  );
}
