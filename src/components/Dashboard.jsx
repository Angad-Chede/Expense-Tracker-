function Dashboard() {
  return (
    <>
      {/* NAVBAR */}
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

      {/* MAIN WRAPPER */}
      <div className="container">

        {/* HERO */}
        <div className="hero">
          <h1>Track Expenses Effortlessly</h1>
          <p className="subtitle">
            Improve accountability and Enhance financial performance.
          </p>
        </div>

        {/* DASHBOARD CARDS */}
        <div className="dashboard">
          <div className="left-side">

            <div className="card balance">
              <h3>Current Balance</h3>
              <p className="amount">₹ 0</p>
            </div>

            <div className="actions">
              <div className="card action">
                <h3>Add Expense</h3>
              </div>

              <div className="card action">
                <h3>Add Balance</h3>
              </div>
            </div>

          </div>

          <div className="right-side">
            <div className="card">
              <h3>Recent Expenses</h3>

              <div className="expense-list">
                <div className="expense">
                  <div className="expense-name">Expense</div>
                  <div className="expense-date">Date</div>
                  <div className="expense-amount">Amount</div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* ANALYTICS SECTION INSIDE CONTAINER */}
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

            <div id="expenseChart"></div>

          </div>
        </div>

        {/* SECONDARY SECTION */}
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

      {/* MODALS (Keep Outside Layout Flow) */}

      <div className="modal">
        <div className="modal-content">
          <h2>Add Expense</h2>

          <form>
            <div className="form-group">
              <label>Expense Name</label>
              <input type="text" />
            </div>

            <div className="form-group">
              <label>Date</label>
              <input type="date" />
            </div>

            <div className="form-group">
              <label>Amount</label>
              <input type="number" />
            </div>

            <button type="submit" className="btn-primary">
              Add Expense
            </button>
          </form>
        </div>
      </div>

      <div className="modal">
        <div className="modal-content">
          <h2>Add Balance</h2>
          <input type="number" placeholder="Enter amount" />
          <button className="btn-primary">Add Balance</button>
        </div>
      </div>

    </>
  );
}

export default Dashboard;