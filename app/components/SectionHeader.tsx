import { useLanguage } from "../context/LanguageContext";
import { translations } from "../context/translations";

export interface SectionHeaderProps {
  /** Translation key for the small label (e.g., "greeting", "settings") */
  labelKey: string;
  /** Translation key for the main title (e.g., "about", "technologies") */
  titleKey: string;
}

export default function SectionHeader({ labelKey, titleKey }: SectionHeaderProps) {
  const { language } = useLanguage();
  const t = translations[language];
  const label = (t as any)[labelKey] ?? labelKey;
  const title = (t as any)[titleKey] ?? titleKey;
  return (
    <>
      <p className="text-[var(--accent)] uppercase tracking-[3px] text-[11px] font-bold mb-2">
        {label}
      </p>
      <h2 className="text-[28px] font-black text-[var(--text-primary)] mb-8">
        {title}
      </h2>
    </>
  );
}
