import { HiViewGrid } from 'react-icons/hi';
import { ImList2 } from 'react-icons/im';

interface ListStyleSelectProps {
  isActive?: boolean;
  type: 'grid' | 'list';
  setListStyle: (listStyle: 'list' | 'grid') => void;
}

const ListStyleSelect = ({
  isActive,
  type,
  setListStyle,
}: ListStyleSelectProps) => {
  return (
    <button
      className={`${isActive ? ' text-blue1' : ' text-gray6'}`}
      onClick={() => setListStyle(type)}
    >
      {type === 'grid' ? (
        <i className="text-3xl">
          <HiViewGrid />
        </i>
      ) : (
        <i className="text-[1.25rem]">
          <ImList2 />
        </i>
      )}
    </button>
  );
};

export default ListStyleSelect;
