const express = require("express");
const app = express();

app.listen(4000, () =>
  console.log("Running a GraphQL API server at http://localhost:4000/graphql")
);
