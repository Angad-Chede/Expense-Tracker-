window.addEventListener("load", initApp);

function initApp(){
    setupModals();
    setupExpenseForm();
    setupBalanceSystem();

    loadExpenses();
    loadMonthly();
    updateBalance();
}

function getExpenses(){
    return JSON.parse(
        localStorage.getItem("expenses")
    ) || [];
}

function saveExpenses(expenses){
    localStorage.setItem(
        "expenses",
        JSON.stringify(expenses)
    );
}


function calculateCurrentBalance(){

    const totalBalance =
        Number(localStorage.getItem("balance")) || 0;

    const expenses = getExpenses();

    let totalExpenses = 0;

    expenses.forEach(exp=>{
        totalExpenses += Number(exp.amount);
    });

    return totalBalance - totalExpenses;
}

function updateBalance(){

    let value = calculateCurrentBalance();

    if(isNaN(value)) value = 0;

    document.querySelector(".amount")
    .textContent = "₹ " + value;
}

function setupModals(){

    const expenseModal =
        document.getElementById("expenseModal");

    document.getElementById("openExpenseModal")
    .onclick=()=>expenseModal.style.display="flex";

    document.querySelector(".close-modal")
    .onclick=()=>expenseModal.style.display="none";


    const balanceModal =
        document.getElementById("balanceModal");

    document.getElementById("openBalanceModal")
    .onclick=()=>balanceModal.style.display="flex";

    document.querySelector(".close-balance")
    .onclick=()=>balanceModal.style.display="none";
}


function setupExpenseForm(){

    document.getElementById("expenseForm")
    .onsubmit=function(e){

        e.preventDefault();

        const name =
        document.getElementById("expenseName").value;

        const date =
        document.getElementById("expenseDate").value;

        const amount =
        Number(
            document.getElementById("expenseAmount").value
        );

        let expenses=getExpenses();

        expenses.push({
            name,
            date,
            amount:Number(amount),
            time:new Date().getHours()
        });

        saveExpenses(expenses);

        this.reset();

        document.getElementById("expenseModal")
        .style.display="none";

        loadExpenses();
        updateBalance();
        loadMonthly();
    };
}

function loadExpenses(){

    const list =
        document.getElementById("expenseList");

    list.innerHTML="";

    const expenses=getExpenses();

    expenses.forEach(exp=>{

        const div=document.createElement("div");
        div.className="expense";

        div.innerHTML=`
            <div>${exp.name}</div>
            <div>${exp.date}</div>
            <div>₹ ${exp.amount}</div>
        `;

        list.appendChild(div);
    });
}


function setupBalanceSystem(){

    document.getElementById("saveBalance")
    .onclick=function(){

        const amount =
        Number(
            document.getElementById("balanceAmount").value
        );

        if(!amount){
            alert("Enter amount");
            return;
        }

        let currentBalance =
            Number(localStorage.getItem("balance"))||0;

        currentBalance+=amount;

        localStorage.setItem(
            "balance",
            currentBalance
        );

        document.getElementById(
            "balanceAmount"
        ).value="";

        document.getElementById("balanceModal")
        .style.display="none";

        updateBalance();
    };
}

let chart;

function renderChart(labels,data,title){

    if(chart) chart.destroy();

    const options={
        chart:{
            type:"line",
            height:350,
            background:"transparent",
            toolbar:{show:false}
        },

        series:[{
            name:title,
            data:data
        }],

        theme:{mode:"dark"},

        stroke:{
            curve:"smooth",
            width:3
        },

        grid:{
            borderColor:
            "rgba(255,255,255,0.08)"
        },

        xaxis:{
            categories:labels
        },

        tooltip:{theme:"dark"}
    };

    chart=new ApexCharts(
        document.querySelector("#expenseChart"),
        options
    );

    chart.render();
}


function loadMonthly(){

    const expenses=getExpenses();
    const days=new Array(31).fill(0);

    expenses.forEach(e=>{
        const d=new Date(e.date);
        days[d.getDate()-1]+=e.amount;
    });

    renderChart(
        [...Array(31).keys()].map(i=>i+1),
        days,
        "Monthly Expenses"
    );
}


function loadDaily(){

    const expenses=getExpenses();
    const hours=new Array(24).fill(0);

    const today=
    new Date().toISOString().split("T")[0];

    expenses.forEach(e=>{
        if(e.date===today){
            const hour=e.time ?? 0;
            hours[hour]+=e.amount;
        }
    });

    renderChart(
        [...Array(24).keys()].map(h=>h+":00"),
        hours,
        "Today's Hourly Spending"
    );
}


function loadYearly(){

    const expenses=getExpenses();
    const months=new Array(12).fill(0);

    expenses.forEach(e=>{
        const m=
        new Date(e.date).getMonth();
        months[m]+=e.amount;
    });

    renderChart(
        ["Jan","Feb","Mar","Apr","May","Jun",
         "Jul","Aug","Sep","Oct","Nov","Dec"],
        months,
        "Yearly Expenses"
    );
}


window.loadDaily=loadDaily;
window.loadMonthly=loadMonthly;
window.loadYearly=loadYearly;
