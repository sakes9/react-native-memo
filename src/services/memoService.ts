import * as Crypto from 'expo-crypto';
import { execute, fetch, type SqlArg } from '../database/dbService';
import { MemoQueries } from '../database/queries/memoQueries';
import { MemoSchema } from '../database/schemas/memoSchema';
import { type Memo } from '../types/memo';

/**
 * メモテーブル作成
 */
const createTable = async () => {
  await execute({ sql: MemoQueries.CREATE_TABLE });
};

/**
 * メモ一覧取得
 * @returns メモ一覧
 */
const getMemos = async (): Promise<Memo[]> => {
  // メモを取得する
  const rows = await fetch<MemoSchema>({ sql: MemoQueries.SELECT_MEMOS });

  // メモ型に変換する
  const memos = rows.map((row): Memo => {
    return {
      id: row.id,
      title: row.title,
      content: row.content || '',
      labelId: row.label_id || undefined
    };
  });

  return memos;
};

/**
 * 指定されたIDのメモを取得
 * @param memoId メモID
 * @returns メモ
 */
const getMemo = async (memoId: string): Promise<Memo | undefined> => {
  // メモを取得する
  const rows = await fetch<MemoSchema>({ sql: MemoQueries.SELECT_MEMO_TARGET_ID, params: [memoId] });

  // メモが存在しない場合は undefined を返す
  if (rows.length === 0) {
    return undefined;
  }

  // メモ型に変換する
  const row = rows[0];
  return {
    id: row.id,
    title: row.title,
    content: row.content || '',
    labelId: row.label_id || undefined
  };
};

/**
 * メモ追加
 * @param labelId メモに設定するラベルのID
 * @param title メモのタイトル
 * @param content メモの内容
 */
const addMemo = async (labelId: number | undefined, title: string, content: string) => {
  const memoId = Crypto.randomUUID();
  let queries: SqlArg[] = [];

  // メモ追加
  queries.push({ sql: MemoQueries.INSERT, params: [memoId, title, content] });

  // ラベルIDが指定されている場合は、メモにラベルを設定する
  if (labelId !== undefined) {
    queries.push({ sql: MemoQueries.UPDATE_LABEL_ID_BY_ID, params: [labelId, memoId] });
  }

  await execute(...queries);
};

/**
 * メモ修正
 * @param memoId 修正対象のメモのID
 * @param title メモのタイトル
 * @param content メモの内容
 */
const editMemo = async (memoId: string, title: string, content: string) => {
  await execute({ sql: MemoQueries.UPDATE, params: [title, content, memoId] });
};

/**
 * メモ削除
 * @param memoId 削除対象のメモのID
 */
const deleteMemo = async (memoId: string) => {
  await execute({ sql: MemoQueries.DELETE, params: [memoId] });
};

/**
 * メモにラベルを設定する
 * @param memoId メモID
 * @param labelId ラベルID（undefinedの場合はラベルを削除する）
 */
const setLabel = async (memoId: string, labelId: number | undefined) => {
  // ラベルIDが未設定の場合は、メモからラベルを削除する
  if (labelId === undefined) {
    // メモからラベルを削除する
    await execute({ sql: MemoQueries.UPDATE_LABEL_ID_TO_NULL_BY_ID, params: [memoId] });
    return;
  }

  // メモにラベルを設定する
  await execute({ sql: MemoQueries.UPDATE_LABEL_ID_BY_ID, params: [labelId, memoId] });
};

export { addMemo, createTable, deleteMemo, editMemo, getMemo, getMemos, setLabel };
