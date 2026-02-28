import type { FastifyInstance } from 'fastify';
import { createPostProfile } from './create-post.controller.js';
import { listPosts } from './list-posts.controller.js';
import { deletePost } from './delete-post.controller.js';
import { updatePost } from './update-post.controller.js';
import { getPost } from './get-post.controller.js';
import { listPostsByUser } from './list-posts-by-user.controller.js';
import { verifyJwt } from '@/http/middlewares/verify-jwt.js';


export async function postsRoutes(app: FastifyInstance) {
    //app.post('/:userPublicId', createPost)
    app.get('/', listPosts)
    app.get('/user/:publicId', listPostsByUser)
    app.get('/:publicId', getPost)
    app.delete('/:publicId', deletePost)
    app.patch('/:publicId', updatePost)

    // Post Profile Routes
    app.post('/me', {onRequest: [verifyJwt]},createPostProfile)
}