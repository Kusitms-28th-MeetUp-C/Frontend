import { MdExpandMore } from 'react-icons/md';

interface AgendaProps {
  data: any;
}

const Agenda = ({ data }: AgendaProps) => {
  const sampleData = [
    {
      title: '자기소개',
      content:
        '자기소개 : 맡은 파트, 이름, 프로젝트 목표, 가능한 시간 등에 대해서 얘기하는 시간을 갖습니다. 대면으로 진행하는 경우 사는 곳도 공유하면 좋습니다.',
    },
    {
      title: '아이스브레이킹',
      content:
        '자기소개 : 맡은 파트, 이름, 프로젝트 목표, 가능한 시간 등에 대해서 얘기하는 시간을 갖습니다. 대면으로 진행하는 경우 사는 곳도 공유하면 좋습니다.',
    },
    {
      title: '그라운드룰 수집하기',
      content:
        '자기소개 : 맡은 파트, 이름, 프로젝트 목표, 가능한 시간 등에 대해서 얘기하는 시간을 갖습니다. 대면으로 진행하는 경우 사는 곳도 공유하면 좋습니다.',
    },
    {
      title: '타임라인 작성하기',
      content:
        '자기소개 : 맡은 파트, 이름, 프로젝트 목표, 가능한 시간 등에 대해서 얘기하는 시간을 갖습니다. 대면으로 진행하는 경우 사는 곳도 공유하면 좋습니다.',
    },
    {
      title: '역할 분담하기',
      content:
        '자기소개 : 맡은 파트, 이름, 프로젝트 목표, 가능한 시간 등에 대해서 얘기하는 시간을 갖습니다. 대면으로 진행하는 경우 사는 곳도 공유하면 좋습니다.',
    },
    {
      title: '다음 회의 전까지 할일',
      content:
        '자기소개 : 맡은 파트, 이름, 프로젝트 목표, 가능한 시간 등에 대해서 얘기하는 시간을 갖습니다. 대면으로 진행하는 경우 사는 곳도 공유하면 좋습니다.',
    },
  ];

  return (
    <div className="mb-8 flex flex-col items-center gap-8 rounded-[20px] bg-white px-8 py-9">
      {sampleData.map((el, idx) => (
        <div className="flex flex-col gap-[10px] text-gray1" key={idx}>
          <div className="text-base font-semibold">{el.title}</div>
          <div className="text-xs font-medium leading-[18px]">{el.content}</div>
        </div>
      ))}
      <div className="text-center text-xs font-medium text-gray4">
        템플릿 사용 시, 안건을 수정할 수 있어요
      </div>
    </div>
  );
};

export default Agenda;
