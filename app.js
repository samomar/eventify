const express = require("express");
const graphqlHTTP = require("express-graphql");
const schema = require("./graphql/root");
const mongoose = require("mongoose");

const app = express();

const remoteDB =
  "mongodb+srv://sam:verysecurepassword@eventify-d2v7c.mongodb.net/test?retryWrites=true&w=majority";

mongoose.set("useFindAndModify", false);
mongoose.connect(remoteDB, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.once("open", () => {
  console.log("Connected to database");
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true
  })
);

app.listen(4000, () =>
  console.log("Running a GraphQL API server at http://localhost:4000/graphql")
);
