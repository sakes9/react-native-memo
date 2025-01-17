import * as Crypto from 'expo-crypto';
import { execute } from '../database/dbService';
import { MemoQueries } from '../database/queries/memoQueries';

/**
 * メモテーブル作成
 */
const createTable = async () => {
  await execute({ sql: MemoQueries.CREATE_TABLE });
};

/**
 * メモ追加
 * @param title メモのタイトル
 * @param content メモの内容
 */
const addMemo = async (title: string, content: string) => {
  const memoId = Crypto.randomUUID();
  await execute({ sql: MemoQueries.INSERT, params: [memoId, title, content] });
};

export { addMemo, createTable };
