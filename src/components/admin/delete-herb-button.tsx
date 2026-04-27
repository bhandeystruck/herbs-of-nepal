"use client";

import { useRef } from "react";
import { deleteHerbAction } from "@/features/admin/herbs/actions";

type DeleteHerbButtonProps = {
  herbId: string;
  herbName: string;
};

export function DeleteHerbButton({
  herbId,
  herbName,
}: DeleteHerbButtonProps) {
  const formRef = useRef<HTMLFormElement>(null);

  const handleDelete = () => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${herbName}"? This action cannot be undone.`
    );

    if (confirmed) {
      formRef.current?.requestSubmit();
    }
  };

  return (
    <form ref={formRef} action={deleteHerbAction}>
      <input type="hidden" name="id" value={herbId} />

      <button
        type="button"
        onClick={handleDelete}
        className="rounded-full border border-rose-300 bg-white px-5 py-3 text-sm font-semibold text-rose-700 transition hover:bg-rose-50"
      >
        Delete herb
      </button>
    </form>
  );
}