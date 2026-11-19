import Image from "next/image";

type FigureProps = {
  /** Path under /public, e.g. /images/articles/inline/<slug>-1.png */
  src: string;
  alt: string;
  caption?: string;
};

/**
 * Inline supporting figure for MDX articles. Place it between paragraphs,
 * right after the text that introduces the concept it illustrates. Unlike
 * the single hero image in frontmatter, an article can contain many of these.
 */
export function Figure({ src, alt, caption }: FigureProps) {
  return (
    <figure className="my-8 overflow-hidden rounded-2xl border border-border bg-surface not-prose">
      <Image
        src={src}
        alt={alt}
        width={1600}
        height={900}
        sizes="(max-width: 672px) 100vw, 672px"
        className="h-auto w-full object-cover"
      />
      {caption && (
        <figcaption className="border-t border-border px-4 py-3 text-[12.5px] leading-relaxed text-muted">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
