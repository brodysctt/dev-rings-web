import corsInit from "cors";

const prod = new RegExp("https://dev-rings.vercel.app.*");
const staging = new RegExp("https://dev-rings-web.*bscott4.vercel.app.*");

export const cors = corsInit({
  origin: [prod, staging],
});
