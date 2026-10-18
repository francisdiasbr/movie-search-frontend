import { SortConfig } from './types';

// Booleans (undefined counts as false) and numbers compare by value; numeric
// strings such as a year stored as text compare as numbers; the rest as text.
const toComparable = (value: unknown): boolean | number | string => {
  if (value === undefined || value === null) return '';
  if (typeof value === 'boolean') return value;
  if (typeof value === 'number') return value;
  if (typeof value === 'string' && value !== '' && !isNaN(Number(value))) return Number(value);
  return String(value);
};

const compare = (a: unknown, b: unknown): number => {
  const left = toComparable(a);
  const right = toComparable(b);
  if (typeof left === 'boolean' || typeof right === 'boolean') {
    return Number(left === true) - Number(right === true);
  }
  if (typeof left === 'number' && typeof right === 'number') return left - right;
  return String(left).localeCompare(String(right));
};

export const sortEntries = <Row>(entries: Row[], sortConfig: SortConfig | null): Row[] => {
  if (!sortConfig) return entries;
  const sign = sortConfig.direction === 'ascending' ? 1 : -1;
  return [...entries].sort((a, b) => {
    const row = (value: Row) => (value as Record<string, unknown>)[sortConfig.key];
    return sign * compare(row(a), row(b));
  });
};
