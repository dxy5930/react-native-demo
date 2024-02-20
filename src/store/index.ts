import { createContext, useContext } from 'react';
import userStore from './user';

class RootStore {
    userStore = userStore;
}

const store = new RootStore();

// 创建一个上下文对象，用于跨组件通讯
const Context = createContext(store);

// 自定义hooks
export default function useStore() {
    return useContext(Context);
}
