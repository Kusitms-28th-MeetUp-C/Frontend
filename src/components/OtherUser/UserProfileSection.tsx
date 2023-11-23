import MyInfo from '../Common/MyInfo';

interface UserProfileSectionProps {
  user: any;
}

const UserProfileSection = ({ user }: UserProfileSectionProps) => {
  return (
    <div className="flex justify-start">
      <div className="flex items-start gap-5 rounded-2xl bg-white px-8 py-8">
        <MyInfo.Avatar imageUrl={user.profile} />
        <div className="flex flex-col gap-2">
          <div className="flex items-start gap-3">
            <div>
              <MyInfo.Name userType={user.userType} name={user.name} />
              <MyInfo.Email email={user.email} />
            </div>
            <MyInfo.ChatButton name={user?.name} sessionId={user?.sessionId} />
          </div>
          <div className="flex gap-10">
            <MyInfo.ScoreItem
              label="공유한 회의록 수"
              count={user.templateNum}
              countLabel="개"
              className="flex-1"
            />
            <MyInfo.ScoreItem
              label="공유한 로드맵 수"
              count={user.roadmapNum}
              countLabel="개"
              className="flex-1"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileSection;
