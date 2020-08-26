const {ApolloServer, gql} = require('graphql-tools')

const typeDefs = gql`
    type Query {
        version: String
    }

    type Mutation {
        sigin(sessionId: ID!, name: String!): String
    }
`;

const resolvers = {
    Query: {
        version: () => '1.0.0'
    },
    Mutation: {
        signin: (_, user) => {
            return "Success";
        }
    }
};

const server = new ApolloServer({
    typeDefs,
    resolvers
});

// server.applyMiddleware({ app });
