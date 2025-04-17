import { useLocale } from "next-intl";
import Image from "next/image";

interface GooglePlayButtonProps {
  href: string;
  className?: string;
}

export function GooglePlayButton({ href, className }: GooglePlayButtonProps) {
  const locale = useLocale();

  const localeBadges: Record<string, string> = {
    en: "/images/app-store-badges/google_en.png",
    sk: "/images/app-store-badges/google_sk.png",
    cz: "/images/app-store-badges/google_cz.png",
  };

  const badgeSrc = localeBadges[locale] || localeBadges.sk;

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      <Image src={badgeSrc} alt="Download on the Google Play" width={120} height={40} className="h-auto w-auto" />
    </a>
  );
}
