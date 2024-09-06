function searchMeals(mealData, keyword) {
  const results = [];
  const keywordInLowerCase = keyword.toLowerCase();

  Object.keys(mealData).forEach((category) => {
    const meals = mealData[category];

    Object.keys(meals).forEach((meal) => {
      if (meal.toLowerCase().includes(keywordInLowerCase)) {
        results.push(meals[meal]);
      }
    });
  });

  return results;
}

export { searchMeals };
