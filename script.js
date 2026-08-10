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

document.getElementById("youtube-button").addEventListener("click", function() {
  window.open("https://www.youtube.com/", "_blank");
});

document.getElementById("movies-button").addEventListener("click", function() {
  alert("Movies are coming next! 🎬");
});

document.getElementById("favorites-button").addEventListener("click", function() {
  alert("Favorites are coming next! ⭐");
});

const channels = document.querySelectorAll(".channel-card");
const categories = document.querySelectorAll(".category");
const searchInput = document.getElementById("search-input");
const noResults = document.getElementById("no-results");

let selectedCategory = "all";

channels.forEach(channel => {
  channel.addEventListener("click", function() {
    window.open(this.dataset.url, "_blank");
  });
});

categories.forEach(category => {
  category.addEventListener("click", function() {
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

    const matchesSearch = channelText.includes(searchText);
    const matchesCategory =
      selectedCategory === "all" ||
      channelCategory === selectedCategory;

    if (matchesSearch && matchesCategory) {
      channel.style.display = "flex";
      visibleChannels++;
    } else {
      channel.style.display = "none";
    }
  });

  if (visibleChannels === 0) {
    noResults.style.display = "block";
  } else {
    noResults.style.display = "none";
  }
}
