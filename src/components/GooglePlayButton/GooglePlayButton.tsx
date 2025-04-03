import { useLocale } from "next-intl";
import { CdnImage } from "../CdnImage";

interface GooglePlayButtonProps {
  href: string;
  className?: string;
}

export function GooglePlayButton({ href, className }: GooglePlayButtonProps) {
  const locale = useLocale();

  const localeBadges: Record<string, string> = {
    en: "/app-store-badges/google_en.png",
    sk: "/app-store-badges/google_sk.png",
  };

  const badgeSrc = localeBadges[locale] || localeBadges.sk;

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      <CdnImage src={badgeSrc} alt="Download on the Google Play" width={120} height={40} className="h-auto w-auto" />
    </a>
  );
}
