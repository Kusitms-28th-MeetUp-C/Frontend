import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
import { Client } from '@stomp/stompjs';

// 로컬스토리지에 저장
const { persistAtom } = recoilPersist();

const myToken =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIiwiaWF0IjoxNzE0NzA3NTA3LCJleHAiOjE3MTUzMTIzMDd9.lSQ0Wim51bJXeOZ3DpFiXLO5ZgFSNufRQqYl2QAlNxU';

export const HeaderState = atom({
  key: 'header',
  default: {
    Authorization: `Bearer ${myToken}`,
    sessionId: 1,
  },
  effects_UNSTABLE: [persistAtom],
});

// export const ListState = atom({
//   key: 'list',
//   default: {},
//   effects_UNSTABLE: [persistAtom],
// });

// export const DetailState = atom({
//   key: 'detail',
//   default: {},
//   effects_UNSTABLE: [persistAtom],
// });

// export const ChatState = atom({
//   key: 'chat',
//   default: {},
//   effects_UNSTABLE: [persistAtom],
// });
