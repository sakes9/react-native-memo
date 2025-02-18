import { KeyboardAvoidingView } from '@gluestack-ui/themed';
import { router, useNavigation } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, Button, StyleSheet } from 'react-native';
import { Indicator } from '../../src/components/Indicator';
import { MemoInputForm } from '../../src/components/MemoInputForm';
import * as MemoService from '../../src/services/memoService';

// Jotai
import { useAtomValue } from 'jotai';
import { selectedLabelIdState } from '../../src/jotai/selectedLabelIdState';

/**
 * メモ作成画面
 */
export default function MemoCreateScreen() {
  const navigation = useNavigation();

  const selectedLabelId = useAtomValue(selectedLabelIdState); // 選択されているラベルID

  const [title, setTitle] = useState<string>(''); // タイトル
  const [content, setContent] = useState<string>(''); // 内容

  const [isLoading, setIsLoading] = useState<boolean>(false); // インジケーターの表示状態

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return <Button title="作成" onPress={handleCreatePress} />;
      }
    });
  }, [title, content]);

  /**
   * 「作成」が押されたときの処理
   */
  const handleCreatePress = async () => {
    // バリデーション
    if (!title) {
      Alert.alert('確認', 'タイトルを入力してください');
      return;
    }

    setIsLoading(true);

    try {
      // メモを追加する
      await MemoService.addMemo(selectedLabelId, title, content);
      router.back();
    } catch (e) {
      Alert.alert('エラー', 'メモの追加に失敗しました');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding" keyboardVerticalOffset={100}>
      <MemoInputForm title={title} content={content} onTitleChange={setTitle} onContentChange={setContent} />

      <Indicator visible={isLoading} />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff'
  }
});
