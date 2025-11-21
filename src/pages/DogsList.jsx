import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiMapPin, FiMessageCircle } from "react-icons/fi";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiFillHome,
  AiOutlineUser,
} from "react-icons/ai";

const API_URL = "http://localhost:3001/dogs";
const CATEGORIES = ["Cats", "Dogs", "Birds", "Other"];

export default function DogsList() {
  const [dogs, setDogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [activeCategory, setActiveCategory] = useState("Dogs");

  useEffect(() => {
    async function fetchDogs() {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(API_URL);
        if (!res.ok) {
          throw new Error("Could not fetch dogs");
        }
            
        const data = await res.json();
        setDogs(data);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    
     fetchDogs();
  }, []);

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]
    );
  };

  if (loading) return <div className="list-screen">Loading...</div>;
  if (error) return <div className="list-screen">Error: {error}</div>;

  return (
    <div className="list-screen">
      {/* ÜST BAR */}
      <header className="top-bar">
        <div className="profile-circle" />
        <div className="location">
          <span className="location-label">Location</span>
          <span className="location-city">New York City ▾</span>
        </div>
        <div className="bell" />
      </header>

      {/* KATEGORİ BUTONLARI */}
      <div className="category-row">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            type="button"
            className={
              "category-pill" + (activeCategory === cat ? " active" : "")
            }
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* KART LİSTESİ */}
      <div className="cards-list">
        {dogs.map((dog) => (
          <article key={dog.id} className="pet-card">
            <Link to={`/dogs/${dog.id}`} className="pet-link">
              <img src={dog.image} alt={dog.breed} className="pet-image" />
              <div className="pet-info">
                <h2 className="pet-name">{dog.breed}</h2>

                <div className="pet-location">
                  <FiMapPin />
                  <span>{dog.location}</span>
                </div>

                <p className="pet-description">{dog.short_description}</p>
              </div>
            </Link>

            {/* FAVORİ IKONU */}
            <button
              type="button"
              className="fav-button"
              onClick={() => toggleFavorite(dog.id)}
            >
              {favorites.includes(dog.id) ? (
                <AiFillHeart className="fav-icon filled" />
              ) : (
                <AiOutlineHeart className="fav-icon" />
              )}
            </button>
          </article>
        ))}
      </div>

      {/* FAVORİ FOTO BAR – Bottom nav ÜSTÜ */}
      {favorites.length > 0 && (
        <div className="favorites-bottom-wrapper">
          <div className="favorites-bottom-list">
            {favorites.map((favId) => {
              const favDog = dogs.find((d) => d.id === favId);
              if (!favDog) return null;

              return (
                <img
                  key={favDog.id}
                  src={favDog.image}
                  alt={favDog.breed}
                  className="favorites-bottom-thumb"
                />
              );
            })}
          </div>
        </div>
      )}

      {/* ALT NAV */}
      <nav className="bottom-nav">
        <button type="button" className="bottom-nav-item active">
          <AiFillHome className="bottom-nav-icon" />
        </button>

        <button type="button" className="bottom-nav-item">
          <FiMessageCircle className="bottom-nav-icon" />
        </button>

        {/* FAVORİ SAYACI (KALP) */}
        <button type="button" className="bottom-nav-item bottom-nav-heart">
          <AiOutlineHeart className="bottom-nav-icon" />

          {favorites.length > 0 && (
            <span className="bottom-nav-badge">{favorites.length}</span>
          )}
        </button>

        <button type="button" className="bottom-nav-item">
          <AiOutlineUser className="bottom-nav-icon" />
        </button>
      </nav>
    </div>
  );
}
