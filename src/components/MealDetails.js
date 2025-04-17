import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function MealDetails() {
  const { idMeal } = useParams();
  const [mealDetails, setMealDetails] = useState(null);

  useEffect(() => {
    const fetchMealDetails = async () => {
      try {
        const response = await fetch(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`
        );
        const data = await response.json();
        setMealDetails(data.meals[0]);
      } catch {}
    };

    fetchMealDetails();
  }, [idMeal]);

  if (!mealDetails) {
    return <p className="text-white text-center py-10">Loading...</p>;
  }

  return (
    <div className="min-h-screen px-4 py-10 flex justify-center items-start bg-gray text-white">
      <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-lg p-6 max-w-3xl w-full">
        <img
          src={mealDetails.strMealThumb}
          alt={mealDetails.strMeal}
          className="w-64 h-64 object-cover rounded-xl mx-auto mb-6"
        />
        <h1 className="text-3xl font-bold text-center mb-4">{mealDetails.strMeal}</h1>

        <h2 className="text-xl font-semibold mb-2">Ingredients:</h2>
        <ul className="list-disc list-inside mb-6 space-y-1">
          {Object.keys(mealDetails)
            .filter((key) => key.includes("strIngredient") && mealDetails[key])
            .map((key, index) => {
              const ingredient = mealDetails[key];
              const measure = mealDetails[`strMeasure${index + 1}`];
              return (
                ingredient && (
                  <li key={index}>
                    {ingredient} {measure && `- ${measure}`}
                  </li>
                )
              );
            })}
        </ul>

        <h2 className="text-xl font-semibold mb-2">Instructions:</h2>
        <p className="leading-7 text-justify mb-6">{mealDetails.strInstructions}</p>

        {mealDetails.strYoutube && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold text-red-500 mb-1">Watch on YouTube:</h3>
            <a
              href={mealDetails.strYoutube}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 underline hover:text-blue-200"
            >
              {mealDetails.strYoutube}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default MealDetails;
