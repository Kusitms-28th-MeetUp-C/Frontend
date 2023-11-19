interface ListItemTypeProps {
  type: string;
}

const ListItemType = ({ type }: ListItemTypeProps) => {
  return <span className="font-medium text-gray3">{type}</span>;
};

export default ListItemType;
