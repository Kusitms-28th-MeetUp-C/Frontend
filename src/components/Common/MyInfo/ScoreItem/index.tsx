import { IoIosArrowForward } from 'react-icons/io';

import ScoreName from './ScoreName';
import ScoreCount from './ScoreCount';

interface ScoreItemProps {
  label: string;
  count: number;
  countLabel: string;
  isPoint?: boolean;
  className?: string;
}

const ScoreItem = ({
  label,
  count,
  countLabel,
  isPoint,
  className,
}: ScoreItemProps) => {
  return (
    <div
      className={`flex items-center justify-between${
        className ? ` ${className}` : ''
      }`}
    >
      {isPoint ? (
        <>
          <span className="flex cursor-pointer items-center">
            <img src="/icons/point-coin.svg" alt="포인트" className="mr-1" />
            <ScoreItem.Name>{label}</ScoreItem.Name>
            <i className="text-xl">
              <IoIosArrowForward />
            </i>
          </span>
          <ScoreItem.Count count={count} countLabel={countLabel} />
        </>
      ) : (
        <>
          <ScoreItem.Name>{label}</ScoreItem.Name>
          <ScoreItem.Count count={count} countLabel={countLabel} />
        </>
      )}
    </div>
  );
};

ScoreItem.Name = ScoreName;
ScoreItem.Count = ScoreCount;

export default ScoreItem;
