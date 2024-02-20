import {Button, Text, View} from 'react-native';
import {observer} from 'mobx-react';
import useStore from '../../store/index';
import {useEffect, useState} from 'react';

function Mine({navigation}: any) {
  const {userStore} = useStore();
  const handleLogout = () => {
    userStore.logout();
  };

  return (
    <View>
      <Text>Mine Screen</Text>
      <Text>
        Welcome, 是否登录：{userStore.isLogin ? '已登录' : '未登陆'} 名称：
        {userStore.isLogin ? userStore.user.username : ''}
        ,年龄{userStore.isLogin ? userStore.user.age : ''}!
      </Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
}
export default observer(Mine);
