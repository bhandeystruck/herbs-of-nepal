import Link from "next/link";
import { getHerbSourceSectionLabel, getSourceTypeLabel } from "@/lib/utils/trust";

type HerbSourceItem = {
  id: string;
  section: string;
  note: string | null;
  source: {
    id: string;
    title: string;
    authors: string | null;
    organization: string | null;
    publisher: string | null;
    year: number | null;
    sourceType: string;
    url: string | null;
    pdfUrl: string | null;
    citation: string | null;
  };
};

type HerbSourcesListProps = {
  items: HerbSourceItem[];
};

/**
 * Displays grouped references for a herb page.
 */
export function HerbSourcesList({ items }: HerbSourcesListProps) {
  const grouped = items.reduce<Record<string, HerbSourceItem[]>>((acc, item) => {
    const key = item.section;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(item);
    return acc;
  }, {});

  const sections = Object.entries(grouped);

  return (
    <section className="mt-12">
      <h2 className="text-2xl font-semibold text-stone-900">Sources and references</h2>
      <p className="mt-3 text-sm leading-7 text-stone-600">
        These references support different parts of this herb page. Traditional context
        and modern evidence are not the same thing, so sources are grouped by section.
      </p>

      <div className="mt-8 space-y-8">
        {sections.map(([section, sectionItems]) => (
          <div key={section} className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-stone-900">
              {getHerbSourceSectionLabel(section as never)}
            </h3>

            <div className="mt-5 space-y-5">
              {sectionItems.map((item) => (
                <article key={item.id} className="border-t border-stone-100 pt-5 first:border-t-0 first:pt-0">
                  <div className="flex flex-wrap gap-2">
                    <span className="rounded-full bg-stone-100 px-3 py-1 text-xs font-medium text-stone-700">
                      {getSourceTypeLabel(item.source.sourceType as never)}
                    </span>

                    {item.source.year ? (
                      <span className="rounded-full bg-stone-100 px-3 py-1 text-xs font-medium text-stone-700">
                        {item.source.year}
                      </span>
                    ) : null}
                  </div>

                  <h4 className="mt-3 text-base font-semibold text-stone-900">
                    {item.source.title}
                  </h4>

                  {(item.source.organization || item.source.publisher || item.source.authors) ? (
                    <p className="mt-2 text-sm text-stone-600">
                      {item.source.authors ? `${item.source.authors} · ` : ""}
                      {item.source.organization ?? item.source.publisher ?? "Reference source"}
                    </p>
                  ) : null}

                  {item.source.citation ? (
                    <p className="mt-3 text-sm leading-7 text-stone-700">
                      {item.source.citation}
                    </p>
                  ) : null}

                  {item.note ? (
                    <p className="mt-3 text-sm leading-7 text-stone-600">
                      <span className="font-medium text-stone-800">Why it is cited:</span>{" "}
                      {item.note}
                    </p>
                  ) : null}

                  {(item.source.url || item.source.pdfUrl) ? (
                    <div className="mt-4 flex flex-wrap gap-4">
                      {item.source.url ? (
                        <Link
                          href={item.source.url}
                          target="_blank"
                          rel="noreferrer"
                          className="text-sm font-medium text-emerald-700 transition hover:text-emerald-800"
                        >
                          View source →
                        </Link>
                      ) : null}

                      {item.source.pdfUrl ? (
                        <Link
                          href={item.source.pdfUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-sm font-medium text-stone-700 transition hover:text-emerald-700"
                        >
                          Open PDF →
                        </Link>
                      ) : null}
                    </div>
                  ) : null}
                </article>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}