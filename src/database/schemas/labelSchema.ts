/**
 * ラベルのスキーマ
 */
type LabelSchema = {
  id: number; // ラベルID
  name: string; // ラベル名
  color: string; // ラベルの色
  created_at: string; // 作成日時
  updated_at: string; // 更新日時
};

export type { LabelSchema };
