import { TemplateItemProps } from '../interface';
import RoundedBox from './RoundedBox';

const TemplateItem = ({ className, name }: TemplateItemProps) => {
  return (
    <RoundedBox
      className={`flex w-full justify-between${
        className ? ` ${className}` : ''
      }`}
    >
      <span>{name}</span>
      <button type="button">
        <span>×</span>
      </button>
    </RoundedBox>
  );
};

export default TemplateItem;
