import Image from "next/image";
import type { ImageProps } from "next/image";

type ResponsiveImageProps = Omit<ImageProps, "alt"> & {
  alt: string;
  fallbackAlt?: string;
};

export function ResponsiveImage({ alt, fallbackAlt = "", ...rest }: ResponsiveImageProps) {
  return <Image alt={alt ? alt : fallbackAlt} {...rest} />;
}
