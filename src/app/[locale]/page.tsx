import { setRequestLocale } from "next-intl/server";
import { SECTION_IDS, SECTION_KANJI } from "@/lib/constants";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main>
      {SECTION_IDS.map((id) => (
        <section
          key={id}
          id={id}
          data-section
          className="min-h-screen flex items-center justify-center"
        >
          <div className="text-center">
            <span className="font-kanji text-display text-accent-gold opacity-20">
              {SECTION_KANJI[id]}
            </span>
            <h2 className="font-heading text-h2 text-text-primary mt-4 capitalize">
              {id}
            </h2>
          </div>
        </section>
      ))}
    </main>
  );
}
