import { atom } from 'jotai';

/**
 * 選択されたラベルのIDを保持するJotaiアトム
 */
const selectedLabelIdState = atom<number | undefined>(undefined);

export { selectedLabelIdState };
