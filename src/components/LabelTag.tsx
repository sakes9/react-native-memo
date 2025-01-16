import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Text, View } from 'react-native';

/**
 * ラベルタグのプロパティ
 */
type LabelTagProps = {
  color: string; // ラベルの色
  name: string; // ラベル名
};

/**
 * ラベルタグ
 * @param props プロパティ
 * @returns ラベルタグ
 */
const LabelTag: React.FC<LabelTagProps> = props => {
  const { color, name } = props;

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 2 }}>
      <MaterialCommunityIcons name="label" size={24} color={color} />
      <Text style={{ marginLeft: 5 }}>{name}</Text>
    </View>
  );
};

export { LabelTag };
