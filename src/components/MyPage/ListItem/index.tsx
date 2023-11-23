import ListItemType from './ListItemType';
import ListItemName from './ListItemName';
import ListItemBadge from './ListItemBadge';
import { useNavigate } from 'react-router-dom';

interface ListItemProps {
  styleMode?: 'grid' | 'list';
  content: any;
}

const ListItem = ({ content, styleMode = 'list' }: ListItemProps) => {
  const navigate = useNavigate();
  const containerStyle = 'cursor-pointer rounded-2xl bg-blue5 px-6';
  const onClickList = () => {
    if (content.sharedType === '템플릿') navigate(`/template/${content.id}`);
    if (content.sharedType === '로드맵') navigate(`/roadmap/${content.id}`);
  };

  if (styleMode === 'grid') {
    return (
      <div
        className={`${containerStyle} flex flex-col items-center justify-center py-6`}
        onClick={onClickList}
      >
        <div className="flex w-full justify-between">
          <ListItem.Type type={content?.type} />
          <ListItem.Badge category={content?.contentType.toLowerCase()} />
        </div>
        <div className="mt-5 w-full text-left">
          <ListItemName name={content?.name} />
        </div>
      </div>
    );
  }

  return (
    <div
      className={`${containerStyle} flex items-center justify-between py-4`}
      onClick={onClickList}
    >
      <ListItem.Type type={content?.sharedType} />
      <ListItemName name={content?.title} />
      <ListItem.Badge category={content?.contentType.toLowerCase()} />
    </div>
  );
};

ListItem.Type = ListItemType;
ListItem.Name = ListItemName;
ListItem.Badge = ListItemBadge;

export default ListItem;
