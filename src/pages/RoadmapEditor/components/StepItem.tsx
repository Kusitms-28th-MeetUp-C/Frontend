import { RoadmapItemProps } from '../interface';
import RoundedBox from './RoundedBox';

const StepItem = ({ className, name, onChange }: RoadmapItemProps) => {
  return (
    <RoundedBox
      color="blue"
      className={`flex w-full justify-between${
        className ? ` ${className}` : ''
      }`}
    >
      <input
        value={name}
        onChange={onChange}
        className="bg-inherit outline-none"
      />
      <button type="button">
        <span>×</span>
      </button>
    </RoundedBox>
  );
};

export default StepItem;
