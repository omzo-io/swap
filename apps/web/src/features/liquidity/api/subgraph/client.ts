import { GraphQLClient } from "graphql-request";

export const graphqlClient = new GraphQLClient(
  "https://steadfast-healing-production.up.railway.app/graphql",
);
