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

interface AgendaItem {
  agendaNum: string;
  agenda: string;
  content: string;
}

interface TemplateContentResponseDtoList {
  [key: string]: AgendaItem[];
}

interface TemplateContentListResponseDto {
  introduction: string;
  templateContentResponseDtoList: TemplateContentResponseDtoList;
}

interface ConnectedRoadmap {
  title: string;
}

interface RelatedTemplate {
  templateList: Template[];
}

interface Review {
  content: string;
}

interface RatingAndReviews {
  ratingAverage: number;
  reviews: Review[];
}

interface Template {
  templateId: number;
  templateType: string;
  title: string;
  estimatedTime: number;
  connectedRoadmap: ConnectedRoadmap[];
  date: string;
  templateContentListResponseDto: TemplateContentListResponseDto;
  relatedTemplate: RelatedTemplate;
  ratingAndReviews: RatingAndReviews;
  teamCount: number;
}

interface ApiResponse {
  templateId: number;
  estimatedTime: number;
  connectedRoadmap: ConnectedRoadmap[];
  date: string;
  templateContentListResponseDto: TemplateContentListResponseDto;
  relatedTemplate: RelatedTemplate;
  ratingAndReviews: RatingAndReviews;
  teamCount: number;
}

const TemplateDetail = () => {
  const navigate = useNavigate();
  const { templateId } = useParams();
  const [isOpenAlertModal, setIsOpenAlertModal] = useState(false);
  const [mainData, setMainData] = useState<MainData | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);

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
        setMainData({ ...response });
        setUserData({ ...response.user });
      })
      .catch((err) => console.error(err));
  };

  const onClickUseBtn = () => {
    setIsOpenAlertModal(true);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="w-[1300px] px-10 py-9">
      <div
        className="mb-5 text-[15px] font-medium text-black"
        onClick={() => console.log(userData)}
      >
        회의록 {'>'} {mainData?.templateType}
      </div>

      <div className="mb-11 flex w-[74.5%] items-center justify-between">
        <div className="text-[28px] font-extrabold text-black">
          {mainData?.title}
        </div>
      </div>

      <div className="flex justify-between">
        <div className="w-[22%]">
          <Info />
        </div>
        <div className="w-[49%]">
          <Agenda />
          <MoreItems />
        </div>
        <div className="w-[22%]">
          <UseBtn onClickBtn={onClickUseBtn}>템플릿 사용하기</UseBtn>
          <LinkedRoadmap />
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
