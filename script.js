// === SHOW TELEGRAM USER INFO ===
let user = null;

if (window.Telegram && Telegram.WebApp) {
  Telegram.WebApp.ready();
  user = Telegram.WebApp.initDataUnsafe?.user || null;
}

const welcomeText = document.querySelector(".welcome-text");
if (user && welcomeText) {
  welcomeText.textContent = `Welcome ${user.first_name}`;
}

// === PAGE NAVIGATION ===
document.querySelectorAll(".bottom-nav button").forEach(btn => {
  btn.addEventListener("click", () => {
    const section = btn.dataset.section;
    document.querySelectorAll(".section").forEach(sec => sec.style.display = "none");
    document.querySelector(`#${section}`).style.display = "block";
  });
});

// === RECHARGE BUTTON ===
document.querySelector(".btn-recharge").addEventListener("click", async () => {
  const amount = prompt("Enter amount to recharge:");
  if (amount && !isNaN(amount)) {
    const userId = user?.id || "unknown";
    try {
      const response = await fetch("/api/recharge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, amount }),
      });
      const data = await response.json();
      alert("Recharge request sent for Ksh " + amount + ". Please complete payment and wait for approval.");
    } catch (error) {
      alert("Error sending recharge. Try again later.");
      console.error(error);
    }
  }
});
