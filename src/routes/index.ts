import usersRoutes from './api/users.routes';
import { Router } from 'express';

const routes = Router();

routes.use('/users', usersRoutes);

export default routes;
