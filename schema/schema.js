const graphql = require("graphql");
const Event = require("../models/event");
const Organization = require("../models/organization");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull
} = graphql;

const OrganizationType = new GraphQLObjectType({
  name: "Organization",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    events: {
      type: new GraphQLList(EventType),
      resolve(parent, args) {
        return Event.find({
          organizationId: parent.id
        });
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
    organization: {
      type: OrganizationType,
      resolve(parent, args) {
        return Organization.findById(parent.organizationId);
      }
    }
    // createdAt: { type: GraphQLString },
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
        return Organization.findById(args.id);
      }
    },
    organizations: {
      type: new GraphQLList(OrganizationType),
      resolve(parent, args) {
        return Organization.find({});
      }
    },
    event: {
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

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addOrganization: {
      type: OrganizationType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parent, args) {
        let organization = new Organization({
          name: args.name
        });

        return organization.save();
      }
    },
    addEvent: {
      type: EventType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        organizationId: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(parent, args) {
        let event = new Event({
          name: args.name,
          organizationId: args.organizationId
        });
        return event.save();
      }
    },
    deleteEvent: {
      type: EventType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(parent, args) {
        return Event.findByIdAndDelete(args.id);
      }
    },
    updateEvent: {
      type: EventType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLString },
        organizationId: { type: GraphQLID }
      },
      resolve(parent, args) {
        return Event.findByIdAndUpdate(args.id, args, { new: true });
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
