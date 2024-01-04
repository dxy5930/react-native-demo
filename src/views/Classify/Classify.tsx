import {Button, Text, View} from 'react-native';

function Classify({navigation}: any) {
  return (
    <View>
      <Text>Classify Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => {
          navigation.navigate('Mine');
          console.log('111');
        }}
      />
    </View>
  );
}

export default Classify;
