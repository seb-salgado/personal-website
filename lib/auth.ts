import { SignJWT, jwtVerify } from "jose";

export const CASE_STUDIES_COOKIE = "case_studies_access";
export const CASE_STUDIES_MAX_AGE = 60 * 60 * 12;

const secret = process.env.JWT_SECRET
  ? new TextEncoder().encode(process.env.JWT_SECRET)
  : null;

function getSecret() {
  if (!secret) {
    throw new Error("JWT_SECRET is not configured");
  }

  return secret;
}

export async function signToken(): Promise<string> {
  return new SignJWT({ unlocked: true })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("12h")
    .sign(getSecret());
}

export async function verifyToken(token: string): Promise<boolean> {
  try {
    await jwtVerify(token, getSecret());
    return true;
  } catch {
    return false;
  }
}
