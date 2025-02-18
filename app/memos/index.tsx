import Feather from '@expo/vector-icons/Feather';
import { router, useFocusEffect, useNavigation } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import { Alert, FlatList, StyleSheet, View } from 'react-native';
import { Indicator } from '../../src/components/Indicator';
import { LabelListModal } from '../../src/components/LabelListModal';
import { LabelTag } from '../../src/components/LabelTag';
import { MemoListItem } from '../../src/components/MemoListItem';
import * as LabelService from '../../src/services/labelService';
import * as MemoService from '../../src/services/memoService';
import { type Label } from '../../src/types/label';
import { type Memo } from '../../src/types/memo';

// Jotai
import { useAtomValue } from 'jotai';
import { selectedLabelIdState } from '../../src/jotai/selectedLabelIdState';

/**
 * メモ一覧画面
 */
export default function MemoListScreen() {
  const navigation = useNavigation();

  const selectedLabelId = useAtomValue(selectedLabelIdState); // 選択されているラベルID
  const [labels, setLabels] = useState<Label[]>([]); // ラベルリスト
  const [memos, setMemos] = useState<Memo[]>([]); // メモリスト
  const selectedLabel = labels.find(label => label.id === selectedLabelId); // 選択されているラベルの情報
  const [selectedMemoId, setSelectedMemoId] = useState<string | undefined>(); // メモIDの一時保存

  const [isLabelListModalVisible, setIsLabelListModalVisible] = useState(false); // ラベルリストモーダルの表示状態
  const [isLoading, setIsLoading] = useState<boolean>(false); // インジケータの表示状態

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return <Feather name="edit" size={24} color="black" onPress={handleCreatePress} />;
      }
    });
  }, []);

  useFocusEffect(
    useCallback(() => {
      const loadData = async (labelId: number | undefined) => {
        try {
          // ラベルリストを設定する
          const labels = await LabelService.getLabels();
          setLabels(labels);

          // メモ一覧を取得する
          const memos = await MemoService.getMemos();
          const filteredMemos = labelId ? memos.filter(memo => memo.labelId === selectedLabelId) : memos;

          setMemos(filteredMemos);
        } catch (e) {
          Alert.alert('エラー', 'データの取得に失敗しました', [{ text: 'OK', onPress: () => router.back() }]);
        }
      };

      loadData(selectedLabelId);
    }, [selectedLabelId])
  );

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
    setSelectedMemoId(memoId);
    setIsLabelListModalVisible(true);
  };

  /**
   * メモの削除が押されたときの処理
   * @param memoId メモID
   */
  const handleMemoDeletePress = async (memoId: string) => {
    setIsLoading(true);

    try {
      await MemoService.deleteMemo(memoId);
      setMemos(memos.filter(memo => memo.id !== memoId));
    } catch (e) {
      Alert.alert('エラー', 'メモの削除に失敗しました', [{ text: 'OK' }]);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * ラベルが選択された時の処理
   * @param labelId ラベルID
   */
  const handleLabelPress = async (labelId?: number) => {
    if (selectedMemoId === undefined) {
      return;
    }

    setIsLoading(true);

    try {
      await MemoService.setLabel(selectedMemoId, labelId);

      // メモリストを更新する
      const memos = await MemoService.getMemos();
      setMemos(memos);

      // 後処理
      setSelectedMemoId(undefined);
      setIsLabelListModalVisible(false);
    } catch (e) {
      Alert.alert('エラー', 'ラベルの設定に失敗しました', [{ text: 'OK' }]);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * ラベルリストモーダルで閉じるボタンが押されたときの処理
   */
  const handleLabelListModalClose = () => {
    setSelectedMemoId(undefined);
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

      <Indicator visible={isLoading} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EFEFF4'
  }
});
