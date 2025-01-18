import { Button, ButtonText, Input, InputField, VStack } from '@gluestack-ui/themed';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { ColorPicker } from '../../src/components/ColorPicker';
import { Indicator } from '../../src/components/Indicator';

import * as LabelService from '../../src/services/labelService';

/**
 * ラベル修正画面
 */
export default function LabelEditScreen() {
  const { id } = useLocalSearchParams();

  const [labelName, setLabelName] = useState<string>(''); // ラベル名
  const [color, setColor] = useState<string | undefined>(undefined); // カラー

  const [isLoading, setIsLoading] = useState<boolean>(false); // インジケーターの表示状態

  useEffect(() => {
    let isMounted = true;

    const loadData = async (labelId: number) => {
      try {
        // ラベルを取得する
        const label = await LabelService.getLabel(labelId);

        // ラベルが存在しない場合はエラーを表示して戻る
        if (!label) {
          Alert.alert('エラー', 'ラベルが見つかりませんでした', [{ text: 'OK', onPress: () => router.back() }]);
          return;
        }

        // ラベルの名前とカラーをセットする
        setLabelName(label.name);
        setColor(label.color);
      } catch (e) {
        Alert.alert('エラー', 'データの取得に失敗しました', [{ text: 'OK', onPress: () => router.back() }]);
      }
    };

    if (isMounted) {
      const labelId = Number(id);
      loadData(labelId);
    }

    return () => {
      isMounted = false;
    };
  }, [id]);

  /**
   * カラーピッカーで色が選択された時の処理
   * @param color 選択されたカラー
   */
  const handleColorPress = (color: string) => {
    setColor(color);
  };

  /**
   * 「修正」が押されたときの処理
   */
  const handleEditPress = async () => {
    // バリデーション
    if (!labelName) {
      Alert.alert('確認', 'ラベル名を入力してください');
      return;
    }
    if (!color) {
      Alert.alert('確認', 'カラーを選択してください');
      return;
    }

    setIsLoading(true);

    try {
      // ラベルを修正する
      await LabelService.editLabel(Number(id), labelName, color);
      router.dismiss();
    } catch (e) {
      Alert.alert('エラー', 'ラベル修正に失敗しました');
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * 「削除」が押されたときの処理
   */
  const handleDeletePress = () => {
    router.dismiss();
  };

  return (
    <View style={styles.container}>
      <VStack space="lg">
        <Input variant="underlined" size="md" backgroundColor="$white" borderColor="$warmGray300">
          <InputField defaultValue={labelName} paddingLeft={'$2'} placeholder="ラベル名" onChangeText={setLabelName} />
        </Input>

        <ColorPicker onPress={handleColorPress} defaultColor={color} />

        <VStack space="md">
          <Button size="md" action="primary" marginHorizontal={'$4'} onPress={handleEditPress}>
            <ButtonText>修正</ButtonText>
          </Button>

          <Button size="md" action="negative" marginHorizontal={'$4'} onPress={handleDeletePress}>
            <ButtonText>削除</ButtonText>
          </Button>
        </VStack>
      </VStack>

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
