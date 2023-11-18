import { useCallback, useEffect, useState } from 'react';

import { TemplateValues } from './interface';
import TurndownService from 'turndown';
import Axios from '../../libs/api';
import { produce } from 'immer';

const useRoadmapEditor = () => {
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
      const newTemplateNames = produce(templateNames, (draft: any[]) => {
        draft.push({
          temaplteId: res.data.data.templateId,
          title: res.data.data.title,
        });
      });
      setTemplateNames(newTemplateNames);
      const newRoadmap = produce(roadmap, (draft) => {
        draft.steps[stepIndex].templateIdList.push(res.data.data.templateId);
      });
      setRoadmap(newRoadmap);
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

  return {
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
  };
};

export default useRoadmapEditor;
