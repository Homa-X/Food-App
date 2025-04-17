import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import MealDetails from "./components/MealDetails";
import Favorites from "./pages/Favorites";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-cover bg-center">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/meal/:idMeal" element={<MealDetails />} />
          <Route path="/favorite" element={<Favorites />} />
        </Routes>
        <footer className="text-center p-2 bg-black bg-opacity-50 text-white text-sm fixed bottom-0 w-full">
          Mentor: Sebastian Degerman | Student: Homayoun Khanmohammadi
        </footer>
      </div>
    </Router>
  );
}

export default App;
