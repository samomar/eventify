const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLNonNull } = graphql;

module.exports.Mutation = new GraphQLObjectType({
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
    updateOrganization: {
      type: OrganizationType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLString }
      },
      resolve(parent, args) {
        return Organization.findByIdAndUpdate(args.id, args, { new: true });
      }
    },
    deleteOrganization: {
      type: OrganizationType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(parent, args) {
        return Organization.findByIdAndDelete(args.id);
      }
    },

    // Locations

    addLocation: {
      type: LocationType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        organizationId: { type: new GraphQLNonNull(GraphQLID) },
        eventId: { type: GraphQLString }
      },
      resolve(parent, args) {
        let location = new Location({
          name: args.name,
          organizationId: args.organizationId
        });
        return location.save();
      }
    },
    updateLocation: {
      type: LocationType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLString },
        organizationId: { type: GraphQLID }
      },
      resolve(parent, args) {
        return Location.findByIdAndUpdate(args.id, args, { new: true });
      }
    },
    deleteLocation: {
      type: LocationType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(parent, args) {
        return Location.findByIdAndDelete(args.id);
      }
    },

    // Events

    addEvent: {
      type: EventType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        organizationId: { type: new GraphQLNonNull(GraphQLID) },
        locationId: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(parent, args) {
        let { name, organizationId, locationId } = args;
        let event = new Event({ name, organizationId, locationId });
        return event.save();
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
    },
    deleteEvent: {
      type: EventType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(parent, args) {
        return Event.findByIdAndDelete(args.id);
      }
    }
  }
});
