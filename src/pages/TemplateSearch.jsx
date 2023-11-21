import { useEffect, useState, useRef } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import * as StompJs from '@stomp/stompjs';

import Search from '../components/Search/Search';
import Axios from '../libs/api';
import Title from '../components/Common/Title';
import { useRecoilState } from 'recoil';
import { LoginState } from '../states/LoginState';
import { tagColorFilter, typeFilter } from '../libs/utils/filter';

const TemplateSearch = () => {
  // =======================Socket=======================
  const client = useRef({});
  const myToken = localStorage.getItem('access-token');
  const [loginState, setLoginState] = useRecoilState(LoginState);
  const [templateList, setTemplateList] = useState([
    {
      templateId: 1,
      title: '템플릿이에요웅',
      teamTitle: '미팅남녀',
      category: 'IT',
      open: false,
    },
    {
      templateId: 2,
      title: 'hi~~hi~~',
      teamTitle: '미팅남녀',
      category: 'PT',
      open: true,
    },
    {
      templateId: 3,
      title: '승훈이 템플릿',
      teamTitle: '미팅남녀',
      category: 'TEAM',
      open: false,
    },
    {
      templateId: 4,
      title: '와웅',
      teamTitle: '미팅남녀',
      category: 'CLUB',
      open: false,
    },
    {
      templateId: 5,
      title: '밋업 언제끝나',
      teamTitle: '미팅남녀',
      category: 'DESIGN',
      open: true,
    },
  ]);
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

  // useEffect(() => {
  //   connect();
  //   return () => {
  //     if (client.current) {
  //       client.current.deactivate();
  //     }
  //   };
  // }, []);
  //======================================================

  const [search, setSearch] = useState('');
  const [templateData, setTemplateData] = useState({});
  const [isClickDetail, setIsClickDetail] = useState(false);

  const onChangeSearch = (value) => {
    publish(value);
  };

  const onClickList = (templateId, isOpened) => {
    setIsClickDetail(true);
    console.log(templateId, isOpened);

    // await Axios.get(`/manage/template/${templateId}`, {
    //   params: {
    //     isOpened,
    //   },
    // })
    //   .then((res) => {
    //     setTemplateData({ ...res.data.data });
    //   })
    //   .catch((err) => {
    //     console.error(err);
    //   });
  };

  return (
    <div className="flex w-full min-w-[1250px] flex-col py-[45px] px-12">
      <Title>회의록 관리</Title>

      {/* 검색 창 */}
      <div className="mb-7 mt-6">
        <Search title={search} setTitle={setSearch} onChange={onChangeSearch} />
      </div>

      <div className="flex w-full flex-1 justify-between">
        {/* 왼쪽 영역 */}
        <div className="w-[48%]">
          {/* 템플릿 리스트 */}
          <div className="flex flex-col items-center gap-6">
            {templateList?.map((el, idx) => (
              <div
                key={el.templateId}
                className="flex w-full cursor-pointer items-center justify-between rounded-[10px] bg-white px-5 py-[14px]"
                onClick={() => onClickList(el.templateId, el.open)}
              >
                <div
                  className={`rounded-full px-2 py-[2.5px] text-xs font-semibold ${tagColorFilter(
                    'text',
                    el.category,
                  )} ${tagColorFilter('background', el.category)}`}
                >
                  {typeFilter(el.category)}
                </div>
                <div className="text-sm font-semibold text-gray1">
                  {el.title}
                </div>
                <div className="text-xs font-semibold text-gray4">
                  {el.teamTitle}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 오른쪽 영역 */}
        {isClickDetail && (
          <div className="flex w-[48%] flex-col gap-6 rounded-[30px] bg-white p-8">
            <div className="flex items-center justify-end gap-3">
              <button className="rounded-[10px] bg-[#ECEEF8] px-2 py-3 text-xs font-semibold text-gray2">
                팀 선택
              </button>
              <button className="rounded-[10px] bg-tagLightPurple2 px-4 py-3 text-xs font-semibold text-blue1">
                배정하기
              </button>
            </div>
            <div>자기소개 컨텐츠컨텐츠컨텐츠컨텐츠컨텐츠컨텐츠컨텐츠</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TemplateSearch;
