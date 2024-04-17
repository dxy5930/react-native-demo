// userStore.js

import { action, makeAutoObservable, runInAction } from 'mobx';
import tool from '../utils/index.js';
class UserStore {
    user = null;
    isLogin = false;

    constructor() {
        makeAutoObservable(this);
        this.loadUser();
    }

    @action
    login(user: UserInfo) {
        this.user = user;
        this.isLogin = true;
        tool.storeData('user', user);
        tool.storeData('isLogin', true);
    }


    @action
    logout() {
        this.user = null;
        this.isLogin = false;
        tool.clearStorage();
    }

    @action
    async loadUser() {
        const userJSON = await tool.getData('user');
        if (userJSON) {
            runInAction(() => {
                this.login(userJSON);
            });
        }
    }
}

const userStore = new UserStore();
export default userStore;

