import { router, useLocalSearchParams } from 'expo-router';
import { Button, StyleSheet, Text, View } from 'react-native';

/**
 * メモ一覧画面
 */
export default function MemoListScreen() {
  const { labelId } = useLocalSearchParams();

  /**
   * 「メモ作成」が押されたときの処理
   */
  const handleCreatePress = () => {
    router.push({ pathname: '/memos/create' });
  };

  /**
   * メモが押されたときの処理
   * @param memoId メモID
   */
  const handleMemoPress = (memoId: string) => {
    router.push({ pathname: `/memos/${memoId}` });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{labelId ? `ラベルID: ${labelId}` : 'すべてのメモ'}</Text>
      <Button title="メモ作成" onPress={handleCreatePress} />

      <Button title="メモ１" onPress={() => handleMemoPress('ABCD')} />
      <Button title="メモ２" onPress={() => handleMemoPress('EFGH')} />
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
