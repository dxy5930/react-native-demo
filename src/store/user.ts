// userStore.js

import { action, makeAutoObservable } from 'mobx';
import tool from '../utils/index'
class UserStore {
    user = null;

    constructor() {
        makeAutoObservable(this);
    }
    @action
    setUser(user) {
        this.user = user;
        tool.storeObjData('user', JSON.stringify(user));
    }
    @action
    clearUser() {
        this.user = null;
        tool.clearStorage('user');
    }

    @action
    async loadUser() {
        const userJSON = await tool.getObjData('user');
        if (userJSON) {
            this.user = JSON.parse(userJSON);
        }
    }
}

const userStore = new UserStore();
export default userStore;
