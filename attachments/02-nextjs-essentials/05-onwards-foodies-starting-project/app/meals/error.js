"use client";

import React from "react";

const Error = ({ error }) => {
  return (
    <main className="error">
      <h1>An Error Occurred!</h1>
      <p>Data loading failed. Please try again later!</p>
    </main>
  );
};

export default Error;
