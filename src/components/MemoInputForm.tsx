import { Input, InputField, Textarea, TextareaInput } from '@gluestack-ui/themed';
import { Button, InputAccessoryView, Keyboard, Platform, View } from 'react-native';

/**
 * メモ入力フォームのプロパティ
 */
type MemoInputFormProps = {
  title: string; // タイトル
  content: string; // 内容
  onTitleChange: (text: string) => void; // タイトル変更時のコールバック
  onContentChange: (text: string) => void; // 内容変更時のコールバック
};

const inputAccessoryViewID = 'INPUT_ACCESSORY_VIEW_ID';

/**
 * メモ入力フォーム
 * @param props プロパティ
 * @returns メモ入力フォーム
 */
const MemoInputForm: React.FC<MemoInputFormProps> = props => {
  const { title, content, onTitleChange, onContentChange } = props;

  return (
    <View style={{ flex: 1, paddingBottom: 100 }}>
      <Textarea borderWidth={0} minWidth={'$full'} minHeight={'$full'}>
        {/* タイトル入力 */}
        <Input borderWidth={0} minWidth={'$full'} marginTop={'$4'} marginBottom={'$1'} paddingHorizontal={'$1'}>
          <InputField defaultValue={title} onChangeText={onTitleChange} fontSize={'$2xl'} fontWeight={'$bold'} placeholder="タイトル" />
        </Input>

        {/* 内容入力 */}
        <TextareaInput
          scrollEnabled={true}
          paddingHorizontal={'$5'}
          defaultValue={content}
          onChangeText={onContentChange}
          fontSize={'$md'}
          placeholder="メモを入力"
          inputAccessoryViewID={inputAccessoryViewID}
        />
      </Textarea>

      {/* iOSのみ、キーボードの上に閉じるボタンを表示 */}
      {Platform.OS === 'ios' && (
        <InputAccessoryView nativeID={inputAccessoryViewID} backgroundColor={'#F1F1F1'}>
          <View style={{ alignItems: 'flex-end' }}>
            <Button title="閉じる" onPress={() => Keyboard.dismiss()} />
          </View>
        </InputAccessoryView>
      )}
    </View>
  );
};

export { MemoInputForm };
