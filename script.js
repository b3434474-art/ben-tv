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

    const selectedCategory = this.dataset.category;

    channels.forEach(channel => {
      if (selectedCategory === "all" || channel.dataset.category === selectedCategory) {
        channel.style.display = "flex";
      } else {
        channel.style.display = "none";
      }
    });
  });
});
