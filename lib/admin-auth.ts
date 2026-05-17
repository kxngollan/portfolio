import { createHash, createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";
import type { AdminSessionPayload } from "@/types/auth";

export const ADMIN_SESSION_COOKIE = "portfolio_admin_session";
export const ADMIN_SESSION_MAX_AGE = 60 * 60 * 24;

function getAdminCredentials() {
  const username = process.env.ADMIN_USERNAME;
  const password = process.env.ADMIN_PASSWORD;

  if (!username || !password) {
    throw new Error("Please define ADMIN_USERNAME and ADMIN_PASSWORD.");
  }

  return { username, password };
}

function getSessionSecret() {
  const secret = process.env.ADMIN_SESSION_SECRET;

  if (!secret) {
    throw new Error("Please define ADMIN_SESSION_SECRET.");
  }

  return secret;
}

function hashValue(value: string) {
  return createHash("sha256").update(value).digest();
}

function safeCompare(value: string, expected: string) {
  return timingSafeEqual(hashValue(value), hashValue(expected));
}

function sign(value: string) {
  return createHmac("sha256", getSessionSecret()).update(value).digest("base64url");
}

export function verifyAdminCredentials(username: string, password: string) {
  const credentials = getAdminCredentials();

  return (
    safeCompare(username, credentials.username) &&
    safeCompare(password, credentials.password)
  );
}

export function createAdminSession(username: string) {
  const payload: AdminSessionPayload = {
    sub: username,
    exp: Date.now() + ADMIN_SESSION_MAX_AGE * 1000,
  };
  const body = Buffer.from(JSON.stringify(payload)).toString("base64url");

  return `${body}.${sign(body)}`;
}

export function verifyAdminSession(token: string | undefined) {
  if (!token) {
    return null;
  }

  const [body, signature] = token.split(".");

  if (!body || !signature || !safeCompare(signature, sign(body))) {
    return null;
  }

  try {
    const payload = JSON.parse(
      Buffer.from(body, "base64url").toString("utf8"),
    ) as AdminSessionPayload;

    if (!payload.sub || !payload.exp || payload.exp < Date.now()) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}

export async function getAdminSession() {
  try {
    const cookieStore = await cookies();

    return verifyAdminSession(cookieStore.get(ADMIN_SESSION_COOKIE)?.value);
  } catch {
    return null;
  }
}

export async function isAdminAuthenticated() {
  return Boolean(await getAdminSession());
}
