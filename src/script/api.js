import { addSavedMatch } from './db.js'

const BASE_URL = "https://api.football-data.org/v2";
const API_KEY = "be743db73dd74b4babb697ade6949cb3";
const OPTION = {
  headers: {
    "X-Auth-Token": API_KEY
  }
}
const LEAGUE = "2014" //liga Spanyol / La liga

// declare addSavedMatch from db to window
window.addSavedMatch = addSavedMatch;

let status = response => {
  if(response.status != 200){
      console.log(`Error : ${response.status}`)
      return Promise.reject(new Error(response.statusText()))
  }else{
      return Promise.resolve(response)
  }
}
// Blok kode untuk melakukan request data json
const getStandings = () => {
  if ('caches' in window) {
    caches.match(`${BASE_URL}/competitions/${LEAGUE}/standings?standingType=TOTAL`)
    .then(function(response) {
      if (response) {
        console.log("cache sukses standing")
        response.json().then(function (data) {
          const STANDINGS = data.standings[0].table;
          let standingHTML = "";
          STANDINGS.forEach(function(standing) {
            const LOGO = standing.team.crestUrl.replace(/^http:\/\//i, 'https://');
            standingHTML += `
              <div class="col s12 m6 l4">
                  <div class="card standing">
                    <div class="card-image">
                        <img class="logo" src="${LOGO}" style="height: 180px;"/>
                    </div>
                    <span class="card-title center">${standing.team.name}</span>
                    <div class="card-content">
                        <div class="standing-info">
                          <div class="standing-info-line">
                            <span>
                            <i class="fas fa-hashtag"></i>
                            Position
                            </span>
                            <span>${standing.position}</span>
                          </div>
                          <div class="standing-info-line">
                            <span>
                            <i class="fas fa-running"></i>
                            Play
                            </span>
                            <span>${standing.playedGames}</span>
                          </div>
                          <div class="standing-info-line">
                            <span>
                            <i class="fas fa-trophy"></i>
                            Won
                            </span>
                            <span>${standing.won}</span>
                          </div>
                          <div class="standing-info-line">
                            <span>
                            <i class="fas fa-window-close"></i>
                            Lost
                            </span>
                            <span>${standing.lost}</span>
                          </div>
                          <div class="standing-info-line">
                            <span>
                            <i class="fas fa-equals"></i>
                            Draw
                            </span>
                            <span>${standing.draw}</span>
                          </div>
                          <div class="standing-info-line">
                            <span>
                            <i class="fas fa-coins"></i>
                            Points
                            </span>
                            <span>${standing.points}</span>
                          </div>
                          <div class="standing-info-line">
                            <span>
                            <i class="far fa-futbol"></i>
                            Goals
                            </span>
                            <span>${standing.goalsFor}</span>
                        </div>
                      </div>
                  </div>
                </div>
              </div>     
            `;
         })

        document.querySelector("#standing").innerHTML = standingHTML;
      });
     }
   })
  }

  fetch(`${BASE_URL}/competitions/${LEAGUE}/standings?standingType=TOTAL`, OPTION)
    .then(status)
    .then(response => response.json())
    .then(function (data) {
      // Objek/array JavaScript dari response.json() masuk lewat data.
      // Menyusun komponen card artikel secara dinamis
      const STANDINGS = data.standings[0].table;
      let standingHTML = "";

      STANDINGS.forEach(function (standing) {
        const LOGO = standing.team.crestUrl.replace(/^http:\/\//i, 'https://');
        standingHTML += `
            <div class="col s12 m6 l4">
                <div class="card standing">
                  <div class="card-image">
                      <img class="logo" src="${LOGO}" style="height: 180px;"/>
                  </div>
                  <span class="card-title center">${standing.team.name}</span>
                  <div class="card-content">
                      <div class="standing-info">
                        <div class="standing-info-line">
                          <span>
                          <i class="fas fa-hashtag"></i>
                          Position
                          </span>
                          <span>${standing.position}</span>
                        </div>
                        <div class="standing-info-line">
                          <span>
                          <i class="fas fa-running"></i>
                          Play
                          </span>
                          <span>${standing.playedGames}</span>
                        </div>
                        <div class="standing-info-line">
                          <span>
                          <i class="fas fa-trophy"></i>
                          Won
                          </span>
                          <span>${standing.won}</span>
                        </div>
                        <div class="standing-info-line">
                          <span>
                          <i class="fas fa-window-close"></i>
                          Lost
                          </span>
                          <span>${standing.lost}</span>
                        </div>
                        <div class="standing-info-line">
                          <span>
                          <i class="fas fa-equals"></i>
                          Draw
                          </span>
                          <span>${standing.draw}</span>
                        </div>
                        <div class="standing-info-line">
                          <span>
                          <i class="fas fa-coins"></i>
                          Points
                          </span>
                          <span>${standing.points}</span>
                        </div>
                        <div class="standing-info-line">
                          <span>
                          <i class="far fa-futbol"></i>
                          Goals
                          </span>
                          <span>${standing.goalsFor}</span>
                      </div>
                    </div>
                </div>
              </div>
            </div>     
            `;
      })
      document.querySelector("#standing").innerHTML = standingHTML;
  });
}

const getUpcomingMatches = () => {
  return new Promise(function(resolve, reject) {
    // Ambil nilai query parameter (?id=)
    let urlParams = new URLSearchParams(window.location.search);
    let idParam = urlParams.get("id");

    if ("caches" in window) {
      caches.match(`${BASE_URL}/competitions/${LEAGUE}/matches?status=SCHEDULED$`)
        .then(function(response) {
          if (response) {
            response.json().then(function(data) {
            const MATCHES = data.matches;
              let matchesHTML = "";

              MATCHES.forEach(function(match) {
                matchesHTML += `
                <div class="col s12 m6">
                  <div class="card blue-grey darken-1">
                    <div class="card-content white-text">
                      <span class="card-title center">${match.utcDate.slice(0,10)}</span>
                      <p class="center">${match.homeTeam.name}</p> 
                      <p class="center">VS</p>
                      <p class="center">${match.awayTeam.name}</p>
                      <p class="center">UTC @${match.utcDate.slice(12,16)} </p>
                        <div>
                        <a class="btn-floating btn-large red">
                          <i onclick="addSavedMatch(${match.id},'${match.homeTeam.name}','${match.awayTeam.name}','${match.utcDate.slice(0,10)}')" class="large material-icons save">save</i>
                        </a>
                        </div>
                    </div>
                  </div>
                </div>
              `;
            })
            
            document.querySelector("#match-list").innerHTML = matchesHTML;
            // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
            resolve(match);
          });
        }
      });
    }
    fetch(`${BASE_URL}/competitions/${LEAGUE}/matches?status=SCHEDULED`, OPTION)
      .then(status)
      .then(response => response.json())
      .then(function(data) {
        const MATCHES = data.matches;
        let matchesHTML = "";
        MATCHES.forEach(function(match){
          matchesHTML += `
            <div class="col s12 m6">
              <div class="card blue-grey darken-1">
                <div class="card-content white-text">
                  <span class="card-title center">${match.utcDate.slice(0,10)}</span>
                  <p class="center">${match.homeTeam.name}</p> 
                  <p class="center">VS</p>
                  <p class="center">${match.awayTeam.name}</p>
                  <p class="center">UTC @${match.utcDate.slice(12,16)} </p>
                    <div>
                    <a class="btn-floating btn-large red">
                      <i onclick="addSavedMatch(${match.id},'${match.homeTeam.name}','${match.awayTeam.name}','${match.utcDate.slice(0,10)}')" class="large material-icons save">save</i>
                    </a>
                    </div>
                </div>
              </div>
            </div>
          `;
        })
            document.querySelector("#match-list").innerHTML = matchesHTML;
            // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
            resolve(MATCHES);
          });
      });
}

export { getStandings, getUpcomingMatches };

//<button onclick="addSavedMatch${match.id},'${match.homeTeam.name}','${match.awayTeam.name}','${match.utcDate.slice(0,10)}')" class="waves-effect waves-light btn orange accent-3">BOOKMARK</button>