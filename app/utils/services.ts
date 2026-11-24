interface Service {
  id?: string | number;
  title: string;
  icon?: string;
  status?: string;
  summary?: string;
  href?: string;
  linkUrl?: string;
  link?: string;
}

const defaultServices_EN = [
  { id: 1, title: "ETL / ELT Pipelines", icon: "Workflow", status: "Published", summary: "Building and maintaining basic data pipelines to extract, transform, and load data.", link: "Let's Connect", href: "#contact" },
  { id: 2, title: "SQL & Database Maintenance", icon: "Database", status: "Published", summary: "Writing efficient queries, managing tables, and assisting with database upkeep.", link: "Let's Connect", href: "#contact" },
  { id: 3, title: "Data Cleaning & Prep", icon: "Globe", status: "Published", summary: "Scraping, cleaning, and formatting raw datasets for analysis or dashboards.", link: "Let's Connect", href: "#contact" },
  { id: 4, title: "Documentation & Testing", icon: "BookOpen", status: "Published", summary: "Writing clear technical docs and adding basic data quality tests to pipelines.", link: "Let's Connect", href: "#contact" },
];

const defaultServices_DE = [
  { id: 1, title: "ETL / ELT Pipelines", icon: "Workflow", status: "Published", summary: "Aufbau und Pflege grundlegender Datenpipelines zum Extrahieren, Transformieren und Laden von Daten.", link: "Lass uns verbinden", href: "#contact" },
  { id: 2, title: "SQL & Datenbankwartung", icon: "Database", status: "Published", summary: "Schreiben effizienter Abfragen, Verwalten von Tabellen und Unterstützung bei der Datenbankwartung.", link: "Lass uns verbinden", href: "#contact" },
  { id: 3, title: "Datenbereinigung & Vorbereitung", icon: "Globe", status: "Published", summary: "Scraping, Bereinigung und Formatierung von Rohdaten für Analysen oder Dashboards.", link: "Lass uns verbinden", href: "#contact" },
  { id: 4, title: "Dokumentation & Tests", icon: "BookOpen", status: "Published", summary: "Erstellen klarer technischer Dokumentationen und Hinzufügen grundlegender Datenqualitätstests.", link: "Lass uns verbinden", href: "#contact" },
];

export function getPublishedServices(entries: unknown, language: "en" | "de") {
  const defaults = language === "de" ? defaultServices_DE : defaultServices_EN;
  const merged = new Map<string, Service>(defaults.map((service) => [service.title, service]));

  if (Array.isArray(entries)) {
    for (const service of entries) {
      const title = service?.title || service?.name;
      if (title) {
        merged.set(title, {
          id: service.id,
          title,
          icon: service.icon,
          status: service.status,
          summary: service.summary || (typeof service.body === "string" ? service.body.substring(0, 80) + "..." : ""),
          href: service.href,
          linkUrl: service.linkUrl,
          link: service.link,
        });
      }
    }
  }

  return Array.from(merged.values()).filter((service) =>
    String(service.status || "Published").toLowerCase() === "published"
  );
}
