import { Routes, Route } from "react-router-dom";
import Onboarding from "./pages/Onboarding";
import DogsList from "./pages/DogsList";
import DogDetails from "./pages/DogDetails";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Onboarding />} />
      <Route path="/dogs" element={<DogsList />} />
      <Route path="/dogs/:id" element={<DogDetails />} />
    </Routes>
  );
}

export default App;
