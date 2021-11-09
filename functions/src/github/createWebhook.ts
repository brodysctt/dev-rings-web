import * as functions from "firebase-functions";
import axios from "axios";
import * as cors from "cors";
// @ts-ignore
const corsHandler = cors({ origin: true });

const GITHUB_BASE_URL = "https://api.github.com";
const WEBHOOK_EVENTS_URL =
  "http://5e85-172-103-147-5.ngrok.io/dev-rings/us-central1/receiveWebhookEventHandler";

export const createWebhookHandler = functions.https.onRequest(
  async (req, res) => {
    corsHandler(req, res, async () => {
      try {
        const { owner, repo, token } = req.body;
        functions.logger.log("Making GitHub request...");
        await createWebhook(owner, repo, token);
        res.sendStatus(200);
      } catch (err) {
        res.status(400).send(err);
      }
    });
  }
);

const createWebhook = async (owner: string, repo: string, token: string) => {
  await axios.post(
    `${GITHUB_BASE_URL}/repos/${owner}/${repo}/hooks`,
    {
      config: {
        url: WEBHOOK_EVENTS_URL,
        content_type: "json",
      },
    },
    {
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
};
