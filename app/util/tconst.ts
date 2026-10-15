import { TCONST_REGEX } from '../const';

export const isValidTconst = (value: string): boolean => TCONST_REGEX.test(value);
