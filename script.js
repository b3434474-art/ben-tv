function updateClock() {
  const now = new Date();

  const time = now.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit"
  });

  document.getElementById("clock").textContent = time;
}

updateClock();
setInterval(updateClock, 1000);

const channels = document.querySelectorAll(".channel-card");
const categories = document.querySelectorAll(".category");
const searchInput = document.getElementById("search-input");
const noResults = document.getElementById("no-results");
const favoritesButton = document.getElementById("favorites-button");

let selectedCategory = "all";
let favoritesMode = false;

let favorites = JSON.parse(localStorage.getItem("benTVFavorites")) || [];

document.getElementById("youtube-button").addEventListener("click", function() {
  window.open("https://www.youtube.com/", "_blank");
});

document.getElementById("movies-button").addEventListener("click", function() {
  alert("Movies are coming next! 🎬");
});

favoritesButton.addEventListener("click", function() {
  favoritesMode = !favoritesMode;

  if (favoritesMode) {
    favoritesButton.textContent = "⭐ Favorites ON";
    selectedCategory = "all";

    categories.forEach(category => {
      category.classList.remove("active");
    });

    categories[0].classList.add("active");
  } else {
    favoritesButton.textContent = "⭐ Favorites";
  }

  filterChannels();
});

channels.forEach(channel => {
  const favorite = document.createElement("button");

  favorite.className = "favorite-button";
  favorite.textContent = favorites.includes(channel.dataset.url) ? "★" : "☆";
  favorite.title = "Add to favorites";

  favorite.addEventListener("click", function(event) {
    event.stopPropagation();

    const url = channel.dataset.url;

    if (favorites.includes(url)) {
      favorites = favorites.filter(item => item !== url);
      favorite.textContent = "☆";
    } else {
      favorites.push(url);
      favorite.textContent = "★";
    }

    localStorage.setItem("benTVFavorites", JSON.stringify(favorites));

    if (favoritesMode) {
      filterChannels();
    }
  });

  channel.appendChild(favorite);

  channel.addEventListener("click", function() {
    window.open(this.dataset.url, "_blank");
  });
});

categories.forEach(category => {
  category.addEventListener("click", function() {
    favoritesMode = false;
    favoritesButton.textContent = "⭐ Favorites";

    categories.forEach(button => {
      button.classList.remove("active");
    });

    this.classList.add("active");

    selectedCategory = this.dataset.category;

    filterChannels();
  });
});

searchInput.addEventListener("input", function() {
  filterChannels();
});

function filterChannels() {
  const searchText = searchInput.value.toLowerCase().trim();
  let visibleChannels = 0;

  channels.forEach(channel => {
    const channelText = channel.textContent.toLowerCase();
    const channelCategory = channel.dataset.category;
    const channelUrl = channel.dataset.url;

    const matchesSearch = channelText.includes(searchText);

    const matchesCategory =
      selectedCategory === "all" ||
      channelCategory === selectedCategory;

    const matchesFavorites =
      !favoritesMode ||
      favorites.includes(channelUrl);

    if (matchesSearch && matchesCategory && matchesFavorites) {
      channel.style.display = "flex";
      visibleChannels++;
    } else {
      channel.style.display = "none";
    }
  });

  noResults.style.display =
    visibleChannels === 0 ? "block" : "none";
}
