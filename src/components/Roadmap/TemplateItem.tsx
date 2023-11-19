import { produce } from 'immer';
import RoundedBox from './RoundedBox';
import Axios from '../../libs/api';

interface TemplateItemProps {
  className?: string;
  templateId: number;
  templateNames: any;
  setTemplateNames: any;
  roadmap: any;
  setRoadmap: any;
  stepIndex: number;
}

const TemplateItem = ({
  className,
  templateId,
  templateNames,
  setTemplateNames,
  roadmap,
  setRoadmap,
  stepIndex,
}: TemplateItemProps) => {
  const findTemplateName = (templateId: number) => {
    const foundIndex = templateNames.findIndex((template: any) => {
      return template.templateId === templateId;
    });
    return templateNames[foundIndex].title;
  };

  const handleDeleteTemplate = () => {
    // TODO: 템플릿 삭제 API 연결
    Axios.delete(`/manage/template`, {
      params: {
        templateId,
      },
    })
      .then((res) => {
        console.log(res);
        const newTemplateNames = produce(templateNames, (draft: any[]) => {
          const foundIndex = draft.findIndex((template) => {
            return template.templateId === templateId;
          });
          draft.splice(foundIndex, 1);
        });
        setTemplateNames(newTemplateNames);
        const newRoadmap = produce(roadmap, (draft: any) => {
          const foundIndex = draft.steps[stepIndex].templateIdList.findIndex(
            (id: number) => {
              return id === templateId;
            },
          );
          if (foundIndex !== -1) {
            draft.steps[stepIndex].templateIdList.splice(foundIndex, 1);
          }
        });
        setRoadmap(newRoadmap);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <RoundedBox
      className={`flex w-full justify-between${
        className ? ` ${className}` : ''
      }`}
    >
      <span>{findTemplateName(templateId)}</span>
      <button type="button" onClick={handleDeleteTemplate}>
        <span>×</span>
      </button>
    </RoundedBox>
  );
};

export default TemplateItem;
