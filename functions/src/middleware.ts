import cors from "cors";

export const corsMiddleware = cors({
  origin: new RegExp("/https://dev-rings-web.*bscott4.vercel.app/"),
});
