interface ScoreCountProps {
  count: number;
  countLabel: string;
}

const ScoreCount = ({ count, countLabel }: ScoreCountProps) => {
  return (
    <span className="text-center leading-normal text-gray-600">
      <b className="font-bold text-blue1">{count}</b>
      <span>{countLabel}</span>
    </span>
  );
};

export default ScoreCount;
