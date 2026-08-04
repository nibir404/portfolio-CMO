import { HeadingBlock, type HeadingBlockProps } from "@/components/ui/HeadingBlock";

export function EyebrowHeading(props: HeadingBlockProps) {
  return <HeadingBlock {...props} block="eyebrow-heading" showEyebrow centerWith="modifier" />;
}
