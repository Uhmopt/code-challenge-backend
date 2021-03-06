const { ApolloServer, gql } = require("apollo-server");
const movies = require("./seeder/moviesSeeder.json");

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Movie" type defines the queryable fields for every Movie in our data source.
  type Movie {
    image: String
    title: String
    description: String
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "movies" query returns an array of zero or more movies (defined above).
  type Query {
    movies: [Movie]
  }
`;

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves movies from the "movies" array above.
const resolvers = {
  Query: {
    movies: () => movies,
  },
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`
    🚀  Server is ready at ${url}
    📭  Query at https://studio.apollographql.com/dev
  `);
});
