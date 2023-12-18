import sql from "better-sqlite3";
const db = sql("meals.db");

export async function getMeals() {
  await new Promise((resolve) => setTimeout(resolve, 3000));

  // throw new Error("Something went wrong");

  const meals = db.prepare("SELECT * FROM meals").all();
  return meals;
}

export async function getMeal(slug) {
  const meal = db.prepare("SELECT * FROM meals WHERE slug = ?").get(slug);
  return meal;
}
