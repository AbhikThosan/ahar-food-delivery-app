export async function getMenusByCategory(category) {
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
}
