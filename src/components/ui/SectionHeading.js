import Reveal from "./Reveal";

/**
 * SectionHeading — the badge + gradient title + subtitle block shared by
 * every section. Replaces the copy-pasted header markup.
 *
 * Props:
 *  - eyebrow: small pill label (e.g. "Portfolio Showcase")
 *  - title: plain leading text (e.g. "My")
 *  - highlight: gradient-emphasised word (e.g. "Projects")
 *  - subtitle: optional supporting paragraph
 *  - align: "center" (default) | "left"
 */
const SectionHeading = ({
  eyebrow,
  title,
  highlight,
  subtitle,
  align = "center",
}) => {
  const isCenter = align === "center";
  return (
    <Reveal
      className={`mb-14 max-w-3xl ${isCenter ? "mx-auto text-center" : "text-left"}`}
    >
      {eyebrow && (
        <span className="pill mb-4">
          <span className="h-2 w-2 animate-pulse rounded-full bg-brand" />
          {eyebrow}
        </span>
      )}
      <h2 className="text-4xl font-extrabold leading-tight text-ink sm:text-5xl lg:text-6xl">
        {title}{" "}
        {highlight && <span className="gradient-text">{highlight}</span>}
      </h2>
      {subtitle && (
        <p className="mt-5 text-lg leading-relaxed text-muted">{subtitle}</p>
      )}
    </Reveal>
  );
};

export default SectionHeading;
