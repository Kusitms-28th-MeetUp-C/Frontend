import Markdown from 'react-markdown';

interface AgendaProps {
  data: string;
  isMobile?: boolean;
}

const Agenda = ({ data, isMobile }: AgendaProps) => {
  return (
    <div
      className={`${
        isMobile ? 'mb-4 p-6' : 'mb-8 px-8 py-9'
      } flex flex-col gap-8 rounded-[20px] bg-white `}
    >
      <Markdown className="markdown-body">{data}</Markdown>
      <div
        className={`text-center ${
          isMobile ? 'text-[10px]' : 'text-xs'
        } font-medium text-gray4`}
      >
        템플릿 사용 시, 안건을 수정할 수 있어요
      </div>
    </div>
  );
};

export default Agenda;
