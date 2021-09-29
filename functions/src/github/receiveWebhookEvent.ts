import * as functions from "firebase-functions";

import * as cors from "cors";
// @ts-ignore
const corsHandler = cors({ origin: true });

export const receiveWebhookEventHandler = functions.https.onRequest(
  async (req, res) => {
    corsHandler(req, res, async () => {
      try {
        const data = req.body;
        functions.logger.log("Data:", data);
        res.sendStatus(200);
      } catch (err) {
        res.status(400).send(err);
      }
    });
  }
);
