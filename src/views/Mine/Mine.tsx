import {Button, Text, View} from 'react-native';
import {observer} from 'mobx-react';
import userStore from '../../store/user';

function Mine({navigation}: any) {
  const handleLogout = () => {
    userStore.clearUser();
  };

  return (
    <View>
      <Text>Mine Screen</Text>
      <Text>Welcome, {userStore.user?.username},{userStore.user?.age}!</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
}
export default observer(Mine);
