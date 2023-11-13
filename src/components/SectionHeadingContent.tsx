interface SectionHeadingContentProps {
  title: string;
  subtitle: string;
}

const SectionHeadingContent = ({
  title,
  subtitle,
}: SectionHeadingContentProps) => {
  return (
    <div className="flex items-center gap-4">
      <img src="/icons/circle-chart.svg" alt="원형 차트" />
      <span className="text-xl font-bold">{title}</span>
      <span className="text-neutral-400">{subtitle}</span>
    </div>
  );
};

export default SectionHeadingContent;
