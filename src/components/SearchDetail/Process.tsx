import { HTMLAttributes, useEffect, useState } from 'react';
import { FaCheck } from 'react-icons/fa';
import styled from 'styled-components';

interface ProcessProps {
  data?: any;
  isShowTitle?: boolean;
}

interface RatioDivProps extends HTMLAttributes<HTMLDivElement> {
  ratio: string;
}

const ProcessingBar = styled.div<RatioDivProps>`
  width: ${(props) => props.ratio};
`;

const Process = ({ data, isShowTitle }: ProcessProps) => {
  const processingRatio =
    `${((data?.processingNum - 1) / (data?.roadmapList?.length - 1)) * 87}%` ||
    '0%';

  return (
    <div
      className="flex w-full flex-col items-center rounded-[20px] bg-white px-9 py-9"
      onClick={() => console.log(processingRatio)}
    >
      {isShowTitle && (
        <div className="mb-6 text-[28px] font-bold text-gray1">
          {data?.title}
        </div>
      )}
      <div className="relative flex w-full justify-between">
        {data?.roadmapList?.map((el: any, idx: number) => (
          <div className=" flex w-[14%] flex-col items-center" key={idx}>
            <div className="z-20 mb-[14px] flex h-[60px] w-[60px] items-center justify-center bg-white">
              {data?.processingNum !== idx + 1 ? (
                <div
                  className={`flex h-7 w-7 items-center justify-center rounded-full text-base font-bold text-white ${
                    data.processingNum <= idx + 1 ? 'bg-blue4' : 'bg-blue1'
                  }`}
                >
                  {idx + 1 < data.processingNum ? (
                    <FaCheck className="text-sm" />
                  ) : (
                    el.step
                  )}
                </div>
              ) : (
                <div
                  className={`flex h-[42px] w-[42px] items-center justify-center rounded-full bg-blue4`}
                >
                  <div
                    className={
                      'flex h-7 w-7 items-center justify-center rounded-full bg-blue1 text-base font-bold text-white'
                    }
                  >
                    {el.step}
                  </div>
                </div>
              )}
            </div>
            <div className="mb-8 text-center text-base font-semibold text-black">
              {el.title}
            </div>
            <div className="flex flex-col items-center gap-3">
              {el?.templateList.map((el: any, idx: number) => (
                <div
                  className="flex w-full items-center justify-center rounded-[15px] bg-gray7 px-1.5 py-1 text-center text-[14px] font-semibold text-gray3"
                  key={idx}
                >
                  {el.title}
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="absolute left-[7%] top-[28px] z-0 h-[5px] w-[87%] bg-blue3" />

        {data?.processingNum !== 0 ? (
          <ProcessingBar
            className={`absolute left-[7%] top-[28px] z-[10] h-[5px] bg-blue1`}
            ratio={processingRatio}
          />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Process;
