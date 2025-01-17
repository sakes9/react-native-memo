import { type Memo } from '../types/memo';

// ダミーのメモデータ
const MEMO_DATA: Memo[] = [
  {
    id: 'ABCD',
    title: 'useStateについて',
    content: 'useStateの説明',
    labelId: 1
  },
  {
    id: 'EFGH',
    title: 'アカウント',
    content: 'メールアドレス: abc123@sample.com\nパスワード: abc123',
    labelId: 2
  },
  {
    id: 'IJKL',
    title: 'オムライス レシピ',
    content: '卵: 2個\nごはん: 200g\n玉ねぎ: 1/4個\nケチャップ',
    labelId: 3
  }
];

export { MEMO_DATA };
