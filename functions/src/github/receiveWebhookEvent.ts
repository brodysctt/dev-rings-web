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

        const { body: data } = req;
        const {
          sender: { login: userId },
        } = data;

        const userRef = db.collection("users").doc(userId);
        const doc = await userRef.get();
        if (!doc.exists) {
          functions.logger.log(
            `${userId} doesn't exist – this event won't be stored 🙅‍♂️`
          );
          res.sendStatus(200);
          return;
        }

        const eventsRef = db
          .collection("users")
          .doc(userId)
          .collection("events");

        if (eventType === "push") {
          const {
            commits,
            repository: { name: repo },
          } = data;
          if (!commits.length) {
            functions.logger.log(
              `User either created or deleted a branch (i.e. push event with 0 commits) – this event won't be stored 🙅‍♀️`
            );
            res.sendStatus(200);
            return;
          }
          for (const commit of commits) {
            const { id, message, url } = commit;
            const eventId = id.toString();
            functions.logger.log(`Storing ${eventType} event...`);
            await storeEvent({
              eventsRef,
              eventId,
              eventType,
              repo,
              message,
              url,
            });
            functions.logger.log(`Successfully stored event ${eventId} 🎉`);
          }
          res.sendStatus(200);
          return;
        }

        if (eventType === "pull_request") {
          const { action } = data;
          // was originally "opened"
          if (action !== "closed") {
            functions.logger.log(
              `PR event for ${action} action – this event won't be stored 🙅‍♂️`
            );
            res.sendStatus(200);
            return;
          }
          const {
            pull_request: { id, title: message, html_url: url },
            repository: { name: repo },
          } = data;
          const eventId = id.toString();
          functions.logger.log(`Storing ${eventType} event...`);
          await storeEvent({
            eventsRef,
            eventId,
            eventType,
            repo,
            message,
            url,
          });
          functions.logger.log(`Successfully stored event ${eventId} 🎉`);
          res.sendStatus(200);
          return;
        }

        if (eventType === "meta") {
          const { hook_id } = data;
          const webhookId = hook_id.toString();
          const webhooksRef = db
            .collection("users")
            .doc(userId)
            .collection("webhooks");
          functions.logger.log(`This webhook was deleted. Deleting from db...`);
          await webhooksRef.doc(webhookId).delete();
          functions.logger.log(`Successfully deleted webhook ${webhookId} 🥲`);
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
  eventId: string;
  eventType: "push" | "pull_request";
  repo: string;
  message: string;
  url: string;
}

const storeEvent = async ({
  eventsRef,
  eventId,
  eventType,
  repo,
  message,
  url,
}: StoreEvent) =>
  await eventsRef.doc(eventId).set({
    createdAt: admin.firestore.Timestamp.fromDate(new Date()),
    eventType,
    repo,
    message,
    url,
  });
