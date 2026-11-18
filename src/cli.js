import { load, save } from './store.js';
import {
  addExpense,
  totalByCategory,
  monthlyTotal,
  removeExpense,
  formatMoney,
} from './expenses.js';

const FILE = process.env.EXPENSE_FILE || 'data/expenses.json';
const [, , command, ...args] = process.argv;
const expenses = load(FILE);

if (command === 'add') {
  const [date, category, amount, ...note] = args;
  const e = addExpense(expenses, date, category, amount, note.join(' '));
  save(FILE, expenses);
  console.log(`Added #${e.id}: ${e.category} ${formatMoney(e.amount)} on ${e.date}`);
} else if (command === 'list') {
  for (const e of expenses) {
    console.log(`#${e.id} ${e.date} ${e.category} ${formatMoney(e.amount)} ${e.note}`);
  }
} else if (command === 'total') {
  const totals = totalByCategory(expenses);
  for (const [category, sum] of Object.entries(totals)) {
    console.log(`${category}: ${formatMoney(sum)}`);
  }
} else if (command === 'month') {
  console.log(formatMoney(monthlyTotal(expenses, args[0])));
} else if (command === 'remove') {
  const ok = removeExpense(expenses, Number(args[0]));
  save(FILE, expenses);
  console.log(ok ? `Removed #${args[0]}` : `No expense #${args[0]}`);
} else {
  console.log('Usage: node src/cli.js add|list|total|month|remove ...');
}
