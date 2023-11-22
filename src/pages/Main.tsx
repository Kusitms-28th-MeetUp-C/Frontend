import { useState, useEffect } from 'react';

const Main = () => {
  // 반응형
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const isMobile = windowWidth <= 500;

  useEffect(() => {
    window.addEventListener('resize', () => setWindowWidth(window.innerWidth));
    // clean up 이벤트 리스너
    return () => {
      window.removeEventListener('resize', () =>
        setWindowWidth(window.innerWidth),
      );
    };
  }, []);

  return (
    <div className="m-auto mt-[100px] flex w-full max-w-[1024px] flex-col items-center">
      <div
        className={`mb-3 ${
          isMobile ? 'text-2xl' : 'text-[40px]'
        } font-extrabold text-[#6268F1]`}
      >
        회의의 시작을 효율적으로
      </div>
      <div
        className={`${
          isMobile ? 'mb-[80px] text-base' : 'mb-[100px] text-[32px]'
        } font-semibold text-[#545454]`}
      >
        쉽고 빠른 회의 설계, 밋플
      </div>
      <div
        className={`mb-[75px] ${
          isMobile ? 'h-[200px]' : 'h-[515px]'
        } w-full max-w-[793px] rounded-[20px] bg-gray5 text-center`}
      >
        비디오
      </div>
      <img src="/images/main1.svg" />
      <img src="/images/main2.svg" />
      <img src="/images/main3.svg" />
      <img src="/images/main4.svg" />
    </div>
  );
};

export default Main;
