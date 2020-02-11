const graphql = require("graphql");
const _ = require("lodash");
const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID } = graphql;

// Test Data
let events = [
  { organizationId: 1, id: "1", name: "pillow fight nyc", createdAt: "1" },
  { organizationId: 2, id: "2", name: "pillow fight nj", createdAt: "2" }
];

let organizations = [
  { id: "1", name: "NYC" },
  { id: "2", name: "NJ" }
];
// End Test Data

const OrganizationType = new GraphQLObjectType({
  name: "Organization",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    createdAt: { type: GraphQLString }
    // updatedAt: { type: GraphQLString },
  })
});

const EventType = new GraphQLObjectType({
  name: "Event",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    createdAt: { type: GraphQLString }
    // updatedAt: { type: GraphQLString },
    // location: { type: GraphQLString },
    // description: { type: GraphQLString },
    // organization: { type: GraphQLString }
  })
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    organization: {
      type: OrganizationType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return _.find(organizations, { id: args.id });
      }
    },
    event: {
      type: EventType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return _.find(events, { id: args.id });
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
