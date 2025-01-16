import { Input, InputField } from '@gluestack-ui/themed';
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Button, StyleSheet, View } from 'react-native';

/**
 * ラベル修正画面
 */
export default function LabelEditScreen() {
  const { id } = useLocalSearchParams();

  const [labelName, setLabelName] = useState<string>(''); // ラベル名

  /**
   * 「修正」が押されたときの処理
   */
  const handleEditPress = () => {
    router.dismiss();
  };

  return (
    <View style={styles.container}>
      <Input variant="underlined" size="md" backgroundColor="$white" borderColor="$warmGray300">
        <InputField paddingLeft={'$2'} placeholder="ラベル名" onChangeText={setLabelName} />
      </Input>

      <Button title="修正" onPress={handleEditPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EFEFF4'
  }
});
