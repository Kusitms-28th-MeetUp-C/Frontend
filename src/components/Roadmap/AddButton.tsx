import { FaPlus } from 'react-icons/fa';

interface AddButtonProps {
  type?: 'button' | 'submit';
  target?: 'step' | 'template';
  roadmap?: any;
  setRoadmap?: any;
  setIsModalOpen?: any;
  setStepIndexClicked?: any;
  clickedStepIndex?: number;
  className?: string;
}

const AddButton = ({
  target = 'template',
  type = 'button',
  roadmap,
  setRoadmap,
  setIsModalOpen,
  setStepIndexClicked,
  clickedStepIndex,
  className,
}: AddButtonProps) => {
  const handleStepAddButton = () => {
    const newSteps = [...roadmap.steps];
    newSteps.push({
      stepTitle: '',
      templateIdList: [],
    });
    setRoadmap({ ...roadmap, steps: newSteps });
    console.log(newSteps);
  };

  const handleTemplateAddButton = () => {
    setIsModalOpen(true);
  };

  return (
    <button
      type={type}
      className={`mx-auto flex items-center gap-2 rounded-xl px-6 py-2${
        className ? ` ${className}` : ''
      }${target === 'step' ? ' bg-blue2 text-white' : ' bg-white text-gray3'}`}
      onClick={() => {
        if (target === 'step') {
          handleStepAddButton();
        } else {
          handleTemplateAddButton();
        }
        if (target === 'template') setStepIndexClicked(clickedStepIndex);
      }}
    >
      <div
        className={`flex h-5 w-5 items-center justify-center rounded-full${
          target === 'step' ? ' bg-white' : ' bg-blue2'
        } `}
      >
        <i
          className={`text-xs${
            target === 'step' ? ' text-blue2' : ' text-white'
          }`}
        >
          <FaPlus className="h-full" />
        </i>
      </div>
      <span>{target === 'step' ? '스텝 내용 추가' : '템플릿 내용 추가'}</span>
    </button>
  );
};

export default AddButton;
