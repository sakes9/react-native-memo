import { execute, fetch } from '../database/dbService';
import { LabelQueries } from '../database/queries/labelQueries';
import { MemoQueries } from '../database/queries/memoQueries';
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
 * 指定されたIDのラベルを取得
 * @param labelId ラベルID
 * @returns ラベル
 */
const getLabel = async (labelId: number): Promise<Label | undefined> => {
  // ラベルを取得する
  const rows = await fetch<LabelSchema>({ sql: LabelQueries.SELECT_LABEL_TARGET_ID, params: [labelId] });

  // ラベルが存在しない場合は undefined を返す
  if (rows.length === 0) {
    return undefined;
  }

  // ラベル型に変換する
  const row = rows[0];
  return {
    id: row.id,
    name: row.name,
    color: row.color
  };
};

/**
 * ラベル追加
 * @param name ラベル名
 * @param color カラーコード
 */
const addLabel = async (name: string, color: string) => {
  await execute({ sql: LabelQueries.INSERT, params: [name, color] });
};

/**
 * ラベル修正
 * @param id ラベルID
 * @param name ラベル名
 * @param color カラーコード
 */
const editLabel = async (id: number, name: string, color: string) => {
  await execute({ sql: LabelQueries.UPDATE, params: [name, color, id] });
};

/**
 * ラベル削除
 * @param id ラベルID
 */
const deleteLabel = async (id: number) => {
  await execute({ sql: LabelQueries.DELETE, params: [id] }, { sql: MemoQueries.UPDATE_TARGET_LABEL_ID_TO_NULL, params: [id] });
};

/**
 * シーケンスをリセット
 */
const resetSequence = async () => {
  await execute({ sql: LabelQueries.RESET_SEQUENCE });
};

export { addLabel, createTable, deleteLabel, editLabel, getLabel, getLabels, resetSequence };
