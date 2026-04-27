"use client";

import { useRef } from "react";
import { deleteSourceAction } from "@/features/admin/sources/actions";

type DeleteSourceButtonProps = {
  sourceId: string;
  sourceTitle: string;
};

export function DeleteSourceButton({
  sourceId,
  sourceTitle,
}: DeleteSourceButtonProps) {
  const formRef = useRef<HTMLFormElement>(null);

  const handleDelete = () => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${sourceTitle}"? This action cannot be undone and will remove all linked herb-source references.`
    );

    if (confirmed) {
      formRef.current?.requestSubmit();
    }
  };

  return (
    <form ref={formRef} action={deleteSourceAction}>
      <input type="hidden" name="id" value={sourceId} />

      <button
        type="button"
        onClick={handleDelete}
        className="rounded-full border border-rose-300 bg-white px-5 py-3 text-sm font-semibold text-rose-700 transition hover:bg-rose-50"
      >
        Delete source
      </button>
    </form>
  );
}