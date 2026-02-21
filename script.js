window.onload = function () {
    loadExpenses();

    const savedBalance = localStorage.getItem("balance");
    if (savedBalance) {
        document.querySelector(".amount").textContent = "₹ " + savedBalance;
    }
};

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

    const expense = { name, date, amount };

    let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
    expenses.push(expense);

    localStorage.setItem("expenses", JSON.stringify(expenses));

    modal.style.display = "none";
    this.reset();
    loadExpenses();
};

function loadExpenses() {
    const list = document.getElementById("expenseList");
    list.innerHTML = "";

    let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
    let savedBalance = Number(localStorage.getItem("balance")) || 0;

    let totalExpenses = 0;

    expenses.forEach(exp => {
        totalExpenses += Number(exp.amount);

        const div = document.createElement("div");
        div.className = "expense";

        div.innerHTML = `
            <div>${exp.name}</div>
            <div>${exp.date}</div>
            <div>₹ ${exp.amount}</div>
        `;

        list.appendChild(div);
    });

    const remainingBalance = savedBalance - totalExpenses;

    document.querySelector(".amount").textContent = "₹ " + remainingBalance;
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

    localStorage.setItem("balance", amount);
    loadExpenses();

    balanceModal.style.display = "none";
};