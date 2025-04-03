import { useLocale } from "next-intl";
import { CdnImage } from "../CdnImage";

interface AppStoreButtonProps {
  href: string;
  className?: string;
}

export function AppStoreButton({ href, className }: AppStoreButtonProps) {
  const locale = useLocale();

  const localeBadges: Record<string, string> = {
    en: "/app-store-badges/apple_en.svg",
    sk: "/app-store-badges/apple_sk.svg",
  };

  const badgeSrc = localeBadges[locale] || localeBadges.sk;

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      <CdnImage src={badgeSrc} alt="Download on the App Store" width={120} height={40} className="h-auto w-auto" />
    </a>
  );
}
