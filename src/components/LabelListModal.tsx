import { MaterialCommunityIcons } from '@expo/vector-icons';
import { CloseIcon, Heading, Icon, Modal, ModalBackdrop, ModalBody, ModalCloseButton, ModalContent, ModalHeader } from '@gluestack-ui/themed';
import { Text, TouchableOpacity } from 'react-native';
import { LabelTag } from './LabelTag';

/**
 * ラベルリストモーダルのプロパティ
 */
type LabelListModalProps = {
  visible: boolean; // 表示フラグ
  title: string; // タイトル
  data: { id: number; name: string; color: string }[]; // ラベル情報
  onPress: (labelId?: number) => void; // ラベルが押されたときの処理
  onClose: () => void; // 閉じるが押された時の処理
};

/**
 * ラベルリストモーダル
 * @param props プロパティ
 * @returns ラベルリストモーダル
 */
const LabelListModal: React.FC<LabelListModalProps> = props => {
  const { visible, title, data, onPress, onClose } = props;

  return (
    <Modal isOpen={visible} onClose={onClose}>
      <ModalBackdrop />
      <ModalContent width={'85%'} backgroundColor="#ffffff">
        {/* ヘッダー */}
        <ModalHeader>
          {/* タイトル */}
          <Heading size="lg">{title}</Heading>

          {/* 閉じるボタン */}
          <ModalCloseButton>
            <Icon size="lg" as={CloseIcon} />
          </ModalCloseButton>
        </ModalHeader>

        {/* ボディ */}
        <ModalBody>
          {/* ラベル解除 */}
          <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 5 }} onPress={() => onPress(undefined)}>
            <MaterialCommunityIcons name="label-off" size={24} color={'gray'} />
            <Text style={{ marginLeft: 5 }}>ラベル解除</Text>
          </TouchableOpacity>

          {/* ラベルリスト */}
          {data.map(label => (
            <TouchableOpacity key={label.id} style={{ marginVertical: 5 }} onPress={() => onPress(label.id)}>
              <LabelTag color={label.color} name={label.name} />
            </TouchableOpacity>
          ))}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export { LabelListModal };
