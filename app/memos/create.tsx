import { KeyboardAvoidingView } from '@gluestack-ui/themed';
import { router, useNavigation } from 'expo-router';
import { useEffect, useState } from 'react';
import { Button, StyleSheet } from 'react-native';
import { MemoInputForm } from '../../src/components/MemoInputForm';

// Recoil
import { useRecoilValue } from 'recoil';
import { selectedLabelIdState } from '../../src/recoils/selectedLabelIdState';

/**
 * メモ作成画面
 */
export default function MemoCreateScreen() {
  const navigation = useNavigation();

  const selectedLabelId = useRecoilValue(selectedLabelIdState); // 選択されているラベルID

  const [title, setTitle] = useState<string>(''); // タイトル
  const [content, setContent] = useState<string>(''); // 内容

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return <Button title="作成" onPress={handleCreatePress} />;
      }
    });
  }, []);

  /**
   * 「作成」が押されたときの処理
   */
  const handleCreatePress = () => {
    console.log(`メモに ラベル ${selectedLabelId} を設定します`);
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
