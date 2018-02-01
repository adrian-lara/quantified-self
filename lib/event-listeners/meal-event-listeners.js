const $ = require('jquery')
import {filterFoods} from '../response-handlers/meal-response-handlers'

export function addEventListeners() {
  $('#search-foods-by-name').on('keyup', filterFoods);
}
