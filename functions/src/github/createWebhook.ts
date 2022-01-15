import { https, logger } from "firebase-functions";
import * as admin from "firebase-admin";
import axios from "axios";
import { db, corsHandler } from "../config";

const GITHUB_BASE_URL = "https://api.github.com";
const WEBHOOK_EVENTS_URL =
  "http://7bef-172-103-147-5.ngrok.io/dev-rings/us-central1/receiveWebhookEventHandler";

export const createWebhookHandler = https.onRequest(async (req, res) => {
  corsHandler(req, res, async () => {
    try {
      const { user, repo, token } = req.body;
      logger.log("Creating webhook...");
      const createWebhookResponse = await createWebhook(user, repo, token);

      const {
        data: { id, url, ping_url: pingUrl },
      } = createWebhookResponse;

      const webhooksRef = db
        .collection("users")
        .doc(user)
        .collection("webhooks");

      const webhookId = id.toString();
      logger.log("Storing webhook in Firestore...");
      await webhooksRef.doc(webhookId).set({
        createdAt: admin.firestore.Timestamp.fromDate(new Date()),
        url,
        pingUrl,
      });

      logger.log(
        "Webhook was successfully created & stored! Exiting function 🎉"
      );
      await res.sendStatus(200);
      return;
    } catch (err) {
      res.status(400).send(err);
    }
  });
});

const createWebhook = async (user: string, repo: string, token: string) => {
  return await axios.post(
    `${GITHUB_BASE_URL}/repos/${user}/${repo}/hooks`,
    {
      config: {
        url: WEBHOOK_EVENTS_URL,
        content_type: "json",
      },
      events: ["push", "meta"],
    },
    {
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
};
