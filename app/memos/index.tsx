import Feather from '@expo/vector-icons/Feather';
import { router, useNavigation } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { LabelListModal } from '../../src/components/LabelListModal';
import { LabelTag } from '../../src/components/LabelTag';
import { MemoListItem } from '../../src/components/MemoListItem';
import { type Label } from '../../src/types/label';
import { type Memo } from '../../src/types/memo';

// Recoil
import { useRecoilValue } from 'recoil';
import { selectedLabelIdState } from '../../src/recoils/selectedLabelIdState';

// ダミーのデータ
import { LABEL_DATA } from '../../src/dummy_data/labelData';
import { MEMO_DATA } from '../../src/dummy_data/memoData';

/**
 * メモ一覧画面
 */
export default function MemoListScreen() {
  const navigation = useNavigation();

  const selectedLabelId = useRecoilValue(selectedLabelIdState); // 選択されているラベルID
  const [labels, setLabels] = useState<Label[]>([]); // ラベルリスト
  const [memos, setMemos] = useState<Memo[]>([]); // メモリスト
  const selectedLabel = labels.find(label => label.id === selectedLabelId); // 選択されているラベルの情報

  const [isLabelListModalVisible, setIsLabelListModalVisible] = useState(false); // ラベルリストモーダルの表示状態

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return <Feather name="edit" size={24} color="black" onPress={handleCreatePress} />;
      }
    });
  }, []);

  useEffect(() => {
    // ラベルリストを設定する
    const labels = LABEL_DATA;
    setLabels(labels);

    // メモリストを設定する
    // 選択されているラベルIDがある場合は、そのラベルに紐づくメモを表示する
    const filteredMemos = selectedLabelId ? MEMO_DATA.filter(memo => memo.labelId === selectedLabelId) : MEMO_DATA;
    setMemos(filteredMemos);
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
          selectedLabel ? (
            <View style={{ margin: 10 }}>
              <LabelTag color={selectedLabel.color} name={selectedLabel.name} />
            </View>
          ) : (
            <></>
          )
        }
        contentContainerStyle={{ paddingBottom: 100 }}
        data={memos}
        renderItem={({ item }) => (
          <MemoListItem
            name={item.title}
            content={item.content}
            onPress={() => handleMemoPress(item.id)}
            onLongPress={() => handleMemoLongPress(item.id)}
            onDeletePress={() => handleMemoDeletePress(item.id)}
            label={selectedLabelId ? undefined : labels.find(label => label.id === item.labelId)} // ラベルIDが選択されている場合は、メモにラベル情報を表示しない
          />
        )}
        keyExtractor={item => item.id}
      />

      <LabelListModal
        visible={isLabelListModalVisible}
        title="ラベル設定"
        data={labels}
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
