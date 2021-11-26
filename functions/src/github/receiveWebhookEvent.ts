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
        const userDoc = await userRef.get();
        if (!userDoc.exists) {
          functions.logger.log(
            `${userId} doesn't exist – this event won't be stored 🙅‍♂️`
          );
          res.sendStatus(200);
          return;
        }

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
            await storeEvent({
              userRef,
              eventId,
              eventType,
              repo,
              message,
              url,
            });
          }
          res.sendStatus(200);
          return;
        }

        if (eventType === "pull_request") {
          const { action } = data;
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

          await storeEvent({
            userRef,
            eventId,
            eventType,
            repo,
            message,
            url,
          });
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
  // TODO: Make sure this type is correct
  userRef: FirebaseFirestore.DocumentData;
  eventId: string;
  eventType: "push" | "pull_request";
  repo: string;
  message: string;
  url: string;
}

const storeEvent = async ({
  userRef,
  eventId,
  eventType,
  repo,
  message,
  url,
}: StoreEvent) => {
  // TODO: Set a default daily goal when a user signs up to avoid case where this is empty
  const userDoc = await userRef.get();
  const { dailyGoal: goal } = userDoc.data();
  functions.logger.log(`current goal be: ${goal}`);
  const eventsRef = userRef.collection("events");
  const ringsRef = userRef.collection("rings");
  const date = new Date();
  const createdAt = admin.firestore.Timestamp.fromDate(date);
  const dateString = date.toLocaleDateString().replace(/\//g, "-");

  functions.logger.log(`Storing ${eventType} event...`);
  await eventsRef.doc(eventId).set({
    createdAt,
    eventType,
    repo,
    message,
    url,
  });
  functions.logger.log(`Successfully stored event ${eventId} 🎉`);

  functions.logger.log(`Updating ring for ${dateString}...`);
  functions.logger.log(`Current goal: ${goal}`);

  // // Note: "Increment operations are useful for implementing counters, but keep in mind that you can update a single document only once per second."
  // // TODO: Gonna need to refactor this slightly for bulk commits – will do the for loop within this function, and then increment by the total number of commits after
  await ringsRef.doc(dateString).set({
    progress: admin.firestore.FieldValue.increment(1),
    goal,
  });
  functions.logger.log(`Successfully updated ring for ${dateString} 🎉`);
};
