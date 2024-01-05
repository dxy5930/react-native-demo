import {useEffect} from 'react';
import {Button, Text, View} from 'react-native';

function Detail({navigation}: any) {
  useEffect(() => {
    console.log('进入详情页');
  }, []);
  return (
    <View>
      <Text>Detail Screen</Text>
      <Button
        title="Go to Index"
        onPress={() => {
          navigation.navigate('Index');
          console.log('111');
        }}
      />
    </View>
  );
}

export default Detail;
