import MoreItems from '../components/SearchDetail/MoreItems';
import Info from '../components/SearchDetail/Info';
import Agenda from '../components/SearchDetail/Agenda';
import LinkedRoadmap from '../components/SearchDetail/LinkedRoadmap';
import Maker from '../components/SearchDetail/Maker';
import UseBtn from '../components/SearchDetail/UseBtn';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Axios from '../assets/api';
import { UserData, MainData } from '../interfaces/TemplateDetail';
import Modal from '../components/Modal/Modal';
import Title from '../components/Common/Title';
import BackBtn from '../components/SearchDetail/BackBtn';

interface ApiResponse {}

const TemplateDetail = () => {
  const navigate = useNavigate();
  const { templateId } = useParams();
  const [isOpenAlertModal, setIsOpenAlertModal] = useState(false);
  const [mainData, setMainData] = useState<any>({});
  const [infoData, setInfoData] = useState<any>({});
  const [agendaData, setAgendaData] = useState<any>([]);
  const [templateData, setTemplateData] = useState<any>([]);
  const [roadmapData, setRoadmapData] = useState('');
  const [userData, setUserData] = useState<any>({});

  const onSubmitAlertModal = () => {
    setIsOpenAlertModal(false);
    navigate('/my-items');
  };

  const fetchData = async () => {
    await Axios.get('template/detail', {
      params: {
        templateId,
      },
    })
      .then((res) => {
        console.log(res.data.data);
        const response = res.data.data;
        setMainData({ title: response.title });
        setInfoData({ ...response.templateIntro });
        setTemplateData([...response.relatedTemplate]);
        setRoadmapData(response.connectedRoadmap);
        setUserData({ ...response.user });
      })
      .catch((err) => console.error(err));
  };

  const onClickUseBtn = () => {
    setIsOpenAlertModal(true);
  };

  useEffect(() => {
    fetchData();
  }, [templateId]);

  return (
    <div className="w-[1300px] px-10 py-9">
      <BackBtn>전체 템플릿 보기</BackBtn>
      <Title>{mainData.title}</Title>
      <div className="flex justify-between">
        <div className="w-[22%]">
          <Info data={infoData} />
        </div>
        <div className="w-[49%]">
          <Agenda data={agendaData}/>
          <MoreItems data={templateData}/>
        </div>
        <div className="w-[22%]">
          <UseBtn onClickBtn={onClickUseBtn}>템플릿 사용하기</UseBtn>
          <LinkedRoadmap/>
          <Maker data={userData} />
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
