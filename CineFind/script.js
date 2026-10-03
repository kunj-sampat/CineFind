const API_KEY = "api_key";

let watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];

function searchMovie() {

    const movieName = document.getElementById("movieInput").value;
    const message = document.getElementById("message");

    if (movieName === "") {
        message.innerText = "Please enter a movie name.";
        return;
    }

    message.innerText = "Searching...";

    fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&t=${movieName}`)
        .then(response => response.json())
        .then(data => {

            if (data.Response === "False") {
                message.innerText = "Movie not found.";
                return;
            }

            message.innerText = "";

            showMovie(data);
        })
        .catch(error => {

            message.innerText = "Something went wrong.";
        });
}


function showMovie(movie) {

    const container = document.getElementById("movieContainer");

    container.innerHTML = `
        <div class="movie-card">

            <img src="${movie.Poster}" alt="${movie.Title}">

            <div class="movie-info">

                <h2>${movie.Title}</h2>

                <p><strong>Year:</strong> ${movie.Year}</p>

                <p><strong>Genre:</strong> ${movie.Genre}</p>

                <p><strong>Rating:</strong> ⭐ ${movie.imdbRating}</p>

                <p><strong>Director:</strong> ${movie.Director}</p>

                <p>${movie.Plot}</p>

                <button class="watch-button"
                    onclick='addToWatchlist(${JSON.stringify({
                        title: movie.Title,
                        year: movie.Year
                    })})'>

                    Add to Watchlist

                </button>

            </div>

        </div>
    `;
}


function addToWatchlist(movie) {

    const alreadyAdded = watchlist.some(item => item.title === movie.title);

    if (alreadyAdded) {
        alert("Movie is already in your watchlist.");
        return;
    }

    watchlist.push(movie);

    localStorage.setItem("watchlist", JSON.stringify(watchlist));

    showWatchlist();
}


function showWatchlist() {

    const watchlistContainer = document.getElementById("watchlist");

    watchlistContainer.innerHTML = "";

    if (watchlist.length === 0) {

        watchlistContainer.innerHTML = "<p>No movies added yet.</p>";

        return;
    }

    watchlist.forEach((movie, index) => {

        watchlistContainer.innerHTML += `
            <div class="watchlist-item">

                <span>
                    ${movie.title} (${movie.year})
                </span>

                <button
                    class="remove-button"
                    onclick="removeMovie(${index})">

                    Remove

                </button>

            </div>
        `;
    });
}


function removeMovie(index) {

    watchlist.splice(index, 1);

    localStorage.setItem("watchlist", JSON.stringify(watchlist));

    showWatchlist();
}


showWatchlist();