import React from 'react';

interface TitleProps {
  children: React.ReactNode;
  isMobile?: boolean;
}

const Title = ({ children, isMobile }: TitleProps) => {
  return (
    <div
      className={`${
        isMobile ? 'text-2xl' : 'text-[28px]'
      } font-bold text-gray1`}
    >
      {children}
    </div>
  );
};

export default Title;
