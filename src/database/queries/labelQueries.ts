/**
 * ラベルテーブル作成
 */
const CreateTableLabels = `
  CREATE TABLE IF NOT EXISTS labels
  (
      id          INTEGER     PRIMARY KEY AUTOINCREMENT,
      name        TEXT        NOT NULL,
      color       TEXT        NOT NULL,
      created_at  TEXT        DEFAULT (DATETIME('now','localtime')),
      updated_at  TEXT        DEFAULT (DATETIME('now','localtime'))
  );
`;

/**
 * 全てのラベルを取得
 */
const SelectLabels = `
  SELECT
    id,
    name,
    color,
    created_at,
    updated_at
  FROM
    labels
  ORDER BY
    created_at ASC
`;

/**
 * ラベルIDを指定してラベルを取得
 * @param id ラベルID
 */
const SelectLabelTargetId = `
  SELECT
    id,
    name,
    color,
    created_at,
    updated_at
  FROM
    labels
  WHERE
    id = ?
`;

/**
 * ラベル追加
 * @param name ラベル名
 * @param color カラーコード
 */
const InsertLabel = `
  INSERT INTO labels (
    name,
    color
  ) VALUES (
    ?,
    ?
  );
`;

/**
 * ラベル更新
 * @param name ラベル名
 * @param color カラーコード
 * @param id ラベルID
 */
const UpdataLabel = `
  UPDATE
    labels
  SET
    name = ?,
    color = ?,
    updated_at = (DATETIME('now','localtime'))
  WHERE
    id = ?
`;

/**
 * ラベル削除
 * @param id ラベルID
 */
const DeleteLabel = `
  DELETE FROM
    labels
  WHERE
    id = ?
`;

/**
 * ラベルIDのシーケンスをリセット
 */
const ResetSequence = `
  UPDATE
    sqlite_sequence
  SET
    seq = 0
  WHERE
    name = 'labels'
`;

const LabelQueries = Object.freeze({
  CREATE_TABLE: CreateTableLabels,
  SELECT_LABELS: SelectLabels,
  SELECT_LABEL_TARGET_ID: SelectLabelTargetId,
  INSERT: InsertLabel,
  UPDATE: UpdataLabel,
  DELETE: DeleteLabel,
  RESET_SEQUENCE: ResetSequence
});

export { LabelQueries };
