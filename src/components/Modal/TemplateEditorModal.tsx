import ReactQuill from 'react-quill';
import Modal from './Modal';
import styled from 'styled-components';

interface TemplateEditorModalProps {
  setIsOpen: any;
  onCancel: () => void;
  templateValues?: any;
  setTemplateValues?: any;
  onSubmit: () => void;
  title: string;
  submitText: string;
  cancelText: string;
  content: string;
  setContent: any;
  mode?: 'create' | 'edit';
}

const ModalBlock = styled(Modal)`
  margin-top: 1.25rem;
  width: 100%;
  max-width: 700px;
  overflow: y-scroll;
`;

const Form = styled.form`
  width: 100%;
  height: 400px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const Input = styled.input`
  border-radius: 0.375rem;
  border: 1px solid #cccccc;
  padding: 0.5rem;

  &:focus {
    outline: none;
  }
`;

const ContentEditor = styled(ReactQuill)`
  flex: 1;
  overflow: hidden;
  border-bottom: 1.5px solid #cccccc;
`;

const TextArea = styled.textarea`
  resize: none;
  border-radius: 0.375rem;
  border: 1px solid #cccccc;
  padding: 0.5rem;

  &:focus {
    outline: none;
  }
`;

const TemplateEditorModal = ({
  setIsOpen,
  onCancel,
  templateValues,
  setTemplateValues,
  onSubmit,
  title,
  submitText,
  cancelText,
  content,
  setContent,
  mode = 'create',
}: TemplateEditorModalProps) => {
  return (
    <ModalBlock
      isCreate={true}
      title={title}
      submit={submitText}
      cancel={cancelText}
      setIsOpen={setIsOpen}
      onSubmit={(e: any) => {
        e.preventDefault();
        onSubmit();
      }}
      onCancel={onCancel}
      disabledOnClick={true}
    >
      <Form>
        {mode === 'create' && templateValues && setTemplateValues && (
          <Input
            type="text"
            placeholder="제목을 입력하세요"
            value={templateValues.title}
            onChange={(e: any) =>
              setTemplateValues({ ...templateValues, title: e.target.value })
            }
          />
        )}
        <ContentEditor
          placeholder="작성하고 싶은 템플릿 형식을 입력해주세요."
          value={content}
          onChange={(value) => setContent(value)}
        />
        {mode === 'create' && templateValues && setTemplateValues && (
          <TextArea
            placeholder="소개글을 입력하세요"
            value={templateValues.introduction}
            onChange={(e) =>
              setTemplateValues({
                ...templateValues,
                introduction: e.target.value,
              })
            }
            rows={3}
          />
        )}
      </Form>
    </ModalBlock>
  );
};

export default TemplateEditorModal;
