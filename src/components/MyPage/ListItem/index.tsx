import ListItemType from './ListItemType';
import ListItemName from './ListItemName';
import ListItemBadge from './ListItemBadge';

interface ListItemProps {
  type: '로드맵' | '템플릿';
  name: string;
  category: string;
  styleMode?: 'grid' | 'list';
}

const ListItem = ({
  type,
  name,
  category,
  styleMode = 'list',
}: ListItemProps) => {
  const containerStyle = 'cursor-pointer rounded-2xl bg-blue5 px-6';

  if (styleMode === 'grid') {
    return (
      <div
        className={`${containerStyle} flex flex-col items-center justify-center py-6`}
      >
        <div className="flex w-full justify-between">
          <ListItem.Type type={type} />
          <ListItem.Badge category={category} />
        </div>
        <div className="mt-5 w-full text-left">
          <ListItemName name={name} />
        </div>
      </div>
    );
  }

  return (
    <div className={`${containerStyle} flex items-center justify-between py-4`}>
      <ListItem.Type type={type} />
      <ListItemName name={name} />
      <ListItem.Badge category={category} />
    </div>
  );
};

ListItem.Type = ListItemType;
ListItem.Name = ListItemName;
ListItem.Badge = ListItemBadge;

export default ListItem;
