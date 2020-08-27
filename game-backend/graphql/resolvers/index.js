const userResolvers = require('./users');
const postResolvers = require('./posts');
const commentsResolvers = require('./comments');


module.exports = {
    Query: {
        ...postResolvers.Query
    },
    Mutation: {
        ...userResolvers.Mutation,
        ...postResolvers.Mutation,
        ...commentsResolvers.Mutation
    }
}