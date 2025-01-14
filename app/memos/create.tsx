import { router } from 'expo-router';
import { Button, StyleSheet, Text, View } from 'react-native';

/**
 * メモ作成画面
 */
export default function MemoCreateScreen() {
  /**
   * 「作成」が押されたときの処理
   */
  const handleCreatePress = () => {
    router.back();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>メモ作成</Text>
      <Button title="作成" onPress={handleCreatePress} />
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
