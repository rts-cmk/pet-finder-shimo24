import { useNavigate } from "react-router-dom";
import catIllustration from "../assets/cat.svg";  // BURAYA SVG YOLU GELECEK

export default function Onboarding() {
  const navigate = useNavigate();

  return (
    <div className="onboarding">
      {/* ORTADA GÖRÜNEN RESİM */}
      <div className="onboarding-illustration">
        <img src={catIllustration} alt="Cat Illustration" />
      </div>

      {/* ALT KISIM */}
      <h1>My Pets</h1>
      <p>
        Taking care of a pet is my favorite, it helps me to gain relief from stress and fatigue.
      </p>

      <button onClick={() => navigate("/dogs")}>Skip</button>
    </div>
  );
}
