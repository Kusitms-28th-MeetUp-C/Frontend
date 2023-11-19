import LeftSection from '../components/MyPage/LeftSection';
import RightSection from '../components/MyPage/RightSection';

const MyPage = () => {
  return (
    <div className="flex items-start gap-7 px-7 py-7">
      <LeftSection />
      <RightSection />
    </div>
  );
};

export default MyPage;
