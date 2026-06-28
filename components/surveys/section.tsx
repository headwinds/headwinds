const Section = ({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <section className="flex flex-col gap-5 border-t border-[#D5CEC6] pt-8 first:border-t-0 first:pt-0">
      <div className="flex flex-col gap-2">
        <p className="m-0 text-[11px] font-medium uppercase tracking-[3px] text-[#6B6B6B]">
          {eyebrow}
        </p>
        <h2 className="m-0 text-2xl font-normal leading-tight text-[#1A1A1A]">
          {title}
        </h2>
      </div>
      <div className="flex flex-col gap-5">{children}</div>
    </section>
  );
};

export default Section;
