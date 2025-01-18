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

const LabelQueries = Object.freeze({
  CREATE_TABLE: CreateTableLabels,
  SELECT_LABELS: SelectLabels,
  INSERT: InsertLabel
});

export { LabelQueries };
