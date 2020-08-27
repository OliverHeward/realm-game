// Dependancies
const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");

// Relative\
const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers"); // index file
const { MONGODB } = require("./config");

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req }),
});

mongoose
  .connect(MONGODB, { useNewUrlParser: true })
  .then(() => {
    console.log("+++MongoDB Connected");
    return server.listen({ port: 5000 });
  })
  .then((res) => {
    console.log(`Server running at ${res.url}`);
  });
