import Link from "next/link";
import classes from "./page.module.css";
import MealsGrid from "@/components/meals/meals-grid";
import { getMeals } from "@/lib/meals";
import { Suspense } from "react";

async function Meals() {
  const meals = await getMeals();
  return <MealsGrid meals={meals} />;
}

function Loading() {
  return (
    <div className={classes.loading}>
      <h1>Loading Foods...</h1>
    </div>
  );
}

export default function MealsPage() {
  return (
    <>
      <header className={classes.header}>
        <h1>
          Delicous meals, created{" "}
          <span className={classes.highlight}>by you</span>
        </h1>
        <p>Explore Delicous Meals Created by Our Community: </p>
        <p className={classes.cta}>
          <Link href="/meals/share">Share your favorite recipe</Link>
        </p>
      </header>
      <main className={classes.main}>
        <Suspense fallback={Loading()}>
          <Meals />
        </Suspense>
      </main>
    </>
  );
}

// export default MealsPage;
