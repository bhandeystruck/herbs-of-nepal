import type { Prisma } from "@prisma/client";

/**
 * Safely converts a Prisma Json value into a string array.
 * This is useful for fields like benefits, uses, and precautions.
 */
export function jsonToStringArray(value: Prisma.JsonValue): string[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter((item): item is string => typeof item === "string");
}