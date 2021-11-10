import * as functions from "firebase-functions";

import * as cors from "cors";
// @ts-ignore
const corsHandler = cors({ origin: true });

export const receiveWebhookEventHandler = functions.https.onRequest(
  async (req, res) => {
    corsHandler(req, res, async () => {
      try {
        const eventType = req.header("X-GitHub-Event");
        const data = req.body;

        if (eventType === "push") {
          const { commits } = data;
          functions.logger.log(`just pushed ${commits.length} commits`);
          res.sendStatus(200);
          return;
        }

        if (eventType === "pull_request") {
          functions.logger.log(`just put up a bigggg PR`);
          res.sendStatus(200);
          return;
        }

        functions.logger.log(`${eventType} events are currently not handled`);
        res.sendStatus(200);
      } catch (err) {
        res.status(400).send(err);
      }
    });
  }
);
