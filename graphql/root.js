const graphql = require("graphql");
const Organization = require("../models/organization");
const Location = require("../models/location");
const Event = require("../models/event");
const { GraphQLObjectType, GraphQLSchema, GraphQLID, GraphQLList } = graphql;
const { OrganizationType, LocationType, EventType } = require("./schema");
const { Mutation } = require("./mutation");

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    getOrganization: {
      type: OrganizationType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Organization.findById(args.id);
      }
    },
    organizations: {
      type: new GraphQLList(OrganizationType),
      resolve(parent, args) {
        return Organization.find({});
      }
    },
    getLocation: {
      type: LocationType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Location.findById(args.id);
      }
    },
    locations: {
      type: new GraphQLList(LocationType),
      resolve(parent, args) {
        return Location.find({});
      }
    },
    getEvent: {
      type: EventType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Event.findById(args.id);
      }
    },
    events: {
      type: new GraphQLList(EventType),
      resolve(parent, args) {
        return Event.find({});
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
