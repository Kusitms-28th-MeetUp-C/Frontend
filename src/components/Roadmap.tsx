interface Data {
  num: number;
  title: string;
  contents: string[];
}

interface RoadmapProps {
  data: Data[];
  className?: string;
}

const Roadmap = ({ data, className }: RoadmapProps) => {
  return (
    <div className={`flex${className ? ` ${className}` : ''}`}>
      <div className="flex w-full flex-col">
        <div className="flex justify-evenly">
          {data.map((el, idx) => (
            <div
              key={el.num}
              className="relative flex w-[14%] flex-col items-center"
            >
              <div className="mb-[14px] flex h-7 w-7 items-center justify-center rounded-full bg-[#5257D6] text-base font-bold text-white">
                {el.num}
              </div>
              <div className="mb-8 text-center text-base font-semibold text-black">
                {el.title}
              </div>
              {el.contents.map((ele) => (
                <div
                  key={ele}
                  className="mb-3 flex w-full items-center justify-center rounded-full bg-gray7 py-1 text-[14px] font-semibold text-gray3"
                >
                  {ele}
                </div>
              ))}
              {idx < data.length - 1 && (
                <div className="absolute left-[70%] top-3 h-[5px] w-[100%] bg-blue3" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Roadmap;
