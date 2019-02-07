import { Router } from "express";
import validate from "express-validation";

import { retrieveScheme } from "./retrieve.param.validation";
import retrieveCtrl from "./retrieve.controller";

const router = Router();
router.route("/").post(validate(retrieveScheme), retrieveCtrl.retrieve);

export default router;
