import cryptico from "cryptico";
import httpStatus from "http-status";

import logger from "../../config/Log";

const retrieve = (req, res, next) => {
  const { seed } = req.body;

  try {
    logger.info("Generating RSA key");
    const key = cryptico.generateRSAKey(seed, 1024);
    const encryptionKey = JSON.stringify(key);

    res.status(httpStatus.OK).json({ encryptionKey });
  } catch (e) {
    logger.info(
      `Error happened in retrieve.controller.js (authMicroservice): ${e}`
    );
    next(e);
  }
};

export default { retrieve };
