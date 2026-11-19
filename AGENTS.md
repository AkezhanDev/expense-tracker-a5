# AGENTS.md - Expense Tracker

Project documentation for any coding agent or developer. It is not loaded automatically by every tool:
if your tool does not read it, paste it into the first prompt. Read it before you change anything.

## Purpose
Small command-line tool that records personal expenses in a JSON file and prints totals.
All data is fictional. The tool never sends data anywhere (no network, no accounts).

## Architecture
- src/cli.js - entry point. Reads the command line, calls the functions below, prints the result.
- src/expenses.js - expense logic: addExpense, totalByCategory, monthlyTotal, removeExpense, formatMoney.
- src/store.js - load(file) and save(file, expenses): reads and writes the JSON file.
- test/expenses.test.js - Vitest tests for src/expenses.js.
- data/expenses.json - the data file (created at runtime, not committed). Path can be set with EXPENSE_FILE.
An expense is { id, date: "YYYY-MM-DD", category, amount, note }.

## Setup and commands
Requires Node 18 or newer (verified on Node 22). The project has no build step and no lint or type check yet.
Safe commands (read-only or local to this folder):
- npm install (uses package-lock.json)
- npm test (runs vitest once)
- npm start -- list | total | month YYYY-MM (read data only)
- node src/cli.js add | remove ... (changes the data file; use EXPENSE_FILE=/tmp/test.json when experimenting)

## Acceptance criteria (must stay true after any change)
- AC1. A valid expense (date, category, numeric amount) can be added and is saved in the data file.
- AC2. totalByCategory returns, for every category, the sum of the amounts of that category.
- AC3. monthlyTotal(expenses, "YYYY-MM") counts only expenses of that exact month.
- AC4. removeExpense(expenses, id) removes only the expense with that id and returns true; unknown id returns false and changes nothing.
- AC5. list, total and month never change the data file.

## Coding conventions
- ES modules (import/export), no new runtime dependencies without approval.
- Keep logic in src/expenses.js free of file and console access; only cli.js prints and only store.js touches files.
- Small functions, plain names, no comments that repeat the code.

## Test expectations
- Every change to src/expenses.js needs a test in test/expenses.test.js.
- Run npm test before and after a change and report the real pass/fail totals. Never write "passed" for a command that was not run.

## Forbidden actions
- Do not read, print or commit secrets, tokens or real personal data. Use only fictional data.
- Do not deploy, publish (npm publish, git push to a protected branch) or change CI without approval.
- No destructive commands: rm -rf outside node_modules, git reset --hard, git push --force, deleting data/expenses.json of the user.
- Do not add, remove or upgrade dependencies, and do not run npm audit fix --force, without a human review of the diff.
- Do not write outside this repository folder, except EXPENSE_FILE paths under /tmp for tests.

## Review gates
- One small change per commit, with the diff shown to the human before it is accepted.
- A change is accepted only after npm test passes and the acceptance criteria above were re-checked.
