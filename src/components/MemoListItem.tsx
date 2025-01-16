import { Button, ListItem } from '@rneui/themed';
import React from 'react';
import { StyleSheet } from 'react-native';
import { LabelTag } from './LabelTag';

/**
 * メモリストアイテムのプロパティ
 */
type MemoListItemProps = {
  name: string; // メモ名
  content: string; // メモ内容
  onPress: () => void; // タップ時の処理
  onLongPress?: () => void; // 長押し時の処理
  onDeletePress?: () => void; // 削除ボタンタップ時の処理
  label?: { color: string; name: string }; // ラベル情報
};

/**
 * メモリストアイテム
 * @param props プロパティ
 * @returns メモリストアイテム
 */
const MemoListItem: React.FC<MemoListItemProps> = props => {
  const { name, content, onPress, onLongPress, onDeletePress, label } = props;

  return (
    <ListItem.Swipeable
      bottomDivider
      onPress={onPress}
      onLongPress={() => onLongPress?.()}
      rightContent={reset => (
        <Button
          title="削除"
          onPress={() => {
            if (onDeletePress) {
              onDeletePress();
            }
            reset();
          }}
          icon={{ name: 'delete', color: 'white' }}
          buttonStyle={{ minHeight: '100%', backgroundColor: 'red' }}
        />
      )}
    >
      <ListItem.Content>
        <ListItem.Title style={styles.title}>{name}</ListItem.Title>
        <ListItem.Subtitle style={styles.subTitle} numberOfLines={4}>
          {content}
        </ListItem.Subtitle>
        {label ? <LabelTag color={label.color} name={label.name} /> : <></>}
      </ListItem.Content>
      <ListItem.Chevron />
    </ListItem.Swipeable>
  );
};

const styles = StyleSheet.create({
  title: {
    color: '#4A5054',
    fontWeight: 'bold',
    fontSize: 20
  },
  subTitle: {
    color: '#95A2AC',
    fontSize: 15,
    padding: 4,
    maxHeight: 100
  }
});

export { MemoListItem };
