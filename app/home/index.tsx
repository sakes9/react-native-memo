import { MaterialIcons } from '@expo/vector-icons';
import { ListItem } from '@rneui/themed';
import { router, useNavigation } from 'expo-router';
import { useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { LabelListItem } from '../../src/components/LabelListItem';

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
 * ホーム画面
 */
export default function HomeScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return <MaterialIcons name="new-label" size={24} color="black" onPress={handleAddLabelPress} />;
      }
    });
  }, []);

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
      <ScrollView contentContainerStyle={{ paddingVertical: 40 }}>
        {/* すべてのメモ */}
        <ListItem bottomDivider onPress={handleAllMemoPress}>
          <ListItem.Content>
            <ListItem.Title>すべてのメモ</ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>

        <Text style={styles.sectionText}>ラベル</Text>

        {/* ラベルリスト */}
        {LABEL_DATA.map(item => (
          <LabelListItem
            key={item.id}
            color={item.color}
            name={item.name}
            onPress={() => handleLabelPress(item.id)}
            onEditPress={() => handleEditLabelPress(item.id)}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EFEFF4'
  },
  sectionText: {
    marginTop: 30,
    marginBottom: 10,
    marginLeft: 14,
    fontSize: 14,
    color: '#707070'
  }
});
