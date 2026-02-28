import type { FastifyInstance } from "fastify";
import { likePost } from "./like-post.controller.js";
import { verifyJwt } from "@/http/middlewares/verify-jwt.js";
import { likeComment } from "./like-comment.controller.js";
import { listLikesByUser } from "./list-likes-by-user.controller.js";
import { listLikesByComment } from "./list-likes-by-comment.controller.js";
import { listLikesByPost } from "./list-likes-by-post.controller.js";

export async function likesRoutes(app: FastifyInstance) {
  app.post("/like-post/:postPublicId", { onRequest: [verifyJwt] }, likePost);
  app.post(
    "/like-comment/:commentPublicId",
    { onRequest: [verifyJwt] },
    likeComment,
  );
  app.get("/user/:publicId", listLikesByUser);
  app.get("/comment/:publicId", listLikesByComment);
  app.get("/post/:publicId", listLikesByPost)
}
