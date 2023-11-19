import { HiMiniChatBubbleOvalLeft } from 'react-icons/hi2';

import ScoreItem from './ScoreItem';
import { useEffect, useState } from 'react';
import Axios from '../../libs/api';

const LeftSection = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    Axios.get('/mypage', {
      params: {
        page: 0,
      },
    })
      .then((res) => {
        setUser(res.data.data.user);
        console.log('res user', res.data.data.user);
      })
      .catch((err) => {
        console.error(err);
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    console.log('user', user);
  }, [user]);

  if (loading) {
    return <div>loading...</div>;
  }

  if (error) {
    return <div>error!</div>;
  }

  return (
    <section className="w-[400px] space-y-5 rounded-2xl bg-white px-8 py-4 shadow">
      <h1 className="mt-4 text-xl font-bold">내 프로필</h1>
      <div className="flex items-center gap-5">
        <div className="h-20 w-20 overflow-hidden rounded-full bg-zinc-300">
          <img
            src={user.profile}
            alt="프로필 이미지"
            className="w-full object-cover"
          />
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-blue1 px-3 py-1 text-sm font-bold text-white">
              {user.userType}
            </span>
            <span className="text-xl font-medium">{user.name}</span>
          </div>
          <span className="text-gray3">{user.email}</span>
          <button className="flex w-40 justify-center rounded-xl bg-[#ECEBFE] px-4 py-2 text-blue1">
            <div className="flex items-center gap-1">
              <i>
                <HiMiniChatBubbleOvalLeft />
              </i>
              <span className="font-medium">커피챗 목록</span>
            </div>
          </button>
        </div>
      </div>
      <div className="space-y-2">
        <ScoreItem
          label="회의록 로드맵 가이드"
          count={user.templateNum}
          countLabel="개"
        />
        <ScoreItem
          label="로드맵 템플릿 기여도"
          count={user.roadmapNum}
          countLabel="개"
        />
        <ScoreItem
          label="나의 포인트"
          count={user.point}
          countLabel="점"
          isPoint
        />
      </div>
      <div className="text-center">
        <button className="text-sm text-gray2">프로필 수정</button>
      </div>
    </section>
  );
};

export default LeftSection;
