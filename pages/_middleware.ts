import { NextRequest, NextResponse } from "next/server";

export const middleware = async (req: NextRequest) => {
  const { token } = req.cookies;
  const { name: route } = req.page;
  const isEnter = route === "/enter";
  if (!token && !isEnter) return NextResponse.redirect("/enter");
  return NextResponse.next();
};
