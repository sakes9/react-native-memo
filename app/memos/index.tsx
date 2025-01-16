import Feather from '@expo/vector-icons/Feather';
import { router, useLocalSearchParams, useNavigation } from 'expo-router';
import React, { useEffect } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { LabelTag } from '../../src/components/LabelTag';
import { MemoListItem } from '../../src/components/MemoListItem';

// ダミーのメモデータ
const MEMO_DATA = [
  {
    id: 'ABCD',
    name: 'useStateについて',
    content: 'useStateの説明',
    label: { name: 'プログラミング', color: 'blue' }
  },
  {
    id: 'EFGH',
    name: 'アカウント',
    content: 'メールアドレス: abc123@sample.com\nパスワード: abc123'
  },
  {
    id: 'IJKL',
    name: 'オムライス レシピ',
    content: '卵: 2個\nごはん: 200g\n玉ねぎ: 1/4個\nケチャップ'
  }
];

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

  /**
   * メモが長押しされたときの処理
   * @param memoId メモID
   */
  const handleMemoLongPress = (memoId: string) => {
    console.log('メモが長押しされました', memoId);
  };

  /**
   * メモの削除が押されたときの処理
   * @param memoId メモID
   */
  const handleMemoDeletePress = (memoId: string) => {
    console.log('メモが削除されました', memoId);
  };

  return (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={
          labelId ? (
            <View style={{ margin: 10 }}>
              <LabelTag color="blue" name={`ラベルID: ${labelId}`} />
            </View>
          ) : (
            <></>
          )
        }
        contentContainerStyle={{ paddingBottom: 100 }}
        data={MEMO_DATA}
        renderItem={({ item }) => (
          <MemoListItem
            name={item.name}
            content={item.content}
            onPress={() => handleMemoPress(item.id)}
            onLongPress={() => handleMemoLongPress(item.id)}
            onDeletePress={() => handleMemoDeletePress(item.id)}
            label={item.label}
          />
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EFEFF4'
  }
});
