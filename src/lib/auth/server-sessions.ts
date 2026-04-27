import { cookies } from "next/headers";
import {
  getAdminSessionCookieName,
  verifyAdminSessionToken,
} from "@/lib/auth/session";

/**
 * Reads and verifies the current admin session from server components.
 */
export async function getCurrentAdminSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(getAdminSessionCookieName())?.value;

  if (!token) {
    return null;
  }

  return verifyAdminSessionToken(token);
}