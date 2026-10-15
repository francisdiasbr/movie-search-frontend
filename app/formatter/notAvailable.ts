export const NOT_AVAILABLE = 'N/A';

export default (value?: number | string | null): string =>
  value === null || value === undefined || value === '' ? NOT_AVAILABLE : String(value);
