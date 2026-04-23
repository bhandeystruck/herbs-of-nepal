/**
 * Shared path convention reference for admin media operations.
 */
export function MediaPathReference() {
  const references = [
    {
      label: "Herb primary image",
      example: "herbs/tulsi/primary.jpg",
    },
    {
      label: "Herb supplementary image",
      example: "herbs/tulsi/leaf-closeup.jpg",
    },
    {
      label: "Blog featured image",
      example: "blog/understanding-lapsi-in-nepalese-food-and-herbal-tradition/featured.jpg",
    },
    {
      label: "Branding asset",
      example: "branding/logo.svg",
    },
    {
      label: "Category asset",
      example: "categories/digestive-health.jpg",
    },
  ];

  return (
    <div className="overflow-hidden rounded-2xl border border-stone-200">
      <table className="min-w-full border-separate border-spacing-0">
        <thead>
          <tr className="bg-stone-50">
            <th className="border-b border-stone-200 px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.18em] text-stone-500">
              Asset type
            </th>
            <th className="border-b border-stone-200 px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.18em] text-stone-500">
              Storage path example
            </th>
          </tr>
        </thead>
        <tbody>
          {references.map((item) => (
            <tr key={item.label}>
              <td className="border-b border-stone-100 px-4 py-4 text-sm font-medium text-stone-800">
                {item.label}
              </td>
              <td className="border-b border-stone-100 px-4 py-4">
                <code className="rounded bg-stone-100 px-2 py-1 text-xs text-stone-700">
                  {item.example}
                </code>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}