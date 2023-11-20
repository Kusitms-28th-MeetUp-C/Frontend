import ReactQuill from 'react-quill';
import Input from './Input';
import Modal from '../Modal/Modal';
import Axios from '../../libs/api';
import TurndownService from 'turndown';
import { produce } from 'immer';

interface TemplateEditorModalProps {
  setIsOpen: any;
  onCancel: () => void;
  templateValues: any;
  setTemplateValues: any;
  roadmap: any;
  roadmapType: string | undefined;
  setRoadmap: any;
  stepIndexClicked: number | null;
  templateNames: any[];
  setTemplateNames: any;
}

const TemplateEditorModal = ({
  setIsOpen,
  onCancel,
  templateValues,
  setTemplateValues,
  roadmap,
  setRoadmap,
  stepIndexClicked,
  templateNames,
  setTemplateNames,
  roadmapType,
}: TemplateEditorModalProps) => {
  const handleModalSubmit = () => {
    const turndownService = new TurndownService();
    Axios({
      method: 'POST',
      url: '/manage/template',
      data: {
        ...templateValues,
        roadmapType,
        templateType: roadmapType,
        content: turndownService.turndown(templateValues.content),
      },
    }).then((res) => {
      setIsOpen(false);
      const newTemplateNames = produce(templateNames, (draft: any[]) => {
        draft.push({
          templateId: res.data.data.templateId,
          title: res.data.data.title,
        });
      });
      setTemplateNames(newTemplateNames);
      const newRoadmap = produce(roadmap, (draft: any) => {
        if (stepIndexClicked === null) return;
        draft.steps[stepIndexClicked].templateIdList.push(
          res.data.data.templateId,
        );
      });
      setRoadmap(newRoadmap);
      setTemplateValues({
        title: '',
        content: '',
        introduction: '',
        templateType: 'it',
        estimatedTime: 30,
      });
    });
  };

  return (
    <Modal
      isCreate={true}
      title="템플릿 추가"
      submit="작성 완료"
      cancel="취소"
      setIsOpen={setIsOpen}
      onSubmit={(e: any) => {
        e.preventDefault();
        handleModalSubmit();
      }}
      onCancel={onCancel}
      className="mx-5 w-full max-w-[700px] overflow-hidden"
      disabledOnClick={true}
    >
      <div className="flex w-full flex-col gap-3">
        <Input
          placeholder="제목을 입력하세요"
          value={templateValues.title}
          onChange={(e: any) =>
            setTemplateValues({ ...templateValues, title: e.target.value })
          }
        />
        <ReactQuill
          placeholder="작성하고 싶은 템플릿 형식을 입력해주세요."
          onChange={(value) =>
            setTemplateValues({ ...templateValues, content: value })
          }
        />
        <textarea
          placeholder="소개글을 입력하세요"
          value={templateValues.introduction}
          onChange={(e) =>
            setTemplateValues({
              ...templateValues,
              introduction: e.target.value,
            })
          }
          className="mt-4 resize-none rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
          rows={10}
        />
      </div>
    </Modal>
  );
};

export default TemplateEditorModal;
