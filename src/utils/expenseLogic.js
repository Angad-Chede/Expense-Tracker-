// GET EXPENSES
export function getExpenses() {
  return JSON.parse(localStorage.getItem("expenses")) || [];
}

// SAVE EXPENSES
export function saveExpenses(expenses) {
  localStorage.setItem("expenses", JSON.stringify(expenses));
}

// GET BALANCE
export function getBalance() {
  return Number(localStorage.getItem("balance")) || 0;
}

// SAVE BALANCE
export function saveBalance(balance) {
  localStorage.setItem("balance", balance);
}

// CALCULATE CURRENT BALANCE
export function calculateCurrentBalance(expenses, balance) {
  const spent = expenses.reduce((sum, e) => sum + Number(e.amount), 0);
  return balance - spent;
}

// ADD EXPENSE
export function addExpense(expenses, name, amount) {
  const now = new Date();

  const expense = {
    name,
    amount: Number(amount),
    date: now.toISOString().split("T")[0],
    time: now.getHours(),
  };

  const updated = [...expenses, expense];

  saveExpenses(updated);

  return updated;
}

// GROUP EXPENSES BY DATE
export function groupExpensesByDate(expenses) {
  const grouped = {};

  expenses.forEach((e) => {
    if (!grouped[e.date]) grouped[e.date] = [];
    grouped[e.date].push(e);
  });

  return grouped;
}