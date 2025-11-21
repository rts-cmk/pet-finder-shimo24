import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FiMapPin } from "react-icons/fi";

const API_URL = "http://localhost:3001/dogs";

export default function DogDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [dog, setDog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchDog() {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(`${API_URL}/${id}`);
        if (!res.ok) {
          throw new Error("Dog not found");
        }

        const data = await res.json();
        setDog(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchDog();
  }, [id]);

  if (loading) return <div className="detail-screen">Loading...</div>;
  if (error || !dog)
    return <div className="detail-screen">Error: {error || "Not found"}</div>;

  return (
    <div className="detail-screen">
      {/* Üstte büyük foto */}
      <div className="detail-header-image">
        <img src={dog.image} alt={dog.breed} />
      </div>

      {/* Alttaki beyaz kart */}
      <div className="detail-card">
        <h1 className="detail-title">{dog.breed}</h1>

        <div className="detail-location">
          <FiMapPin />
          <span>{dog.location}</span>
        </div>

        <div className="detail-tags">
          <div className="detail-tag">
            <span role="img" aria-label="breed">
              🐾
            </span>
            <span>{dog.breed}</span>
          </div>
          <div className="detail-tag">
            <span role="img" aria-label="gender">
              ⚧
            </span>
            <span>{dog.gender === "male" ? "Male" : "Female"}</span>
          </div>
        </div>

        <p className="detail-text">{dog.long_description}</p>

        <button
          type="button"
          className="detail-back"
          onClick={() => navigate("/dogs")}
        >
          Back
        </button>
      </div>
    </div>
  );
}
