import type { FastifyInstance } from 'fastify';
import { createUser } from './create-user.controller.js'
import { listUsers } from './list-users.controller.js';
import { getUser } from './get-user.controller.js';
import { deleteUser } from './delete-user.controller.js';
import { updateUser } from './update-user.controller.js';
import { authenticate } from './authenticate.controller.js';

export async function usersRoutes(app: FastifyInstance) {
    app.post('/', createUser)
    app.post('/authenticate', authenticate)
    app.get('/', listUsers)
    app.get('/:publicId', getUser)
    app.delete('/:publicId', deleteUser)
    app.patch('/:publicId', updateUser)
}