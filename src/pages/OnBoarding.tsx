import DropDown from '../components/Common/DropDown/DropDown';
import { useState } from 'react';
import Axios from '../libs/api';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { LoginState } from '../states/LoginState';

interface InputTitleProps {
  children: React.ReactNode;
}

interface InputProps {
  placeholder: string;
  onChange: React.Dispatch<React.SetStateAction<string>>;
}

interface InputWrapperProps {
  children: React.ReactNode;
}

const InputTitle = ({ children }: InputTitleProps) => {
  return <div className="text-base font-semibold text-gray1">{children}</div>;
};

const Input = ({ placeholder, onChange }: InputProps) => {
  return (
    <input
      className="w-full rounded-[15px] bg-white p-4 text-base font-medium text-gray3 outline-none"
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

const InputWrapper = ({ children }: InputWrapperProps) => {
  return <div className="flex w-full flex-col gap-[10px]">{children}</div>;
};

const OnBoarding = () => {
  const navigate = useNavigate();
  const itemList = [
    { id: 1, title: 'PM' },
    { id: 2, title: '마케터' },
    { id: 3, title: '디자이너' },
    { id: 4, title: '개발자' },
    { id: 5, title: '기획자' },
    { id: 6, title: '에디터' },
  ];

  const [userName, setUserName] = useState('');
  const [teamName, setTeamName] = useState('');
  const [userType, setUserType] = useState({
    id: 0,
    title: '포지션을 선택해주세요',
  });

  const [loginState, setLoginState] = useRecoilState(LoginState);

  const onClickBtn = async () => {
    if (userName && teamName && userType.id !== 0) {
      await Axios.post(
        'user/signup',
        {
          userName,
          userType: userType.title,
          teamName,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('access-token')}`,
          },
        },
      )
        .then((res) => {
          console.log(res);
          alert('회원가입을 축하드립니다');
          setLoginState((prev: any) => ({ ...prev, name: res.data.data.name }));
          navigate('/');
        })
        .catch((err) => console.error(err));
    } else {
      alert('내용을 입력해주세요');
    }
  };

  return (
    <div className="w-full bg-blue5 py-[115px]">
      <div className="m-auto flex w-[90%] max-w-[550px] flex-col items-center">
        <div className="mb-4 text-base font-medium text-gray1">반가워요</div>
        <div
          className="mb-20 text-2xl font-bold text-gray1"
          onClick={() => console.log(userName, userType, teamName)}
        >
          프로필을 입력해주세요
        </div>
        <div className="mb-20 flex w-full flex-col gap-9">
          <InputWrapper>
            <InputTitle>이름</InputTitle>
            <Input placeholder="이름을 입력해주세요" onChange={setUserName} />
          </InputWrapper>
          <InputWrapper>
            <InputTitle>포지션</InputTitle>
            <DropDown
              itemList={itemList}
              selectedItem={userType}
              setSelectedItem={setUserType}
            />
          </InputWrapper>
          <InputWrapper>
            <InputTitle>팀 이름</InputTitle>
            <Input
              placeholder="회의 관리가 필요한 팀 이름을 입력해주세요"
              onChange={setTeamName}
            />
          </InputWrapper>
        </div>
        <button
          className="w-full max-w-[196px] rounded-[10px] bg-blue1 px-10 py-4 text-base font-medium text-white"
          onClick={onClickBtn}
        >
          작성 완료
        </button>
      </div>
    </div>
  );
};

export default OnBoarding;
