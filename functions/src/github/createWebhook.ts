import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { db } from "../config";

import axios from "axios";
import * as cors from "cors";
// @ts-ignore
const corsHandler = cors({ origin: true });

const GITHUB_BASE_URL = "https://api.github.com";
const WEBHOOK_EVENTS_URL =
  "http://0a4b-172-103-147-5.ngrok.io/dev-rings/us-central1/receiveWebhookEventHandler";

export const createWebhookHandler = functions.https.onRequest(
  async (req, res) => {
    corsHandler(req, res, async () => {
      try {
        const { user, repo, token } = req.body;
        functions.logger.log("Creating webhook...");
        const createWebhookResponse = await createWebhook(user, repo, token);

        const {
          data: { id, url, ping_url: pingUrl },
        } = createWebhookResponse;

        const webhooksRef = db
          .collection("users")
          .doc(user)
          .collection("webhooks");

        const webhookId = id.toString();
        functions.logger.log("Storing webhook in Firestore...");
        await webhooksRef.doc(webhookId).set({
          createdAt: admin.firestore.Timestamp.fromDate(new Date()),
          url,
          pingUrl,
        });

        functions.logger.log(
          "Webhook was successfully created & stored! Exiting function 🎉"
        );
        await res.sendStatus(200);
        return;
      } catch (err) {
        res.status(400).send(err);
      }
    });
  }
);

const createWebhook = async (user: string, repo: string, token: string) => {
  return await axios.post(
    `${GITHUB_BASE_URL}/repos/${user}/${repo}/hooks`,
    {
      config: {
        url: WEBHOOK_EVENTS_URL,
        content_type: "json",
      },
      events: ["push", "pull_request", "meta"],
    },
    {
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
};
