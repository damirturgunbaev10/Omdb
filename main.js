const elResults = document.querySelector("#results");
const elForm = document.querySelector("#form");
const elInput = document.querySelector("#search");

function getData(url) {
  axios.get(url).then((res) => {
    showData(res.data);
  });
}

elForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchValue = elInput.value.trim();
  if (!searchValue) return;

  getData(`https://www.omdbapi.com/?s=${searchValue}&apikey=d48b840d`);
});

elResults.addEventListener("click", (e) => {
  const card = e.target.closest(".card");
  if (!card) return;

  const imdbID = card.dataset.id;
  showOneMovie(imdbID);
});

function showData(data) { 
  if (data.Response !== "True") {
    elResults.innerHTML = "<h1>No results</h1>";
    return;
  }

  elResults.innerHTML = data.Search.map(
    (movie, index) => `
      <div class="card" data-index="${index}" data-id="${movie.imdbID}">
        <h1 class='card__title'>${movie.Title.slice(0, 20)}</h1>
        <img class='card__img' src="${movie.Poster}" alt="${movie.Title}" />
        <div class='card__info'> <p class='card__type'> Type: ${movie.Type}
        </p> <p class='card__year'>${movie.Year}</p> </div>
      </div>
    `
  ).join("");
}

function showOneMovie(id) {
  axios.get(`http://www.omdbapi.com/?i=${id}&apikey=d48b840d`).then((res) => {
    const movie = res.data;
    console.log(res.data);

    elResults.innerHTML = `
        <div class="movie-detail">
        <div class="movie-detail-left">
            <h1 class='movie-detail__title'>${movie.Title}</h1>
            <img class='movie-detail__img' src="${movie.Poster}" alt="${movie.Title}" />
        </div>

        <div class="movie-detail-left">
            <h3><span>ImdbRating: </span>${movie.imdbRating}</h3>
            <h3><span>ImdbVotes: </span>${movie.imdbVotes}</h3>
            <h3><span>Metascore:</span> ${movie.Metascore}</h3>
            <h3><span>Type: </span>${movie.Type}</h3>
            <h3><span>Released: </span>${movie.Released}</h3>
            <h3><span>Country: </span>${movie.Country}</h3>
            <h3><span>Language: </span>${movie.Language}</h3>
            <h3><span>Genre: </span>${movie.Genre}</h3>
            <h3><span>BoxOffice: </span>${movie.BoxOffice}</h3>
            <h3><span>Director: </span>${movie.Director}</h3>
            <h3><span>Writer: </span>${movie.Writer}</h3>
            <h3><span>Actors: </span>${movie.Actors}</h3>
            <h3><span>Awards: </span>${movie.Awards}</h3>
            <h3><span>Plot: </span>${movie.Plot}</h3>
            <h3><span>Runtime: </span>${movie.Runtime}</h3>
            <h3><span>DVD: </span>${movie.DVD}</h3>
            <h3><span>Website: </span>${movie.Website}</h3>
            <h3><span>Production: </span>${movie.Production}</h3>
        </div>
        </div>
        `;
  });
}
