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
      <img
        src="/logo/logo-circle.png"
        alt="원형 로고"
        className="h-8 w-8 rounded-full"
      />
      <span className="text-xl font-bold">{title}</span>
      <span className="text-neutral-400">{subtitle}</span>
    </div>
  );
};

export default SectionHeadingContent;
