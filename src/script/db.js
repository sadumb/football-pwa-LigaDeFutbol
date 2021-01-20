let dbPromise = idb.open('savedMatches', 1, (upgradeDB) => {
  if (!upgradeDB.objectStoreNames.contains('matches')) {
    upgradeDB.createObjectStore('matches');
  }
});

const saveMatch = ({ id, home, away, date }) => {
  dbPromise
    .then((db) => {
      let tx = db.transaction('matches', 'readwrite');
      let store = tx.objectStore('matches');
      let item = {
        id: id,
        home: home,
        away: away,
        date: date,
      };
      store.put(item, id); //menambahkan key "teams"
      return tx.complete;
    })
    .then(() =>
      M.toast({ html: `Berhasil Menyimpan pertandingan!`, classes: 'rounded' })
    )
    .catch(() => console.log('Gagal Menyimpan Pertandingan'));
};

const deleteMatch = (id) => {
  dbPromise
    .then((db) => {
      let tx = db.transaction('matches', 'readwrite');
      let store = tx.objectStore('matches');
      store.delete(id);
      return tx.complete;
    })
    .then(() => console.log('Item Deleted'));
};

const getMatch = () => {
  return new Promise(function (resolve, reject) {
    dbPromise
      .then((db) => {
        let tx = db.transaction('matches', 'readonly');
        let store = tx.objectStore('matches');

        return store.getAll();
      })
      .then((data) => {
        resolve(data);
      });
  });
};
export { saveMatch, getMatch, deleteMatch };
