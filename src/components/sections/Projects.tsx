import { getTranslations } from "next-intl/server";
import { PROJECTS_DATA } from "@/lib/data";
import { ParchmentCard } from "@/components/ui/ParchmentCard";
import { TechTag } from "@/components/ui/TechTag";
import { ProjectCardClient } from "@/components/ui/ProjectCardClient";

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
            <ProjectCardClient
              title={t(`items.${project.key}.name`)}
              description={t(`items.${project.key}.description`)}
              tech={project.tech}
              github={project.github}
              stars={project.stars}
            >
              <ParchmentCard>
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
                {/* Spacer for seal button area */}
                <div className="h-6" />
              </ParchmentCard>
            </ProjectCardClient>
          </div>
        ))}
      </div>
    </div>
  );
}
