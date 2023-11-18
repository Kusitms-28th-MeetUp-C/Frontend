import RoundedBox from './components/RoundedBox';
import StepItem from './components/StepItem';
import TemplateItem from './components/TemplateItem';
import AddButton from './components/AddButton';
import useRoadmapEditor from './hook';
import TemplateEditorModal from './components/TemplateEditorModal';
import { useEffect } from 'react';

const RoadmapEditor = () => {
  const {
    roadmap,
    handleStepItemChange,
    handleChange,
    handleAddStepButton,
    templateNames,
    isModalOpen,
    setIsModalOpen,
    templateValues,
    handleModalSubmit,
    handleQuillChange,
    findTemplateName,
  } = useRoadmapEditor();

  useEffect(() => {
    console.log(templateValues);
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
