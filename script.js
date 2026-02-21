window.onload = loadExpenses;

const modal = document.getElementById("expenseModal");
const openBtn = document.getElementById("openExpenseModal");
const closeBtn = document.querySelector(".close-modal");

openBtn.onclick = function () {
    modal.style.display = "flex";
};

closeBtn.onclick = function () {
    modal.style.display = "none";
};

document.getElementById("expenseForm").onsubmit = function (e) {
    e.preventDefault();

    const name = document.getElementById("expenseName").value;
    const date = document.getElementById("expenseDate").value;
    const amount = document.getElementById("expenseAmount").value;

    fetch("localStorage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, date, amount })
    })
        .then(() => {
            modal.style.display = "none";
            loadExpenses();
            this.reset();
        });
};

function loadExpenses() {
    fetch("localStorage")
        .then(res => res.json())
        .then(data => {

            const list = document.getElementById("expenseList");
            list.innerHTML = "";

            let total = 0;

            data.forEach(exp => {
                total += Number(exp.amount);

                const div = document.createElement("div");
                div.className = "expense";

                div.innerHTML = `
                    <div>${exp.name}</div>
                    <div>${exp.date}</div>
                    <div>₹ ${exp.amount}</div>
                `;

                list.appendChild(div);
            });

            document.querySelector(".amount").textContent = "₹ " + total;
        });
}

const balanceModal = document.getElementById("balanceModal");
const openBalanceBtn = document.getElementById("openBalanceModal");
const closeBalanceBtn = document.querySelector(".close-balance");

openBalanceBtn.onclick = function () {
    balanceModal.style.display = "flex";
};

closeBalanceBtn.onclick = function () {
    balanceModal.style.display = "none";
};

document.getElementById("saveBalance").onclick = function () {
    const amount = Number(document.getElementById("balanceAmount").value);

    if (!amount) {
        alert("Enter amount");
        return;
    }

    fetch("localStorage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: amount })
    })
        .then(res => res.json())
        .then(data => {
            document.querySelector(".amount").textContent = "₹ " + data.balance;
            balanceModal.style.display = "none";
        });
};