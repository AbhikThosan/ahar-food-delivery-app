export async function getCategory() {
  const response = await fetch(
    "https://www.themealdb.com/api/json/v1/1/categories.php"
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
}
