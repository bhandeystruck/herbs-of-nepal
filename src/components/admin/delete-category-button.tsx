"use client";

import { useRef } from "react";
import { deleteCategoryAction } from "@/features/admin/categories/actions";

type DeleteCategoryButtonProps = {
  categoryId: string;
  categoryName: string;
};

export function DeleteCategoryButton({
  categoryId,
  categoryName,
}: DeleteCategoryButtonProps) {
  const formRef = useRef<HTMLFormElement>(null);

  const handleDelete = () => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${categoryName}"? This action cannot be undone. Categories with assigned herbs cannot be deleted.`
    );

    if (confirmed) {
      formRef.current?.requestSubmit();
    }
  };

  return (
    <form ref={formRef} action={deleteCategoryAction}>
      <input type="hidden" name="id" value={categoryId} />

      <button
        type="button"
        onClick={handleDelete}
        className="rounded-full border border-rose-300 bg-white px-5 py-3 text-sm font-semibold text-rose-700 transition hover:bg-rose-50"
      >
        Delete category
      </button>
    </form>
  );
}