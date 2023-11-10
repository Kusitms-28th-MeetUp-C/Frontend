import MoreTemplate from '../components/SearchDetail/MoreTemplate';
import Info from '../components/SearchDetail/Info';
import Agenda from '../components/SearchDetail/Agenda';
import LinkedRoadmap from '../components/SearchDetail/LinkedRoadmap';
import Maker from '../components/SearchDetail/Maker';
import { useState } from 'react';
import Modal from '../components/Modal/Modal';
import { useNavigate } from 'react-router-dom';

const TemplateDetail = () => {
  const navigate = useNavigate();
  const [isOpenAlertModal, setIsOpenAlertModal] = useState(false);

  const onSubmitAlertModal = () => {
    setIsOpenAlertModal(false);
    navigate('/my-items');
  };

  return (
    <div className="w-[1300px] px-10 py-9">
      <div className="mb-5 text-[15px] font-medium text-black">
        회의록 {'>'} IT사이드프로젝트
      </div>

      <div className="mb-11 flex items-center justify-between">
        <div className="text-[28px] font-extrabold text-black">
          웹 서비스 기획-개발-디자인 온보딩 템플릿
        </div>
        <button
          className="bg-blue1 rounded-[15px] px-12 py-3 text-xl font-semibold text-white"
          onClick={() => setIsOpenAlertModal(true)}
        >
          템플릿 사용하기
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
      {isOpenAlertModal && (
        <Modal
          title="템플릿을 저장했어요!"
          cancel="계속 둘러보기"
          submit="사용하러 가기"
          setIsOpen={setIsOpenAlertModal}
          onSubmit={onSubmitAlertModal}
        />
      )}
    </div>
  );
};

export default TemplateDetail;
