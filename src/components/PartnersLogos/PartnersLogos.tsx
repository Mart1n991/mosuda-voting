import Link from "next/link";
import Image from "next/image";

export default function PartnersLogos() {
  return (
    <div className="flex flex-wrap gap-4 items-center justify-center xl:justify-start">
      <Link href="/" className="relative w-[200px] h-[100px] cursor-pointer" target="_blank">
        <Image src="/images/partners/neoglucan.png" alt="Neoglucan" fill className="object-contain" />
      </Link>
      <Link href="/" className="relative w-[200px] h-[100px] cursor-pointer" target="_blank">
        <Image src="/images/partners/yliosGB.png" alt="YliosGB" fill className="object-contain" />
      </Link>
    </div>
  );
}
