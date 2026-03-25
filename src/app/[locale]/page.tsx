import { setRequestLocale } from "next-intl/server";
import { SECTION_IDS } from "@/lib/constants";
import { SectionShell } from "@/components/layout/SectionShell";

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
        <SectionShell
          key={id}
          id={id}
          className={id === "hero" ? "min-h-[90vh]" : undefined}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center min-h-screen">
            <h2 className="font-heading text-h2 text-text-primary capitalize">
              {id}
            </h2>
          </div>
        </SectionShell>
      ))}
    </main>
  );
}
