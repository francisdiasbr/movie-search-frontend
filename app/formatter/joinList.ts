import { NOT_AVAILABLE } from './notAvailable';

export default (values?: Array<number | string> | null, separator = ', '): string =>
  values && values.length > 0 ? values.join(separator) : NOT_AVAILABLE;
