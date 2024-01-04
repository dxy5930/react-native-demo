import React, {useEffect} from 'react';
import {SafeAreaView, StatusBar, useColorScheme} from 'react-native';
import 'react-native-gesture-handler';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import AppNavigator from './src/route/index';
import {Provider} from 'mobx-react';
import userStore from './src/store/user';

function App(): React.JSX.Element {
  useEffect(() => {
    // Load user information when the app starts
    userStore.loadUser();
  }, []);

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <Provider userStore={userStore}>
        <AppNavigator></AppNavigator>
      </Provider>
    </SafeAreaView>
  );
}

export default App;
