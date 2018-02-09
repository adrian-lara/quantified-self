const $ = require('jquery')
import {postFoodToMeals} from '../fetch-requests/meal-fetch-requests'

export function renderMeals(meals) {
  var caloriesForEveryMeal = 0
  for(var i = 0; i < meals.length; i++) {
    addMealTable(meals[i]);
    caloriesForEveryMeal += renderCalorieRow(meals[i])
    renderAddFoodToMealButtons(meals[i]);
  }
  addTotalsTable(caloriesForEveryMeal);
}

export function reRenderMeal(meal) {
  $(`table[data-meal-id="${meal.id}"]`).children().remove();

  $(`table[data-meal-id="${meal.id}"]`).append(`
    <tr>
      <th>Name</th>
      <th>Calories</th>
    </tr>`)

  var caloriesForEveryMeal = 0
  caloriesForEveryMeal += renderCalorieRow(meal);
  unCheckCheckboxes();
  $('#totality').children().remove();
  reRenderTotalsTable(caloriesForEveryMeal);
}

export function renderFoods(foods) {
  for (var i = 0; i < foods.length; i++) {
    $(`#food-table-tbody`).append(`
      <tr>
        <td data-foods-id="${foods[i].id}"><input data-foods-id="${foods[i].id}" class="food-checkbox" type="checkbox"></td>
        <td class="food-name-cell">${foods[i].name}</td>
        <td>${foods[i].calories}</td>
      </tr>
        `)
  }
}

export function filterFoods(event) {
  var searchableString = event.delegateTarget.value.toUpperCase()
  $('.food-name-cell').each(function() {
    if($(this)[0].innerText.toUpperCase().includes(searchableString)) {
      $(this).parent().show();
    }
    else {
      $(this).parent().hide();
    }
  })
}

export function addFoodsToMeals(event) {
  var mealId = event.target.dataset.mealId

  $('.food-checkbox').each(function() {
    if (this.checked) {
      postFoodToMeals(mealId, this.dataset.foodsId);
    };
  })
}

function unCheckCheckboxes() {
  $('input:checkbox:checked').prop('checked', false);
}

function renderCalorieRow(meal) {
  var totalCalories = addAllFoodRowsToMeal(meal);
  addTotalCaloriesRow(meal,totalCalories);
  addRemainingCaloriesRow(meal, totalCalories);
  return totalCalories;
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
      <td class="delete-btns">
        <img data-delete-btn-id="${food.id}" src="http://icons.iconarchive.com/icons/hopstarter/sleek-xp-basic/24/Delete-icon.png" alt="Delete Button">
      </td>
    </tr>`);
}

function addTotalCaloriesRow(meal, totalCalories) {
  $(`#${meal.name.toLowerCase()}`).append(`
    <tr id="${meal.name}-total-cal-row">
      <td>Total Calories</td>
      <td>${totalCalories}</td>
    </tr>`)
}

function addRemainingCaloriesRow(meal, totalCalories) {
  var allottedCalories = {"snack":200, "breakfast":400, "lunch":600, "dinner":800}
  if (allottedCalories[meal.name.toLowerCase()] === undefined) {
    $(`#${meal.name.toLowerCase()}`).append(`
      <tr id="${meal.name}-rem-cal-row">
        <td>No Allotted Calories for ${meal.name}</td>
        <td></td>
      </tr>`)
  }
  else {
    var remCalorieAmnt = allottedCalories[meal.name.toLowerCase()] - totalCalories
    $(`#${meal.name.toLowerCase()}`).append(`
      <tr id="${meal.name}-rem-cal-row">
        <td>Remaining Calories</td>
        <td id="${meal.name.toLowerCase()}-rem-cal">${remCalorieAmnt}</td>
      </tr>`)
    colorChange(meal.name.toLowerCase(), remCalorieAmnt)
  }
}

function renderAddFoodToMealButtons(meal) {
  $('#add-food-to-meal-buttons').append(`
    <button type="button" data-meal-id="${meal.id}">${meal.name}</button>
    `)
}

function addTotalsTable(total) {
  var totalTableRemCalories = 2000 - total
  $('#meals-tables').append(`
    <h2>Total</h2>
    <table id="totality">
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

function reRenderTotalsTable(total) {
  debugger;
  var totalTableRemCalories = 2000 - total
  $('#totality').append(`
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
      </tr>`)
  colorChange("totaltable", totalTableRemCalories);
}

function colorChange(id, calorieAmount) {
  if (calorieAmount < 0) {
    $(`#${id}-rem-cal`).css("color", "red");
  }
  else {
    $(`#${id}-rem-cal`).css("color", "green");
  }
}

export function sortByCaloriesDesc(event) {
  var columns = event.currentTarget.children[1].children
  var sortedColumns = Array.prototype.slice.call(columns).sort(function(a,b) {
    var ac = Number(a.children[2].outerText)
    var bc = Number(b.children[2].outerText)
    if(ac > bc) {
      return 1;
    }
    if(ac < bc) {
      return -1;
    }
    return 0;
    });
  sortedColumns.forEach(function(column) {
    $('#food-table-tbody').append(column);
  })
}

export function sortByCaloriesAsc(event) {
  var columns = event.currentTarget.children[1].children
  var sortedColumns = Array.prototype.slice.call(columns).sort(function(a,b) {
    var ac = Number(a.children[2].outerText)
    var bc = Number(b.children[2].outerText)
    if(ac > bc) {
      return -1;
    }
    if(ac < bc) {
      return 1;
    }
    return 0;
  });
  sortedColumns.forEach(function(column) {
    $('#food-table-tbody').append(column);
  })
}

export function sortByCaloriesOrig(event) {
  var columns = event.currentTarget.children[1].children
  var sortedColumns = Array.prototype.slice.call(columns).sort(function(a,b) {
    var ac = Number(a.children[0].dataset.foodsId)
    var bc = Number(b.children[0].dataset.foodsId)
    if(ac > bc) {
      return -1;
    }
    if(ac < bc) {
      return 1;
    }
    return 0;
  });
  sortedColumns.forEach(function(column) {
    $('#food-table-tbody').append(column);
  })
}
