function searchMovie() {
  const query = document.getElementById("searchInput").value.trim();
  const apiURL = "https://www.omdbapi.com/?apikey=8f3f2f42&s=" + query;

  const resultDiv = document.getElementById("movieResult");

  if (query === "") {
    resultDiv.innerHTML = `<p class="text-red-500">Lütfen bir film adı gir.</p>`;
    return;
  }

  resultDiv.innerHTML = `<p class="text-gray-400">Yükleniyor...</p>`;

  fetch(apiURL)
    .then(res => res.json())
    .then(data => {
      if (data.Response === "True") {
        const movies = data.Search;
        resultDiv.innerHTML = "";

        movies.forEach(movie => {
          resultDiv.innerHTML += `
            <div class="bg-zinc-800 p-4 rounded-xl shadow hover:scale-105 transition">
              <img src="${movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300x445?text=No+Image"}"
                   alt="${movie.Title}" class="rounded mb-3 w-full h-[400px] object-cover">
              <h2 class="text-xl font-semibold">${movie.Title}</h2>
              <p class="text-sm text-gray-400">${movie.Year}</p>
              <button onclick="getDetails('${movie.imdbID}')" class="mt-2 px-4 py-2 bg-red-600 rounded hover:bg-red-700">
                
              </button>
            </div>
          `;
        });
      } else {
        resultDiv.innerHTML = `<p class="text-red-500">Film bulunamadı.</p>`;
      }
    });
}

function getDetails(imdbID) {
  const apiURL = "https://www.omdbapi.com/?apikey=8f3f2f42&i=" + imdbID;

  fetch(apiURL)
    .then(res => res.json())
    .then(data => {
      // Modal içeriğini güncelle
      document.getElementById("modalTitle").innerText = data.Title;
      document.getElementById("modalYear").innerText = `(${data.Year})`;
      document.getElementById("modalGenre").innerText = `Tür: ${data.Genre}`;
      document.getElementById("modalActors").innerText = `Oyuncular: ${data.Actors}`;
      document.getElementById("modalPlot").innerText = `Konu: ${data.Plot}`;
      document.getElementById("modalRating").innerText = `IMDB Puanı: ⭐ ${data.imdbRating}`;
      
      // Modal'ı göster
      document.getElementById("modal").classList.remove("hidden");
    });
}

function closeModal() {
  // Modal'ı gizle
  document.getElementById("modal").classList.add("hidden");
}

document.getElementById("searchInput").addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    searchMovie();
  }
});
