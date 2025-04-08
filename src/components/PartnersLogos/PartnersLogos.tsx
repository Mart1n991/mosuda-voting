import Link from "next/link";
import { CdnImage } from "../CdnImage";

export default function PartnersLogos() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 items-center justify-items-center w-full shadow-xl rounded-lg p-4">
      <Link
        href="https://www.neoglucan.sk/"
        className="relative w-full aspect-[2/1] max-w-[200px] cursor-pointer hover:opacity-80 transition-opacity"
        target="_blank"
      >
        <CdnImage src="/partners/neoglucan.png" alt="Neoglucan" fill className="object-contain" />
      </Link>
      <Link
        href="https://yliosgb.sk/"
        className="relative w-full aspect-[2/1] max-w-[200px] cursor-pointer hover:opacity-80 transition-opacity"
        target="_blank"
      >
        <CdnImage src="/partners/logo_ylios.png" alt="YliosGB" fill className="object-contain" />
      </Link>
      <Link
        href="https://www.pelikan.sk/sk"
        className="relative w-full aspect-[2/1] max-w-[200px] cursor-pointer hover:opacity-80 transition-opacity"
        target="_blank"
      >
        <CdnImage src="/partners/logo_pelikan.png" alt="pelikan" fill className="object-contain" />
      </Link>
      <Link
        href="https://www.topankovo.sk/"
        className="relative w-full aspect-[2/1] max-w-[200px] cursor-pointer hover:opacity-80 transition-opacity"
        target="_blank"
      >
        <CdnImage src="/partners/logo_topankovo.png" alt="topakovo" fill className="object-contain" />
      </Link>
      <Link
        href="https://www.divique.com/"
        className="relative w-full aspect-[2/1] max-w-[200px] cursor-pointer hover:opacity-80 transition-opacity"
        target="_blank"
      >
        <CdnImage src="/partners/logo_divique.png" alt="divique" fill className="object-contain" />
      </Link>
      <Link
        href="https://www.spirkomatus.cz/"
        className="relative w-full aspect-[2/1] max-w-[200px] cursor-pointer hover:opacity-80 transition-opacity"
        target="_blank"
      >
        <CdnImage src="/partners/enspire-logo.png" alt="enspire" fill className="object-contain" />
      </Link>
    </div>
  );
}
