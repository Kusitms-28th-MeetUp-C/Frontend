import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

const ColAnimatedImg = styled.img`
  opacity: 0;
  transform: translateY(-80px);
  transition: 1s;

  &.active {
    opacity: 1;
    transform: translateY(0);
  }
`;

const RightAnimatedImg = styled.img`
  opacity: 0;
  transform: translateX(80px);
  transition: 1s;

  &.active {
    opacity: 1;
    transform: translateX(0);
  }
`;

const LeftAnimatedImg = styled.img`
  opacity: 0;
  transform: translateX(-80px);
  transition: 1s;

  &.active {
    opacity: 1;
    transform: translateX(0);
  }
`;

const Main = () => {
  // 스크롤 애니메이션
  const imgRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];

  const options = {
    root: null, // viewport
    rootMargin: '0px',
    threshold: 0.5, // 50%가 viewport에 들어와 있어야 callback 실행
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, options);

  useEffect(() => {
    imgRefs.forEach((ref) => {
      ref.current && observer.observe(ref.current);
    });
    // 옵저버 정리(clean-up) 함수
    return () => {
      imgRefs.forEach((ref) => {
        ref.current && observer.unobserve(ref.current);
      });
    };
  }, [imgRefs, observer]);

  // 비디오

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
    <div
      className={`${
        isMobile ? 'pt-[70px]' : 'pt-[150px]'
      } flex w-full flex-col items-center`}
    >
      <div className="m-auto flex w-full max-w-[1024px] flex-col items-center">
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
        {/* <div className="relative mb-20 flex h-0 max-h-[200px] w-full max-w-[800px] items-center justify-center overflow-hidden bg-slate-400 pb-[45%]"> */}
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/1Xi6IxP0Q5s?si=BozEaayzOhQFLgj3"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="h-[450px] w-full max-w-[800px]"
        ></iframe>
        {/* </div> */}
      </div>
      <ColAnimatedImg
        ref={imgRefs[0]}
        src="/images/main1.svg"
        className="m-auto w-full max-w-[1024px]"
      />
      <ColAnimatedImg
        ref={imgRefs[1]}
        src="/images/main2.svg"
        className="m-auto w-full max-w-[1024px]"
      />
      <ColAnimatedImg
        ref={imgRefs[2]}
        src="/images/main3.svg"
        className="m-auto w-full max-w-[1024px]"
      />
      <div className="w-full bg-gradient-to-b from-white to-blue5">
        <ColAnimatedImg
          ref={imgRefs[3]}
          src="/images/main4.svg"
          className="m-auto w-full max-w-[1024px]"
        />
      </div>
      <RightAnimatedImg
        ref={imgRefs[4]}
        src="/images/main5.png"
        className="m-auto w-full max-w-[1024px]"
      />
      <LeftAnimatedImg
        ref={imgRefs[5]}
        src="/images/main6.png"
        className="m-auto w-full max-w-[1024px]"
      />
      <RightAnimatedImg
        ref={imgRefs[6]}
        src="/images/main7.png"
        className="m-auto w-full max-w-[1024px]"
      />
    </div>
  );
};

export default Main;
