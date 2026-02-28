import type { FastifyInstance } from "fastify";
import { createComment } from "./create-comment.controller.js";
import { verifyJwt } from "@/http/middlewares/verify-jwt.js";
import { getComment } from "./get-comment.controller.js";
import { listComments } from "./list-comments.controller.js";
import { deleteComment } from "./delete-comment.controller.js";
import { updateComment } from "./update-comment.controller.js";
import { listCommentsByUser } from "./list-comments-by-user.controller.js";

export async function commentsRoutes(app: FastifyInstance) {
  app.post("/:postPublicId", { onRequest: [verifyJwt] }, createComment);
  app.get("/", listComments);
  app.get("/:publicId", getComment);
  app.delete("/:publicId", { onRequest: [verifyJwt] }, deleteComment);
  app.patch("/:publicId", { onRequest: [verifyJwt] }, updateComment);
  app.get("/user/:publicId", listCommentsByUser);
}
