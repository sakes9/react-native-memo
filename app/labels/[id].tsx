import { Input, InputField, VStack } from '@gluestack-ui/themed';
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Button, StyleSheet, View } from 'react-native';
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

  return (
    <View style={styles.container}>
      <VStack space="lg">
        <Input variant="underlined" size="md" backgroundColor="$white" borderColor="$warmGray300">
          <InputField paddingLeft={'$2'} placeholder="ラベル名" onChangeText={setLabelName} />
        </Input>

        <ColorPicker onPress={handleColorPress} />

        <Button title="修正" onPress={handleEditPress} />
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
