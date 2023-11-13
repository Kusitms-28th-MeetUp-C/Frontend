import MoreItems from '../components/searchDetail/MoreItems';
import Info from '../components/searchDetail/Info';
import Agenda from '../components/searchDetail/Agenda';
import LinkedRoadmap from '../components/searchDetail/LinkedRoadmap';
import Maker from '../components/searchDetail/Maker';
import Modal from '../components/modal/Modal';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { MdExpandMore } from 'react-icons/md';
import UseBtn from '../components/searchDetail/UseBtn';
import Axios from '../assets/api';
import { UserData, RoadmapMainData } from '../interfaces/TemplateDetail';
import Process from '../components/searchDetail/Process';

const RoadmapDetail = () => {
  const navigate = useNavigate();
  const { roadmapId } = useParams();
  const [mainData, setMainData] = useState<RoadmapMainData | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);

  const fetchData = async () => {
    await Axios.get('roadmap/detail', {
      params: {
        roadmapId,
      },
    })
      .then((res) => {
        console.log(res.data.data);
        const response = res.data.data;
        setMainData({ ...response });
        setUserData({ ...response.user });
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const teamData = [
    '조직행위론 c팀',
    'IT 해커톤 8조',
    '연합동아리 큐시즘',
    '비밀프로젝트 a팀',
  ];

  const [isOpenTeamModal, setIsOpenTeamModal] = useState(false);
  const [isOpenAlertModal, setIsOpenAlertModal] = useState(false);
  const [isOpenCmbBox, setIsOpenCmbBox] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState('선택');

  const onSubmitTeamModal = () => {
    setIsOpenTeamModal(false);
    setIsOpenAlertModal(true);
  };

  const onSubmitAlertModal = () => {
    setIsOpenAlertModal(false);
    navigate('/my-items');
  };

  const onClickUseBtn = () => {
    setIsOpenTeamModal(true);
  };

  return (
    <div className="w-full px-10 py-9">
      <div className="mb-5 text-[15px] font-medium text-black">
        회의록 {'>'} {mainData?.roadmapType}
      </div>

      <div className="mb-11 text-[28px] font-extrabold text-black">
        기획-디자인-개발 프로젝트 로드맵
      </div>

      <div className="flex justify-between">
        <div className="flex w-[74.5%] flex-col gap-7">
          <Process />
          <div className="flex justify-between">
            <div className="w-[29.53%]">
              <Info isRoadmap />
            </div>
            <div className="w-[65.77%]">
              <MoreItems isRoadmap />
            </div>
          </div>
        </div>
        <div className="w-[22%]">
          <UseBtn onClickBtn={onClickUseBtn}>로드맵 사용하기</UseBtn>
          <Maker data={userData} />
        </div>
      </div>
      {isOpenTeamModal && (
        <Modal
          title="사용할 팀을 골라주세요"
          cancel="닫기"
          submit="적용하기"
          setIsOpen={setIsOpenTeamModal}
          onSubmit={onSubmitTeamModal}
        >
          <div className="relative w-full">
            <div
              className={`flex cursor-pointer items-center justify-between rounded-[10px] bg-[#ECEBFE] px-7 py-3 duration-300 ${
                isOpenCmbBox ? 'bg-blue4' : ''
              }`}
              onClick={() => setIsOpenCmbBox((prev) => !prev)}
            >
              <div className="text-gray2 text-base font-bold">
                {selectedTeam}
              </div>
              <MdExpandMore className="text-blue1 h-8 w-8" />
            </div>
            {isOpenCmbBox && (
              <div className="bg-blue5 absolute flex w-full flex-col rounded-[10px]">
                {teamData.map((el, idx) => (
                  <div
                    className="text-gray2 hover:bg-blue4 cursor-pointer overflow-hidden px-7 py-3 text-base font-medium duration-300 hover:rounded-[10px]"
                    key={idx}
                    onClick={() => {
                      setSelectedTeam(el);
                      setIsOpenCmbBox((prev) => !prev);
                    }}
                  >
                    {el}
                  </div>
                ))}
              </div>
            )}
          </div>
        </Modal>
      )}
      {isOpenAlertModal && (
        <Modal
          title="로드맵을 저장했어요!"
          cancel="계속 둘러보기"
          submit="사용하러 가기"
          setIsOpen={setIsOpenAlertModal}
          onSubmit={onSubmitAlertModal}
        />
      )}
    </div>
  );
};

export default RoadmapDetail;
