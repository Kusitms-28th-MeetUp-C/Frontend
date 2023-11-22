import { useNavigate } from 'react-router-dom';

interface BackBtnProps {
  isMobile?: boolean;
}

const BackBtn = ({ isMobile }: BackBtnProps) => {
  const navigate = useNavigate();

  return (
    <button
      className={`${
        isMobile ? 'mb-3 text-xs' : 'mb-5'
      } flex items-center gap-2 text-[15px] font-medium text-gray1`}
      onClick={() => navigate(-1)}
    >
      <span>{'<'}</span>
      <span className="hover:underline">뒤로가기</span>
    </button>
  );
};

export default BackBtn;
