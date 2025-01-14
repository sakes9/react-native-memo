import { router, useLocalSearchParams } from 'expo-router';
import { Button, StyleSheet, Text, View } from 'react-native';

/**
 * メモ修正画面
 */
export default function MemoEditScreen() {
  const { id } = useLocalSearchParams();

  /**
   * 「保存」が押されたときの処理
   */
  const handleSavePress = () => {
    router.back();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>メモ修正: {id}</Text>
      <Button title="保存" onPress={handleSavePress} />
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
