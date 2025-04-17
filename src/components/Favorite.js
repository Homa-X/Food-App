import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favoriteMeals")) || [];
    setFavorites(storedFavorites);
  }, []);

  const handleRemove = (idMeal) => {
    const updatedFavorites = favorites.filter((meal) => meal.idMeal !== idMeal);
    setFavorites(updatedFavorites);
    localStorage.setItem("favoriteMeals", JSON.stringify(updatedFavorites));
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat px-4 pt-24 pb-20 text-white"
      style={{ backgroundImage: `url('/bg.PNG')` }}
    >
      <h1 className="text-2xl mb-6">Your Favorite Meals ❤️</h1>

      {favorites.length === 0 ? (
        <p className="text-white text-lg">You have no favorite meals yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {favorites.map((meal) => (
            <div
              key={meal.idMeal}
              className="bg-white bg-opacity-10 backdrop-blur-md p-4 rounded-xl shadow-md text-white relative group"
            >
              <Link to={`/meal/${meal.idMeal}`}>
                <img
                  src={meal.strMealThumb}
                  alt={meal.strMeal}
                  className="rounded-md w-full h-48 object-cover mb-2"
                />
                <h2 className="text-xl font-semibold">{meal.strMeal}</h2>
              </Link>
              <button
                onClick={() => handleRemove(meal.idMeal)}
                className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center transition"
                title="Remove from favorites"
              >
                ❌
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites;
