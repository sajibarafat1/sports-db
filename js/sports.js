const loadPlayers = (search) => {
  const url = `https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=${search}`;
  // console.log(url);
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayPlayers(data.player));
};

const displayPlayers = (players) => {
  // console.log(players);
  const playersContainer = document.getElementById("players-container");
  playersContainer.innerHTML = "";
  players.forEach((player) => {
    console.log(player);
    const playersDiv = document.createElement("div");
    playersDiv.classList.add("col");
    playersDiv.innerHTML = `
    <div class="card h-100">
    <img src="${player.strThumb}" class="card-img-top" alt="..." />
    <div class="card-body">
      <h1>${player.strGender}</h1>
      <h2>${player.strBirthLocation}</h2>
      <h3>${player.strNationality}</h3>
      <h5 class="card-title">${player.strPlayer}</h5>
      <p class="card-text">
        ${player.strDescriptionEN.slice(0, 120)}
      </p>
      <button onclick="loadPlayersDetails('${
        player.idPlayer
      }')" class="btn btn-danger">Players Details</button>
    </div>
  </div>
    `;
    playersContainer.appendChild(playersDiv);
  });
};

const searchPlayers = () => {
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  // console.log(loadPlayers);
  loadPlayers(searchText);
  searchField.value = "";
};

const loadPlayersDetails = (idPlayer) => {
  // console.log(idPlayer);
  const url = `https://www.thesportsdb.com/api/v1/json/3/lookupplayer.php?id=${idPlayer}`;
  // console.log(url);
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayPlayersDetails(data.players[0]));
};

const displayPlayersDetails = (player) => {
  const playersDetails = document.getElementById("players-details");
  playersDetails.innerHTML = "";
  const playersDiv = document.createElement("div");
  playersDiv.classList.add("card");
  playersDiv.innerHTML = `
  <img src="${player.strThumb}" class="card-img-top" alt="..." />
  <div class="card-body">
  <h1>${player.strGender}</h1>
  <h2>${player.strBirthLocation}</h2>
  <h3>${player.strNationality}</h3>
  <h5 class="card-title">${player.strPlayer}</h5>
  <p class="card-text">
    ${player.strDescriptionEN.slice(0, 120)}
  </p>
  </div>
  `;
  playersDetails.appendChild(playersDiv);
};

loadPlayers("messi");
