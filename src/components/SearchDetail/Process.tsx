const Process = () => {
  const data = [
    {
      num: '1',
      title: '디자인 스프린트',
      contents: ['온보딩', '아이디어 발제'],
    },
    {
      num: '2',
      title: '아이디어구체화',
      contents: ['아이디어 선정', '데스크 리서치', '기능 기획'],
    },
    { num: '3', title: '서비스 설계', contents: ['플로우 설계', '화면 설계'] },
    {
      num: '4',
      title: '개발',
      contents: ['기-디-개 백로그', '개발 역할 분담'],
    },
    { num: '5', title: '최종 마무리', contents: ['최종점검'] },
  ];
  return (
    <div className="flex w-full flex-col items-center gap-10 rounded-[20px] bg-white px-9 py-9">
      <div className="text-[22px] font-bold text-gray1">
        기획-디자인-개발 프로젝트 로드맵
      </div>
      <div className="flex w-full justify-between">
        {data.map((el, idx) => (
          <div className="relative flex w-[14%] flex-col items-center">
            <div className="mb-[14px] flex h-7 w-7 items-center justify-center rounded-full bg-[#5257D6] text-base font-bold text-white">
              {el.num}
            </div>
            <div className="mb-8 text-center text-base font-semibold text-black">
              {el.title}
            </div>
            {el.contents.map((ele) => (
              <div className="mb-3 flex w-full items-center justify-center rounded-full bg-gray7 py-1 text-[14px] font-semibold text-gray3">
                {ele}
              </div>
            ))}
            {idx < data.length - 1 && (
              <div className="absolute left-[77%] top-3 h-[5px] w-[100%] bg-blue3" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Process;
