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
          sender: { login: user },
        } = data;

        const userRef = db.collection("users").doc(user);
        const doc = await userRef.get();
        if (!doc.exists) {
          functions.logger.log(
            `${user} doesn't exist – this event won't be stored`
          );
          res.sendStatus(200);
          return;
        }

        const eventsRef = db.collection("users").doc(user).collection("events");

        if (eventType === "push") {
          const {
            commits,
            repository: { name: repo },
          } = data;

          if (!commits.length) {
            functions.logger.log(
              `Push event without a commit – this event won't be stored.`
            );
            res.sendStatus(200);
            return;
          }

          for (const commit of commits) {
            const { id, url } = commit;
            await storeEvent({ eventsRef, eventType, id, repo, url });
          }
          res.sendStatus(200);
          return;
        }

        if (eventType === "pull_request") {
          const { action } = data;
          if (action !== "opened") {
            functions.logger.log(
              `PR event for ${action} action – this event won't be stored`
            );
            res.sendStatus(200);
            return;
          }

          const {
            pull_request: { id: prId, url },
            repository: { name: repo },
          } = data;
          const id = prId.toString();
          await storeEvent({ eventsRef, eventType, id, repo, url });
          res.sendStatus(200);
          return;
        }
      } catch (err) {
        res.status(400).send(err);
      }
    });
  }
);

interface StoreEvent {
  eventsRef: FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData>;
  eventType: "push" | "pull_request";
  id: string;
  repo: string;
  url: string;
}

const storeEvent = async ({
  eventsRef,
  eventType,
  id,
  repo,
  url,
}: StoreEvent) =>
  await eventsRef.doc(id).set({
    createdAt: admin.firestore.Timestamp.fromDate(new Date()),
    repo,
    eventType,
    url,
  });
