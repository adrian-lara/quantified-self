const $ = require('jquery')
const API = "https://rocky-earth-59921.herokuapp.com";
import {} from '../response-handlers/meal-response-handlers'

export function getAllFoods() => {
  fetch(`${url}/api/v1/foods`)
    .then(response => handleResponse(response))
    .then(meals => renderMeals(meals))
    .catch(error => console.error({ error }))
}
