import Feather from '@expo/vector-icons/Feather';
import { router, useLocalSearchParams, useNavigation } from 'expo-router';
import { useEffect } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

/**
 * メモ一覧画面
 */
export default function MemoListScreen() {
  const navigation = useNavigation();
  const { labelId } = useLocalSearchParams();

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return <Feather name="edit" size={24} color="black" onPress={handleCreatePress} />;
      }
    });
  }, []);

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
