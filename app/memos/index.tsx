import Feather from '@expo/vector-icons/Feather';
import { router, useLocalSearchParams, useNavigation } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { LabelListModal } from '../../src/components/LabelListModal';
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

// ダミーのラベルデータ
const LABEL_DATA = [
  {
    id: 1,
    name: 'プログラミング',
    color: 'blue'
  },
  {
    id: 2,
    name: 'パスワード',
    color: 'green'
  },
  {
    id: 3,
    name: '料理',
    color: 'orange'
  }
];

/**
 * メモ一覧画面
 */
export default function MemoListScreen() {
  const navigation = useNavigation();
  const { labelId } = useLocalSearchParams();

  const [isLabelListModalVisible, setIsLabelListModalVisible] = useState(false); // ラベルリストモーダルの表示状態

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
    setIsLabelListModalVisible(true);
  };

  /**
   * メモの削除が押されたときの処理
   * @param memoId メモID
   */
  const handleMemoDeletePress = (memoId: string) => {
    console.log('メモが削除されました', memoId);
  };

  /**
   * ラベルが選択された時の処理
   * @param labelId ラベルID
   */
  const handleLabelPress = (labelId?: number) => {
    console.log('ラベルが押されました', labelId);
    setIsLabelListModalVisible(false);
  };

  /**
   * ラベルリストモーダルで閉じるボタンが押されたときの処理
   */
  const handleLabelListModalClose = () => {
    setIsLabelListModalVisible(false);
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

      <LabelListModal
        visible={isLabelListModalVisible}
        title="ラベル設定"
        data={LABEL_DATA}
        onPress={handleLabelPress}
        onClose={handleLabelListModalClose}
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
