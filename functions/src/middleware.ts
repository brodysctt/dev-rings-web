import cors from "cors";

export const corsMiddleware = cors({
  origin: "/https://dev-rings-web.*bscott4.vercel.app/",
});
