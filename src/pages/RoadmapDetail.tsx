import MoreTemplate from '../components/SearchDetail/MoreTemplate';
import Info from '../components/SearchDetail/Info';
import Agenda from '../components/SearchDetail/Agenda';
import LinkedRoadmap from '../components/SearchDetail/LinkedRoadmap';
import Maker from '../components/SearchDetail/Maker';
import Modal from '../components/Modal/Modal';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdExpandMore } from 'react-icons/md';

const RoadmapDetail = () => {
  const navigate = useNavigate();

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

  return (
    <div className="w-full px-10 py-9">
      <div className="mb-5 text-[15px] font-medium text-black">
        회의록 {'>'} IT사이드프로젝트
      </div>

      <div className="mb-11 flex items-center justify-between">
        <div className="text-[28px] font-extrabold text-black">
          웹 서비스 기획-개발-디자인 온보딩 템플릿
        </div>
        <button
          className="bg-blue1 rounded-[15px] px-12 py-3 font-semibold text-white text-xl"
          onClick={() => setIsOpenTeamModal(true)}
        >
          로드맵 사용하기
        </button>
      </div>

      <div className="flex justify-between">
        <Info />
        <div className="w-[49%]">
          <Agenda />
          <MoreTemplate />
        </div>
        <div className="w-[22%]">
          <LinkedRoadmap />
          <Maker />
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
              className={`flex cursor-pointer items-center duration-300 justify-between rounded-[10px] bg-[#ECEBFE] px-7 py-3 ${
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
