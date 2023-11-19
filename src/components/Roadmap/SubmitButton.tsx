import Axios from '../../libs/api';

interface SubmitButtonProps {
  roadmap: any;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
}

const SubmitButton = ({ roadmap, setErrorMessage }: SubmitButtonProps) => {
  const fetchCreateRoadmap = () => {
    if (
      roadmap.steps.length === 0 ||
      roadmap.title === '' ||
      roadmap.introduction === '' ||
      roadmap.roadmapType === ''
    ) {
      setErrorMessage('모든 항목을 입력해주세요.');
      return;
    }
    console.log('submit roadmap', roadmap);
    Axios.post('/manage/roadmap', {
      roadmap,
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        setErrorMessage('로드맵 추가를 실패하였습니다.');
        console.error(err);
      });
  };

  return (
    <button
      type="submit"
      className="w-40 rounded-xl bg-blue1 px-6 py-2 font-medium text-white"
      onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        fetchCreateRoadmap();
      }}
    >
      작성 완료
    </button>
  );
};

export default SubmitButton;
