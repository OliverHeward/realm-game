const userResolvers = require('./users');
const postResolvers = require('./posts');
const commentsResolvers = require('./comments');
const inventoryResolvers = require('./inventory');


module.exports = {
    Post: {
        likeCount: (parent) => parent.likes.length,
        commentCount: (parent) => parent.comments.length
    },
    Query: {
        ...postResolvers.Query,
        ...inventoryResolvers.Query
    },
    Mutation: {
        ...userResolvers.Mutation,
        ...postResolvers.Mutation,
        ...commentsResolvers.Mutation
    }
}