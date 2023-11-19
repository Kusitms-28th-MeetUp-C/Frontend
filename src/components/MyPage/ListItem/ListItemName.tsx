interface ListItemNameProps {
  name: string;
}

const ListItemName = ({ name }: ListItemNameProps) => {
  return <span className="font-bold text-gray1">{name}</span>;
};

export default ListItemName;
