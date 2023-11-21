import { useEffect, useState } from 'react';
import RoundedBox from '../components/Roadmap/RoundedBox';
import StepItem from '../components/Roadmap/StepItem';
import AddButton from '../components/Roadmap/AddButton';
import TemplateItem from '../components/Roadmap/TemplateItem';
import TemplateEditorModal from '../components/Roadmap/TemplateEditorModal';
import SubmitButton from '../components/Roadmap/SubmitButton';
import DropDown from '../components/Common/DropDown/DropDown';
import { typeReverseFilter } from '../libs/utils/filter';

const RoadmapEditor = () => {
  const categoryList = [
    {
      id: 1,
      title: 'IT 프로젝트',
    },
    {
      id: 2,
      title: '팀플',
    },
    {
      id: 3,
      title: '동아리/학회',
    },
    {
      id: 4,
      title: '자유주제 PT',
    },

    {
      id: 5,
      title: '마케팅',
    },
    {
      id: 6,
      title: '설문 및 데이터 분석',
    },
    {
      id: 7,
      title: '기업 분석',
    },
    {
      id: 8,
      title: '디자인 프로젝트',
    },
    {
      id: 9,
      title: '영상 프로젝트',
    },
  ];
  const [roadmapType, setRoadmapType] = useState({
    id: 0,
    title: '카테고리',
  });

  const [roadmap, setRoadmap] = useState({
    title: '',
    introduction: '',
    steps: [],
    roadmapType: '',
  });

  const [templateNames, setTemplateNames] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [templateValues, setTemplateValues] = useState<any>({
    title: '',
    content: '',
    introduction: '',
    templateType: '',
    estimatedTime: 0,
  });
  const [stepIndexClicked, setStepIndexClicked] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');

  return (
    <div className="px-14 py-12">
      <header>
        <h1
          className="text-3xl font-bold"
          onClick={() =>
            console.log(roadmap, typeReverseFilter(roadmapType.title))
          }
        >
          로드맵 작성하기
        </h1>
      </header>
      <main className="mt-5">
        <form>
          <div className="w-[210px]">
            <DropDown
              selectedItem={roadmapType}
              setSelectedItem={setRoadmapType}
              itemList={categoryList}
              className={'py-[8px]'}
            />
          </div>
          <div className="mt-5 flex w-full items-start gap-5">
            <div className="flex-1">
              <RoundedBox>
                <input
                  type="text"
                  value={roadmap.title}
                  placeholder="제목을 입력해주세요."
                  className="w-full outline-none"
                  onChange={(e: any) =>
                    setRoadmap({ ...roadmap, title: e.target.value })
                  }
                />
              </RoundedBox>
              <div className="mt-5 flex flex-col gap-10">
                {roadmap.steps.length === 0 ? (
                  <AddButton
                    target="step"
                    roadmap={roadmap}
                    setRoadmap={setRoadmap}
                  />
                ) : (
                  roadmap.steps.map((step: any, index) => (
                    <div key={index} className="flex flex-col gap-5">
                      <div>
                        <div className="flex flex-col items-start gap-5">
                          <StepItem
                            name={step.stepTitle}
                            roadmap={roadmap}
                            setRoadmap={setRoadmap}
                            stepIndex={index}
                          />
                        </div>
                      </div>
                      <div>
                        <div className="flex flex-col items-start gap-5">
                          {step.templateIdList.map((templateId: number) => (
                            <TemplateItem
                              key={templateId}
                              templateId={templateId}
                              templateNames={templateNames}
                              setTemplateNames={setTemplateNames}
                              roadmap={roadmap}
                              setRoadmap={setRoadmap}
                              stepIndex={index}
                            />
                          ))}
                          <AddButton
                            target="template"
                            setIsModalOpen={setIsModalOpen}
                            setStepIndexClicked={setStepIndexClicked}
                            clickedStepIndex={index}
                          />
                          {index === roadmap.steps.length - 1 && (
                            <>
                              <AddButton
                                target="step"
                                roadmap={roadmap}
                                setRoadmap={setRoadmap}
                                className="mt-5"
                              />
                            </>
                          )}

                          {isModalOpen && (
                            <TemplateEditorModal
                              setIsOpen={setIsModalOpen}
                              onCancel={() => {
                                setIsModalOpen(false);
                              }}
                              templateValues={templateValues}
                              roadmapType={typeReverseFilter(roadmapType.title)}
                              setTemplateValues={setTemplateValues}
                              roadmap={roadmap}
                              setRoadmap={setRoadmap}
                              stepIndexClicked={stepIndexClicked}
                              templateNames={templateNames}
                              setTemplateNames={setTemplateNames}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
              <div className="mt-10 flex flex-col items-center">
                <span className="mb-2 block text-sm font-medium text-red-500">
                  {errorMessage}
                </span>
                <SubmitButton
                  roadmap={roadmap}
                  roadmapType={typeReverseFilter(roadmapType.title)}
                  setErrorMessage={setErrorMessage}
                />
              </div>
            </div>
            <RoundedBox className="w-80">
              <textarea
                placeholder="템플릿 설명글을 입력해주세요."
                defaultValue={roadmap.introduction}
                className="w-full resize-none outline-none"
                rows={10}
                onChange={(e: any) =>
                  setRoadmap({ ...roadmap, introduction: e.target.value })
                }
              ></textarea>
            </RoundedBox>
          </div>
        </form>
      </main>
    </div>
  );
};

export default RoadmapEditor;
