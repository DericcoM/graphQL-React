import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://api.github.com/graphql",
  headers: {
    Authorization: `Bearer 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`,
  },
  cache: new InMemoryCache(),
});

export default client;
