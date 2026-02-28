import { fastify } from "fastify";
import fastifyJwt from "@fastify/jwt";
import { appRoutes } from "./http/routes.js";
import { env } from "./env/index.js";

export const app = fastify();

app.register(appRoutes);
app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
});
