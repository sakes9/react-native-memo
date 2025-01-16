import { Input, InputField } from '@gluestack-ui/themed';
import { router } from 'expo-router';
import { useState } from 'react';
import { Button, StyleSheet, View } from 'react-native';

/**
 * ラベル作成画面
 */
export default function LabelCreateScreen() {
  const [labelName, setLabelName] = useState<string>(''); // ラベル名

  /**
   * 「作成」が押されたときの処理
   */
  const handleCreatePress = () => {
    router.dismiss();
  };

  return (
    <View style={styles.container}>
      <Input variant="underlined" size="md" backgroundColor="$white" borderColor="$warmGray300">
        <InputField paddingLeft={'$2'} placeholder="ラベル名" onChangeText={setLabelName} />
      </Input>

      <Button title="作成" onPress={handleCreatePress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EFEFF4'
  }
});
