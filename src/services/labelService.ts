import { execute, fetch } from '../database/dbService';
import { LabelQueries } from '../database/queries/labelQueries';
import { type LabelSchema } from '../database/schemas/labelSchema';
import { type Label } from '../types/label';

/**
 * ラベルテーブル作成
 */
const createTable = async () => {
  await execute({ sql: LabelQueries.CREATE_TABLE });
};

/**
 * ラベル一覧取得
 * @returns ラベル一覧
 */
const getLabels = async (): Promise<Label[]> => {
  // ラベルを取得する
  const rows = await fetch<LabelSchema>({ sql: LabelQueries.SELECT_LABELS });

  // ラベル型に変換する
  const labels = rows.map((row): Label => {
    return {
      id: row.id,
      name: row.name,
      color: row.color
    };
  });

  return labels;
};

/**
 * ラベル追加
 * @param name ラベル名
 * @param color カラーコード
 */
const addLabel = async (name: string, color: string) => {
  await execute({ sql: LabelQueries.INSERT, params: [name, color] });
};

export { addLabel, createTable, getLabels };
