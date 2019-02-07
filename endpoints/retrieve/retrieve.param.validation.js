import Joi from "joi";

export const retrieveScheme = {
  body: {
    identifier: {
      identifier: Joi.string().required(),
      roles: Joi.array().required(),
      secret: Joi.string().required(),
      fullIdentifier: Joi.string().required()
    },
    seed: Joi.string().required()
  }
};
