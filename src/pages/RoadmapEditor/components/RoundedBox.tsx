import { RoundedBoxProps } from '../interface';

const RoundedBox = ({
  children,
  className,
  color = 'white',
}: RoundedBoxProps) => {
  return (
    <div
      className={`rounded-xl px-5 py-3${
        color === 'blue' ? ' bg-blue2 text-white' : ' bg-white text-gray3'
      }${className ? ` ${className}` : ''}`}
    >
      {children}
    </div>
  );
};

export default RoundedBox;
