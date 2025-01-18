import { MaterialIcons } from '@expo/vector-icons';
import { ListItem } from '@rneui/themed';
import { router, useFocusEffect, useNavigation } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import { LabelListItem } from '../../src/components/LabelListItem';

import * as LabelService from '../../src/services/labelService';
import { type Label } from '../../src/types/label';

// Recoil
import { useRecoilState } from 'recoil';
import { selectedLabelIdState } from '../../src/recoils/selectedLabelIdState';

/**
 * ホーム画面
 */
export default function HomeScreen() {
  const navigation = useNavigation();

  const [labels, setLabels] = useState<Label[]>([]); // ラベルリスト

  const [selectedLabelId, setSelectedLabelId] = useRecoilState(selectedLabelIdState);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return <MaterialIcons name="new-label" size={24} color="black" onPress={handleAddLabelPress} />;
      }
    });
  }, []);

  useFocusEffect(
    useCallback(() => {
      const loadData = async () => {
        try {
          // ラベル一覧を取得する
          const labels = await LabelService.getLabels();
          setLabels(labels);
        } catch (e) {
          Alert.alert('エラー', 'データの取得に失敗しました', [{ text: 'OK' }]);
        }
      };

      loadData();
    }, [])
  );

  /**
   * 「すべてのメモ」た押された時の処理
   */
  const handleAllMemoPress = () => {
    setSelectedLabelId(undefined); // ラベルIDを未選択にする
    router.push({ pathname: '/memos' });
  };

  /**
   * ラベルが押された時の処理
   * @param labelId ラベルID
   */
  const handleLabelPress = (labelId: number) => {
    setSelectedLabelId(labelId); // ラベルIDを設定する
    router.push({ pathname: '/memos' });
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
        {labels.map(item => (
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
