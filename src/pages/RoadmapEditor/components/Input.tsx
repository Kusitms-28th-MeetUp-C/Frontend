import { InputProps } from '../interface';

const Input: React.FC<InputProps> = ({
  placeholder,
  value,
  onChange,
  className,
}) => {
  return (
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none ${className}`}
    />
  );
};

export default Input;
