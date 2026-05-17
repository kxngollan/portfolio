import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";

export async function requireAdmin() {
  if (await isAdminAuthenticated()) {
    return null;
  }

  return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
}

export function apiError(error: unknown, fallback = "Something went wrong") {
  if (
    error &&
    typeof error === "object" &&
    "code" in error &&
    error.code === 11000
  ) {
    return NextResponse.json(
      { message: "A record with that slug already exists." },
      { status: 409 },
    );
  }

  const message = error instanceof Error ? error.message : fallback;

  return NextResponse.json({ message }, { status: 500 });
}

export function serializeDocument<T>(document: T) {
  return JSON.parse(JSON.stringify(document)) as T;
}

export function stringValue(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export function stringList(value: unknown) {
  if (Array.isArray(value)) {
    return value
      .map((item) => (typeof item === "string" ? item.trim() : ""))
      .filter(Boolean);
  }

  if (typeof value === "string") {
    return value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [];
}
