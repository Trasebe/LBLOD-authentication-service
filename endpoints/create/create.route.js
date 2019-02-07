import { Router } from "express";
import validate from "express-validation";

import { createScheme } from "./create.param.validation";
import createCtrl from "./create.controller";

const router = Router();
router.route("/").post(validate(createScheme), createCtrl.create);

export default router;
