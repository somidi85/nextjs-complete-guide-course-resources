// build a loading screen for the app

import classes from "./loading.module.css";

export default function MealsLoadingPage() {
  return (
    <div className={classes.loading}>
      <h1>Loading Foods...</h1>
    </div>
  );
}
