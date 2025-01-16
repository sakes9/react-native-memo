import { Foundation, MaterialCommunityIcons } from '@expo/vector-icons';
import { ListItem } from '@rneui/themed';
import { StyleSheet, View } from 'react-native';

/**
 * ラベルリストアイテムのプロパティ
 */
type LabelListItemProps = {
  color: string; // ラベルの色
  name: string; // ラベル名
  onPress: () => void; // ラベルが押されたときの処理
  onEditPress: () => void; // 修正アイコンが押されたときの処理
};

/**
 * ラベルリストアイテム
 * @param props プロパティ
 * @returns ラベルリストアイテム
 */
const LabelListItem: React.FC<LabelListItemProps> = props => {
  const { color, name, onPress, onEditPress } = props;

  return (
    <View style={styles.container}>
      <ListItem bottomDivider style={styles.listItem} onPress={onPress}>
        {/* ラベルアイコン */}
        <MaterialCommunityIcons name="label" color={color} size={26} style={styles.labelIcon} />

        {/* ラベル名 */}
        <ListItem.Content>
          <ListItem.Title style={styles.title}>{name}</ListItem.Title>
        </ListItem.Content>

        {/* 修正アイコン */}
        <Foundation name="pencil" color={'#818181'} size={26} style={styles.editIcon} onPress={onEditPress} />
      </ListItem>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row'
  },
  labelIcon: {
    marginLeft: 10
  },
  listItem: {
    flex: 1
  },
  title: {
    fontSize: 18
  },
  editIcon: {
    marginRight: 12
  }
});

export { LabelListItem };
