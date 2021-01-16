let dbPromise = idb.open('savedMatches', 1, upgradeDB => {
  if(!upgradeDB.objectStoreNames.contains('matches')){
      upgradeDB.createObjectStore('matches')
  }
})

const saveMatch = ({id,home,away,date}) => {
  dbPromise
  .then(db => {
      let tx = db.transaction('matches', 'readwrite');
      let store = tx.objectStore('matches');
      let item = {
          id: id,
          home: home,
          away: away,
          utcDate: date,
          created: new Date().getTime()
      };
      store.put(item, id); //menambahkan key "teams"
      return tx.complete;
  })
  .then(() => console.log('Berhasil Menyimpan Pertandingan'))
  .catch(() => console.log('Gagal Menyimpan Pertandingan'))
}

const addSavedMatch = (id,home,away,date) => {
  //Add To Database
  saveMatch({id,home,away,date})
  //Display Toast
  console.log('berhasil menambahkan match')
}

export { saveMatch, addSavedMatch };