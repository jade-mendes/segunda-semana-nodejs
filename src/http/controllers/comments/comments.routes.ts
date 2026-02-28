import type { FastifyInstance } from "fastify";
import { createComment } from "./create-comment.controller.js";
import { verifyJwt } from "@/http/middlewares/verify-jwt.js";
import { getComment } from "./get-comment.controller.js";
import { listComments } from "./list-comments.controller.js";

export async function commentsRoutes(app: FastifyInstance) {
  app.post("/:postPublicId", { onRequest: [verifyJwt] }, createComment);
  app.get("/", listComments);
  app.get("/:publicId", getComment);
}
