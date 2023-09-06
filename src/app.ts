import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { typeDefs, resolvers } from "./graphql";
import { getEnv } from "./configs/env";
import cors from "cors";
import { log } from "./libs/logger";

export default async function bootstrap() {
  const port = getEnv("PORT");
  const app = express();
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use("/graphql", expressMiddleware(server));

  app.listen(port, () => {
    log.info(`Server is running on port http://localhost:${port}`);
    log.info(`GraphQL server running at http://localhost:${port}/graphql`);
  });
}
