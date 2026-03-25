import { getTranslations } from "next-intl/server";
import { PROJECTS_DATA } from "@/lib/data";
import { ParchmentCard } from "@/components/ui/ParchmentCard";
import { TechTag } from "@/components/ui/TechTag";

export async function Projects() {
  const t = await getTranslations("projects");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="font-heading text-h2 text-paper text-center mb-12 font-bold">
        {t("heading")}
      </h2>

      {/* Masonry grid via CSS columns */}
      <div className="columns-1 md:columns-2 lg:columns-3 gap-6">
        {PROJECTS_DATA.map((project) => (
          <div key={project.key} className="break-inside-avoid mb-6">
            <ParchmentCard className="group relative overflow-hidden">
              {/* Default state */}
              <h3 className="font-heading text-h3 text-paper font-bold mb-2">
                {t(`items.${project.key}.name`)}
              </h3>
              <p className="text-body text-text-secondary line-clamp-3">
                {t(`items.${project.key}.shortDescription`)}
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                {project.tech.map((tech) => (
                  <TechTag key={tech} label={tech} />
                ))}
              </div>
              <div className="flex items-center gap-3 mt-4">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-body text-accent-red hover:underline"
                >
                  GitHub
                </a>
                {project.stars > 0 && (
                  <span className="text-body text-accent-gold flex items-center gap-1">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26" />
                    </svg>
                    {project.stars}
                  </span>
                )}
              </div>

              {/* Hover overlay — fully opaque, covers everything */}
              <div
                className="absolute inset-0 flex flex-col justify-between p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-normal z-20"
                style={{ backgroundColor: "rgba(10, 10, 10, 0.97)" }}
              >
                <div>
                  <h3 className="font-heading text-h3 text-paper font-bold mb-3">
                    {t(`items.${project.key}.name`)}
                  </h3>
                  <p className="text-body text-text-secondary leading-relaxed">
                    {t(`items.${project.key}.description`)}
                  </p>
                </div>
                <div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {project.tech.map((tech) => (
                      <TechTag key={tech} label={tech} />
                    ))}
                  </div>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-body text-accent-red hover:underline"
                  >
                    GitHub
                  </a>
                  {project.stars > 0 && (
                    <span className="text-body text-accent-gold inline-flex items-center gap-1 ml-3">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26" />
                      </svg>
                      {project.stars}
                    </span>
                  )}
                </div>
              </div>
            </ParchmentCard>
          </div>
        ))}
      </div>
    </div>
  );
}
