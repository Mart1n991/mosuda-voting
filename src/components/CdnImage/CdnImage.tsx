"use client";

import Image, { ImageProps } from "next/image";

type CdnImageProps = {
  src: string;
  alt: string;
};

export const CdnImage = ({ src, alt, ...props }: ImageProps & CdnImageProps) => (
  <Image src={`${process.env.NEXT_PUBLIC_BUNNY_PULL_ZONE_URL}/${src}`} alt={alt} {...props} />
);
