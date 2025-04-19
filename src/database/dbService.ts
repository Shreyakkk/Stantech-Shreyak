import SQLite from 'react-native-sqlite-storage';

// SQLite.enablePromise(true);

let db: SQLite.SQLiteDatabase;

export const initDB = async () => {
  try {
    db = await SQLite.openDatabase({ name: 'items.db', location: 'default' });
    await db.transaction(async (tx) => {
      await tx.executeSql(
        `CREATE TABLE IF NOT EXISTS items (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT,
          description TEXT
        );`
      );
    });
  } catch (error) {
    console.error('Failed to initialize DB:', error);
  }
};

export const getItemsFromDB = async () => {
  try {
    const items: any[] = [];

    await db.transaction(async (tx) => {
      const [result] = await tx.executeSql('SELECT * FROM items;');
      const rows = result.rows;
      for (let i = 0; i < rows.length; i++) {
        items.push(rows.item(i));
      }
    });

    return items;
  } catch (error) {
    throw error;
  }
};

export const insertItemToDB = async (name: string, description: string) => {
  try {
    await db.transaction(async (tx) => {
      await tx.executeSql(
        'INSERT INTO items (name, description) VALUES (?, ?);',
        [name, description]
      );
    });
  } catch (error) {
    throw error;
  }
};

export const updateItemInDB = async (id: number, name: string, description: string) => {
  try {
    await db.transaction(async (tx) => {
      await tx.executeSql(
        'UPDATE items SET name = ?, description = ? WHERE id = ?;',
        [name, description, id]
      );
    });
  } catch (error) {
    throw error;
  }
};

export const deleteItemFromDB = async (id: number) => {
  try {
    await db.transaction(async (tx) => {
      await tx.executeSql('DELETE FROM items WHERE id = ?;', [id]);
    });
  } catch (error) {
    throw error;
  }
};
