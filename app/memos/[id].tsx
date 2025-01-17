import { KeyboardAvoidingView } from '@gluestack-ui/themed';
import { router, useLocalSearchParams, useNavigation } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, Button, StyleSheet } from 'react-native';
import { MemoInputForm } from '../../src/components/MemoInputForm';
import * as MemoService from '../../src/services/memoService';

/**
 * メモ修正画面
 */
export default function MemoEditScreen() {
  const navigation = useNavigation();
  const { id } = useLocalSearchParams() as { id: string };

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
    let isMounted = true;

    const loadData = async (memoId: string) => {
      try {
        // メモを取得する
        const memo = await MemoService.getMemo(memoId);

        // メモが存在しない場合はエラーを表示して戻る
        if (!memo) {
          Alert.alert('エラー', 'メモが見つかりませんでした', [{ text: 'OK', onPress: () => router.back() }]);
          return;
        }

        // メモのタイトルと内容をセットする
        setTitle(memo.title);
        setContent(memo.content);
      } catch (e) {
        Alert.alert('エラー', 'データの取得に失敗しました', [{ text: 'OK', onPress: () => router.back() }]);
      }
    };

    if (isMounted) {
      loadData(id);
    }

    return () => {
      isMounted = false;
    };
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
