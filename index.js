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
    }

    type Query {
        users: [User!]
        events: [Event!]
        locations: [Location!]
        participants: [Participant!]
    }
`;

const resolvers = {
    Query: {
        users: () => data.users,
        events: () => data.events,
        locations: () => data.locations,
        participants: () => data.participants,
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
