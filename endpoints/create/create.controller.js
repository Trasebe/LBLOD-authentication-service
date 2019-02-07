import AES from "crypto-js/aes";
import httpStatus from "http-status";
import { performance } from "perf_hooks";

import logger from "../../config/Log";
import registerService from "../../services/register.service";

const create = async (req, res, next) => {
  const t0 = performance.now();

  const { role, enrollmentID, encryptionKey, id } = req.body;
  // TODO unmock affiliation
  const mockAffiliation = "org1.department1";

  try {
    logger.info("creating certificates");
    const { signedCertPEM, privateKeyPEM } = await registerService.register({
      username: enrollmentID,
      id,
      role,
      affiliation: mockAffiliation
    });

    const encryptedCert = AES.encrypt(signedCertPEM, encryptionKey).toString();
    const encryptedKey = AES.encrypt(privateKeyPEM, encryptionKey).toString();

    const t1 = performance.now();
    console.log("=======================================");
    console.log("=======================================");
    console.log(`Call to doSomething took ${t1 - t0} milliseconds.`);
    console.log("=======================================");
    console.log("=======================================");

    res.status(httpStatus.OK).json({ encryptedCert, encryptedKey });
  } catch (e) {
    logger.info(
      `Error happened in create.controller.js (authMicroservice): ${e}`
    );
    next(e);
  }
};

export default { create };
