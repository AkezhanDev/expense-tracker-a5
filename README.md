# Expense Tracker

Small command-line tool to record expenses and show totals. Data is fictional.

## Usage
    npm ci
    mkdir -p data
    node src/cli.js add 2026-11-01 food 12.50 lunch
    node src/cli.js list
    node src/cli.js total
    node src/cli.js month 2026-11
    node src/cli.js remove 1

Data is stored in data/expenses.json (override with EXPENSE_FILE). The data/ folder is not in the repository, so create it once with `mkdir -p data` (known issue F3: the tool does not create it yet).

Amount must be a positive number with a dot (12.50). Date must be a real date as YYYY-MM-DD.

## Tests
    npm test
