import RoundedBox from './components/RoundedBox';
import StepItem from './components/StepItem';
import TemplateItem from './components/TemplateItem';
import AddButton from './components/AddButton';
import TemplateEditorModal from './components/TemplateEditorModal';
import { useEffect, useState } from 'react';
import TurndownService from 'turndown';
import Axios from '../../libs/api';
import { TemplateValues } from './interface';
import { produce } from 'immer';

const RoadmapEditor = () => {
  const [roadmap, setRoadmap] = useState({
    title: '유저 2 로드맵 생성 테스트',
    introduction: '제발',
    steps: [
      {
        stepTitle: 'Step 1',
        templateIdList: [48, 44],
      },
      {
        stepTitle: 'Step 2',
        templateIdList: [49, 46],
      },
    ],
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
  const [rawContent, setRawContent] = useState('');
  const [templateValues, setTemplateValues] = useState<any>({
    title: '',
    content: '',
    introduction: '',
  });
  const turndownService = new TurndownService();

  // 입력 변경 핸들러
  const handleChange = (field: keyof TemplateValues) => (value: string) => {
    setTemplateValues({ ...templateValues, [field]: value });
  };

  const handleStepItemChange = (e: any, stepIndex: number) => {
    const newSteps = [...roadmap.steps];
    newSteps[stepIndex].stepTitle = e.target.value;
    setRoadmap({ ...roadmap, steps: newSteps });
    console.log(newSteps);
  };

  const handleAddStepButton = () => {
    const newSteps = [...roadmap.steps];
    newSteps.push({
      stepTitle: '',
      templateIdList: [],
    });
    setRoadmap({ ...roadmap, steps: newSteps });
    console.log(newSteps);
  };

  const handleModalSubmit = (e: any, stepIndex: number) => {
    e.preventDefault();
    console.log('templateValues', templateValues);
    Axios({
      method: 'POST',
      url: '/manage/template',
      data: {
        ...templateValues,
        content: turndownService.turndown(rawContent),
        templateType: 'it',
        estimatedTime: 30,
      },
    }).then((res) => {
      console.log(res);
      setIsModalOpen(false);

      // const newTemplateNames = produce(templateNames, (draft: any[]) => {
      //   draft.push({
      //     temaplteId: res.data.data.templateId,
      //     title: res.data.data.title,
      //   });
      // });

      // setTemplateNames(newTemplateNames);
      // const newRoadmap = produce(roadmap, (draft) => {
      //   draft.steps[stepIndex].templateIdList.push(res.data.data.templateId);
      // });
      setTemplateNames((prev) => [...prev, res.data]);
      setRoadmap(prev => ({ ...prev }));
    });
  };

  const handleQuillChange = (content: string) => {
    setRawContent(content);
  };

  const findTemplateName = (templateId: number) => {
    console.log(templateNames);
    const foundIndex = templateNames.findIndex(
      (template) => template.templateId === templateId,
    );
    return templateNames[foundIndex].title;
  };

  useEffect(() => {
    console.log(templateValues);
    if (templateValues.title === '') console.log('empty');
  }, [templateValues]);

  useEffect(() => {
    if (templateValues.title === '') console.log('empty');
  }, [templateValues]);

  return (
    <div className="px-14 py-12">
      <header>
        <h1 className="text-3xl font-bold">로드맵 작성하기</h1>
      </header>
      <main className="mt-5">
        <form>
          <div className="flex w-40 items-center justify-between rounded-xl bg-white px-4 py-2">
            <span className="text-gray3">카테고리</span>
            <i className="flex h-3 w-3 items-center">
              <img
                src="/icons/arrow-bottom-blue.svg"
                alt="arrow-bottom-blue"
                className="w-full"
              />
            </i>
          </div>
          <div className="mt-5 flex w-full gap-5">
            <div className="flex-1">
              <RoundedBox>
                <input
                  type="text"
                  placeholder="제목을 입력해주세요."
                  className="w-full outline-none"
                />
              </RoundedBox>
              <div className="mt-5 grid grid-cols-2 gap-5">
                {roadmap.steps.map((step, index) => (
                  <>
                    <div>
                      <div className="flex flex-col items-start gap-5">
                        <StepItem
                          name={step.stepTitle}
                          onChange={(e) => handleStepItemChange(e, index)}
                        />
                        {index === roadmap.steps.length - 1 && (
                          <AddButton
                            target="step"
                            onClick={handleAddStepButton}
                          />
                        )}
                      </div>
                    </div>
                    <div>
                      <div className="flex flex-col items-start gap-5">
                        {step.templateIdList.map((templateId: any) => (
                          <>
                            <TemplateItem name={findTemplateName(templateId)} />
                            {isModalOpen && (
                              <TemplateEditorModal
                                setIsOpen={setIsModalOpen}
                                onSubmit={(e: any) =>
                                  handleModalSubmit(e, index)
                                }
                                onCancel={() => setIsModalOpen(false)}
                                templateValues={templateValues}
                                handleChange={handleChange}
                                handleQuillChange={handleQuillChange}
                              />
                            )}
                          </>
                        ))}
                        <AddButton
                          target="template"
                          onClick={() => {
                            setIsModalOpen(true);
                          }}
                        />
                      </div>
                    </div>
                  </>
                ))}
              </div>
            </div>

            <RoundedBox className="w-80">
              <textarea
                placeholder="템플릿 설명글을 입력해주세요."
                className="w-full resize-none outline-none"
                rows={10}
              ></textarea>
            </RoundedBox>
          </div>
        </form>
      </main>
    </div>
  );
};

export default RoadmapEditor;
