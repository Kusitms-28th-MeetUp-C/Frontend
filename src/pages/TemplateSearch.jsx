import { useEffect, useState, useRef } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import * as StompJs from '@stomp/stompjs';

import Alert from '../components/Modal/Alert';
import Search from '../components/Search/Search';
import Axios from '../libs/api';
import Title from '../components/Common/Title';
import { useRecoilState } from 'recoil';
import { LoginState } from '../states/LoginState';
import { tagColorFilter, typeFilter } from '../libs/utils/filter';
import GrayDropDown from '../components/Common/DropDown/GrayDropDown';
import Modal from '../components/Modal/Modal';
import ModalDropDown from '../components/Common/DropDown/ModalDropDown';
import { useNavigate } from 'react-router-dom';

const TemplateSearch = () => {
  // =======================Socket=======================
  const client = useRef({});
  const myToken = localStorage.getItem('access-token');
  const [loginState, setLoginState] = useRecoilState(LoginState);
  const [templateList, setTemplateList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isNothing, setIsNothing] = useState(false);

  const headers = {
    Authorization: `Bearer ${myToken}`,
    sessionId: loginState.sessionId,
  };

  const connect = () => {
    client.current = new StompJs.Client({
      brokerURL: 'wss://panpeun.shop/ws',
      connectHeaders: {
        Authorization: `Bearer ${myToken}`,
        sessionId: loginState.sessionId,
        transports: ['websocket', 'xhr-streaming', 'xhr-polling'],
      },

      onConnect: () => {
        console.log('template-search success');
        subscribe();
        publish('');
      },
    });

    client.current.activate();
  };

  const publish = (searchText) => {
    if (!client.current.connected) {
      console.log('publish 통신 실패');
      return;
    } else {
      console.log('publish 통신 성공');
    }

    client.current.publish({
      headers,
      destination: `/pub/search`,
      body: JSON.stringify({
        searchText,
      }),
    });
  };

  const subscribe = () => {
    console.log('subscribe 실행');

    client.current.subscribe(
      `/sub/search/${loginState.sessionId}`,
      (body) => {
        const response = JSON.parse(body.body);
        console.log(response);
        setTemplateList([...response.data.searchResult]);
        setIsLoading(false);
        if (response.data.searchResult.length === 0) setIsNothing(true);
      },
      headers,
    );
  };

  useEffect(() => {
    connect();
    return () => {
      if (client.current) {
        client.current.deactivate();
      }
    };
  }, []);
  //======================================================

  const navigate = useNavigate();

  const [search, setSearch] = useState('');
  const [templateData, setTemplateData] = useState({});
  const [isClickDetail, setIsClickDetail] = useState(false);
  const [isOpenError, setIsOpenError] = useState(false);
  const [isOpenComplete, setIsOpenComplete] = useState(false);

  const [teamList, setTeamList] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState({ id: 0, title: '팀 선택' });

  const [templateId, setTempalteId] = useState(0);
  const [selectedRoadmap, setSelectedRoadmap] = useState('');
  const [stepList, setStepList] = useState([]);
  const [selectedStep, setSelectedStep] = useState({
    id: 0,
    title: '스텝 선택',
  });

  const [isOpenAllotModal, setIsOpenAllotModal] = useState(false);

  const onClickAllot = async () => {
    await Axios.post('/manage/template/team', {
      stepId: selectedStep.id,
      templateId,
      teamTitle: selectedTeam.title,
    })
      .then((res) => {
        console.log(res);
        setIsOpenAllotModal(false);
        setIsOpenComplete(true);
      })
      .catch((err) => console.error(err));
  };

  const onChangeSearch = (value) => {
    publish(value);
  };

  const fetchTeamList = async () => {
    await Axios.get(`/team/list`)
      .then((res) => {
        console.log(res);
        setTeamList([
          ...res.data.data.teamList.map((el, idx) => ({
            id: el.teamId,
            title: el.title,
          })),
        ]);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const onClickList = async (templateId) => {
    setIsClickDetail(true);
    setTempalteId(templateId);

    await Axios.get(`/manage/template/${templateId}`)
      .then((res) => {
        console.log(res);
        setTemplateData({ ...res.data.data });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const onClickOption = async () => {
    await Axios.get('/manage/roadmap', {
      params: {
        teamId: selectedTeam.id,
      },
    })
      .then((res) => {
        console.log(res);
        setSelectedRoadmap(res.data.data.title);
        setStepList([
          ...res.data.data.stepList.map((el, idx) => ({
            id: el.stepId,
            title: `${idx + 1}. ${el.title}`,
          })),
        ]);
        setIsOpenAllotModal((prev) => !prev);
      })
      .catch((err) => {
        console.error(err);
        if (err.response.status === 404) {
          setIsOpenError(true);
        }
      });
  };

  useEffect(() => {
    fetchTeamList();
  }, []);

  return (
    <div className="flex w-full min-w-[1000px] flex-col px-12 py-[45px]">
      <Title>회의록 관리</Title>

      {/* 검색 창 */}
      <div className="mb-7 mt-6">
        <Search title={search} setTitle={setSearch} onChange={onChangeSearch} />
      </div>

      {isLoading ? (
        <div className="flex flex-1 flex-col h-full items-center justify-center gap-[10px]">
          <img src="/icons/loading.svg" className="h-[50px] w-[50px]" />
          <div className="text-2xl font-semibold text-black">Loading...</div>
        </div>
      ) : isNothing ? (
        <div className="flex flex-1 h-full items-center justify-center">
          <div className="text-2xl font-semibold text-gray1">
            진행중인 채팅이 없어요
          </div>
        </div>
      ) : (
        <div className="flex w-full flex-1 justify-between">
          {/* 왼쪽 영역 */}
          <div className="w-[48%]">
            {/* 템플릿 리스트 */}
            <div className="flex flex-col items-center gap-6">
              {templateList?.map((el, idx) => (
                <div
                  key={el.templateId}
                  className={`flex w-full cursor-pointer items-center justify-between rounded-[10px] px-5 py-[14px] ${
                    templateData.templateId === el.templateId
                      ? 'bg-blue2'
                      : 'bg-white'
                  }`}
                  onClick={() => onClickList(el.templateId)}
                >
                  <div
                    className={`rounded-full px-2 py-[2.5px] text-xs font-semibold ${tagColorFilter(
                      'text',
                      el.category,
                    )} ${tagColorFilter('background', el.category)}`}
                  >
                    {typeFilter(el.category)}
                  </div>
                  <div
                    className={`text-sm font-semibold ${
                      templateData.templateId === el.templateId
                        ? 'text-white'
                        : 'text-gray1'
                    }`}
                  >
                    {el.title}
                  </div>
                  <div
                    className={`text-xs font-semibold ${
                      templateData.templateId === el.templateId
                        ? 'text-white'
                        : 'text-gray4'
                    }`}
                  >
                    {el.teamTitle || '미지정'}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 오른쪽 영역 */}
          {isClickDetail && (
            <div className="flex w-[48%] flex-col gap-6 rounded-[30px] bg-white p-8">
              <div className="flex items-center justify-end gap-3">
                <div className="w-[180px]">
                  <GrayDropDown
                    itemList={teamList}
                    selectedItem={selectedTeam}
                    setSelectedItem={setSelectedTeam}
                    // className="bg-[#ECEEF8]"
                  />
                </div>
                <button
                  className="rounded-[10px] bg-tagLightPurple2 px-6 py-2.5 text-xs font-semibold text-blue1"
                  onClick={onClickOption}
                >
                  배정하기
                </button>
              </div>
              <div>{templateData?.content || '내용 없음'}</div>
            </div>
          )}
        </div>
      )}

      {isOpenAllotModal && (
        <Modal
          title="배정할 로드맵의 스텝을 선택해주세요"
          setIsOpen={setIsOpenAllotModal}
          onSubmit={onClickAllot}
          cancel="닫기"
          submit="저장하기"
          selectedRoadmap={selectedRoadmap}
          isTemplateSearch
        >
          <div className="flex w-[400px] flex-col gap-5">
            <ModalDropDown
              itemList={stepList}
              selectedItem={selectedStep}
              setSelectedItem={setSelectedStep}
            />
          </div>
        </Modal>
      )}

      {isOpenError && (
        <Alert
          title="팀에 로드맵이 존재하지 않습니다"
          setIsOpen={setIsOpenError}
          btnTxt="확인"
        />
      )}

      {isOpenComplete && (
        <Modal
          title="배정이 완료되었습니다"
          setIsOpen={setIsOpenComplete}
          onSubmit={() => {
            setIsOpenComplete(false);
            navigate('/meeting');
          }}
          cancel="계속 배정하기"
          submit="로드맵 관리 이동"
        />
      )}
    </div>
  );
};

export default TemplateSearch;
