import type { FastifyInstance } from "fastify";
import { createComment } from "./create-comment.controller.js";
import { verifyJwt } from "@/http/middlewares/verify-jwt.js";

export async function commentsRoutes(app: FastifyInstance) {
  app.post("/:postPublicId", { onRequest: [verifyJwt] }, createComment);
}
