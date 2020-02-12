const graphql = require("graphql");
const _ = require("lodash");
const Event = require("../models/event");
const Organization = require("../models/organization");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLList
} = graphql;

// Test Data
let events = [
  { organizationId: "1", id: "1", name: "pillow fight nyc", createdAt: "1" },
  { organizationId: "2", id: "2", name: "pillow fight nj", createdAt: "2" }
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
    createdAt: { type: GraphQLString },
    events: {
      type: new GraphQLList(EventType),
      resolve(parent, args) {
        return _.filter(events, { organizationId: parent.id });
      }
    }
    // updatedAt: { type: GraphQLString },
  })
});

const EventType = new GraphQLObjectType({
  name: "Event",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    organization: {
      type: OrganizationType,
      resolve(parent, args) {
        return _.find(organizations, { id: parent.organizationId });
      }
    }
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
    organizations: {
      type: new GraphQLList(OrganizationType),
      resolve(parent, args) {
        return organizations;
      }
    },
    event: {
      type: EventType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return _.find(events, { id: args.id });
      }
    },
    events: {
      type: new GraphQLList(EventType),
      resolve(parent, args) {
        return events;
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
