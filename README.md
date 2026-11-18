# Expense Tracker

Small command-line tool to record expenses and show totals. Data is fictional.

## Usage
    npm install
    node src/cli.js add 2026-11-01 food 12.50 lunch
    node src/cli.js list
    node src/cli.js total
    node src/cli.js month 2026-11
    node src/cli.js remove 1

Data is stored in data/expenses.json (override with EXPENSE_FILE).

## Tests
    npm test
