import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

// 로컬스토리지에 저장
const { persistAtom } = recoilPersist();

export const SocketState = atom({
  key: 'socket',
  default: {},
  effects_UNSTABLE: [persistAtom],
});

export const ListState = atom({
  key: 'list',
  default: {},
  effects_UNSTABLE: [persistAtom],
});

export const DetailState = atom({
  key: 'detail',
  default: {},
  effects_UNSTABLE: [persistAtom],
});

export const ChatState = atom({
  key: 'chat',
  default: {},
  effects_UNSTABLE: [persistAtom],
});
