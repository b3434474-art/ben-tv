function updateClock() {
  const now = new Date();
  const time = now.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit"
  });

  const clock = document.getElementById("clock");
  if (clock) clock.textContent = time;
}

updateClock();
setInterval(updateClock, 1000);

const channels = document.querySelectorAll(".channel-card");
const categories = document.querySelectorAll(".category:not(#favorites-button)");
const searchInput = document.getElementById("search-input");
const noResults = document.getElementById("no-results");
const favoritesButton = document.getElementById("favorites-button");

let selectedCategory = "all";
let favoritesMode = false;

let favorites = JSON.parse(
  localStorage.getItem("benTVFavorites") || "[]"
);

channels.forEach(channel => {
  const favorite = document.createElement("button");
  favorite.className = "favorite-button";
  favorite.type = "button";
  favorite.textContent = favorites.includes(channel.dataset.url) ? "★" : "☆";
  favorite.title = favorites.includes(channel.dataset.url)
    ? "Remove from favorites"
    : "Add to favorites";
  favorite.setAttribute("aria-label", favorite.title);

  favorite.addEventListener("click", event => {
    event.stopPropagation();
    const url = channel.dataset.url;

    if (favorites.includes(url)) {
      favorites = favorites.filter(item => item !== url);
      favorite.textContent = "☆";
      favorite.title = "Add to favorites";
      favorite.setAttribute("aria-label", "Add to favorites");
    } else {
      favorites.push(url);
      favorite.textContent = "★";
      favorite.title = "Remove from favorites";
      favorite.setAttribute("aria-label", "Remove from favorites");
    }

    localStorage.setItem("benTVFavorites", JSON.stringify(favorites));

    if (favoritesMode) filterChannels();
  });

  channel.appendChild(favorite);

  function openPlayer() {
    const playerIndex = channel.dataset.player;
    if (playerIndex === undefined) return;
    window.location.href = "player.html?channel=" + playerIndex;
  }

  channel.addEventListener("click", event => {
    if (!event.target.closest(".favorite-button")) openPlayer();
  });

  channel.addEventListener("keydown", event => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openPlayer();
    }
  });
});

categories.forEach(category => {
  category.addEventListener("click", () => {
    favoritesMode = false;
    if (favoritesButton) favoritesButton.textContent = "⭐ Favorites";

    categories.forEach(button => button.classList.remove("active"));
    category.classList.add("active");
    selectedCategory = category.dataset.category;
    filterChannels();
  });
});

if (favoritesButton) {
  favoritesButton.addEventListener("click", () => {
    favoritesMode = !favoritesMode;

    if (favoritesMode) {
      favoritesButton.textContent = "⭐ Favorites ON";
      categories.forEach(category => category.classList.remove("active"));

      const allCategory = document.querySelector(
        '.category[data-category="all"]'
      );
      if (allCategory) allCategory.classList.add("active");

      selectedCategory = "all";
    } else {
      favoritesButton.textContent = "⭐ Favorites";
    }

    filterChannels();
  });
}

if (searchInput) searchInput.addEventListener("input", filterChannels);

function filterChannels() {
  const searchText = searchInput
    ? searchInput.value.toLowerCase().trim()
    : "";

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

  if (noResults) {
    noResults.style.display = visibleChannels === 0 ? "block" : "none";
  }
}

filterChannels();
