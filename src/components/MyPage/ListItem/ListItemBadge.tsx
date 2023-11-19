import { tagColorFilter, typeFilter } from '../../../libs/utils/filter';

interface ListItemBadgeProps {
  category: string;
}

const ListItemBadge = ({ category }: ListItemBadgeProps) => {
  return (
    <span
      className={`block rounded-full px-3 py-[3px] text-sm font-medium ${tagColorFilter(
        'text',
        category,
      )} ${tagColorFilter('background', category)}`}
    >
      {typeFilter(category)}
    </span>
  );
};

export default ListItemBadge;
