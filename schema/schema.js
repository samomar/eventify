const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql;

const EventType = new GraphQLObjectType({
  name: "Event",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString },
    location: { type: GraphQLString },
    description: { type: GraphQLString },
    organization: { type: GraphQLString }
  })
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    event: {
      type: EventType,
      args: { id: { type: GraphQLString } },
      resolve(parent, args) {
        // args.id
        // fetch data from db
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
