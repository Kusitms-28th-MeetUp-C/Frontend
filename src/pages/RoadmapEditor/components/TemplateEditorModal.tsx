import ReactQuill from 'react-quill';
import Modal from '../../../components/Modal/Modal';
import Input from './Input';

interface TemplateEditorModalProps {
  setIsOpen: any;
  onSubmit: any;
  onCancel: any;
  templateValues: any;
  handleChange: any;
  handleQuillChange: any;
}

const TemplateEditorModal = ({
  setIsOpen,
  onSubmit,
  onCancel,
  templateValues,
  handleChange,
  handleQuillChange,
}: TemplateEditorModalProps) => {
  return (
    <Modal
      title="템플릿 추가"
      submit="작성 완료"
      cancel="취소"
      setIsOpen={setIsOpen}
      onSubmit={onSubmit}
      onCancel={onCancel}
      className="mx-5 w-full max-w-[700px] overflow-hidden"
      disabledOnClick={true}
    >
      <div className="flex w-full flex-col gap-3">
        <Input
          placeholder="제목을 입력하세요"
          value={templateValues.title}
          onChange={(e: any) => handleChange('title')(e.target.value)}
        />
        <ReactQuill
          placeholder="작성하고 싶은 템플릿 형식을 입력해주세요."
          onChange={(value) => handleQuillChange(value)}
        />
        <textarea
          placeholder="소개글을 입력하세요"
          value={templateValues.introduction}
          onChange={(e) => handleChange('introduction')(e.target.value)}
          className="mt-4 rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
          rows={10}
        />
      </div>
    </Modal>
  );
};

export default TemplateEditorModal;
