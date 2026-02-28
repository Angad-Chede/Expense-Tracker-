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

let chart;

function getExpenses(){
    return JSON.parse(
        localStorage.getItem("expenses")
    ) || [];
}

function createGraph(labels,data,label){

    const ctx =
    document.getElementById("expenseChart");

    if(chart) chart.destroy();

    chart = new Chart(ctx,{
        type:"line",
        data:{
            labels:labels,
            datasets:[{
                label:label,
                data:data,
                borderColor:"#22d3ee",
                backgroundColor:"rgba(34,211,238,0.15)",
                fill:true,
                tension:0.4,
                pointRadius:5,
                pointBackgroundColor:"#22d3ee"
            }]
        },
        options:{
            responsive:true,
            plugins:{
                legend:{
                    labels:{color:"white"}
                }
            },
            scales:{
                x:{
                    ticks:{color:"white"},
                    grid:{color:"rgba(255,255,255,0.05)"}
                },
                y:{
                    ticks:{color:"white"},
                    grid:{color:"rgba(255,255,255,0.05)"}
                }
            }
        }
    });
}

function loadMonthly(){

    let expenses=getExpenses();
    let days=new Array(31).fill(0);

    expenses.forEach(e=>{
        let d=new Date(e.date);
        let day=d.getDate()-1;
        days[day]+=Number(e.amount);
    });

    createGraph(
        [...Array(31).keys()].map(i=>i+1),
        days,
        "Monthly Expenses"
    );
}

function loadDaily(){

    let expenses=getExpenses();
    let today=new Date().toISOString().split("T")[0];
    let total=0;

    expenses.forEach(e=>{
        if(e.date===today)
            total+=Number(e.amount);
    });

    createGraph(
        ["Today"],
        [total],
        "Today's Spending"
    );
}

function loadYearly(){

    let expenses=getExpenses();
    let months=new Array(12).fill(0);

    expenses.forEach(e=>{
        let m=new Date(e.date).getMonth();
        months[m]+=Number(e.amount);
    });

    createGraph(
        ["Jan","Feb","Mar","Apr","May","Jun",
         "Jul","Aug","Sep","Oct","Nov","Dec"],
        months,
        "Yearly Expenses"
    );
}