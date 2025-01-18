import { execute } from '../database/dbService';
import { LabelQueries } from '../database/queries/labelQueries';

/**
 * ラベルテーブル作成
 */
const createTable = async () => {
  await execute({ sql: LabelQueries.CREATE_TABLE });
};

/**
 * ラベル追加
 * @param name ラベル名
 * @param color カラーコード
 */
const addLabel = async (name: string, color: string) => {
  await execute({ sql: LabelQueries.INSERT, params: [name, color] });
};

export { addLabel, createTable };
