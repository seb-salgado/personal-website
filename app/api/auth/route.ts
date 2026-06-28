import { NextRequest, NextResponse } from "next/server";
import { CASE_STUDIES_COOKIE, CASE_STUDIES_MAX_AGE, signToken } from "@/lib/auth";

export async function POST(request: NextRequest) {
  const { password } = await request.json();

  if (!process.env.PORTFOLIO_PASSWORD) {
    return NextResponse.json({ error: "Password is not configured" }, { status: 500 });
  }

  if (password !== process.env.PORTFOLIO_PASSWORD) {
    return NextResponse.json({ error: "Incorrect password" }, { status: 401 });
  }

  const token = await signToken();
  const response = NextResponse.json({ ok: true });

  response.cookies.set(CASE_STUDIES_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: CASE_STUDIES_MAX_AGE,
    path: "/case-studies",
  });

  return response;
}
