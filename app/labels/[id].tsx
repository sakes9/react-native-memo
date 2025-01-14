import { router, useLocalSearchParams } from 'expo-router';
import { Button, StyleSheet, Text, View } from 'react-native';

/**
 * ラベル修正画面
 */
export default function LabelEditScreen() {
  const { id } = useLocalSearchParams();

  /**
   * 「修正」が押されたときの処理
   */
  const handleEditPress = () => {
    router.dismiss();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ラベル修正: {id}</Text>
      <Button title="修正" onPress={handleEditPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EFEFF4',
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold'
  }
});
