/**
 * メモの型
 */
type Memo = {
  id: string; // メモID
  title: string; // メモのタイトル
  content: string; // メモの内容
  labelId: number | undefined; // メモに紐づくラベルのID
};

export type { Memo };
