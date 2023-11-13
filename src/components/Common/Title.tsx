import React from 'react';

interface TitleProps {
  children: React.ReactNode;
}

const Title = ({ children }: TitleProps) => {
  return (
    <div className="mb-9 text-[28px] font-extrabold text-black">{children}</div>
  );
};

export default Title;
