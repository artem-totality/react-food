import { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { getMealById } from '../api';

import Preloader from '../components/Preloader';

function Recipe() {
  const [recipe, setRecipe] = useState({});
  const { id } = useParams();
  const { goBack } = useHistory();

  useEffect(() => {
    getMealById(id).then((data) => {
      setRecipe(data.meals[0]);
    });
  }, [id]);

  return (
    <>
      {!recipe.idMeal ? (
        <Preloader />
      ) : (
        <div className="recipe">
          <img src={recipe.strMealThumb} alt={recipe.strMeal} />
          <h2>{recipe.strMeal}</h2>
          <div className="recipe__info">
            <h6>Category: {recipe.strCategory}</h6>
            {recipe.strArea ? <h6>Area: {recipe.strArea}</h6> : null}
            <p>{recipe.strInstructions}</p>
          </div>
          <table className="centered">
            <thead>
              <tr>
                <th>Ingredient</th>
                <th>Measure</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(recipe).map((key) => {
                if (key.includes('Ingredient') && recipe[key]) {
                  return (
                    <tr key={key}>
                      <td>{recipe[key]}</td>
                      <td>{recipe[`strMeasure${key.slice(13)}`]}</td>
                    </tr>
                  );
                }
                return null;
              })}
            </tbody>
          </table>
          {recipe.strYoutube ? (
            <div className="row">
              <h5>Video Recipe</h5>
              <iframe
                title={recipe.idMeal}
                src={`https://www.youtube.com/embed/${
                  recipe.strYoutube.split('=')[1]
                }`}
                frameBorder="0"
              />
            </div>
          ) : null}
        </div>
      )}
      <hr />
      <button className="btn" onClick={goBack}>
        Go Back
      </button>
    </>
  );
}

export default Recipe;
