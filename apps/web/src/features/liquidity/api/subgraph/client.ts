import { GraphQLClient } from "graphql-request";

export const graphqlClient = new GraphQLClient(
  "https://disciplined-perception-production-da90.up.railway.app/graphql",
);
