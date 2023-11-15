import { useNavigate } from 'react-router-dom';

interface BackBtnProps {
  children: React.ReactNode;
}

const BackBtn = ({ children }: BackBtnProps) => {
  const navigate = useNavigate();

  return (
    <button
      className="mb-5 flex items-center gap-2 text-[15px] font-medium text-black "
      onClick={() => navigate(-1)}
    >
      <span>{'<'}</span>
      <span className="hover:underline">{children}</span>
    </button>
  );
};

export default BackBtn;
