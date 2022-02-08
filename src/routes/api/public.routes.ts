import * as controllers from '../../controllers/users.controllers';
import BreedEnum from '../../enum/breed.enum';
import GenderEnum from '../../enum/gender.enum';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';

const routes = Router();

routes.route('/').post(
  celebrate(
    {
      [Segments.BODY]: {
        email: Joi.string().email().trim().max(50).required(),
        password: Joi.string().required().min(6).max(50),
        name: Joi.string()
          .pattern(new RegExp('^[a-zA-ZÀ-ú0-9_]*$'))
          .trim()
          .min(3)
          .max(20)
          .required(),
        gender: Joi.string()
          .valid(...Object.values(GenderEnum))
          .required(),
        breed: Joi.string()
          .valid(...Object.values(BreedEnum))
          .required(),
      },
    },
    { abortEarly: false }
  ),
  controllers.createOne
);

routes.route('/authenticate').post(
  celebrate(
    {
      [Segments.BODY]: {
        email: Joi.string().email().trim().required(),
        password: Joi.string().required(),
      },
    },
    { abortEarly: false }
  ),
  controllers.authenticate
);

export default routes;
