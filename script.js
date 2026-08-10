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

const cards = document.querySelectorAll(".card");

cards.forEach(card => {
  card.addEventListener("click", () => {
    const name = card.textContent.trim();

    if (card.dataset.url) {
      window.open(card.dataset.url, "_blank");
      return;
    }

    if (name.includes("YouTube")) {
      window.open("https://www.youtube.com/", "_blank");
      return;
    }

    if (name.includes("Live TV")) {
      document.getElementById("live-tv-section").scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
      return;
    }

    if (name.includes("Movies")) {
      alert("Movies are coming next! 🎬");
      return;
    }

    if (name.includes("Favorites")) {
      alert("Favorites are coming next! ⭐");
      return;
    }
  });
});
