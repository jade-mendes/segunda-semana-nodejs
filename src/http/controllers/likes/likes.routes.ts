import type { FastifyInstance } from "fastify";
import { likePost } from "./like-post.controller.js";
import { verifyJwt } from "@/http/middlewares/verify-jwt.js";
import { likeComment } from "./like-comment.controller.js";

export async function likesRoutes(app: FastifyInstance) {
  app.post("/like-post/:postPublicId", { onRequest: [verifyJwt] }, likePost);
  app.post(
    "/like-comment/:commentPublicId",
    { onRequest: [verifyJwt] },
    likeComment,
  );
}
