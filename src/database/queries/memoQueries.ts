/**
 * メモテーブル作成
 */
const CreateTableMemos = `
  CREATE TABLE IF NOT EXISTS memos
  (
      id          TEXT,
      label_id    INTEGER,
      title       TEXT        NOT NULL,
      content     TEXT,
      created_at  TEXT        DEFAULT (DATETIME('now','localtime')),
      updated_at  TEXT        DEFAULT (DATETIME('now','localtime')),
      PRIMARY KEY(id),
      FOREIGN KEY(label_id)   REFERENCES labels(id)
  );
`;

/**
 * すべてのメモを取得
 */
const SelectMemos = `
  SELECT
    m.id,
    m.label_id,
    m.title,
    m.content,
    m.created_at,
    m.updated_at,
    l.name,
    l.color
  FROM
    memos m
  LEFT JOIN
    labels l
  ON
    m.label_id = l.id
  ORDER BY
    m.updated_at DESC
`;

/**
 * メモIDを指定してメモを取得
 * @param id メモID
 */
const SelectMemoTargetId = `
  SELECT
    id,
    label_id,
    title,
    content,
    created_at,
    updated_at
  FROM
    memos
  WHERE
    id = ?
`;

/**
 * メモ追加
 * @param id メモID
 * @param title タイトル
 * @param content 内容
 */
const InsertMemo = `
  INSERT INTO memos (
    id,
    title,
    content
  ) VALUES (
    ?,
    ?,
    ?
  );
`;

/**
 * メモ更新
 * @param title タイトル
 * @param content 内容
 * @param id メモID
 */
const UpdateMemo = `
  UPDATE
    memos
  SET
    title = ?,
    content = ?,
    updated_at = (DATETIME('now','localtime'))
  WHERE
    id = ?
`;

/**
 * メモ削除
 * @param id メモID
 */
const DeleteMemo = `
  DELETE FROM
    memos
  WHERE
    id = ?
`;

/**
 * ラベル削除時に、削除されたラベルに紐づくメモのラベルIDをNULLに更新
 */
const UpdateMemoTargetLabelIdToNull = `
  UPDATE
    memos
  SET
    label_id = NULL,
    updated_at = (DATETIME('now','localtime'))
  WHERE
    label_id = ?
`;

const MemoQueries = Object.freeze({
  CREATE_TABLE: CreateTableMemos,
  SELECT_MEMOS: SelectMemos,
  SELECT_MEMO_TARGET_ID: SelectMemoTargetId,
  INSERT: InsertMemo,
  UPDATE: UpdateMemo,
  DELETE: DeleteMemo,
  UPDATE_TARGET_LABEL_ID_TO_NULL: UpdateMemoTargetLabelIdToNull
});

export { MemoQueries };
