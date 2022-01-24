import { https, logger } from "firebase-functions";
import * as admin from "firebase-admin";
import axios from "axios";
import { db } from "./config";
import { corsMiddleware } from "./middleware";

const GITHUB_BASE_URL = "https://api.github.com";
const WEBHOOK_EVENTS_URL =
  "https://us-central1-dev-rings.cloudfunctions.net/incomingEventHandler";

export const createWebhookHandler = https.onRequest(async (req, res) => {
  corsMiddleware(req, res, async () => {
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
      return;
    }
  });
});

export const deleteWebhookHandler = https.onRequest(async (req, res) => {
  corsMiddleware(req, res, async () => {
    try {
      const { user, repo, token } = req.body;
      logger.log("Deleting webhook...");
      await deleteWebhook(user, repo, token);
      await res.sendStatus(200);
      return;
    } catch (err) {
      res.status(400).send(err);
      return;
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
          "authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
  );
};

const deleteWebhook = async (user: string, repo: string, token: string) => {
  return await axios.delete(`${GITHUB_BASE_URL}/repos/${user}/${repo}/hooks`, {
    headers: {
      "authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};
