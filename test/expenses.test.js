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

  it('never gives a new expense an id that is already in use', () => {
    const list = [];
    addExpense(list, '2026-11-01', 'food', 1);
    addExpense(list, '2026-11-02', 'food', 2);
    addExpense(list, '2026-11-03', 'food', 3);
    removeExpense(list, 1);
    const e = addExpense(list, '2026-11-04', 'food', 4);
    expect(e.id).toBe(4);
    expect(new Set(list.map((x) => x.id)).size).toBe(list.length);
  });

  it('removes only the new expense when its id is used after an earlier remove', () => {
    const list = [];
    addExpense(list, '2026-11-01', 'food', 1);
    addExpense(list, '2026-11-02', 'food', 2);
    addExpense(list, '2026-11-03', 'food', 3);
    removeExpense(list, 1);
    const e = addExpense(list, '2026-11-04', 'food', 4);
    expect(removeExpense(list, e.id)).toBe(true);
    expect(list.map((x) => x.amount)).toEqual([2, 3]);
  });

  it('rejects bad amounts (NaN, comma, empty, zero, negative, Infinity) and saves nothing', () => {
    const list = [];
    for (const bad of ['abc', '12,50', '', '0', 0, '-5', -5, Infinity, undefined]) {
      expect(() => addExpense(list, '2026-11-01', 'food', bad)).toThrow(/amount/i);
    }
    expect(list).toHaveLength(0);
  });

  it('rejects a missing or impossible date and an empty category, saves nothing', () => {
    const list = [];
    expect(() => addExpense(list, undefined, 'food', 5)).toThrow(/date/i);
    expect(() => addExpense(list, '2026-02-30', 'food', 5)).toThrow(/date/i);
    expect(() => addExpense(list, '2026-11-01', '', 5)).toThrow(/category/i);
    expect(() => addExpense(list, '2026-11-01', undefined, 5)).toThrow(/category/i);
    expect(list).toHaveLength(0);
  });
});
