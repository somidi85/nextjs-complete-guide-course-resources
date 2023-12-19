import fs from "node:fs";
import sql from "better-sqlite3";
const db = sql("meals.db");
import slugify from "slugify";
import xss from "xss";

export async function getMeals() {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // throw new Error("Something went wrong");

  const meals = db.prepare("SELECT * FROM meals").all();
  return meals;
}

export function getMeal(slug) {
  // await new Promise((resolve) => setTimeout(resolve, 3000));
  return db.prepare("SELECT * FROM meals WHERE slug = ?").get(slug);
}

export async function saveMeal(meal) {
  meal.slug = slugify(meal.title, { lower: true });
  meal.instructions = xss(meal.instructions);

  // handling images
  const extension = meal.image.name.split(".").pop();
  const filename = `${meal.slug}.${extension}`;

  const stream = fs.createWriteStream(`public/images/${filename}`);
  const bufferedImage = await meal.image.arrayBuffer();
  stream.write(Buffer.from(bufferedImage), (error) => {
    if (error) {
      throw new Error("Saving image failed");
    }
  });

  // save data to database
  meal.image = `/images/${filename}`;
  db.prepare(
    `
    INSERT INTO meals 
    (id, slug, title, image, summary, instructions, creator, creator_email)
    VALUES (
      null,
      @slug,
      @title,
      @image,
      @summary,
      @instructions,
      @creator,
      @creator_email
    )
  `
  ).run(meal);
}
