import Joi from "joi";

export const createScheme = {
  body: {
    enrollmentID: Joi.string().required(),
    role: Joi.string().required(),
    encryptionKey: Joi.string().required(),
    id: Joi.string().required()
  }
};
