import publicRoutes from './api/public.routes';
import usersRoutes from './api/users.routes';
import { Router } from 'express';

const routes = Router();

routes.use('/public/users', publicRoutes);

routes.use('/users', usersRoutes);

export default routes;
