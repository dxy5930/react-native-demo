import {Button, Text, View} from 'react-native';

function Detail({navigation}: any) {
  return (
    <View>
      <Text>Detail Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => {
          navigation.navigate('Index');
          console.log('111');
        }}
      />
    </View>
  );
}

export default Detail;
