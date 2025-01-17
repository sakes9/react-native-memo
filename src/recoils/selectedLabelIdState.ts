import { atom } from 'recoil';

/**
 * 選択されたラベルのIDを保持するRecoil状態
 */
const selectedLabelIdState = atom<number | undefined>({
  key: 'selectedLabelIdState',
  default: undefined
});

export { selectedLabelIdState };
