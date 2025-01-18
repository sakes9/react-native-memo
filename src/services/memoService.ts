import * as Crypto from 'expo-crypto';
import { execute, fetch } from '../database/dbService';
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
 * @param title メモのタイトル
 * @param content メモの内容
 */
const addMemo = async (title: string, content: string) => {
  const memoId = Crypto.randomUUID();
  await execute({ sql: MemoQueries.INSERT, params: [memoId, title, content] });
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

export { addMemo, createTable, editMemo, getMemo, getMemos };
