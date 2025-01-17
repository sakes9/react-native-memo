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

const MemoQueries = Object.freeze({
  CREATE_TABLE: CreateTableMemos
});

export { MemoQueries };
