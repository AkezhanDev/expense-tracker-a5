import { describe, it, expect } from 'vitest';
import { addExpense, totalByCategory, monthlyTotal, removeExpense } from '../src/expenses.js';

describe('expenses', () => {
  it('adds an expense with a numeric amount', () => {
    const list = [];
    const e = addExpense(list, '2026-11-01', 'food', '12.5', 'lunch');
    expect(e.amount).toBe(12.5);
    expect(list).toHaveLength(1);
  });

  it('totals by category', () => {
    const list = [];
    addExpense(list, '2026-11-01', 'food', 10);
    addExpense(list, '2026-11-02', 'food', 5);
    addExpense(list, '2026-11-02', 'transport', 3);
    expect(totalByCategory(list)).toEqual({ food: 15, transport: 3 });
  });

  it('sums one month', () => {
    const list = [];
    addExpense(list, '2026-10-31', 'food', 10);
    addExpense(list, '2026-11-01', 'food', 5);
    expect(monthlyTotal(list, '2026-11')).toBe(5);
  });

  it('removes an expense by id', () => {
    const list = [];
    addExpense(list, '2026-11-01', 'food', 10);
    expect(removeExpense(list, 1)).toBe(true);
    expect(list).toHaveLength(0);
  });
});
