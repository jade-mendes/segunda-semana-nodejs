import type { FastifyInstance } from "fastify";
import { likePost } from "./like-post.controller.js";
import { verifyJwt } from "@/http/middlewares/verify-jwt.js";

export async function likesRoutes(app: FastifyInstance) {
  app.post("/like-post/:postPublicId", { onRequest: [verifyJwt] }, likePost);
}
