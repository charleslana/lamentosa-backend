import * as controllers from '../../controllers/users.controllers';
import BreedEnum from '../../enum/breed.enum';
import GenderEnum from '../../enum/gender.enum';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';

const routes = Router();

routes
  .route('/')
  .get(controllers.getAll)
  .post(
    celebrate(
      {
        [Segments.BODY]: {
          email: Joi.string().email().trim().max(50).required(),
          password: Joi.string().required().min(6).max(50),
          userName: Joi.string()
            .pattern(new RegExp('^[a-zA-ZÀ-ú0-9_]*$'))
            .trim()
            .min(3)
            .max(50)
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
  )
  .put(
    celebrate(
      {
        [Segments.BODY]: {
          id: Joi.string().uuid().required(),
          email: Joi.string().email().trim().max(50).required(),
          password: Joi.string().required().min(6).max(50),
          userName: Joi.string()
            .pattern(new RegExp('^[a-zA-ZÀ-ú0-9_]*$'))
            .trim()
            .min(3)
            .max(50)
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
    controllers.updateOne
  );

routes
  .route('/:id')
  .get(
    celebrate(
      {
        [Segments.PARAMS]: {
          id: Joi.string().uuid().required(),
        },
      },
      { abortEarly: false }
    ),
    controllers.getOne
  )
  .delete(
    celebrate(
      {
        [Segments.PARAMS]: {
          id: Joi.string().uuid().required(),
        },
      },
      { abortEarly: false }
    ),
    controllers.deleteOne
  );

export default routes;
