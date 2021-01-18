import { saveMatch, getMatch, deleteMatch } from './db.js'

const addSavedMatch = (id,home,away,date) => {
    //Add To Database
    saveMatch({id,home,away,date})
    //Display Toast
    console.log('berhasil menambahkan match')
}

// get all match from db 
const getAllMatch = () => {
    //Get All saved match From Database
      getMatch()
        .then(data => {
            let matchHTML = ''
            data.forEach(match => {
              matchHTML += `
              <div class="col s12 m6">
                <div class="card blue-grey darken-1">
                  <div class="card-content white-text">
                    <span class="card-title center">${match.date.slice(0,10)}</span>
                    <p class="center">${match.home}</p> 
                    <p class="center">VS</p>
                    <p class="center">${match.away}</p>
                    <p class="center">UTC @${match.date.slice(12-15)} </p>
                    <div>
                    <a class="btn-floating btn-large red">
                      <i onclick="deleteSavedMatch(${match.id},'${match.date}')" class="large material-icons save">delete</i>
                    </a>
                    </div>
                  </div>
                </div>
              </div>
            `;
          })
          document.querySelector("#saved-matches").innerHTML = matchHTML;
      });
}

const deleteSavedMatch = (id,date) => {
    //Confirm Delete Bookmark ?
    let confirmation = confirm
    (`Apakah Anda Yakin ingin menghapus pertandingan pada tanggal ${date.slice(0, 10)} dari daftar tontonan?`)
    if(confirmation){
        //Delete Team From Database
        deleteMatch(id)
        //Fetch All Team
        getAllMatch()
        //Display Toast
        M.toast({html: `Berhasil Menghapus pertandingan!`, classes: 'rounded'})
    }
    
}

export { getAllMatch, addSavedMatch, deleteSavedMatch };