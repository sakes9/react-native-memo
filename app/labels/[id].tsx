import { Button, ButtonText, Input, InputField, VStack } from '@gluestack-ui/themed';
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ColorPicker } from '../../src/components/ColorPicker';

/**
 * ラベル修正画面
 */
export default function LabelEditScreen() {
  const { id } = useLocalSearchParams();

  const [labelName, setLabelName] = useState<string>(''); // ラベル名
  const [color, setColor] = useState<string | undefined>(undefined); // カラー

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
  const handleEditPress = () => {
    router.dismiss();
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
          <InputField paddingLeft={'$2'} placeholder="ラベル名" onChangeText={setLabelName} />
        </Input>

        <ColorPicker onPress={handleColorPress} />

        <VStack space="md">
          <Button size="md" action="primary" marginHorizontal={'$4'} onPress={handleEditPress}>
            <ButtonText>修正</ButtonText>
          </Button>

          <Button size="md" action="negative" marginHorizontal={'$4'} onPress={handleDeletePress}>
            <ButtonText>削除</ButtonText>
          </Button>
        </VStack>
      </VStack>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EFEFF4'
  }
});
