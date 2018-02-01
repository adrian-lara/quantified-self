const $ = require('jquery')

export function renderMeals(meals) {
  var caloriesForEveryMeal = 0
  for(var i = 0; i < meals.length; i++) {
    addMealTable(meals[i]);
    var totalCalories = addAllFoodRowsToMeal(meals[i]);
    caloriesForEveryMeal += totalCalories;
    addTotalCaloriesRow(meals[i],totalCalories);
    addRemainingCaloriesRow(meals[i], totalCalories);
    renderAddFoodToMealButtons(meals[i]);
  }
  addTotalsTable(caloriesForEveryMeal);
}

export function renderFoods(foods) {
  for (var i = 0; i < foods.length; i++) {
    $(`#foods-table-meals-page`).append(`
      <tr>
        <td data-foods-id="${foods[i].id}"><input type="checkbox"></td>
        <td class="food-name-cell">${foods[i].name}</td>
        <td>${foods[i].calories}</td>
      </tr>
        `)
  }
}

export function filterFoods(event) {
  var searchableString = event.delegateTarget.value.toUpperCase()
  $('.food-name-cell').each(function(foodCell) {
    if($(this)[0].innerText.toUpperCase().includes(searchableString)) {
      $(this).parent().show();
    }
    else {
      $(this).parent().hide();
    }
  })
}

function addMealTable(meal) {
  $('#meals-tables').append(`
    <h2>${meal.name}</h2>
    <table data-meal-id="${meal.id}" id="${meal.name.toLowerCase()}">
      <tr>
        <th>Name</th>
        <th>Calories</th>
      </tr>
    </table>`)
}

function addAllFoodRowsToMeal(meal) {
  var totalCalories = 0
  for(var j = 0; j < meal.foods.length; j++) {
    addSingleFoodRowToMeal(meal, meal.foods[j]);
    totalCalories += meal.foods[j].calories;
  }
  return totalCalories;
}

function addSingleFoodRowToMeal(meal,food) {
  $(`#${meal.name.toLowerCase()}`).append(`
    <tr data-id=${food.id}>
      <td>${food.name}</td>
      <td>${food.calories}</td>
    </tr>`);
}

function addTotalCaloriesRow(meal, totalCalories) {
  $(`#${meal.name.toLowerCase()}`).append(`
    <tr>
      <td>Total Calories</td>
      <td>${totalCalories}</td>
    </tr>`)
}

function addRemainingCaloriesRow(meal, totalCalories) {
  var allottedCalories = {"snack":200, "breakfast":400, "lunch":600, "dinner":800}
  if (allottedCalories[meal.name.toLowerCase()] === undefined) {
    $(`#${meal.name.toLowerCase()}`).append(`
      <tr>
        <td>No Allotted Calories for ${meal.name}</td>
        <td></td>
      </tr>`)
  }
  else {
    var remCalorieAmnt = allottedCalories[meal.name.toLowerCase()] - totalCalories
    $(`#${meal.name.toLowerCase()}`).append(`
      <tr>
        <td>Remaining Calories</td>
        <td id="${meal.name.toLowerCase()}-rem-cal">${remCalorieAmnt}</td>
      </tr>`)
    colorChange(meal.name.toLowerCase(), remCalorieAmnt)
  }
}

function renderAddFoodToMealButtons(meal) {
  $('#add-food-to-meal-buttons').append(`
    <button type="button" id="${meal.id}-add-food-button">${meal.name}</button>
    `)
}

function addTotalsTable(total) {
  var totalTableRemCalories = 2000 - total
  $('#meals-tables').append(`
    <h2>Total</h2>
    <table>
      <tr>
        <td>Goal Calories</td>
        <td>2000</td>
      </tr>
      <tr>
        <td>Calories Consumed</td>
        <td>${total}</td>
      </tr>
      <tr>
        <td>Remaining Calories</td>
        <td id="totaltable-rem-cal">${totalTableRemCalories}</td>
      </tr>
    </table>`)
  colorChange("totaltable", totalTableRemCalories)
}

function colorChange(id, calorieAmount) {
  if (calorieAmount < 0) {
    $(`#${id}-rem-cal`).css("color", "red");
  }
  else {
    $(`#${id}-rem-cal`).css("color", "green");
  }
}
