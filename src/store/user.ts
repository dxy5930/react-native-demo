// userStore.js

import { action, makeAutoObservable, observable } from 'mobx';
import tool from '../utils/index';
import * as userModel from '../common/types/userStore';
class UserStore {
    user = null;
    isLogin = false;

    constructor() {
        makeAutoObservable(this, {
            user: observable,
            isLogin: observable,
            login: action,
            logout: action,
            loadUser: action,
        });
    }
    @action
    login(user: userModel.userInfo) {
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
            this.login(userJSON);
        }
    }
}

const userStore = new UserStore();
userStore.loadUser();
export default userStore;
