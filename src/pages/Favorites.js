import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("favoriteMeals")) || [];
    setFavorites(stored);
  }, []);

  const remove = (id) => {
    const updated = favorites.filter((meal) => meal.idMeal !== id);
    setFavorites(updated);
    localStorage.setItem("favoriteMeals", JSON.stringify(updated));
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat px-4 pt-24 pb-20 text-white"
      style={{ backgroundImage: `url('/bg.PNG')` }}
    >
      <h1 className="text-2xl mb-6 text-center">Your Favorite Meals ❤️</h1>

      {favorites.length === 0 ? (
        <p className="text-center text-lg">You have no favorite meals yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {favorites.map((meal) => (
            <div
              key={meal.idMeal}
              className="bg-white bg-opacity-10 p-4 rounded-xl shadow-md text-white flex flex-col justify-between"
            >
              <img
                src={meal.strMealThumb}
                alt={meal.strMeal}
                className="w-full h-40 object-cover rounded-md"
              />
              <h2 className="text-xl mt-2">{meal.strMeal}</h2>
              <div className="mt-3 flex justify-between items-center">
                <Link
                  to={`/meal/${meal.idMeal}`}
                  className="text-blue-400 hover:text-blue-600 text-sm"
                >
                  View Details
                </Link>
                <button
                  onClick={() => remove(meal.idMeal)}
                  className="bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1 rounded"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites;
