import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

// 로컬스토리지에 저장
const { persistAtom } = recoilPersist();

export const OpenChatState = atom({
  key: 'openChat',
  default: false,
  effects_UNSTABLE: [persistAtom],
});

export const OpenChatRoomState = atom({
  key: 'openChatRoom',
  default: false,
  effects_UNSTABLE: [persistAtom],
});

export const ChatUserState = atom({
  key: 'chatUser',
  default: { name: '', sessionId: '' },
  effects_UNSTABLE: [persistAtom],
});
