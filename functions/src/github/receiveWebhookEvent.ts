import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { db } from "../config";

import * as cors from "cors";
// @ts-ignore
const corsHandler = cors({ origin: true });

export const receiveWebhookEventHandler = functions.https.onRequest(
  async (req, res) => {
    corsHandler(req, res, async () => {
      try {
        const eventType = req.header("X-GitHub-Event");
        if (eventType !== "push" && eventType !== "pull_request") {
          functions.logger.log(`${eventType} events are currently not handled`);
          res.sendStatus(200);
          return;
        }

        const { body: data } = req;
        const {
          sender: { login },
        } = data;
        // TODO: update this to be dynamic
        // ^ i.e. add github username to the User document when user first completes auth
        if (login !== "bscott4") {
          functions.logger.log(
            `Event created by ${login} – this event won't be stored`
          );
          res.sendStatus(200);
          return;
        }

        const ref = db
          .collection("users")
          .doc("brodyscott12+dev@gmail.com")
          .collection("events");

        if (eventType === "push") {
          const {
            commits,
            repository: { name: repo },
          } = data;

          if (!commits.length) {
            functions.logger.log(
              `Push event for creating or deleting a branch – this event won't be stored.`
            );
            res.sendStatus(200);
            return;
          }

          for (const commit of commits) {
            const { id: commitId, message, url: url } = commit;
            await ref.doc(commitId).set({
              createdAt: admin.firestore.Timestamp.fromDate(new Date()),
              message,
              repo,
              type: eventType,
              url,
            });
          }
          res.sendStatus(200);
          return;
        }

        if (eventType === "pull_request") {
          functions.logger.log(`officially within the pull_request block`);
          const { action } = data;
          if (action !== "opened") {
            functions.logger.log(
              `PR event for ${action} action – this event won't be stored`
            );
            res.sendStatus(200);
            return;
          }

          const {
            pull_request: { id: pullRequestId, url, title: message },
            repository: { name: repo },
          } = data;

          await ref.doc(pullRequestId).set({
            createdAt: admin.firestore.Timestamp.fromDate(new Date()),
            message,
            repo,
            type: eventType,
            url,
          });

          res.sendStatus(200);
          return;
        }
      } catch (err) {
        res.status(400).send(err);
      }
    });
  }
);
