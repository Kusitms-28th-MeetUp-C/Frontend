import { ImQuotesLeft } from 'react-icons/im';

interface ArticleTextProps {
  children: React.ReactNode;
}

interface ArticleItemProps {
  size: string;
  src: string;
  title: string;
  writer: string;
}

const ArticleTitle = ({ children }: ArticleTextProps) => {
  return (
    <div className="mb-1 mt-4 text-[20px] font-bold text-gray1">{children}</div>
  );
};

const ArticleWriter = ({ children }: ArticleTextProps) => {
  return <div className="text-base font-medium text-gray3">{children}</div>;
};

const ArticleItem = ({ size, src, title, writer }: ArticleItemProps) => {
  return (
    <div className="cursor-pointer">
      <div
        className={`flex items-center justify-center overflow-hidden rounded-[20px] shadow-lg ${
          size === 's' ? 'h-[240px]' : 'h-[440px]'
        }`}
      >
        <img src={src} className="h-full w-full object-cover" />
      </div>
      <ArticleTitle>{title}</ArticleTitle>
      <ArticleWriter>{writer}</ArticleWriter>
    </div>
  );
};

const Article = () => {
  const data = [
    [
      {
        size: 's',
        src: '/images/article1.svg',
        title: '밋플이 회의에 진심인 이유',
        writer: '신민선',
      },
      {
        size: 'l',
        src: '/images/article1.svg',
        title: 'One Team으로 한가지에 몰두하...',
        writer: '작성자',
      },
      {
        size: 's',
        src: '/images/article2.svg',
        title: '밋플의 회의 템플릿 비밀 공개',
        writer: '작성자',
      },
      {
        size: 'l',
        src: '/images/article1.svg',
        title: '밋플 이용 후 제일 크게 바뀌는 점은..',
        writer: '작성자',
      },
    ],
    [
      {
        size: 'l',
        src: '/images/article1.svg',
        title: '밋플 PM 인터뷰',
        writer: '김지호',
      },
      {
        size: 's',
        src: '/images/article1.svg',
        title: 'One Team으로 한가지에 몰두하...',
        writer: '작성자',
      },
      {
        size: 'l',
        src: '/images/article4.svg',
        title: '밋플 기획, 디자인, 개발 이렇게 협...',
        writer: '작성자',
      },
      {
        size: 's',
        src: '/images/article6.svg',
        title: '밋플 프로덕트 팀이 되는 여정',
        writer: '작성자',
      },
    ],
    [
      {
        size: 's',
        src: '/images/article1.svg',
        title: '밋플의 비전공자 개발자 이야기',
        writer: '신민선',
      },
      {
        size: 'l',
        src: '/images/article9.jfif',
        title: '밋플이 꿈꾸는 미래',
        writer: '작성자',
      },
      {
        size: 's',
        src: '/images/article10.jfif',
        title: '밋플 기획팀 10문 10답',
        writer: '작성자',
      },
      {
        size: 'l',
        src: '/images/article9.jfif',
        title: '밋플 프로젝트 2개월간의 이야기',
        writer: '정예진',
      },
    ],
  ];

  return (
    <div className="m-auto w-[90%] max-w-[1000px] py-[72px]">
      <ImQuotesLeft className="text-[40px] text-tagLightPurple1" />
      <div className="mb-20 text-[64px] font-bold text-gray2">article</div>
      <div className="mb-10 text-2xl font-bold text-black">
        밋플 아티클 모아보기
      </div>
      <div className="flex justify-between">
        {data.map((el, idx) => (
          <div key={idx} className="flex w-[30%] flex-col gap-5">
            {el.map((el, idx) => (
              <ArticleItem
                key={idx}
                size={el.size}
                src={el.src}
                title={el.title}
                writer={el.writer}
              />
            ))}
          </div>
        ))}
      </div>
      <button className="m-auto mt-10 block rounded-[20px] bg-gray7 px-20 py-4 text-2xl font-extrabold text-gray2">
        아티클 더보기{' '}
      </button>
    </div>
  );
};

export default Article;
