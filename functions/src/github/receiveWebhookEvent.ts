import { https, logger } from "firebase-functions";
import * as admin from "firebase-admin";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { db, corsHandler } from "../config";

dayjs.extend(utc);
dayjs.extend(timezone);

export const receiveWebhookEventHandler = https.onRequest(async (req, res) => {
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
        logger.log(`${userId} doesn't exist – this event won't be stored 🙅‍♂️`);
        res.sendStatus(200);
        return;
      }
      // @ts-ignore
      const { dailyGoal: goal, timezone } = userDoc.data();
      const date = new Date();
      const createdAt = admin.firestore.Timestamp.fromDate(date);
      const dateString = dayjs(date).tz(timezone).format("YYYY-MM-DD");

      if (eventType === "push") {
        const {
          commits,
          repository: { name: repo },
        } = data;
        if (!commits.length) {
          logger.log(
            `User either created or deleted a branch (i.e. push event with 0 commits) – this event won't be stored 🙅‍♀️`
          );
          res.sendStatus(200);
          return;
        }
        for (const commit of commits) {
          const { id, message, url } = commit;
          const eventId = id.toString();

          logger.log(`Storing ${eventType} event...`);
          await eventsRef.doc(eventId).set({
            createdAt,
            dateString,
            eventType,
            repo,
            message,
            url,
          });
          logger.log(`Successfully stored event ${eventId} 🎉`);
        }

        logger.log(`Updating ring for ${dateString}...`);
        await logsRef.doc(dateString).set(
          {
            actual: admin.firestore.FieldValue.increment(commits.length),
            goal,
          },
          { merge: true }
        );
        logger.log(`Successfully updated ring for ${dateString} 🎉`);

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
        logger.log(`This webhook was deleted. Deleting from db...`);
        await webhooksRef.doc(webhookId).delete();
        logger.log(`Successfully deleted webhook ${webhookId} 🥲`);
        res.sendStatus(200);
        return;
      }
      return;
    } catch (err) {
      res.status(400).send(err);
    }
  });
});
