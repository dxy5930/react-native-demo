import {Button, Text, View} from 'react-native';

function Mine({navigation}: any) {
  return (
    <View>
      <Text>Mine Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.push('Detail')}
      />
    </View>
  );
}
export default Mine;
