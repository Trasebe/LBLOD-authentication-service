import Joi from "joi";

export const createAndRetrieveScheme = {
  body: {
    enrollmentID: Joi.string().required(),
    role: Joi.string().required(),
    id: Joi.string().required(),
    seed: Joi.string().required()
  }
};
