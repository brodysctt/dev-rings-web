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
        const eventsRef = userRef.collection("events");
        const logsRef = userRef.collection("logs");

        const userDoc = await userRef.get();
        if (!userDoc.exists) {
          functions.logger.log(
            `${userId} doesn't exist – this event won't be stored 🙅‍♂️`
          );
          res.sendStatus(200);
          return;
        }
        // @ts-ignore
        const { dailyGoal: goal } = userDoc.data();
        const date = new Date();
        const createdAt = admin.firestore.Timestamp.fromDate(date);
        const dateString = date.toLocaleDateString().replace(/\//g, "-");

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
            await eventsRef.doc(eventId).set({
              createdAt,
              dateString,
              eventType,
              repo,
              message,
              url,
            });
            functions.logger.log(`Successfully stored event ${eventId} 🎉`);
          }

          functions.logger.log(`Updating ring for ${dateString}...`);
          await logsRef.doc(dateString).set(
            {
              actual: admin.firestore.FieldValue.increment(commits.length),
              goal,
            },
            { merge: true }
          );
          functions.logger.log(
            `Successfully updated ring for ${dateString} 🎉`
          );

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
          await logsRef.doc(dateString).set(
            {
              actual: admin.firestore.FieldValue.increment(1),
              goal,
            },
            { merge: true }
          );
          functions.logger.log(
            `Successfully updated ring for ${dateString} 🎉`
          );
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
