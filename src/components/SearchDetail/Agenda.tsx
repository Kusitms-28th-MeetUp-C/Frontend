import { MdExpandMore } from 'react-icons/md';


const Agenda = () => {
  return (
    <div className="mb-8 flex flex-col gap-5">
      <div className="flex cursor-pointer items-center justify-between rounded-[15px] bg-white px-6 py-4 duration-300">
        <div className="flex items-center gap-6">
          <div className="text-blue1 text-base font-bold">안건 1</div>
          <div className="text-xl font-semibold text-black">자기소개</div>
        </div>
        <MdExpandMore className="text-blue1 h-8 w-8 cursor-pointer duration-300" />
      </div>
      <div className="flex cursor-pointer items-center justify-between rounded-[15px] bg-white px-6 py-4 duration-300">
        <div className="flex items-center gap-6">
          <div className="text-blue1 text-base font-bold">안건 2</div>
          <div className="text-xl font-semibold text-black">자기소개</div>
        </div>
        <MdExpandMore className="text-blue1 h-8 w-8 cursor-pointer duration-300" />
      </div>
      <div className="flex cursor-pointer items-center justify-between rounded-[15px] bg-white px-6 py-4 duration-300">
        <div className="flex items-center gap-6">
          <div className="text-blue1 text-base font-bold">안건 3</div>
          <div className="text-xl font-semibold text-black">자기소개</div>
        </div>
        <MdExpandMore className="text-blue1 h-8 w-8 cursor-pointer duration-300" />
      </div>
      <div className="text-gray4 flex items-center justify-center rounded-[15px] bg-white px-6 py-4 text-base font-semibold duration-300">
        템플릿 사용 시, 안건을 수정할 수 있어요
      </div>
    </div>
  );
};

export default Agenda;