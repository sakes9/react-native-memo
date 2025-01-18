import { Button, ButtonText, Input, InputField, VStack } from '@gluestack-ui/themed';
import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { ColorPicker } from '../../src/components/ColorPicker';
import { Indicator } from '../../src/components/Indicator';

import * as LabelService from '../../src/services/labelService';

/**
 * ラベル作成画面
 */
export default function LabelCreateScreen() {
  const [labelName, setLabelName] = useState<string>(''); // ラベル名
  const [color, setColor] = useState<string | undefined>(undefined); // カラー

  const [isLoading, setIsLoading] = useState<boolean>(false); // インジケーターの表示状態

  /**
   * カラーピッカーで色が選択された時の処理
   * @param color 選択されたカラー
   */
  const handleColorPress = (color: string) => {
    setColor(color);
  };

  /**
   * 「作成」が押されたときの処理
   */
  const handleCreatePress = async () => {
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
      // ラベルを追加する
      await LabelService.addLabel(labelName, color);
      router.dismiss();
    } catch (e) {
      Alert.alert('エラー', 'ラベル作成に失敗しました');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <VStack space="lg">
        <Input variant="underlined" size="md" backgroundColor="$white" borderColor="$warmGray300">
          <InputField paddingLeft={'$2'} placeholder="ラベル名" onChangeText={setLabelName} />
        </Input>

        <ColorPicker onPress={handleColorPress} />

        <Button size="md" action="primary" marginHorizontal={'$4'} onPress={handleCreatePress}>
          <ButtonText>作成</ButtonText>
        </Button>
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
