import React from 'react';

interface TitleProps {
  children: React.ReactNode;
}

const Title = ({ children }: TitleProps) => {
  return (
    <div className="text-[28px] font-bold text-gray1">{children}</div>
  );
};

export default Title;
