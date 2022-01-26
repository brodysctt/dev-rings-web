import { https, logger } from "firebase-functions";
import * as admin from "firebase-admin";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { db } from "./config";
import { corsMiddleware } from "./middleware";
import dayjs from "dayjs";
dayjs.extend(utc);
dayjs.extend(timezone);

export const incomingEventHandler = https.onRequest(async (req, res) => {
  corsMiddleware(req, res, async () => {
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
        logger.log(`${userId} doesn't exist – this event won't be stored`);
        res.sendStatus(200);
        return;
      }
      const {
        goals: { commitsGoal, prsGoal },
        timezone,
      } = userDoc.data() as admin.firestore.DocumentData;
      const date = new Date();
      const createdAt = admin.firestore.Timestamp.fromDate(date);
      const dateString = dayjs(date).tz(timezone).format("YYYY-MM-DD");

      if (eventType === "push") {
        const {
          commits,
          repository: { name: repo },
        } = data;
        if (!commits.length) {
          logger.log("Push event with 0 commits – this event won't be stored");
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
              commits: {
                actual: admin.firestore.FieldValue.increment(commits.length),
                goal: commitsGoal,
              },
            },
            { merge: true }
        );
        logger.log(`Successfully updated ring for ${dateString} 🎉`);

        res.sendStatus(200);
        return;
      }

      if (eventType === "pull_request") {
        const { action } = data;
        if (action !== "closed") {
          logger.log(
              `PR event for ${action} action - this event won't be stored 🙅‍♂️`
          );
          res.sendStatus(200);
          return;
        }
        const {
          pull_request: { id, title: message, html_url: url },
          repository: { name: repo },
        } = data;
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

        logger.log(`Updating ring for ${dateString}...`);
        await logsRef.doc(dateString).set(
            {
              prs: {
                actual: admin.firestore.FieldValue.increment(1),
                goal: prsGoal,
              },
            },
            { merge: true }
        );
        logger.log(`Successfully updated ring for ${dateString} 🎉`);
        res.sendStatus(200);
        return;
      }

      if (eventType === "meta") {
        const {
          repository: { name: repo },
        } = data;
        const webhooksRef = db
            .collection("users")
            .doc(userId)
            .collection("webhooks");
        logger.log("This webhook was deleted in GitHub. Deleting from db...");
        await webhooksRef.doc(repo).delete();
        logger.log(`Successfully deleted ${repo} webhook 🥲`);
        res.sendStatus(200);
        return;
      }
      return;
    } catch (err) {
      res.status(400).send(err);
      return;
    }
  });
});
