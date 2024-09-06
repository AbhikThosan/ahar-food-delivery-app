function randomMealIds(mealsObj) {
  const categoryKeys = Object.keys(mealsObj);

  for (let i = categoryKeys.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [categoryKeys[i], categoryKeys[j]] = [categoryKeys[j], categoryKeys[i]];
  }

  const selectedCategoryKeys = categoryKeys.slice(0, 4);

  const randomMeals = selectedCategoryKeys.map((categoryKey) => {
    const mealsInCategory = mealsObj[categoryKey];
    const mealKeys = Object.keys(mealsInCategory);
    const randomMealKey = mealKeys[Math.floor(Math.random() * mealKeys.length)];
    return mealsInCategory[randomMealKey];
  });

  return randomMeals;
}

export { randomMealIds };
