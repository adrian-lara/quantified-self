const $ = require('jquery')
const url = "https://rocky-earth-59921.herokuapp.com";
import {handleResponse} from '../response-handlers/initial-response-handler'
import {renderMeals} from '../response-handlers/meal-response-handlers'

function getAllMeals() {
  fetch(`${url}/api/v1/meals`)
    .then(response => handleResponse(response))
    .then(meals => renderMeals(meals))
    .catch(error => console.error({ error }))
}

module.exports = {
  getAllMeals,
}
