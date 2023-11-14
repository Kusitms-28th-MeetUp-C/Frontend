import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

// 로컬스토리지에 저장
const { persistAtom } = recoilPersist();

export const LoginState = atom({
  key: 'login',
  default: {
    isLogin: false,
    userId: 0,
    name: '',
    profile: '',
  },
  effects_UNSTABLE: [persistAtom],
});