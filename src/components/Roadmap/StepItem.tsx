import Axios from '../../libs/api';
import RoundedBox from './RoundedBox';

interface StepItemProps {
  className?: string;
  name: string;
  roadmap: any;
  setRoadmap: any;
  stepIndex: number;
}

const StepItem = ({
  className,
  name,
  roadmap,
  setRoadmap,
  stepIndex,
}: StepItemProps) => {
  const fetchDeleteTemplate = (templateId: number) => {
    Axios.delete(`/manage/template`, {
      params: {
        templateId,
      },
    }).then((res) => {
      console.log(res);
    });
  };

  return (
    <RoundedBox
      color="blue"
      className={`flex w-full justify-between${
        className ? ` ${className}` : ''
      }`}
    >
      <input
        value={name}
        onChange={(e: any) => {
          const newSteps = [...roadmap.steps];
          newSteps[stepIndex].stepTitle = e.target.value;
          setRoadmap({ ...roadmap, steps: newSteps });
        }}
        placeholder="스텝의 제목을 입력해주세요."
        className="w-full bg-inherit outline-none placeholder:text-white placeholder:text-opacity-70"
      />
      <button
        type="button"
        onClick={() => {
          const templateIdList = roadmap.steps[stepIndex].templateIdList;
          for (let index of templateIdList) {
            fetchDeleteTemplate(index);
          }
          const newSteps = [...roadmap.steps];
          newSteps.splice(stepIndex, 1);
          setRoadmap({ ...roadmap, steps: newSteps });
        }}
      >
        <span>×</span>
      </button>
    </RoundedBox>
  );
};

export default StepItem;
