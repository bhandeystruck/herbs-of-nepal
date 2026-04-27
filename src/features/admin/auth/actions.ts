"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createAdminSessionToken, getAdminSessionCookieName } from "@/lib/auth/session";
import type { AdminLoginState } from "@/features/admin/auth/form-config";

function getString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

export async function loginAdminAction(
  _prevState: AdminLoginState,
  formData: FormData
): Promise<AdminLoginState> {
  const email = getString(formData, "email");
  const password = getString(formData, "password");

  const fieldErrors: Record<string, string> = {};

  if (!email) {
    fieldErrors.email = "Email is required.";
  }

  if (!password) {
    fieldErrors.password = "Password is required.";
  }

  if (Object.keys(fieldErrors).length > 0) {
    return {
      message: "Please fill in the required fields.",
      fieldErrors,
    };
  }

  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminEmail || !adminPassword) {
    return {
      message: "Admin credentials are not configured in environment variables.",
      fieldErrors: {},
    };
  }

  if (email !== adminEmail || password !== adminPassword) {
    return {
      message: "Invalid admin credentials.",
      fieldErrors: {},
    };
  }

  const token = await createAdminSessionToken({
    email,
    role: "admin",
  });

  const cookieStore = await cookies();

  cookieStore.set(getAdminSessionCookieName(), token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  redirect("/admin");
}

export async function logoutAdminAction() {
  const cookieStore = await cookies();

  cookieStore.set(getAdminSessionCookieName(), "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: new Date(0),
  });

  redirect("/admin/login");
}