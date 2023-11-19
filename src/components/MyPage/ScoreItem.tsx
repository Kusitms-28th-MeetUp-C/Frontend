import { IoIosArrowForward } from 'react-icons/io';

import ScoreName from './ScoreName';
import ScoreCount from './ScoreCount';

interface ScoreItemProps {
  label: string;
  count: number;
  countLabel: string;
  isPoint?: boolean;
}

const ScoreItem = ({ label, count, countLabel, isPoint }: ScoreItemProps) => {
  return (
    <div className="flex items-center justify-between">
      {isPoint ? (
        <>
          <span className="flex cursor-pointer items-center">
            <div className="mr-2 flex h-6 w-6 items-center justify-center rounded-full border-[0.1px] border-black">
              P
            </div>
            <ScoreName>{label}</ScoreName>
            <i className="text-xl">
              <IoIosArrowForward />
            </i>
          </span>
          <ScoreCount count={count} countLabel={countLabel} />
        </>
      ) : (
        <>
          <ScoreName>{label}</ScoreName>
          <ScoreCount count={count} countLabel={countLabel} />
        </>
      )}
    </div>
  );
};

export default ScoreItem;
