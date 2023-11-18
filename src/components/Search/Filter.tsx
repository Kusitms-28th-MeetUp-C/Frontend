import { useNavigate } from 'react-router-dom';
import { typeFilter } from '../../libs/utils/filter';

interface FilterProps {
  type: string;
  setType: React.Dispatch<React.SetStateAction<string>>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

const Filter = ({ type, setType, setPage }: FilterProps) => {
  const filterList = [
    'all',
    'it',
    'team',
    'club',
    'pt',
    'marketing',
    'survey_data_analysis',
    'corporate_analysis',
    'design',
    'video',
  ];

  return (
    <div className="mb-[22px] flex flex-wrap gap-3">
      {filterList.map((el, idx) => (
        <div
          key={el}
          id={el}
          className={`cursor-pointer rounded-full px-4  py-1.5 text-[14px] duration-300 ${
            el === type
              ? 'bg-[#5257D6] font-bold text-white'
              : 'bg-white font-medium text-[#8A929F] hover:bg-[#5257D6] hover:text-white hover:opacity-70'
          }`}
          onClick={() => {
            setType(el);
            setPage(0);
          }}
        >
          {typeFilter(el)}
        </div>
      ))}
    </div>
  );
};

export default Filter;
