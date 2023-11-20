interface FilterItemContentProps {
  label: string;
  count: number;
}

const FilterItemContent = ({ label, count }: FilterItemContentProps) => {
  return (
    <div className="flex gap-3">
      <span>{label}</span>
      <span>{count}</span>
    </div>
  );
};

export default FilterItemContent;
