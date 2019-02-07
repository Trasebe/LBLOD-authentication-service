import { Router } from "express";

import retrieveRoutes from "./endpoints/retrieve/retrieve.route";
// import createRoutes from "./endpoints/create/create.route";
import createAndRetrieveRoutes from "./endpoints/createAndRetrieve/createAndRetrieve.route";

export default Router()
  .get("/health-check", (req, res) =>
    res.send("LBLOD Blockchain authentication service up and running!")
  )
  .use("/retrieve-encryption-key", retrieveRoutes)
  .use("/create-certificate", createAndRetrieveRoutes);
