import { SignJWT, jwtVerify } from "jose";

const ADMIN_SESSION_COOKIE = "hon_admin_session";

type AdminSessionPayload = {
  email: string;
  role: "admin";
};

function getSessionSecret() {
  const secret = process.env.ADMIN_SESSION_SECRET;

  if (!secret) {
    throw new Error("ADMIN_SESSION_SECRET is not configured.");
  }

  return new TextEncoder().encode(secret);
}

export function getAdminSessionCookieName() {
  return ADMIN_SESSION_COOKIE;
}

export async function createAdminSessionToken(payload: AdminSessionPayload) {
  const secret = getSessionSecret();

  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret);
}

export async function verifyAdminSessionToken(token: string) {
  try {
    const secret = getSessionSecret();
    const { payload } = await jwtVerify(token, secret);

    if (
      typeof payload.email === "string" &&
      payload.role === "admin"
    ) {
      return {
        email: payload.email,
        role: "admin" as const,
      };
    }

    return null;
  } catch {
    return null;
  }
}