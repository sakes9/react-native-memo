import { router } from 'expo-router';
import { useEffect } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import * as LabelService from '../src/services/labelService';
import * as MemoService from '../src/services/memoService';

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

      // 初期化処理に成功したら、ホーム画面に遷移する
      router.replace('/home');
    } catch (e) {
      console.log('アプリの起動に失敗しました', e);
      Alert.alert('エラー', 'アプリの起動に失敗しました', [{ text: '再起動', onPress: initApp }]);
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
