import { useState } from 'react';
import TurndownService from 'turndown';
import Axios from '../libs/api';
import { produce } from 'immer';
import RoundedBox from '../components/Roadmap/RoundedBox';
import StepItem from '../components/Roadmap/StepItem';
import AddButton from '../components/Roadmap/AddButton';
import TemplateItem from '../components/Roadmap/TemplateItem';
import TemplateEditorModal from '../components/Roadmap/TemplateEditorModal';
import SubmitButton from '../components/Roadmap/SubmitButton';

const RoadmapEditor = () => {
  const [roadmap, setRoadmap] = useState({
    title: '',
    introduction: '',
    steps: [],
    roadmapType: 'video',
  });
  const [templateNames, setTemplateNames] = useState<any[]>([
    {
      templateId: 44,
      title: '템플릿 1',
    },
    {
      templateId: 46,
      title: '템플릿 2',
    },
    {
      templateId: 48,
      title: '템플릿 3',
    },
    {
      templateId: 49,
      title: '템플릿 4',
    },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [templateValues, setTemplateValues] = useState<any>({
    title: '',
    content: '',
    introduction: '',
    templateType: 'it',
    estimatedTime: 30,
  });
  const [stepIndexClicked, setStepIndexClicked] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');

  return (
    <div className="px-14 py-12">
      <header>
        <h1 className="text-3xl font-bold">로드맵 작성하기</h1>
      </header>
      <main className="mt-5">
        <form>
          <div className="flex w-40 cursor-pointer items-center justify-between rounded-xl bg-white px-4 py-2">
            <span className="text-gray3">
              {roadmap.roadmapType.toUpperCase()}
            </span>
            <i className="flex h-3 w-3 items-center">
              <img
                src="/icons/arrow-bottom-blue.svg"
                alt="arrow-bottom-blue"
                className="w-full"
              />
            </i>
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
