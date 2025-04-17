import Link from "next/link";
import Image from "next/image";

type ImageContainerProps = {
  href: string;
  src: string;
};

const ImageContainer = ({ href, src }: ImageContainerProps) => (
  <Link
    href={href}
    className="relative w-full aspect-[2/1] max-w-[200px] cursor-pointer hover:opacity-80 transition-opacity"
    target="_blank"
  >
    <Image src={src} alt="Neoglucan" fill className="object-contain" />
  </Link>
);

export default function PartnersLogos() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 items-center justify-items-center w-full shadow-xl rounded-lg p-4">
      <ImageContainer href="https://www.neoglucan.sk/" src="/images/partners/neoglucan.png" />
      <ImageContainer href="https://yliosgb.sk/" src="/images/partners/logo_ylios.png" />
      <ImageContainer href="https://www.pelikan.sk/sk" src="/images/partners/logo_pelikan.png" />
      <ImageContainer href="https://www.topankovo.sk/" src="/images/partners/logo_topankovo.png" />
      <ImageContainer href="https://www.divique.com/" src="/images/partners/logo_divique.png" />
      <ImageContainer href="https://www.spirkomatus.cz/" src="/images/partners/logo_enspire.png" />
      <ImageContainer href="https://www.hotelhills.sk/" src="/images/partners/logo_hills.png" />
    </div>
  );
}
