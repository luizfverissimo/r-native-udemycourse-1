import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("places.db");

/* ------------------ Cria a tabela no inicio do aplicativo ----------------- */

export const init = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS places (id INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULL, imageUri TEXT NOT NULL, address TEXT NOT NULL, lat REAL, lng REAL NOT NULL);",
        [],
        () => {
          //success function
          resolve();
        },
        (_, err) => {
          //error function
          reject(err);
        }
      );
    });
  });
  return promise;
};

export const insertPlace = (title, imageUri, address, lat, lng) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO places (title, imageUri, address, lat, lng) VALUES (?, ?, ?, ?, ?)`,
        [title, imageUri, address, lat, lng],
        (_, result) => {
          //success function
          resolve(result); 
        },
        (_, err) => {
          //error function
          reject(err);
        }
      );
    });
  });
  return promise;
}

export const fetchPlaces = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM places`,
        [],
        (_, result) => {
          //success function
          resolve(result); 
        },
        (_, err) => {
          //error function
          reject(err);
        }
      );
    });
  });
  return promise;
}
