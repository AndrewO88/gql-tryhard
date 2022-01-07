const graphql = require('graphql');
const data = require('./someData');

const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList } = graphql;

const MovieType = new GraphQLObjectType({
  name: 'Movie',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
		director: {
			type: DirectorType,
			resolve: (parent, args) => data.directors.find(director => director.id === parent.id)
		}
  }),
});

const DirectorType = new GraphQLObjectType({
  name: 'Director',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
		movies: {
			type: new GraphQLList(MovieType),
			resolve: (parent, args) => data.movies.filter(movie => movie.directorId === parent.id),
		},
  }),
});

const Query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    movie: {
      type: MovieType,
      args: { id: { type: GraphQLID } },
      resolve: (parent, args) => data.movies.find(movie => movie.id === args.id),
    },
		director: {
      type: DirectorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return data.directors.find(director => director.id === args.id);
      },
    },
		movies: {
			type: new GraphQLList(MovieType),
			resolve: (parent, args) => data.movies
		},
		directors: {
			type: new GraphQLList(DirectorType),
			resolve: (parent, args) => data.directors
		}
  }
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addDirector: {
      type: DirectorType,
      args: {
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
      },
      resolve: (parent, args) => data.directors.push({id: (data.directors.length + 1).toString(), name: args.name, age:  args.age }),
    },
    addMovie: {
      type: MovieType,
      args: {
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        directorId: { type: GraphQLID },
      },
      resolve: (parent, args) => data.movies.push({id: (data.movies.length + 1).toString(), name: args.name, age:  args.age ,  directorId: args.directorId}),
    }
  }
});

module.exports = new GraphQLSchema({
  query: Query,
  mutation: Mutation,
});
