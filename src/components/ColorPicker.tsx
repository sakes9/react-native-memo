import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

/**
 * カラーピッカーのプロパティ
 */
type ColorPickerProps = {
  onPress: (color: string) => void;
  defaultColor?: string; // デフォルト選択するカラーコード
};

// 色定義
const COLOR_CONFIG = [
  { id: 0, code: '#EAEDED' },
  { id: 1, code: '#AEB6BF' },
  { id: 2, code: '#273746' },
  { id: 3, code: '#F1948A' },
  { id: 4, code: '#B03A2E' },
  { id: 5, code: '#C39BD3' },
  { id: 6, code: '#8E44AD' },
  { id: 7, code: '#7FB3D5' },
  { id: 8, code: '#2E86C1' },
  { id: 9, code: '#2471A3' },
  { id: 10, code: '#76D7C4' },
  { id: 11, code: '#2ECC71' },
  { id: 12, code: '#117A65' },
  { id: 13, code: '#F8C471' },
  { id: 14, code: '#E67E22' },
  { id: 15, code: '#9A7D0A' }
];

const ColorPicker: React.FC<ColorPickerProps> = props => {
  const { onPress, defaultColor } = props;

  const [colorId, setColorId] = React.useState<number | undefined>(); // 選択された色のID

  React.useEffect(() => {
    //  defaultColor が指定されている場合は該当する色を選択する
    if (defaultColor) {
      const defaultColorConfig = COLOR_CONFIG.find(color => color.code === defaultColor);
      if (defaultColorConfig) {
        setColorId(defaultColorConfig.id);
        onPress(defaultColorConfig.code);
      }
    }
  }, [defaultColor, onPress]);

  /**
   * カラーボックスを押した時の処理
   * @param id カラーID
   */
  const handleColorBoxPress = (id: number) => {
    const color = COLOR_CONFIG[id].code;

    setColorId(id);
    onPress(color);
  };

  return (
    <View style={styles.container}>
      {COLOR_CONFIG.map((color, index) => (
        <TouchableOpacity onPress={() => handleColorBoxPress(index)} activeOpacity={1} key={index}>
          <View style={[styles.colorBox, colorId === color.id ? styles.selectedColorBox : {}, { backgroundColor: color.code }]}></View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'flex-start',
    flexWrap: 'wrap'
  },
  colorBox: {
    width: 32,
    height: 32,
    margin: 6,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'black'
  },
  selectedColorBox: {
    borderWidth: 4,
    borderColor: 'red'
  }
});

export { ColorPicker };
