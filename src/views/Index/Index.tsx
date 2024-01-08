import {Linking, StyleSheet, TextInput, View} from 'react-native';
import {getData} from '../../axios/api';
import {useEffect, useState} from 'react';
import {ApiResponse} from '../../common/types/index';
import {resDemo} from '../../axios/interface/demo';
import AppInfoModule from '../../modules/AppInfoModule';
import {
  CheckBox,
  Dialog,
  Button,
  Text,
  Tab,
  TabView,
  SpeedDial,
} from '@rneui/themed';
import {Header as HeaderRNE, HeaderProps, Icon} from '@rneui/themed';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {BASE_URL} from 'react-native-dotenv';
import {observer} from 'mobx-react';
import Toast from 'react-native-root-toast';
import userStore from '../../store/user';
import tool from '../../utils/index';

function Index({props, navigation}: any) {
  const [test, setTest] = useState<resDemo>({} as resDemo);
  const [checked, setChecked] = useState(1);
  const [visible1, setVisible1] = useState(false);
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [username, setUsername] = useState('');
  const [age, setAge] = useState('');

  useEffect(() => {
    getDataTest();
  }, []);

  const handleLogin = () => {
    const user = {username, age: Number(age)};
    userStore.login(user);
    Toast.show('登录成功', {
      position: Toast.positions.CENTER,
      onHidden: () => {
        console.log('弹窗关闭');
      },
    });
  };

  const docsNavigate = () => {
    Linking.openURL(`https://www.baidu.com`);
  };

  const playgroundNavigate = () => {
    Linking.openURL(`https://www.qq.com`);
  };

  const toggleDialog1 = () => {
    setVisible1(!visible1);
  };

  const getDataTest = async () => {
    const res: ApiResponse<resDemo> = await getData();
    console.log(res);
    setTest(res.data);
  };
  return (
    <SafeAreaProvider>
      <HeaderRNE
        leftComponent={
          <TouchableOpacity onPress={docsNavigate}>
            <Icon name="description" color="white" />
          </TouchableOpacity>
        }
        rightComponent={
          <View style={styles.headerRight}>
            <TouchableOpacity onPress={docsNavigate}>
              <Icon name="description" color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              style={{marginLeft: 10}}
              onPress={playgroundNavigate}>
              <Icon type="antdesign" name="rocket1" color="white" />
            </TouchableOpacity>
          </View>
        }
        centerComponent={{text: 'Header', style: styles.heading}}
      />
      <Tab
        value={index}
        onChange={e => {
          setIndex(e);
          console.log(e);
        }}
        dense
        indicatorStyle={{
          backgroundColor: 'green',
          height: 3,
        }}
        variant="default">
        <Tab.Item title="Recent" titleStyle={{fontSize: 12}} />
        <Tab.Item title="favorite" titleStyle={{fontSize: 12}} />
        <Tab.Item title="cart" titleStyle={{fontSize: 12}} />
      </Tab>
      <TabView value={index} onChange={setIndex} animationType="timing">
        <TabView.Item style={{backgroundColor: 'red', width: '100%'}}>
          <Text h1>Recent</Text>
        </TabView.Item>
        <TabView.Item style={{backgroundColor: 'blue', width: '100%'}}>
          <Text h1>Favorite</Text>
        </TabView.Item>
        <TabView.Item style={{backgroundColor: 'green', width: '100%'}}>
          <Text h1>Cart</Text>
        </TabView.Item>
      </TabView>

      {!userStore.isLogin ? (
        <>
          <TextInput
            placeholder="Enter your username"
            value={username}
            onChangeText={setUsername}
          />
          <TextInput
            placeholder="Enter your age"
            value={age}
            onChangeText={setAge}
          />
          <Button title="Login" onPress={handleLogin} />
        </>
      ) : null}

      <Text style={{color: '#000'}}>{BASE_URL}</Text>
      <Text style={{color: '#000'}}>{tool.judgeType({a:'2'}) }</Text>
      <Text style={{color: '#000'}}>id：{test.id}</Text>
      <Text style={{color: '#000'}}>tag：{test.tag}</Text>
      <Text style={{color: '#000'}}>name：{test.name}</Text>
      <Text style={{color: '#000'}}>content：{test.content}</Text>
      <Text style={{color: '#000'}}>created_at：{test.created_at}</Text>
      <Text style={{color: '#000'}}>updated_at：{test.updated_at}</Text>
      <Button
        title="Go to Classify"
        onPress={() => navigation.navigate('Classify')}
      />
      <Button
        title="Open Simple Dialog"
        onPress={toggleDialog1}
        buttonStyle={styles.button}
      />
      <Dialog isVisible={visible1} onBackdropPress={toggleDialog1}>
        <Dialog.Title title="Select Preference" />
        {['Option 1', 'Option 2', 'Option 3'].map((l, i) => (
          <CheckBox
            key={i}
            title={l}
            containerStyle={{backgroundColor: 'white', borderWidth: 0}}
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            checked={checked === i + 1}
            onPress={() => setChecked(i + 1)}
          />
        ))}

        <Dialog.Actions>
          <Dialog.Button
            title="CONFIRM"
            onPress={() => {
              console.log(`Option ${checked} was selected!`);
              toggleDialog1();
            }}
          />
          <Dialog.Button title="CANCEL" onPress={toggleDialog1} />
        </Dialog.Actions>
      </Dialog>
      <SpeedDial
        isOpen={open1}
        icon={{name: 'edit', color: '#fff'}}
        openIcon={{name: 'close', color: '#fff'}}
        onOpen={() => setOpen1(!open1)}
        onClose={() => setOpen1(!open1)}>
        <SpeedDial.Action
          icon={{name: 'add', color: '#fff'}}
          title="Add"
          onPress={() => console.log('Add Something')}
        />
        <SpeedDial.Action
          icon={{name: 'delete', color: '#fff'}}
          title="Delete"
          onPress={() => {
            console.log('Delete Something');
            navigation.navigate('Classify');
          }}
        />
      </SpeedDial>
    </SafeAreaProvider>
  );
}
const styles = StyleSheet.create({
  button: {
    borderRadius: 6,
    width: 220,
    margin: 20,
  },
  buttonContainer: {
    margin: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#397af8',
    marginBottom: 20,
    width: '100%',
    paddingVertical: 15,
  },
  heading: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
  headerRight: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 5,
  },
  subheaderText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
export default observer(Index);
