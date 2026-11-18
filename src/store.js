import fs from 'node:fs';

export function load(file) {
  if (!fs.existsSync(file)) return [];
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

export function save(file, expenses) {
  fs.writeFileSync(file, JSON.stringify(expenses, null, 2));
}
