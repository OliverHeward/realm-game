var { 
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLSchema,
    GraphQLString,
    GraphQLList,
} = require('graphql/type');

var userModel = require('../../mongoose/todo');

/**
 * generate projection object for mongoose
 * @param  {Object} fieldASTs
 * @return {Project}
 */
function getProjection (fieldASTs) {
    return fieldASTs.fieldNodes[0].selectionSet.selections.reduce((projections, selection) => {
      projections[selection.name.value] = true;
      return projections;
    }, {});
  }

var todoType = new GraphQLObjectType({
    name: 'todo',
    description: 'todo item',
    fields: () => ({
        first_name: {
            type: GraphQLString,
            description: 'The first name of the user.'
        },
        last_name: {
            type: GraphQLString,
            description: 'The last name of the user'
        },
        email: {
            type: GraphQLString,
            description: 'The email of the user.'
        },
        password: {
            type: GraphQLString,
            description: 'The password of the user.'
        }
    })
});

var schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'RootQueryType',
        fields: {
            todo: {
                type: new GraphQLList(todoType),
                args: {
                    email: {
                        name: 'email',
                        type: new GraphQLNonNull(GraphQLString)
                    }
                },
                resolve: (root, {email}, source, fieldASTs) => {
                    var projections = getProjection(fieldASTs);
                    var foundItems = new Promise((resolve, reject) => {
                        userModel.find({email}, projections, (err, todos) => {
                            err ? reject(err) : resolve(todos)
                        })
                    })

                    return foundItems
                }
            }
        }
    })
});

// Export the API Schema
module.exports = schema;