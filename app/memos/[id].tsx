import { KeyboardAvoidingView } from '@gluestack-ui/themed';
import { router, useLocalSearchParams, useNavigation } from 'expo-router';
import { useEffect, useState } from 'react';
import { Button, StyleSheet } from 'react-native';
import { MemoInputForm } from '../../src/components/MemoInputForm';

// ダミーデータ
import { MEMO_DATA } from '../../src/dummy_data/memoData';

/**
 * メモ修正画面
 */
export default function MemoEditScreen() {
  const navigation = useNavigation();
  const { id } = useLocalSearchParams();

  const [title, setTitle] = useState<string>(''); // タイトル
  const [content, setContent] = useState<string>(''); // 内容

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return <Button title="保存" onPress={handleSavePress} />;
      }
    });
  }, []);

  useEffect(() => {
    // 選択されたメモ情報を設定する
    const memo = MEMO_DATA.find(memo => memo.id === id);
    if (memo) {
      setTitle(memo.title);
      setContent(memo.content);
    }
  }, [id]);

  /**
   * 「保存」が押されたときの処理
   */
  const handleSavePress = () => {
    router.back();
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding" keyboardVerticalOffset={100}>
      <MemoInputForm title={title} content={content} onTitleChange={setTitle} onContentChange={setContent} />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff'
  }
});
