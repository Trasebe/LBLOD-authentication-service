import { Router } from "express";
import validate from "express-validation";

import { createAndRetrieveScheme } from "./createAndRetrieve.param.validation";
import createAndRetrieveCtrl from "./createAndRetrieve.controller";

const router = Router();
router
  .route("/")
  .post(
    validate(createAndRetrieveScheme),
    createAndRetrieveCtrl.createAndRetrieve
  );

export default router;
