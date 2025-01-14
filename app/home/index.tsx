import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Button, StyleSheet, View } from 'react-native';

/**
 * ホーム画面
 */
export default function HomeScreen() {
  /**
   * 「すべてのメモ」た押された時の処理
   */
  const handleAllMemoPress = () => {
    router.push({ pathname: '/memos' });
  };

  /**
   * ラベルが押された時の処理
   * @param labelId ラベルID
   */
  const handleLabelPress = (labelId: number) => {
    const params = { labelId: labelId };
    router.push({ pathname: '/memos', params: params });
  };

  /**
   * 「ラベル追加」が押されたときの処理
   */
  const handleAddLabelPress = () => {
    router.push({ pathname: '/labels/create' });
  };

  /**
   * ラベルの修正が押された時の処理
   * @param labelId ラベルID
   */
  const handleEditLabelPress = (labelId: number) => {
    router.push({ pathname: `/labels/${labelId}` });
  };

  return (
    <View style={styles.container}>
      <Button title="ラベル追加" onPress={handleAddLabelPress} />

      <Button title="すべてのメモ" onPress={handleAllMemoPress} />

      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Button title="ラベル１" onPress={() => handleLabelPress(1)} />
        <MaterialIcons name="edit" size={24} color={'gray'} onPress={() => handleEditLabelPress(1)} />
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Button title="ラベル２" onPress={() => handleLabelPress(2)} />
        <MaterialIcons name="edit" size={24} color={'gray'} onPress={() => handleEditLabelPress(2)} />
      </View>
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
