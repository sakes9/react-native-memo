import { execute } from '../database/dbService';
import { LabelQueries } from '../database/queries/labelQueries';

/**
 * ラベルテーブル作成
 */
const createTable = async () => {
  await execute({ sql: LabelQueries.CREATE_TABLE });
};

export { createTable };
