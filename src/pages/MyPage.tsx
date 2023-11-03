import styled from 'styled-components';
import { IoIosArrowForward } from 'react-icons/io';

interface ScoreItemProps {
  children: React.ReactNode;
}

interface ScoreNameProps {
  children: React.ReactNode;
}

interface ScoreCountProps {
  children: React.ReactNode;
}

interface FormLabelProps {
  id: string;
  children: React.ReactNode;
}

interface FormInputProps {
  id: string;
  value: string;
  disabled?: boolean;
}

interface ButtonProps {
  children: string;
}

const ScoreItemBlock = styled.div`
  & + & {
    margin-top: 1rem;
  }
`;

const ScoreItem = ({ children }: ScoreItemProps) => {
  return (
    <ScoreItemBlock className="mt-8 flex items-center justify-between">
      {children}
    </ScoreItemBlock>
  );
};

const ScoreName = ({ children }: ScoreNameProps) => {
  return <span className="text-gray-600">{children}</span>;
};

const ScoreCount = ({ children }: ScoreCountProps) => {
  return (
    <span className="w-20 text-center leading-normal text-gray-600">
      {children}
    </span>
  );
};

const FormLabel = ({ id, children }: FormLabelProps) => {
  return (
    <label htmlFor={id} className="block">
      {children}
    </label>
  );
};

const FormInput = ({ id, value, disabled }: FormInputProps) => {
  return (
    <input
      type="text"
      id={id}
      className={`mt-2 w-full rounded-xl border-[1px] border-black border-opacity-30 px-4 py-2 ${
        disabled ? 'bg-[#EBEEF9]' : 'bg-white'
      }`}
      value={value}
    />
  );
};

const Button = ({ children }: ButtonProps) => {
  return (
    <button className="mt-3 rounded-xl bg-[#d4d5ff] px-8 py-2 font-medium">
      {children}
    </button>
  );
};

const MyPage = () => {
  return (
    <div className="flex items-start gap-7 px-7 py-7">
      <div className="w-[400px] rounded-2xl bg-white px-5 py-8 shadow">
        <div className="flex items-center">
          <div className="h-14 w-14 rounded-full bg-zinc-300" />
          <span className="ml-5 text-xl font-extrabold">신민선</span>
        </div>
        <div>
          <ScoreItem>
            <ScoreName>회의록 템플릿 기여도</ScoreName>
            <ScoreCount>13개</ScoreCount>
          </ScoreItem>
          <ScoreItem>
            <ScoreName>회의록 로드맵 기여도</ScoreName>
            <ScoreCount>10개</ScoreCount>
          </ScoreItem>
          <ScoreItem>
            <span className="flex cursor-pointer items-center">
              <div className="mr-2 flex h-6 w-6 items-center justify-center rounded-full border-[0.1px] border-black">
                P
              </div>
              <ScoreName>나의 포인트</ScoreName>
              <i className="text-xl">
                <IoIosArrowForward />
              </i>
            </span>
            <ScoreCount>150점</ScoreCount>
          </ScoreItem>
        </div>
      </div>
      <div className="w-full rounded-2xl bg-white px-8 py-8">
        <h2 className="text-2xl font-bold">나의 계정</h2>
        <div className="mt-5 flex items-center">
          <div className="h-20 w-20 rounded-full bg-zinc-300"></div>
          <div className="ml-10">
            <span className="block">나의 프로필</span>
            <Button>사진 업로드</Button>
          </div>
        </div>
        <form className="mt-5">
          <div>
            <FormLabel id="name">이름</FormLabel>
            <FormInput id="name" value="신민선" />
          </div>
          <div className="mt-3">
            <FormLabel id="email">이메일</FormLabel>
            <FormInput id="email" value="abcde1234@gmail.com" disabled />
          </div>
          <div className="mt-4 w-full text-center">
            <Button>변경사항 저장</Button>
          </div>
        </form>
        <div className="mt-5">
          <h4 className="font-semibold">계정 삭제</h4>
          <p className="mt-2 text-sm text-gray-600">
            계정 삭제시 내가 참여 중인 워크스페이스의 모든 항목이 삭제됩니다.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
