// Clock
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


// Card actions
const cards = document.querySelectorAll(".card");

cards.forEach(card => {
  card.addEventListener("click", () => {
    const name = card.textContent.trim();

    if (name.includes("YouTube")) {
      window.open("https://www.youtube.com/", "_blank");
    }

    if (name.includes("Live TV")) {
      alert("Live TV is coming next! 📡");
    }

    if (name.includes("Movies")) {
      alert("Movies are coming next! 🎬");
    }

    if (name.includes("Favorites")) {
      alert("Favorites are coming next! ⭐");
    }
  });
});
