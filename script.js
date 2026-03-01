window.addEventListener("load", initApp);

let chart;

function initApp(){
    setupModals();
    setupExpenseForm();
    setupBalanceSystem();
    loadExpenses();
    updateBalance();
    loadMonthly();
}

function getExpenses(){
    return JSON.parse(localStorage.getItem("expenses")) || [];
}

function saveExpenses(data){
    localStorage.setItem("expenses",JSON.stringify(data));
}

function calculateCurrentBalance(){
    const balance =
        Number(localStorage.getItem("balance")) || 0;

    const expenses = getExpenses();

    let spent = 0;

    expenses.forEach(e=>{
        spent += Number(e.amount);
    });

    return balance - spent;
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

    const balanceModal =
        document.getElementById("balanceModal");

    document.getElementById("openExpenseModal")
    .onclick=()=>expenseModal.style.display="flex";

    document.querySelector(".close-modal")
    .onclick=()=>expenseModal.style.display="none";

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

        const amount =
        Number(
            document.getElementById("expenseAmount").value
        );

        if(!name || !amount) return;

        const now = new Date();

        const expense={
            name,
            amount,
            date:now.toISOString().split("T")[0],
            time:now.getHours()
        };

        const expenses=getExpenses();

        expenses.push(expense);

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

    const grouped={};

    expenses.forEach(e=>{
        if(!grouped[e.date])
            grouped[e.date]=[];

        grouped[e.date].push(e);
    });

    Object.keys(grouped)
    .sort((a,b)=>new Date(b)-new Date(a))
    .forEach(date=>{

        const header=document.createElement("div");
        header.className="expense-date-header";
        header.textContent=date;

        list.appendChild(header);

        grouped[date].forEach(exp=>{

            const row=document.createElement("div");
            row.className="expense";

            row.innerHTML=`
                <div>${exp.name}</div>
                <div></div>
                <div>₹ ${exp.amount}</div>
            `;

            list.appendChild(row);
        });
    });
}

function setupBalanceSystem(){

    document.getElementById("saveBalance")
    .onclick=function(){

        const amount=
        Number(
            document.getElementById("balanceAmount").value
        );

        if(!amount) return;

        let current=
            Number(localStorage.getItem("balance"))||0;

        current+=amount;

        localStorage.setItem("balance",current);

        document.getElementById("balanceAmount").value="";

        document.getElementById("balanceModal")
        .style.display="none";

        updateBalance();
    };
}

function renderChart(labels,data,title){

    if(chart){
        chart.destroy();
    }

    chart=new ApexCharts(
        document.querySelector("#expenseChart"),
        {
            chart:{
                type:"line",
                height:350,
                background:"transparent",
                toolbar:{show:false},
                foreColor:"#010408ff"
            },

            series:[{
                name:title,
                data:data
            }],

            stroke:{
                curve:"smooth",
                width:6,
                colors:["#050104ff"]
            },

            markers:{
                size:4,
                colors:["#030105ff"],
                strokeColors:"#030305ff",
                strokeWidth:2
            },

            fill:{
                type:"gradient",
                gradient:{
                    shade:"dark",
                    type:"vertical",
                    opacityFrom:.45,
                    opacityTo:.05,
                    stops:[0,100]
                }
            },

            grid:{
                borderColor:"rgba(255, 255, 255, 1)",
                strokeDashArray:5
            },

            xaxis:{
                categories:labels,
                labels:{
                    style:{
                        colors:"#eaedf1ff",
                        fontSize:"12px"
                    }
                }
            },

            yaxis:{
                labels:{
                    style:{
                        colors:"#e2e8f0",
                        fontSize:"15px"
                    }
                }
            },

            tooltip:{
                theme:"dark"
            }
        }
    );

    chart.render();
}

function loadMonthly(){

    const expenses=getExpenses();
    const days=new Array(31).fill(0);

    expenses.forEach(e=>{
        const d=new Date(e.date).getDate()-1;
        days[d]+=Number(e.amount);
    });

    renderChart(
        Array.from({length:31},(_,i)=>i+1),
        days,
        "Monthly Expenses"
    );
}

function loadDaily(){

    const expenses=getExpenses();
    const today=
        new Date().toISOString().split("T")[0];

    const hours=new Array(24).fill(0);

    expenses.forEach(e=>{
        if(e.date===today){
            const h=e.time ?? 0;
            hours[h]+=Number(e.amount);
        }
    });

    renderChart(
        Array.from({length:24},(_,i)=>i+":00"),
        hours,
        "Today's Hourly Spending"
    );
}

function loadYearly(){

    const expenses=getExpenses();
    const months=new Array(12).fill(0);

    expenses.forEach(e=>{
        const m=new Date(e.date).getMonth();
        months[m]+=Number(e.amount);
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