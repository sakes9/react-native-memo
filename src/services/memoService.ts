import { execute } from '../database/dbService';
import { MemoQueries } from '../database/queries/memoQueries';

/**
 * メモテーブル作成
 */
const createTable = async () => {
  await execute({ sql: MemoQueries.CREATE_TABLE });
};

export { createTable };
