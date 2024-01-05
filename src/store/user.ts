// userStore.js

import { action, makeAutoObservable, observable } from 'mobx';
import tool from '../utils/index'
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
    login(user: { username: string; age: string; }) {
        this.user = user;
        this.isLogin = true;
        tool.storeObjData('user', user);
        tool.storeObjData('isLogin', true);
    }


    @action
    logout() {
        this.user = null;
        this.isLogin = false;
        tool.clearStorage();
    }

    @action
    async loadUser() {
        const userJSON = await tool.getObjData('user');
        if (userJSON) {
            this.login(userJSON);
        }
    }
}

const userStore = new UserStore();
userStore.loadUser();
export default userStore;
