// Non-translatable portfolio data — structural values that don't change between locales.
// All display text goes through i18n messages (en.json / tr.json).

export const SKILLS_DATA = {
  languages: [
    { key: "java", proficiency: 90 },
    { key: "kotlin", proficiency: 85 },
    { key: "csharp", proficiency: 75 },
    { key: "php", proficiency: 70 },
    { key: "javascript", proficiency: 80 },
    { key: "python", proficiency: 70 },
    { key: "cpp", proficiency: 65 },
  ],
  frameworks: [
    { key: "springboot", proficiency: 90 },
    { key: "dotnet", proficiency: 75 },
    { key: "react", proficiency: 70 },
    { key: "laravel", proficiency: 65 },
  ],
  infrastructure: [
    { key: "docker", proficiency: 85 },
    { key: "kubernetes", proficiency: 75 },
    { key: "helm", proficiency: 70 },
    { key: "aws", proficiency: 65 },
    { key: "cicd", proficiency: 80 },
    { key: "flyway", proficiency: 80 },
    { key: "prometheus", proficiency: 70 },
    { key: "grafana", proficiency: 70 },
  ],
  security: [
    { key: "rabbitmq", proficiency: 80 },
    { key: "kafka", proficiency: 80 },
    { key: "redis", proficiency: 85 },
    { key: "jwt", proficiency: 90 },
    { key: "mtls", proficiency: 70 },
    { key: "keycloak", proficiency: 65 },
    { key: "oauth", proficiency: 80 },
  ],
} as const;

export type SkillCategory = keyof typeof SKILLS_DATA;

export const EXPERIENCE_DATA = [
  {
    key: "seyfhnova",
    tech: ["Java", "Kotlin", "Spring Boot", "Redis", "Kafka", "RabbitMQ", "Docker"],
  },
  {
    key: "planbanimation",
    tech: ["Java", "Kotlin", "Spring Boot", "Redis", "Kafka", "Docker", "Kubernetes"],
  },
  {
    key: "tenexy",
    tech: ["E-Commerce", "Stripe", "Authentication", "Database Design"],
  },
  {
    key: "gesk",
    tech: ["C/C++", "STM32", "Embedded Systems", "TouchGFX"],
  },
  {
    key: "kplus",
    tech: [".NET", "JavaScript", "REST API"],
  },
] as const;

export const PROJECTS_DATA = [
  {
    key: "microservices",
    github: "https://github.com/Emirhan58/microservices-java",
    stars: 3,
    tech: ["Java", "Spring Boot", "Microservices", "Docker"],
  },
  {
    key: "flappybird",
    github: "https://github.com/Emirhan58/STM32-FLAPPY-BIRD",
    stars: 10,
    tech: ["C++", "STM32", "TouchGFX", "Embedded"],
  },
  {
    key: "behaviorwatch",
    github: "https://github.com/Emirhan58/behaviorwatch-ai",
    stars: 0,
    tech: ["Python", "YOLOv8", "OpenCV", "AI"],
  },
  {
    key: "bunqchat",
    github: "https://github.com/Emirhan58/bunq-chat-app-backend",
    stars: 0,
    tech: ["PHP", "REST API", "Backend"],
  },
  {
    key: "allinpro",
    github: "https://github.com/Emirhan58/allinpro",
    stars: 0,
    tech: ["PHP", "E-Commerce", "MySQL", "Payments"],
  },
  {
    key: "cansat",
    github: "https://github.com/Emirhan58/CANSAT-GROUND-CONTROL-SYSTEM",
    stars: 0,
    tech: ["Python", "PyQt5", "Telemetry"],
  },
  {
    key: "farkle",
    github: "https://github.com/Emirhan58/dice-game",
    githubFrontend: "https://github.com/Emirhan58/dice-game-frontend",
    stars: 0,
    tech: ["Kotlin", "Spring Boot", "Next.js", "TypeScript", "Docker"],
  },
  {
    key: "facerecognition",
    github: "https://github.com/Emirhan58/face-recognize-ai",
    stars: 0,
    tech: ["Python", "YOLOv8", "ArcFace", "ONNX", "OpenCV"],
  },
  {
    key: "patientdonation",
    github: "https://github.com/Emirhan58/Patient-Donation-Website",
    stars: 0,
    tech: ["JavaScript", "C#", "ASP.NET", "AI", "Data Mining"],
  },
] as const;

export const ACHIEVEMENTS_DATA = [
  { key: "teknofest" },
  { key: "cansat" },
] as const;

export const CONTACT_LINKS = {
  email: { href: "mailto:emirhan.kaya_58@hotmail.com", display: "emirhan.kaya_58@hotmail.com" },
  github: { href: "https://github.com/Emirhan58", display: "github.com/Emirhan58" },
  linkedin: { href: "https://linkedin.com/in/emirhankaya", display: "linkedin.com/in/emirhankaya" },
} as const;

export const STATS_DATA = [
  { key: "experience", value: "1+" },
  { key: "projects", value: "39+" },
  { key: "companies", value: "4" },
] as const;

export const CORE_TECHNOLOGIES = [
  "Redis", "RabbitMQ", "Kafka", "Docker", "AWS S3",
  "Flyway", "Kubernetes", "Helm", "mTLS", "KeyCloak",
  "Prometheus", "Grafana", "CI/CD",
] as const;
