import { Link } from 'react-router-dom';

interface SectionHeadingProps {
  title: string;
  subtitle: string;
  type?: string;
  onEdit?: () => void;
}

const SectionHeading = ({
  title,
  subtitle,
  type,
  onEdit,
}: SectionHeadingProps) => {
  return (
    <section className="mt-6 rounded-2xl bg-white px-6 py-4">
      <div className="flex justify-between">
        <div className="flex items-center gap-4">
          <img src="/icons/circle-chart.svg" alt="원형 차트" />
          <span className="text-xl font-bold">{title}</span>
          <span className="text-neutral-400">{subtitle}</span>
        </div>
        {type === 'list' ? (
          <Link
            to="/meeting/1"
            className="rounded-full bg-indigo-600 px-5 py-2 font-bold text-white"
          >
            스페이스 바로가기
          </Link>
        ) : (
          <button onClick={onEdit}>
            <img src="/icons/edit-icon.svg" alt="수정 버튼" />
          </button>
        )}
      </div>
      {type === 'detail' && (
        <div className="mt-4 flex justify-between rounded-md bg-[#E0E1FC] px-4 py-2">
          <span className="font-semibold">프로젝트 목표 : A+</span>
          <span>23.10.01 - 12.01</span>
        </div>
      )}
    </section>
  );
};

export default SectionHeading;
