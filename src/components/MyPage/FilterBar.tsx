import FilterItem from '../FilterItem';
import ListStyleSelect from './ListStyleSelect';

interface FilterBarProps {
  listStyle: 'list' | 'grid';
  setListStyle: (listStyle: 'list' | 'grid') => void;
  listType: 'all' | 'roadmap' | 'template';
  setListType: (listType: 'all' | 'roadmap' | 'template') => void;
  className?: string;
}

const FilterBar = ({
  listStyle,
  setListStyle,
  listType,
  setListType,
  className,
}: FilterBarProps) => {
  return (
    <div className="flex items-center justify-between">
      <div className={`flex gap-3${className ? ` ${className}` : ''}`}>
        <FilterItem
          defaultBgColor="gray"
          isActive={listType === 'all'}
          onClick={() => setListType('all')}
        >
          전체 보기
        </FilterItem>
        <FilterItem
          defaultBgColor="gray"
          isActive={listType === 'template'}
          onClick={() => setListType('template')}
        >
          템플릿
        </FilterItem>
        <FilterItem
          defaultBgColor="gray"
          isActive={listType === 'roadmap'}
          onClick={() => setListType('roadmap')}
        >
          로드맵
        </FilterItem>
      </div>
      <div className="flex items-center gap-2">
        <ListStyleSelect
          type="grid"
          isActive={listStyle === 'grid'}
          setListStyle={setListStyle}
        />
        <ListStyleSelect
          type="list"
          isActive={listStyle === 'list'}
          setListStyle={setListStyle}
        />
      </div>
    </div>
  );
};

export default FilterBar;
