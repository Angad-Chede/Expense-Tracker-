import Chart from "react-apexcharts";
import { useState, useEffect } from "react";
import {
  getExpenses,
  getBalance,
  calculateCurrentBalance,
  addExpense,
  saveBalance
} from "../utils/expenseLogic";

function Dashboard() {
  const [expenses, setExpenses] = useState([]);
  const [balance, setBalance] = useState(0);

  const [showExpenseModal, setShowExpenseModal] = useState(false);
  const [showBalanceModal, setShowBalanceModal] = useState(false);

  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [balanceInput, setBalanceInput] = useState("");

  useEffect(() => {
    setExpenses(getExpenses());
    setBalance(getBalance());
  }, []);

  const handleAddExpense = (e) => {
    e.preventDefault();
    const updated = addExpense(expenses, name, amount);
    setExpenses(updated);
    setName("");
    setAmount("");
    setShowExpenseModal(false);
  };

  const handleAddBalance = () => {
    const newBalance = Number(balance) + Number(balanceInput);
    saveBalance(newBalance);
    setBalance(newBalance);
    setBalanceInput("");
    setShowBalanceModal(false);
  };

  const chartData = {
  series: [
    {
      name: "Expenses",
      data: expenses.map(e => Number(e.amount))
    }
  ],
  options: {
    chart: {
      type: "line",
      background: "transparent",
      toolbar: { show: false }
    },
    stroke: {
      curve: "smooth",
      width: 4
    },
    xaxis: {
      categories: expenses.map(e => e.date)
    },
    grid: {
      borderColor: "rgba(255,255,255,0.2)"
    },
    theme: {
      mode: "dark"
    }
  }
};

  return (
    <>
      <nav className="navbar">
        <div className="nav-left">
          <img src="/logo.png" className="nav-logo" alt="logo" />
          <h2 className="brand">ExpenseTracker</h2>
        </div>

        <ul className="nav-links">
          <li><a href="#">Dashboard</a></li>
          <li><a href="#">Expenses</a></li>
          <li><a href="#">Reports</a></li>
          <li><a href="#">Profile</a></li>
        </ul>

        <div className="nav-right">
          <a href="#">Login</a>
          <button className="nav-btn">SIGN-UP</button>
        </div>
      </nav>

      <div className="container">

        <div className="hero">
          <h1>Track Expenses Effortlessly</h1>
          <p className="subtitle">
            Improve accountability and Enhance financial performance.
          </p>
        </div>

        <div className="dashboard">
          <div className="left-side">

            <div className="card balance">
              <h3>Current Balance</h3>
              <p className="amount">
                ₹ {calculateCurrentBalance(expenses, balance)}
              </p>
            </div>

            <div className="actions">
              <div
                className="card action"
                onClick={() => setShowExpenseModal(true)}
              >
                <h3>Add Expense</h3>
              </div>

              <div
                className="card action"
                onClick={() => setShowBalanceModal(true)}
              >
                <h3>Add Balance</h3>
              </div>
            </div>

          </div>

          <div className="right-side">
            <div className="card">
              <h3>Recent Expenses</h3>

              <div className="expense-list">
                {expenses.map((exp, i) => (
                  <div className="expense" key={i}>
                    <div className="expense-name">{exp.name}</div>
                    <div className="expense-date">{exp.date}</div>
                    <div className="expense-amount">₹ {exp.amount}</div>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </div>

        <div className="analytics">
          <div className="analytics-section">

            <div className="analytics-header">
              <h2>Expense Analytics</h2>

              <div className="graph-tabs">
                <button>Day</button>
                <button>Month</button>
                <button>Year</button>
              </div>
            </div>

            <Chart
              options={chartData.options}
              series={chartData.series}
              type="line"
              height={350}
            />

          </div>
        </div>

        <div className="secondary">
          <h3>
            Monitor daily expenses, categorize spending, and optimize your
            budget effortlessly.
          </h3>
          <p>
            Record expenses instantly. Analyze spending patterns.
            Make smarter financial decisions.
          </p>
        </div>

      </div>

      {showExpenseModal && (
        <div className="modal" style={{ display: "flex" }}>
          <div className="modal-content">
            <h2>Add Expense</h2>

            <form onSubmit={handleAddExpense}>
              <div className="form-group">
                <label>Expense Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Amount</label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>

              <button type="submit" className="btn-primary">
                Add Expense
              </button>
            </form>
          </div>
        </div>
      )}

      {showBalanceModal && (
        <div className="modal" style={{ display: "flex" }}>
          <div className="modal-content">
            <h2>Add Balance</h2>

            <input
              type="number"
              value={balanceInput}
              onChange={(e) => setBalanceInput(e.target.value)}
              placeholder="Enter amount"
            />

            <button
              className="btn-primary"
              onClick={handleAddBalance}
            >
              Add Balance
            </button>
          </div>
        </div>
      )}

    </>
  );
}

export default Dashboard;