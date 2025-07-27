const data = require('./data');
const { ApolloServer, gql } = require('apollo-server');
const { ApolloServerPluginLandingPageGraphQLPlayground } = require('apollo-server-core');

const typeDefs = gql`
    type User {
        id: Int
        username: String
        email: String
    }

    type Event {
        id: Int
        title: String
        desc: String
        date: String
        from: String
        to: String
        location_id: Int
        user_id: Int
        user: User
        participants: Participant
        location: Location
    }

    type Location {
        id: Int
        name: String
        desc: String
        lat: Float
        lng: Float
    }

    type Participant {
        id: Int
        user_id: Int
        event_id: Int
        user: User
    }

    type Query {
        users: [User!]
        user(id: Int!): User

        events: [Event!]
        event(id: Int!): Event

        locations: [Location!]
        location(id: Int!): Location

        participants: [Participant!]
        participant(id: Int!): Participant
    }
`;

const resolvers = {
    Query: {
        users: () => data.users,
        user: (parent, args) => {
            return data.users.find((user) => user.id == args.id);
        },

        events: () => data.events,
        event: (parent, args) => {
            return data.events.find((event) => event.id == args.id);
        },

        locations: () => data.locations,
        location: (parent, args) => {
            return data.locations.find((location) => location.id == args.id);
        },

        participants: () => data.participants,
        participant: (parent, args) => {
            return data.participants.find((participant) => participant.id == args.id);
        },
    },

    Event: {
        user: (parent, args) => {
            return data.users.find((user) => user.id == parent.user_id);
        },
        participants: (parent, args) => {
            return data.participants.find((participant) => participant.event_id == parent.id);
        },
        location: (parent, args) => {
            return data.locations.find((location) => location.id == parent.location_id);
        },
    },
    Participant: {
        user: (parent, args) => {
            return data.users.find((user) => user.id == parent.user_id);
        },
    },
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
});
