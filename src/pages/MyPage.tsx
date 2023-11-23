import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import LeftSection from '../components/MyPage/LeftSection';
import RightSection from '../components/MyPage/RightSection';
import Axios from '../libs/api';
import { selectedItem } from '../components/Common/DropDown/DropDown';
import { useRecoilState } from 'recoil';
import { LoginState } from '../states/LoginState';

const MyPageBlock = styled.div`
  display: flex;
  align-items: start;
  padding-top: 1.75rem;
  padding-bottom: 1.5rem;
  padding-right: 1.5rem;
  padding-left: 1.5rem;
  gap: 1.5rem;
`;

const MyPage = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemListRef = useRef<selectedItem[]>([
    { id: 1, title: 'PM' },
    { id: 2, title: '마케터' },
    { id: 3, title: '디자이너' },
    { id: 4, title: '개발자' },
    { id: 5, title: '기획자' },
    { id: 6, title: '에디터' },
  ]);

  const [listType, setListType] = useState<'all' | 'roadmap' | 'template'>(
    'all',
  );
  const [listStyle, setListStyle] = useState<'list' | 'grid'>('list');
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);
  const [contentData, setContentData] = useState<any>(null);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isEditScreen, setIsEditScreen] = useState(false);
  const [values, setValues] = useState({
    profile: '',
    name: '',
    userType: '',
  });
  const [selectedItem, setSelectedItem] = useState<selectedItem>({
    id: 0,
    title: '포지션을 선택해주세요',
  });

  const [loginState, setLoginState] = useRecoilState(LoginState);

  const contentText = {
    all: '전체',
    roadmap: '로드맵',
    template: '템플릿',
  };

  const MoveToTop = () => {
    containerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const fetchUser = async () => {
    try {
      const res = await Axios.get('/mypage');
      setUser(res.data.data.user);
      console.log(res.data.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchContentData = async () => {
      try {
        const res = await Axios.get('/mypage', {
          params: {
            page,
          },
        });
        setContentData(res.data.data.contentList);
        setTotalPages(res.data.data.contentList.totalPages);
      } catch (err) {
        console.error(err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchContentData();
  }, [page]);

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    setSelectedItem(
      itemListRef.current.find((item) => item.title === user?.userType) || {
        id: 0,
        title: '포지션을 선택해주세요',
      },
    );
  }, [user]);

  useEffect(() => {
    setValues({
      profile: user?.profile,
      name: user?.name,
      userType: user?.userType,
    });
  }, [user]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const imageFormData = new FormData();
    imageFormData.append('file', e.target.files[0]);
    try {
      const res = await Axios.post('/mypage/uploadProfile', imageFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (res.data.data) {
        setUser({ ...user, profile: res.data.data });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleProfileEdit = async () => {
    await Axios.post('/mypage/update', {
      profile: values.profile,
      name: values.name,
      userType: selectedItem.title,
    })
      .then((res) => {
        console.log(res);
        const response = res.data.data;
        setUser({
          ...user,
          name: response.name,
          profile: response.profile,
          userType: response.userType,
        });
        setLoginState((prev: any) => ({
          ...prev,
          name: response.name,
          profile: response.profile,
        }));
        setIsEditScreen(false);
        fetchUser();
      })
      .catch((err) => setError(err));
  };

  if (loading) {
    return <div>loading...</div>;
  }

  if (error) {
    return <div>error!</div>;
  }

  return (
    <MyPageBlock>
      <LeftSection
        user={user}
        isEditScreen={isEditScreen}
        setIsEditScreen={setIsEditScreen}
        values={values}
        setValues={setValues}
        handleProfileEdit={handleProfileEdit}
        itemList={itemListRef.current}
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
        handleImageUpload={handleImageUpload}
      />
      <RightSection
        listType={listType}
        setListType={setListType}
        listStyle={listStyle}
        setListStyle={setListStyle}
        containerRef={containerRef}
        contentData={contentData}
        contentText={contentText}
        page={page}
        setPage={setPage}
        totalPages={totalPages}
        MoveToTop={MoveToTop}
      />
    </MyPageBlock>
  );
};

export default MyPage;
