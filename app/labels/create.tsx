import { Button, ButtonText, Input, InputField, VStack } from '@gluestack-ui/themed';
import { router } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ColorPicker } from '../../src/components/ColorPicker';

/**
 * ラベル作成画面
 */
export default function LabelCreateScreen() {
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
   * 「作成」が押されたときの処理
   */
  const handleCreatePress = () => {
    router.dismiss();
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EFEFF4'
  }
});
