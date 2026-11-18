// Expense data: { id, date: 'YYYY-MM-DD', category, amount, note }

export function addExpense(expenses, date, category, amount, note = '') {
  const id = expenses.length + 1;
  const expense = { id, date, category, amount: Number(amount), note };
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
