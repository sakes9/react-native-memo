import * as FileSystem from 'expo-file-system';
import * as SQLite from 'expo-sqlite';

/**
 * SQL引数
 */
export type SqlArg = {
  sql: string; // SQL文
  params?: (string | number)[]; // パラメーター
};

// DB名
const DB_NAME = 'MemoApp.db';

/**
 * DBパス取得
 *
 * @returns DBパス
 */
const getDbFilePath = () => {
  const path = FileSystem.documentDirectory + 'SQLite' + '/' + DB_NAME;
  return path;
};

/**
 * 実行系SQL処理
 *
 * @param sqlArgs SQL引数
 * @returns 処理結果
 */
const execute = async (...sqlArgs: SqlArg[]): Promise<void> => {
  // データベースを開く
  const db = await SQLite.openDatabaseAsync(DB_NAME);

  // トランザクションを使ってSQLを実行
  await db.withTransactionAsync(async () => {
    for (const arg of sqlArgs) {
      const { sql, params } = arg;

      try {
        // SQL実行
        await db.runAsync(sql, ...(params || []));
      } catch (error) {
        console.error('SQLの実行に失敗しました', error);
        throw error;
      }
    }
  });
};

/**
 * 取得系SQL処理
 *
 * @param sqlArg SQL引数
 * @returns 取得結果
 */
const fetch = async <T>(sqlArg: SqlArg): Promise<T[]> => {
  // データベースを開く
  const db = await SQLite.openDatabaseAsync(DB_NAME);
  const { sql, params } = sqlArg;

  try {
    // SQL実行
    const allRows = await db.getAllAsync<T>(sql, ...(params || []));
    return allRows;
  } catch (error) {
    console.error('SQLの実行に失敗しました', error);
    throw error;
  }
};

export { execute, fetch, getDbFilePath };
