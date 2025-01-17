/**
 * メモのスキーマ
 */
type MemoSchema = {
  id: string; // メモID
  title: string; // メモのタイトル
  content: string | null; // メモの内容
  label_id: number | null; // ラベルのID
  created_at: string; // 作成日時
  updated_at: string; // 更新日時
};

export type { MemoSchema };
