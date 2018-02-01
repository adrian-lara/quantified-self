const url = `https://protected-basin-11627.herokuapp.com`
const handleResponse = require('../response-handlers/initial-response-handler')

const getAllFoods = () => {
  fetch(`${url}/api/v1/foods`)
    .then(response => handleResponse(response))
    .then(foods => renderFoods(foods))
    .catch(error => console.error({ error }))
}

const renderFoods = (foods) =>  {
  foods.forEach(food => {
    $('#foods-table').append(`
      <tr data-food-id="${food.id}">
        <td>${food.name}</td>
        <td>${food.calories}</td>
        <td class="delete-btns">
          <img data-delete-btn-id="${food.id}" src="http://icons.iconarchive.com/icons/hopstarter/sleek-xp-basic/24/Delete-icon.png" alt="Delete Button">
        </td>
      </tr>
      `)
  })
}

function deleteFoodRecord(id) {
  fetch(`${url}/api/v1/foods/${id}`, { method: 'DELETE' })
}

module.exports = {
  getAllFoods,
  deleteFoodRecord,
  renderFoods,
}
