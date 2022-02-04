import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:4000",
  cache: new InMemoryCache(),
  resolvers: {
    // type이 Movie이므로 아래도 Movie로 써줘야한다.
    Movie: {
      isLiked: () => false,
    },
    Mutation: {
      toggleLikeMovie: (_, { id }, { cache }) => {
        console.log(id);
        cache.modify({
          id: `Movie:${id}`,
          fields: {
            isLiked: (cur) => !cur,
          },
        });
      },
    },
  },
});

export default client;
