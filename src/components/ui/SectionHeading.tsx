import { HeadingBlock, type HeadingBlockProps } from "@/components/ui/HeadingBlock";

/** Title-only heading: the `eyebrow` prop is accepted but not rendered in this variant. */
export function SectionHeading(props: HeadingBlockProps) {
  return (
    <HeadingBlock {...props} block="section-heading" showEyebrow={false} centerWith="style" />
  );
}
