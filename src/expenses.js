// Expense data: { id, date: 'YYYY-MM-DD', category, amount, note }

function isValidDate(date) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return false;
  const d = new Date(`${date}T00:00:00Z`);
  return !Number.isNaN(d.getTime()) && d.toISOString().slice(0, 10) === date;
}

export function addExpense(expenses, date, category, amount, note = '') {
  if (!isValidDate(date)) {
    throw new Error(`Invalid date "${date}": expected a real date as YYYY-MM-DD`);
  }
  if (typeof category !== 'string' || category.trim() === '') {
    throw new Error('Invalid category: must not be empty');
  }
  const value = Number(amount);
  if (!Number.isFinite(value) || value <= 0) {
    throw new Error(`Invalid amount "${amount}": use a positive number with a dot, e.g. 12.50`);
  }
  const id = expenses.reduce((max, e) => Math.max(max, e.id), 0) + 1;
  const expense = { id, date, category, amount: value, note };
  expenses.push(expense);
  return expense;
}

export function totalByCategory(expenses) {
  const totals = {};
  for (const e of expenses) {
    totals[e.category] = (totals[e.category] || 0) + e.amount;
  }
  return totals;
}

export function monthlyTotal(expenses, month) {
  // month format: YYYY-MM
  let sum = 0;
  for (const e of expenses) {
    if (e.date.startsWith(month)) sum += e.amount;
  }
  return sum;
}

export function removeExpense(expenses, id) {
  const index = expenses.findIndex((e) => e.id === id);
  if (index === -1) return false;
  expenses.splice(index, 1);
  return true;
}

export function formatMoney(value) {
  return value.toFixed(2);
}
