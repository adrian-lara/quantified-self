const url = `https://protected-basin-11627.herokuapp.com/`
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
      <tr>
        <td>${food.name}</td>
        <td>${food.calories}</td>
        <td>(button placeholder)</td>
      </tr>
      `)
  })
}

module.exports = {
  getAllFoods,
  renderFoods
}
