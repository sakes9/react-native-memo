import { router } from 'expo-router';
import { useEffect } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import * as LabelService from '../src/services/labelService';
import * as MemoService from '../src/services/memoService';

import InitialLabelData from '../src/database/data/initialLabelData.json';
import InitialMemoData from '../src/database/data/initialMemoData.json';

/**
 * アプリ起動時の画面
 */
export default function InitialScreen() {
  useEffect(() => {
    initApp();
  }, []);

  /**
   * アプリ起動時処理
   */
  const initApp = async () => {
    try {
      // テーブルを作成する
      await LabelService.createTable();
      await MemoService.createTable();

      // データベース初期化処理
      await initDatabase();

      // 初期化処理に成功したら、ホーム画面に遷移する
      router.replace('/home');
    } catch (e) {
      console.log('アプリの起動に失敗しました', e);
      Alert.alert('エラー', 'アプリの起動に失敗しました', [{ text: '再起動', onPress: initApp }]);
    }
  };

  /**
   * データベース初期化処理
   */
  const initDatabase = async () => {
    // メモとラベルを取得
    const memos = await MemoService.getMemos();
    const labels = await LabelService.getLabels();

    // メモとラベルが１つも登録されていない場合は、初期設定メモとラベルを登録
    if (!memos.length && !labels.length) {
      // ラベルIDのシーケンスをリセット
      await LabelService.resetSequence();

      // ラベル追加処理
      for (const key in InitialLabelData) {
        await LabelService.addLabel(InitialLabelData[key].name, InitialLabelData[key].color);
      }

      // メモ追加処理
      for (const key in InitialMemoData) {
        await MemoService.addMemo(InitialMemoData[key].labelId, InitialMemoData[key].title, InitialMemoData[key].content);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>アプリ起動中・・</Text>
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
