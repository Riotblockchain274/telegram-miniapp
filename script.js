// Simulated user from Telegram WebApp
const user = window.Telegram?.WebApp?.initDataUnsafe?.user || { first_name: "User" };

// Show user name on homepage
document.addEventListener("DOMContentLoaded", () => {
  const welcomeText = document.getElementById("welcome");
  if (welcomeText) welcomeText.textContent = `Welcome, ${user.first_name}`;
});

// Navigation between sections
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".bottom-nav button").forEach(btn => {
    btn.addEventListener("click", () => {
      const section = btn.dataset.section;
      document.querySelectorAll(".section").forEach(sec => sec.style.display = "none");
      document.getElementById(section).style.display = "block";
    });
  });
});

// Recharge handler
document.addEventListener("DOMContentLoaded", () => {
  const rechargeBtn = document.querySelector(".btn-recharge");
  if (rechargeBtn) {
    rechargeBtn.addEventListener("click", async () => {
      const amount = prompt("Enter amount to recharge (Ksh):");
      if (amount && !isNaN(amount)) {
        const userId = user?.id || "unknown";
        try {
          const response = await fetch("/api/recharge", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId, amount }),
          });
          const data = await response.json();
          alert("Recharge request sent for Ksh " + amount + ". Wait for approval.");
        } catch (error) {
          alert("Error sending recharge. Try again later.");
          console.error(error);
        }
      }
    });
  }
});
