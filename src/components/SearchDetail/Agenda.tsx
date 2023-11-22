import '../../styles/github-markdown-light.css';


interface AgendaProps {
  data: string;
}

const Agenda = ({ data }: AgendaProps) => {
  return (
    <div className="mb-8 flex flex-col gap-8 rounded-[20px] bg-white px-8 py-9">
      <div
        className="markdown-body"
        dangerouslySetInnerHTML={{ __html: data }}
      ></div>
      <div className="text-center text-xs font-medium text-gray4">
        템플릿 사용 시, 안건을 수정할 수 있어요
      </div>
    </div>
  );
};

export default Agenda;
