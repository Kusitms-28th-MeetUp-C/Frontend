import { useEffect, useState } from 'react';
import Axios from '../../libs/api';
import MyInfo from '../Common/MyInfo';

const LeftSection = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await Axios.get('/mypage');
        setUser(res.data.data.user);
        console.log('res user', res.data.data.user);
      } catch (err) {
        console.error(err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
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
        <MyInfo.Avatar imageUrl={user.profile} />
        <div className="flex flex-col gap-1">
          <MyInfo.Name userType={user.userType} name={user.name} />
          <MyInfo.Email email={user.email} />
          <MyInfo.ChatButton />
        </div>
      </div>
      <div className="space-y-2">
        <MyInfo.ScoreItem
          label="회의록 로드맵 가이드"
          count={user.templateNum}
          countLabel="개"
        />
        <MyInfo.ScoreItem
          label="로드맵 템플릿 기여도"
          count={user.roadmapNum}
          countLabel="개"
        />
        <MyInfo.ScoreItem
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
