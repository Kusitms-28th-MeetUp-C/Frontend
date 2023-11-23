import { FaPeopleGroup } from 'react-icons/fa6';
import { BiSolidTimeFive } from 'react-icons/bi';
import { HiTemplate } from 'react-icons/hi';

import { MdNavigateNext } from 'react-icons/md';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';

import { tagColorFilter, typeFilter } from '../../libs/utils/filter';
import styled from 'styled-components';
import { LoginState } from '../../states/LoginState';

interface ListItemsProps {
  data: any[];
  isRoadmap?: boolean;
  isMobile?: boolean;
}

const ListContainer = styled.div`
  @media (min-width: 1400px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  @media (min-width: 1920px) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
`;

const ListItems = ({ data, isRoadmap, isMobile }: ListItemsProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  const [loginState, setLoginState] = useRecoilState(LoginState);

  const onClickList = (id: number) => {
    if (loginState.isLogin) {
      navigate(isRoadmap ? `/roadmap/${id}` : `/template/${id}`);
    } else {
      alert('로그인이 필요한 서비스입니다');
      navigate('/login');
    }
  };

  return (
    <ListContainer
      className={`3xl:grid-cols-4 grid grid-cols-1 ${
        isMobile ? 'mb-6 gap-5' : 'mb-14 gap-9 '
      } lg:grid-cols-2`}
    >
      {data?.map((el) => (
        <button
          key={isRoadmap ? el?.roadmapId : el?.templateId}
          onClick={() =>
            onClickList(isRoadmap ? el?.roadmapId : el?.templateId)
          }
          className={`flex ${
            isMobile ? 'gap-3.5' : 'min-w-[330px] gap-5'
          } flex-col rounded-[20px] bg-white p-[26px]`}
        >
          <div
            className={`flex w-fit items-center gap-1 rounded-full px-3 py-1 ${tagColorFilter(
              'background',
              el?.type?.toLowerCase(),
            )}`}
          >
            <HiTemplate
              className={`${tagColorFilter('icon', el?.type?.toLowerCase())}`}
            />
            <div className="text-xs font-semibold text-gray3">
              {typeFilter(el?.type?.toLowerCase())}
            </div>
          </div>

          <div className="text-base font-bold text-gray2">{el?.title}</div>

          {!isRoadmap && (
            <div className="flex w-fit items-center gap-1">
              <img src="/icons/roadmap.svg" />
              <div className="text-xs font-semibold text-gray3">
                {el?.connectedRoadmap}
              </div>
            </div>
          )}

          <div className="flex w-full items-center justify-between">
            <div
              className={`flex items-center ${
                isMobile ? 'gap-1' : 'gap-[10px]'
              }`}
            >
              <FaPeopleGroup
                className={`${
                  isMobile ? 'text-base' : 'text-xl'
                } text-tagSkyblue1`}
              />
              <div
                className={`${
                  isMobile ? 'mr-1.5 text-[10px]' : 'mr-[10px] text-[14px]'
                } font-semibold text-[#8A929F]`}
              >
                {el?.count}팀 사용 중
              </div>

              {isRoadmap ? (
                <>
                  <img
                    src="/icons/stair.svg"
                    className={`${
                      isMobile ? 'h-2.5 w-2.5' : 'h-5 w-5'
                    } text-tagSkyblue1`}
                  />
                  <div
                    className={`${
                      isMobile ? 'mr-1 text-[10px]' : 'mr-[10px] text-[14px]'
                    } font-semibold text-[#8A929F]`}
                  >
                    {el?.step} steps
                  </div>
                </>
              ) : (
                <>
                  <BiSolidTimeFive
                    className={`${
                      isMobile ? 'text-base' : 'text-xl'
                    } text-tagLightPurple1`}
                  />
                  <div
                    className={`${
                      isMobile ? 'mr-1 text-[10px]' : 'mr-[10px] text-[14px]'
                    } font-semibold text-[#8A929F]`}
                  >
                    {el?.estimatedTime}m
                  </div>
                </>
              )}
            </div>

            <div className="flex cursor-pointer items-center gap-0.5">
              <div
                className={`${
                  isMobile ? 'text-[10px]' : 'mr-[10px] text-[14px]'
                } font-semibold  text-[#8A929F]`}
              >
                자세히보기
              </div>
              <MdNavigateNext style={{ color: '#8A929F' }} />
            </div>
          </div>
        </button>
      ))}
    </ListContainer>
  );
};

export default ListItems;
