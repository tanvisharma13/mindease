function SectionHeading({
  eyebrow,
  title,
  description,
  centered = false,
}) {
  return (
    <div
      className={`mb-10 ${
        centered ? "text-center" : "text-left"
      }`}
    >
      {eyebrow && (
        <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-[#557486]">
          {eyebrow}
        </p>
      )}

      <h2 className="font-serif text-4xl font-normal tracking-tight md:text-5xl">
        {title}
      </h2>

      {description && (
        <p className="mt-3 max-w-2xl text-lg leading-8 text-[#60766e]">
          {description}
        </p>
      )}
    </div>
  );
}

export default SectionHeading;