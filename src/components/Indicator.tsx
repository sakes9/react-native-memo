import React from 'react';
import { ActivityIndicator, Modal, StyleSheet, Text, View } from 'react-native';

/**
 * インジケーターのプロパティ
 */
type IndicatorProps = {
  visible: boolean; // インジケーターの表示状態
  text?: string; // テキスト
};

/**
 * インジケーター
 * @param props プロパティ
 * @returns インジケーター
 */
const Indicator: React.FC<IndicatorProps> = props => {
  const { visible, text } = props;

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="none"
      onRequestClose={() => {}} // Android の戻るボタンで閉じないようにする
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <ActivityIndicator style={styles.indicator} size="large" />
          {text && <Text style={styles.text}>{text}</Text>}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
    // backgroundColor: 'rgba(0, 0, 0, 0.3)'
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  indicator: {
    padding: 10
  },
  text: {
    fontSize: 17,
    textAlign: 'center',
    color: '#ffffff'
  }
});

export { Indicator };
