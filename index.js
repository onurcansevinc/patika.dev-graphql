const { authors, books } = require('./data');
const { ApolloServer, gql } = require('apollo-server');
const { ApolloServerPluginLandingPageGraphQLPlayground } = require('apollo-server-core');

const typeDefs = gql`
    type Book {
        title: String
        author: String
    }

    type Author {
        name: String
        age: Int
        books: [Book!]
    }

    type Query {
        books: [Book]
        book: Book

        authors: [Author!]
        author(name: String!): Author
    }
`;

const resolvers = {
    Query: {
        books: () => books,
        authors: () => authors,

        author: (parent, args) => {
            const filtered = authors.find((author) => author.name.toLowerCase().startsWith(args.name.toLowerCase()));
            return filtered;
        },
    },

    Author: {
        books: (parent, args) => {
            return books.filter((book) => book.author == parent.name);
        },
    },
};

const server = new ApolloServer({ typeDefs, resolvers, plugins: [ApolloServerPluginLandingPageGraphQLPlayground()] });

server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
});
