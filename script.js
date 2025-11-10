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
// === RECHARGE FLOW PAGE ===
async function showRechargePage() {
  try {
    const res = await fetch("/data.json");
    const data = await res.json();

    const rechargeHtml = `
      <div class="recharge-page">
        <h2>Recharge Options</h2>

        <div class="recharge-option" style="color:green;">
          <img src="https://upload.wikimedia.org/wikipedia/commons/1/1e/Safaricom_logo.svg" width="60"><br>
          Step 1: Send payment to <b>${data.safaricom.number}</b> (Safaricom)
        </div>

        <div class="recharge-option" style="color:red; margin-top:15px;">
          <img src="https://upload.wikimedia.org/wikipedia/commons/f/f0/Airtel_logo.svg" width="60"><br>
          Step 2: Send payment to <b>${data.airtel.number}</b> (Airtel)
        </div>

        <button class="btn-check">Check Payment</button>
      </div>
    `;

    const home = document.querySelector("#home");
    home.innerHTML = rechargeHtml;

    document.querySelector(".btn-check").addEventListener("click", () => {
      alert("Payment verification pending — admin will confirm your payment.");
    });
  } catch (e) {
    alert("Error loading recharge options");
    console.error(e);
  }
}

// Replace recharge click to open new page
const rechargeBtn = document.querySelector(".btn-recharge");
rechargeBtn.removeEventListener("click", () => {});
rechargeBtn.addEventListener("click", showRechargePage);
