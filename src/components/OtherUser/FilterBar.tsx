import FilterItem from '../FilterItem';
import FilterItemContent from './FilterItemContent';

interface FilterBarProps {
  user: any;
  filter: 'template' | 'roadmap';
  setFilter: (filter: 'template' | 'roadmap') => void;
}

const FilterBar = ({ user, filter, setFilter }: FilterBarProps) => {
  return (
    <div className="flex gap-5">
      <FilterItem
        isActive={filter === 'template'}
        onClick={() => setFilter('template')}
      >
        <FilterItemContent
          label="회의록 템플릿 살펴보기"
          count={user.templateNum}
        />
      </FilterItem>
      <FilterItem
        isActive={filter === 'roadmap'}
        onClick={() => setFilter('roadmap')}
      >
        <FilterItemContent
          label="로드맵 템플릿 살펴보기"
          count={user.roadmapNum}
        />
      </FilterItem>
    </div>
  );
};

export default FilterBar;
