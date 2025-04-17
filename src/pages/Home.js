import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [mealResults, setMealResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const findMeals = async () => {
    if (!searchTerm.trim()) {
      setErrorMessage('Please type a meal name before searching.');
      setMealResults([]);
      return;
    }

    setErrorMessage('');
    setIsLoading(true);

    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`);
      const data = await response.json();

      if (data.meals && data.meals.length > 0) {
        setMealResults(data.meals);
      } else {
        setMealResults([]);
        setErrorMessage('Could not find any meals with that name.');
      }
    } catch (error) {
      console.error("Failed to fetch meals:", error);
      setErrorMessage('An error occurred while searching. Please try again later.');
      setMealResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const saveToFavorites = (meal) => {
    const currentFavorites = JSON.parse(localStorage.getItem('favoriteMeals')) || [];
    const alreadySaved = currentFavorites.some(fav => fav.idMeal === meal.idMeal);

    if (!alreadySaved) {
      const mealDataToSave = {
        idMeal: meal.idMeal,
        strMeal: meal.strMeal,
        strMealThumb: meal.strMealThumb,
      };
      const newFavoritesList = [...currentFavorites, mealDataToSave];
      localStorage.setItem('favoriteMeals', JSON.stringify(newFavoritesList));
      alert(`'${meal.strMeal}' was added to your favorites!`);
    } else {
      alert(`'${meal.strMeal}' is already in your favorites.`);
    }
  };

  const handleSearchInput = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      findMeals();
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed text-white px-4 py-20"
      style={{ backgroundImage: "url('/bg.PNG')" }}
    >
      <div className="max-w-2xl mx-auto bg-black bg-opacity-60 p-6 rounded-2xl shadow-xl">
        <h1 className="text-3xl font-bold mb-2 text-center">Welcome to the Food App! 🍔</h1>
        <p className="text-center text-sm mb-4">
          Discover delicious meals from around the world 🍽️ <br />
          Search for meals, view their details, and save <br /> your favorites for later!
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-center mb-4 gap-2">
          <input
            type="text"
            placeholder="Search for a meal..."
            className="w-full sm:w-auto p-2 rounded-xl border border-gray-300 text-white bg-white bg-opacity-10 focus:outline-none"
            value={searchTerm}
            onChange={handleSearchInput}
            onKeyDown={handleKeyPress}
          />
          <button
            onClick={findMeals}
            className="px-4 py-2 bg-white bg-opacity-20 rounded-xl hover:bg-opacity-40 transition"
            disabled={isLoading}
          >
            {isLoading ? 'Searching...' : 'Search'}
          </button>
        </div>

        {errorMessage && <p className="text-red-400 text-center mb-4">{errorMessage}</p>}

        {isLoading && !errorMessage ? (
          <p className="text-center">Loading meals...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {mealResults.map((meal) => (
              <div
                key={meal.idMeal}
                className="bg-white bg-opacity-10 p-4 rounded-xl shadow-md text-white"
              >
                <img
                  src={meal.strMealThumb}
                  alt={meal.strMeal}
                  className="w-full h-40 object-cover rounded-md"
                />
                <h2 className="text-xl mt-2 font-semibold">{meal.strMeal}</h2>
                <div className="mt-2 flex justify-between items-center">
                  <Link
                    to={`/meal/${meal.idMeal}`}
                    className="text-blue-400 hover:text-blue-600 text-sm font-medium"
                  >
                    View Details
                  </Link>
                  <button
                    onClick={() => saveToFavorites(meal)}
                    className="text-pink-400 hover:text-pink-600 text-xl"
                    title="Add to Favorites"
                  >
                    ❤️
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;