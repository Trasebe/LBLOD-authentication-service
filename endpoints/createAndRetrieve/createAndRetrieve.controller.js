import cryptico from "cryptico";
import AES from "crypto-js/aes";
import httpStatus from "http-status";
import { performance } from "perf_hooks";

import registerService from "../../services/register.service";

import logger from "../../config/Log";

const createAndRetrieve = async (req, res, next) => {
  // TODO unmock affiliation
  const {
    seed,
    enrollmentID,
    role,
    id,
    affiliation = "org1.department1"
  } = req.body;

  try {
    const t0 = performance.now();

    logger.info("Generating RSA key");
    const key = cryptico.generateRSAKey(seed, 1024);
    const encryptionKey = JSON.stringify(key);

    logger.info("creating certificates");
    const { signedCertPEM, privateKeyPEM } = await registerService.register({
      username: enrollmentID,
      id,
      role,
      affiliation
    });

    const encryptedCert = AES.encrypt(signedCertPEM, encryptionKey).toString();
    const encryptedKey = AES.encrypt(privateKeyPEM, encryptionKey).toString();

    const t1 = performance.now();
    console.log("=======================================");
    console.log("=======================================");
    console.log(`Call to doSomething took ${t1 - t0} milliseconds.`);
    console.log("=======================================");
    console.log("=======================================");

    res
      .status(httpStatus.OK)
      .json({ encryptedCert, encryptedKey, encryptionKey: key });
  } catch (e) {
    logger.info(
      `Error happened in createAndRetrieve.controller.js (authMicroservice): ${e}`
    );
    next(e);
  }
};

export default { createAndRetrieve };
