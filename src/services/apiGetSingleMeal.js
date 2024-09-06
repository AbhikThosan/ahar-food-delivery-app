export async function getSingleMeal(mealid) {
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealid}`
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
}
