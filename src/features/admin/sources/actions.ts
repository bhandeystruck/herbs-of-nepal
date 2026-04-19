"use server";

import { SourceType } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { db } from "@/lib/prisma/client";
import type { SourceFormState } from "@/features/admin/sources/form-config";

function getString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function getOptionalString(formData: FormData, key: string) {
  const value = getString(formData, key);
  return value ? value : null;
}

function getOptionalInt(formData: FormData, key: string) {
  const value = getString(formData, key);
  if (!value) {
    return null;
  }

  const parsed = Number.parseInt(value, 10);
  return Number.isNaN(parsed) ? null : parsed;
}

function getCheckbox(formData: FormData, key: string) {
  return formData.get(key) === "on";
}

function isSourceType(value: string): value is SourceType {
  return (
    value === "GOVERNMENT_FACT_SHEET" ||
    value === "PEER_REVIEWED_REVIEW" ||
    value === "SYSTEMATIC_REVIEW" ||
    value === "META_ANALYSIS" ||
    value === "CLINICAL_TRIAL" ||
    value === "JOURNAL_ARTICLE" ||
    value === "UNIVERSITY_ARTICLE" ||
    value === "ETHNOBOTANICAL_REFERENCE" ||
    value === "BOOK" ||
    value === "INSTITUTIONAL_PDF" ||
    value === "ORGANIZATION_PAGE" ||
    value === "OTHER"
  );
}

async function validateSourceForm(
  formData: FormData,
  mode: "create" | "edit",
  sourceId?: string
) {
  const fieldErrors: Record<string, string> = {};

  const title = getString(formData, "title");
  const sourceTypeValue = getString(formData, "sourceType");
  const url = getOptionalString(formData, "url");
  const pdfUrl = getOptionalString(formData, "pdfUrl");
  const citation = getOptionalString(formData, "citation");

  if (!title) {
    fieldErrors.title = "Source title is required.";
  }

  if (!sourceTypeValue || !isSourceType(sourceTypeValue)) {
    fieldErrors.sourceType = "Please select a valid source type.";
  }

  if (!url && !pdfUrl && !citation) {
    fieldErrors.citation = "Provide at least a URL, PDF URL, or citation.";
  }

  if (mode === "edit" && !sourceId) {
    fieldErrors.id = "Missing source ID for update.";
  }

  if (Object.keys(fieldErrors).length > 0) {
    return {
      ok: false as const,
      state: {
        message: "Please fix the highlighted fields and try again.",
        fieldErrors,
      } satisfies SourceFormState,
    };
  }

  return {
    ok: true as const,
    data: {
      title,
      authors: getOptionalString(formData, "authors"),
      organization: getOptionalString(formData, "organization"),
      publisher: getOptionalString(formData, "publisher"),
      year: getOptionalInt(formData, "year"),
      sourceType: sourceTypeValue as SourceType,
      url,
      pdfUrl,
      citation,
      notes: getOptionalString(formData, "notes"),
      isActive: getCheckbox(formData, "isActive"),
    },
  };
}

function revalidateSourcePaths() {
  revalidatePath("/admin");
  revalidatePath("/admin/sources");
}

export async function createSourceAction(
  _prevState: SourceFormState,
  formData: FormData
): Promise<SourceFormState> {
  const result = await validateSourceForm(formData, "create");

  if (!result.ok) {
    return result.state;
  }

  try {
    await db.source.create({
      data: result.data,
    });

    revalidateSourcePaths();
  } catch {
    return {
      message: "Something went wrong while creating the source.",
      fieldErrors: {},
    };
  }

  redirect("/admin/sources");
}

export async function updateSourceAction(
  _prevState: SourceFormState,
  formData: FormData
): Promise<SourceFormState> {
  const sourceId = getString(formData, "id");
  const result = await validateSourceForm(formData, "edit", sourceId);

  if (!result.ok) {
    return result.state;
  }

  try {
    await db.source.update({
      where: { id: sourceId },
      data: result.data,
    });

    revalidateSourcePaths();
  } catch {
    return {
      message: "Something went wrong while updating the source.",
      fieldErrors: {},
    };
  }

  redirect(`/admin/sources/${sourceId}`);
}